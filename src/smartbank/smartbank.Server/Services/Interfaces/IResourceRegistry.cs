using smartbank.Server.Models.ResourceRegistry;

namespace smartbank.Server.Services.Interfaces
{
    public interface IResourceRegistry
    {
        Task<List<ServiceResource>> GetConsentResources(string environment, CancellationToken cancellationToken);
    }
}
