using CartingLibrary;
using Microsoft.EntityFrameworkCore;

namespace ASPServer.Converters
{
    public class OrderConverter
    {
        private readonly ApplicationContext _context;
        public OrderConverter(ApplicationContext context)
        {
            _context = context;
        }
        public OrderModel Convert(Order order)
        {
            /*if(order.Track == null)
                _context.Track.Load();*/
            Race race = _context.Race.First(r => r.Order.ID == order.ID);
            var maxSpeed = race.MaxSpeed;
            var bestLap = race.BestLap;
            var time = order.StartTime.ToString("t");
            var date = order.StartTime.ToString("d");
            OrderModel orderModel = new OrderModel(order.ID, date, time, order.Duration, order.CartCount, order.TrackID, maxSpeed, bestLap);
            return orderModel;
        }
        public IEnumerable<OrderModel> Convert(IEnumerable<Order> orders)
        {
            return orders.ToList().Select(Convert);
        }
    }
}
