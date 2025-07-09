namespace smartbank.Server.Models.Maskinporten
{
    public class TokenRequestException : ApplicationException
    {
        public TokenRequestException(string message)
            : base(message)
        {
        }
    }
}
