using CartingLibrary;
using CartingLibrary.Repository;

namespace ASPServer.Converters
{
    public class RentConverter
    {
        private ApplicationContext _context;
        private IClientRepository _clientRepository;
        private ICartRepository _cartRepository;
        public RentConverter(ApplicationContext context, IClientRepository clientRepository, ICartRepository cartRepository)
        {
            _context = context;
            _clientRepository = clientRepository;
            _cartRepository = cartRepository;
        }
        public Rent Convert(RentModel rentModel)
        {
            var client = _clientRepository.GetClientById(rentModel.clientID);
            DateTime start = DateTime.Parse(rentModel.startTime);
            IEnumerable<Cart> carts = _cartRepository.GetCartsRent(start,rentModel.duration);
            List<Cart> newCarts = null;
            newCarts=carts.Take(rentModel.cartCount).ToList();
            var rent1 = new Rent(start, rentModel.duration, rentModel.cartCount, client, rentModel.status, newCarts);
            return rent1;
        }
    }
}
