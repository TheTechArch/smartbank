namespace smartbank.Server.Models.Consent
{
    public class ConsentRightBFF
    {
        public required string ResourceId { get; set; }

        public Dictionary<string,string> Metadata { get; set; } = new Dictionary<string, string>();

        public string Action { get; set; } = "consent";
    }
}
