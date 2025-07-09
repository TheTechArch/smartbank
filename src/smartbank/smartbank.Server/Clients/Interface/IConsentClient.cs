using smartbank.Server.Models.Consent;

namespace smartbank.Server.Clients.Interface
{
    public interface IConsentClient
    {
        public Task<ConsentRequestStatusDto> RequestConsent(ConsentRequestDto consentRequestDetailsDto, string environment, CancellationToken cancellationToken = default);
    }
}
