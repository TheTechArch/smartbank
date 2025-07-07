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

        /// <summary>
        /// Initializes a new instance of the <see cref="ResourceRegistryClient"/> class
        /// </summary>
        /// <param name="settings">The resource registry config settings</param>
        /// <param name="logger">Logger instance for this ResourceRegistryClient</param>
        public ResourceRegistryClient(HttpClient httpClient,  IOptions<SmartBankConfig> settings, ILogger<IResourceRegistryClient> logger)
        {
            _httpClient = httpClient;
            SmartBankConfig platformSettings = settings.Value;
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
                string endpointUrl = $"resource/search";

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
                string endpointUrl = $"resource/resourcelist";

                HttpResponseMessage response = await _httpClient.GetAsync(endpointUrl, cancellationToken);
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
      
    }
}
