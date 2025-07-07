namespace smartbank.Server.Config
{
    public class SmartBankConfig
    {
        public required string AT22PlatformEndpoint { get; set; } = "https://platform.tt02.altinn.no/";

        public required string AT23PlatformEndpoint { get; set; } = "https://platform.tt02.altinn.no/";

        public required string AT24PlatformEndpoint { get; set; } = "https://platform.tt02.altinn.no/";

        public required string TT02PlatformEndpoint { get; set; } = "https://platform.tt02.altinn.no/";

        public required string MaskinportenTestEndpoint { get; set; }
    }
}
