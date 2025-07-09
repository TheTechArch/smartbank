using Microsoft.IdentityModel.Tokens;
using smartbank.Server.Models.Maskinporten;

namespace smartbank.Server.Clients.Interface
{
    public interface IMaskinportenClient
    {
        Task<TokenResponse?> GetToken(string scope, string? systemUserOrgno);

        Task<TokenResponse?> GetToken(string scope);

        /// <summary>
        /// Generates a Maskinporten access token using a JsonWebKey
        /// </summary>
        Task<TokenResponse?> GetToken(JsonWebKey jwk, string environment, string clientId, string scope, string? systemUserOrg);

        /// <summary>
        /// Generates a Maskinporten access token using a base64encoded JsonWebKey
        /// </summary>
        Task<TokenResponse?> GetToken(string base64EncodedJWK, string environment, string clientId, string scope, string? systemUserOrg);


        Task<TokenResponse?> GetToken(string base64EncodedJWK, string environment, string clientId, string scope);
    }
}
