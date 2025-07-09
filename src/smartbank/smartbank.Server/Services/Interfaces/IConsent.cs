using smartbank.Server.Models.Consent;

namespace smartbank.Server.Services.Interfaces
{
    public interface IConsent
    {
        public Task<ConsentRequestDetailsDto> RequestConsent(ConsentRequestDetailsDto ConsentRequestDetailsDto, CancellationToken cancellationToken);
    }
}
