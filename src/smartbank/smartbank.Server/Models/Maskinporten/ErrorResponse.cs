﻿using System.Text.Json.Serialization;

namespace smartbank.Server.Models.Maskinporten
{
    /// <summary>
    /// An error from Maskinporten
    /// </summary>
    public class ErrorReponse
    {
        /// <summary>
        /// The type of error
        /// </summary>
        [JsonPropertyName("error")]
        public string ErrorType { get; set; }
        
        /// <summary>
        /// Description of the error
        /// </summary>
        [JsonPropertyName("error_description")]
        public string Description { get; set; }

    }
}
