using Altinn.Register.Contracts;
using Altinn.Register.Contracts.V1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using smartbank.Server.Clients.Interface;
using smartbank.Server.Config;
using smartbank.Server.Models.Consent;
using smartbank.Server.Models.Maskinporten;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;

namespace smartbank.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsentController(IConsentClient consentClient, IOptions<ConsentConfig> consentConfig, IMaskinportenClient maskinportenClient) : ControllerBase
    {
        private readonly IConsentClient _consentClient = consentClient;
        private readonly ConsentConfig _consentConfig = consentConfig.Value;
        private readonly IMaskinportenClient _maskinportenClient = maskinportenClient;

        [HttpPost()]
        public async Task<IActionResult> RequestConsent(ConsentRequestBff consentRequestBff, CancellationToken cancellationToken)
        {
            try
            {
                ConsentPartyUrn offeredFrom = ConsentPartyUrn.PersonId.Create(PersonIdentifier.Parse(consentRequestBff.OfferedBy));
                ConsentPartyUrn coveredBy = ConsentPartyUrn.OrganizationId.Create(OrganizationIdentifier.Parse(_consentConfig.CoveredBy));

                List<ConsentRightDto> consentRights = [];

                foreach (var right in consentRequestBff.consentRightBFFs)
                {
                    ConsentRightDto consentRight = new()
                    {
                        Resource =
                         [
                                new() {
                                    Type = "urn:altinn:resource",
                                    Value = right.ResourceId
                                }
                         ],
                        Action = [right.Action],
                        Metadata = right.Metadata
                    };
                    consentRights.Add(consentRight);
                }

                Guid consentID = Guid.NewGuid();

                ConsentRequestDto dto = new()
                {
                    Id = consentID,
                    To = coveredBy,
                    From = offeredFrom,
                    ValidTo = DateTimeOffset.UtcNow.AddYears(1),
                    ConsentRights = consentRights,
                    RedirectUrl = $"https://smartbankdemo.azurewebsites.net/private/loanapplication/consentresult?requestId={consentID}&environment={consentRequestBff.Environment}",
                };

                ConsentRequestDetailsDto consent = await _consentClient.RequestConsent(dto, consentRequestBff.Environment, cancellationToken);

                if (!consent.ViewUri.Contains("DONTCHOOSE"))
                {
                    consent.ViewUri = consent.ViewUri + "&DONTCHOOSEREPORTEE=true";
                }

                ConsentRequestResultBff result = new ConsentRequestResultBff()
                {
                    ConsentUrl = consent.ViewUri,
                    Id = consent.Id
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }


        [HttpGet("{consentId}")]
        public async Task<IActionResult> GetConsentRequest(Guid consentId, [FromQuery] string environment, CancellationToken cancellationToken)
        {
            try
            {
                ConsentRequestDetailsDto consent = await _consentClient.GetRequest(consentId, environment, cancellationToken);
                if (consent == null)
                {
                    return NotFound();
                }
                return Ok(consent);
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }



        [HttpGet("token/{consentId}")]
        public async Task<IActionResult> GetConsentToken(Guid consentId, [FromQuery] string environment, CancellationToken cancellationToken)
        {
            try
            {
                string scope = "altinn:consentrequests.read";

                ConsentRequestDetailsDto consent = await _consentClient.GetRequest(consentId, environment, cancellationToken);

                TokenResponse? token = null;

                if (consent.From.IsPersonId(out PersonIdentifier personIdentifier))
                {
                    token = await _maskinportenClient.GetConsentToken(scope, personIdentifier.ToString(), consentId.ToString());
                }
                else if(consent.From.IsOrganizationId(out OrganizationIdentifier organizationIdentifier))
                {
                    token = await _maskinportenClient.GetConsentToken(scope, organizationIdentifier.ToString(), consentId.ToString());
                }


                if(token != null)
                {
                    var handler = new JwtSecurityTokenHandler();
                    var jwt = handler.ReadJwtToken(token.AccessToken);

                    // 2) Serialize header & payload with System.Text.Json
                    var jsonOpts = new JsonSerializerOptions
                    {
                        WriteIndented = true,
                        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
                    };

                    string headerJson = JsonSerializer.Serialize(jwt.Header, jsonOpts);
                    string payloadJson = JsonSerializer.Serialize(jwt.Payload, jsonOpts);

                    // 3) If you want a strongly-typed dictionary of claims:
                    var claimsDict = jwt.Claims
                        .GroupBy(c => c.Type)
                        .ToDictionary(
                            g => g.Key,
                            g => g.Select(c => c.Value).ToArray()  // array in case of multi-valued claims
                        );

                    return Ok(new
                    {
                        // rawToken = token.AccessToken,
                        header = JsonDocument.Parse(headerJson).RootElement,   // returns a JsonElement
                        payload = JsonDocument.Parse(payloadJson).RootElement,
                    });
                }


                return NotFound();
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
