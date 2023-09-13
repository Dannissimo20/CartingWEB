namespace ASPServer
{
    public class ClientModel
    {
        public int id { get; set; }
        public string lastName { get; set; }
        public string firstName { get; set; }
        public string? middleName { get; set; }
        public string phone { get; set; }
        public string email { get; set; }

        public ClientModel(int id, string lastName, string firstName, string? middleName, string email, string phone)
        {
            this.id = id;
            this.lastName = lastName;
            this.firstName = firstName;
            this.middleName = middleName;
            this.email = email;
            this.phone = phone;
        }
    }
}
