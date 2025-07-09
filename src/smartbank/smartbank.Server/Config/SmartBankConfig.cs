namespace smartbank.Server.Config
{
    public class SmartBankConfig
    {
        public required string AT22PlatformEndpoint { get; set; } = "https://platform.at22.altinn.cloud/";

        public required string AT23PlatformEndpoint { get; set; } = "https://platform.at23.altinn.cloud/";

        public required string AT24PlatformEndpoint { get; set; } = "https://platform.at24.altinn.cloud/";

        public required string TT02PlatformEndpoint { get; set; } = "https://platform.tt02.altinn.no/";

        public required string MaskinportenTestEndpoint { get; set; }
    }
}
