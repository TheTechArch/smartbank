using smartbank.Server.Models.ResourceRegistry;

namespace smartbank.Server.Clients.Interface
{
    public interface IResourceRegistryClient    
    {
        Task<List<ServiceResource>> GetResources(string environment, CancellationToken cancellationToken);

        Task<ServiceResource> GetResource(string environment, string resourceId, CancellationToken cancellationToken = default);
    }
}
