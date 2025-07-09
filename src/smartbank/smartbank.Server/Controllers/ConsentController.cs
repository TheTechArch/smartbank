using Altinn.Register.Contracts;
using Altinn.Register.Contracts.V1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using smartbank.Server.Clients.Interface;
using smartbank.Server.Config;
using smartbank.Server.Models.Consent;

namespace smartbank.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsentController(IConsentClient consentClient, IOptions<ConsentConfig> consentConfig) : ControllerBase
    {
        private readonly IConsentClient _consentClient = consentClient;
        private readonly ConsentConfig _consentConfig = consentConfig.Value;

        [HttpGet("test")]
        public async Task<IActionResult> RequestConsent(ConsentRequestBff consentRequestBff, CancellationToken cancellationToken)
        {
            try
            {
                ConsentPartyUrn offeredFrom = ConsentPartyUrn.PersonId.Create(PersonIdentifier.Parse(consentRequestBff.OfferedBy));
                ConsentPartyUrn coveredBy = ConsentPartyUrn.OrganizationId.Create(OrganizationIdentifier.Parse(_consentConfig.CoveredBy));

                List<ConsentRightDto> consentRights = [];

                foreach(var right in consentRequestBff.consentRightBFFs)
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

                ConsentRequestDto dto = new()
                {
                    Id = Guid.NewGuid(),
                    To = coveredBy,
                    From = offeredFrom,
                    ValidTo = DateTimeOffset.UtcNow.AddYears(1),
                    ConsentRights = consentRights,
                    RedirectUrl =  "https:smartbankdemo.azurewebsites.net",
                };

                var consent = await _consentClient.RequestConsent(dto, consentRequestBff.Environment, cancellationToken);

                return Ok("Got token");
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here for brevity)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }
    }
}
