using Microsoft.Extensions.Options;
using smartbank.Server.Clients.Interface;
using smartbank.Server.Config;
using smartbank.Server.Models.Consent;
using smartbank.Server.Models.Maskinporten;
using System.Diagnostics.CodeAnalysis;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace smartbank.Server.Clients
{
    /// <summary>
    /// Client implementation for integration with Altinn Consent Management API for data consumers
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class ConsentClient : IConsentClient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<IResourceRegistryClient> _logger;
        private readonly JsonSerializerOptions options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        private readonly SmartBankConfig _smartbankConfig;
        private readonly IMaskinportenClient _maskinportenClient;

        private static readonly JsonSerializerOptions jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };

        /// <summary>
        /// Initializes a new instance of the <see cref="ResourceRegistryClient"/> class
        /// </summary>
        /// <param name="settings">The resource registry config settings</param>
        /// <param name="logger">Logger instance for this ResourceRegistryClient</param>
        public ConsentClient(HttpClient httpClient,  IOptions<SmartBankConfig> settings, ILogger<IResourceRegistryClient> logger, IMaskinportenClient maskinportenClient)
        {
            _httpClient = httpClient;
            _smartbankConfig = settings.Value;
            _httpClient.Timeout = new TimeSpan(0, 0, 30);
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _logger = logger;
            _maskinportenClient = maskinportenClient;
        }

        public async Task<ConsentRequestDetailsDto> GetRequest(Guid consentid, string environment, CancellationToken cancellationToken = default)
        {
            try
            {
                TokenResponse? tokenResponse = await _maskinportenClient.GetToken("altinn:consentrequests.read");

                if (tokenResponse == null || string.IsNullOrEmpty(tokenResponse.AccessToken))
                {
                    throw new Exception("Failed to retrieve access token from Maskinporten.");
                }

                string platformUrl = GetPlatformBase(environment);
                string endpointPath = $"accessmanagement/api/v1/enterprise/consentrequests/{consentid}";
                string endpointUrl = $"{platformUrl}{endpointPath}";

                // 3. Serialize payload with System.Text.Json


                // 4. Create the request message
                using var request = new HttpRequestMessage(HttpMethod.Post, endpointUrl)
                {
                };

                // 4. Add per-request headers
                request.Headers.Authorization =
                    new AuthenticationHeaderValue("Bearer", tokenResponse.AccessToken);

                using var response = await _httpClient.SendAsync(request, cancellationToken);
                if (!response.IsSuccessStatusCode)
                {
                    string errorContent = await response.Content.ReadAsStringAsync(cancellationToken);

                    _logger.LogError(
                        "ConsentClient.RequestConsent failed with {StatusCode}",
                        response.StatusCode + response.Content.ToString());
                    response.EnsureSuccessStatusCode();
                }

                // 7. Deserialize with System.Text.Json
                using var contentStream = await response.Content.ReadAsStreamAsync(cancellationToken);
                var result = await JsonSerializer.DeserializeAsync<ConsentRequestDetailsDto>(
                    contentStream, jsonOptions, cancellationToken);

                return result!;
            }


            catch (Exception ex)
            {
                _logger.LogError(ex, "ConsentClient // RequestConsent // Exception");
                throw;
            }
        }

        public async Task<ConsentRequestDetailsDto> RequestConsent(ConsentRequestDto consentRequestDetailsDto, string environment, CancellationToken cancellationToken = default)
        {
            try
            {
                TokenResponse? tokenResponse = await _maskinportenClient.GetToken("altinn:consentrequests.write");

                if( tokenResponse == null || string.IsNullOrEmpty(tokenResponse.AccessToken))
                {
                    throw new Exception("Failed to retrieve access token from Maskinporten.");
                }

                string platformUrl = GetPlatformBase(environment);
                string endpointPath = $"accessmanagement/api/v1/enterprise/consentrequests";
                string endpointUrl = $"{platformUrl}{endpointPath}";

                string payload = JsonSerializer.Serialize(consentRequestDetailsDto, jsonOptions);

                // 4. Create the request message
                using var request = new HttpRequestMessage(HttpMethod.Post, endpointUrl)
                {
                    Content = new StringContent(payload, Encoding.UTF8, "application/json")
                };

                // 4. Add per-request headers
                request.Headers.Authorization =
                    new AuthenticationHeaderValue("Bearer", tokenResponse.AccessToken);

                using var response = await _httpClient.SendAsync(request, cancellationToken);
                if (!response.IsSuccessStatusCode)
                {
                    string errorContent = await response.Content.ReadAsStringAsync(cancellationToken);

                    _logger.LogError(
                        "ConsentClient.RequestConsent failed with {StatusCode}",
                        response.StatusCode + response.Content.ToString());
                    response.EnsureSuccessStatusCode();
                }

                // 7. Deserialize with System.Text.Json
                using var contentStream = await response.Content.ReadAsStreamAsync(cancellationToken);
                var result = await JsonSerializer.DeserializeAsync<ConsentRequestDetailsDto>(
                    contentStream, jsonOptions, cancellationToken);

                return result!;
            }


            catch (Exception ex)
            {
                _logger.LogError(ex, "ConsentClient // RequestConsent // Exception");
                throw;
            }

        }

        private string GetPlatformBase(string environment)
        {
            if(environment.Equals("at22", StringComparison.InvariantCultureIgnoreCase))
            {
                return _smartbankConfig.AT22PlatformEndpoint;
            }

            if(environment.Equals("at23", StringComparison.InvariantCultureIgnoreCase))
            {
                return _smartbankConfig.AT23PlatformEndpoint;
            }

            if(environment.Equals("at24", StringComparison.InvariantCultureIgnoreCase))
            {
                return _smartbankConfig.AT24PlatformEndpoint;
            }

            if(environment.Equals("tt02", StringComparison.InvariantCultureIgnoreCase))
            {
                return _smartbankConfig.TT02PlatformEndpoint;
            }

            return _smartbankConfig.AT22PlatformEndpoint;
        }

     
    }
}
