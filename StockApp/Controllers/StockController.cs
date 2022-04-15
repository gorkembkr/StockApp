using Microsoft.AspNetCore.Mvc;
using StockApp.Model;
using StockApp.Services;

namespace StockApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly StockService _stockService;

        public StockController(StockService stockService) =>
            _stockService = stockService;

        [HttpGet]
        public async Task<List<Stock>> Get() =>
            await _stockService.GetsAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Stock>> Get(string id)
        {
            var stock = await _stockService.GetAsync(id);

            if (stock is null)
            {
                return NotFound();
            }

            return stock;
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Stock updateStock)
        {
            var stock = await _stockService.GetAsync(id);

            if (stock is null)
            {
                return NotFound();
            }
            updateStock.Id = stock.Id;

            await _stockService.UpdateASync(id, updateStock);

            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var stock = await _stockService.GetAsync(id);

            if (stock is null)
            {
                return NotFound();
            }

            await _stockService.DeleteAsync(id);

            return NoContent();
        }

    }
}
/*
https://bidb.itu.edu.tr/seyir-defteri/blog/2013/09/06/c-ta-i-stisnai-durum-y%C3%B6netimi-(exception-handling)
https://dzone.com/articles/crud-operations-using-aspnet-web-api-mongodb-and-a
https://www.netjstech.com/2021/01/angulat-httpclient-communicate-with-backend-service.html
https://www.youtube.com/watch?v=1iDIZ27bhPg&ab_channel=TarikGuney
 */
