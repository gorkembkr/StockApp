using MongoDB.Driver;
using Microsoft.Extensions.Options;
using StockApp.Model;


namespace StockApp.Services
{
    public class StockService
    {
        private readonly IMongoCollection<Stock> stocks;
        public StockService(IOptions<StockStoreDatabaseSettings> stockStoreDatabaseSettings)
        {   
            var mongoClient = new MongoClient(
                stockStoreDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(stockStoreDatabaseSettings.Value.DataBaseName);

            stocks = mongoDatabase.GetCollection<Stock>(stockStoreDatabaseSettings.Value.CompanyColletionName);
        }
        public async Task<List<Stock>> GetsAsync() =>

            await stocks.Find(_ => true).ToListAsync();
        public async Task<Stock?> GetAsync(string id) =>
       await stocks.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateASync(string id, Stock updateStock) =>
           await stocks.ReplaceOneAsync(x => x.Id == id, updateStock);

        public async Task DeleteAsync(string id) =>
            await stocks.DeleteOneAsync(x => x.Id == id);
    }
}