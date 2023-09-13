using ASPServer.Converters;
using CartingLibrary.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASPServer
{
    [Route("history")]
    [ApiController]
    [Authorize]
    public class HistoryController
    {
        private readonly IHistoryRepository _historyRepository;
        private readonly OrderConverter _orderConverter;
        public HistoryController(IHistoryRepository historyRepository, OrderConverter orderConverter)
        {
            _historyRepository = historyRepository;
            _orderConverter = orderConverter;
        }
    
        [HttpGet("get")]
        public IEnumerable<OrderModel> GetHistory()
        {
            return _orderConverter.Convert(_historyRepository.GetHistory());
        }
    }
}
