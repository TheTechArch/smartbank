using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using smartbank.Server.Models.ResourceRegistry;
using smartbank.Server.Services.Interfaces;

namespace smartbank.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceRegistryController(IResourceRegistry resourceRegistry) : ControllerBase
    {

        private readonly IResourceRegistry _resourceRegistryService = resourceRegistry;

        [HttpGet("consent-resources/{environment}")]
        public async Task<IActionResult> GetConsentResources(string environment, CancellationToken cancellationToken)
        {

            List<ServiceResource> consentResources = await _resourceRegistryService.GetConsentResources(environment, cancellationToken)
                .ConfigureAwait(false);
            // This is a placeholder for the actual implementation
            return Ok(consentResources);
        }
    }
}
