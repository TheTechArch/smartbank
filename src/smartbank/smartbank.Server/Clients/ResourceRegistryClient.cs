using Microsoft.Extensions.Options;
using smartbank.Server.Clients.Interface;
using smartbank.Server.Config;
using smartbank.Server.Models.ResourceRegistry;
using System.Diagnostics.CodeAnalysis;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;

namespace smartbank.Server.Clients
{
    /// <summary>
    /// Client implementation for integration with the Resource Registry
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class ResourceRegistryClient : IResourceRegistryClient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<IResourceRegistryClient> _logger;
        private readonly JsonSerializerOptions options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        private readonly SmartBankConfig _smartbankConfig;

        /// <summary>
        /// Initializes a new instance of the <see cref="ResourceRegistryClient"/> class
        /// </summary>
        /// <param name="settings">The resource registry config settings</param>
        /// <param name="logger">Logger instance for this ResourceRegistryClient</param>
        public ResourceRegistryClient(HttpClient httpClient,  IOptions<SmartBankConfig> settings, ILogger<IResourceRegistryClient> logger)
        {
            _httpClient = httpClient;
            _smartbankConfig = settings.Value;
            _httpClient.Timeout = new TimeSpan(0, 0, 30);
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _logger = logger;
        }

        /// <inheritdoc/>
        public async Task<ServiceResource> GetResource(string environment, string resourceId, CancellationToken cancellationToken = default)
        {
            string endpointUrl = $"resource/{resourceId}";

            HttpResponseMessage response = await _httpClient.GetAsync(endpointUrl, cancellationToken);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                string content = await response.Content.ReadAsStringAsync(cancellationToken);
                return JsonSerializer.Deserialize<ServiceResource>(content, options);
            }

            return null;
        }

        /// <inheritdoc/>
        public async Task<List<ServiceResource>> GetResources(string environment, CancellationToken cancellationToken = default)
        {
            List<ServiceResource> resources = new();

            try
            {
                string platformUrl = GetPlatformBase(environment);
                string endpointPath = $"resourceregistry/api/v1/resource/search";

                string endpointUrl = platformUrl + endpointPath;

                HttpResponseMessage response = await _httpClient.GetAsync(endpointUrl, cancellationToken);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    string content = await response.Content.ReadAsStringAsync(cancellationToken);
                    resources = JsonSerializer.Deserialize<List<ServiceResource>>(content, options);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "AccessManagement // ResourceRegistryClient // SearchResources // Exception");
                throw;
            }

            return resources;
        }

        /// <inheritdoc/>
        public async Task<List<ServiceResource>> GetResourceList(string environment, CancellationToken cancellationToken = default)
        {
            List<ServiceResource> resources = new();

            try
            {
                string platformUrl = GetPlatformBase(environment);

                string endpointPath = $"resourceregistry/api/v1/resource/resourcelist";

                string endpointUrl = platformUrl + endpointPath; 

                HttpResponseMessage response = await _httpClient.GetAsync(platformUrl + endpointUrl, cancellationToken);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    string content = await response.Content.ReadAsStringAsync(cancellationToken);
                    resources = JsonSerializer.Deserialize<List<ServiceResource>>(content, options);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "AccessManagement // ResourceRegistryClient // GetResourceList // Exception");
                throw;
            }

            return resources;
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
