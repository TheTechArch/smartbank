namespace smartbank.Server.Models.Consent
{
    /// <summary>
    /// 
    /// </summary>
    public class ConsentRequestBff
    {
        public required string OfferedBy { get; set; }

        public string? OnBehalfOf { get; set; }

        public required List<ConsentRightBFF> consentRightBFFs { get; set; } = new List<ConsentRightBFF>();

        public string RequestMessage { get; set; } = string.Empty;


        public string Environment { get; set; } = "at22";
    }
}
