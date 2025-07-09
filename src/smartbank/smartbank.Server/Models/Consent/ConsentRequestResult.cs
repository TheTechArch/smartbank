namespace smartbank.Server.Models.Consent
{
    public class ConsentRequestResultBff
    {
        /// <summary>
        /// The unique identifier for the consent request.
        /// </summary>
        public required Guid Id { get; set; }

        /// <summary>
        /// The URL to redirect to after the consent request is completed.
        /// </summary>
        public required string ConsentUrl { get; set; }
    }
}
