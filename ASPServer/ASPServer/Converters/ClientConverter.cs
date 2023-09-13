using CartingLibrary;

namespace ASPServer.Converters
{
    public class ClientConverter
    {
        public ClientModel Convert(Client client)
        {
            return new ClientModel(client.ID,
                client.Surname,
                client.Name,
                client.MiddleName,
                client.EMail,
                client.PhoneNumber);
        }
    }
}
