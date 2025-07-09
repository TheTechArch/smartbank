using Microsoft.Extensions.Caching.Memory;
using smartbank.Server.Clients.Interface;
using smartbank.Server.Models.ResourceRegistry;
using smartbank.Server.Services.Interfaces;

namespace smartbank.Server.Services
{
    public class ResourceRegistryService(IResourceRegistryClient resourceRegistryClient, IMemoryCache memoryCache) : IResourceRegistry
    {
        private readonly IResourceRegistryClient _resourceRegistryClient = resourceRegistryClient;

        public async Task<List<ServiceResource>> GetConsentResources(string environment, CancellationToken cancellationToken)
        {
            string cacheKey = "ConsentResources" + environment;
            if (!memoryCache.TryGetValue(cacheKey, out List<ServiceResource> resources))
            {
                List<ServiceResource> allResources = await GetAllResources(environment, cancellationToken);

                resources = allResources.Where(r => r.ResourceType == ResourceType.Consent).ToList();
                memoryCache.Set(cacheKey, resources, TimeSpan.FromMinutes(2));
            }
            return resources;

        }


        private async Task<List<ServiceResource>> GetAllResources(string environment, CancellationToken cancellationToken)
        {
              return await  _resourceRegistryClient.GetResources(environment, cancellationToken);
        }

    }
}
