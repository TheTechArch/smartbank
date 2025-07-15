using smartbank.Server.Models.Consent;

namespace smartbank.Server.Clients.Interface
{
    public interface IConsentClient
    {
        public Task<ConsentRequestDetailsDto> RequestConsent(ConsentRequestDto consentRequestDetailsDto, string environment, CancellationToken cancellationToken = default);


        public Task<ConsentRequestDetailsDto> GetRequest(Guid consentid, string environment, CancellationToken cancellationToken = default);
    }
}
