using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace StockApp.Model
{
    public class Stock
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = null!;

        public string description { get; set; } = null!;

        public string displaySymbol { get; set; } = null!;

        public string currency { get; set; } = null!;

        public string type { get; set; } = null!;

        public string figi { get; set; } = null!;
        public string isin { get; set; } = null!;
        public string mic { get; set; } = null!;
        public string shareClassFIGI { get; set; } = null!;

        public string symbol { get; set; } = null!;
        public string symbol2 { get; set; } = null!;
    }
}