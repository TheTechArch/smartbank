﻿namespace smartbank.Server.Models.ResourceRegistry
{
    /// <summary>
    /// Model for defining keywords
    /// </summary>
    public class Keyword
    {
        /// <summary>
        /// The key word
        /// </summary>
        public string Word { get; set; } 

        /// <summary>
        /// Language of the key word
        /// </summary>
        public string Language { get; set; }
    }
}
