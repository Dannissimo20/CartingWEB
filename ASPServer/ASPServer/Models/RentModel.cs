namespace ASPServer
{
    public class RentModel
    {
        public string startTime { get; set; }
        public int duration { get; set; }
        public int cartCount { get; set; }
        public int clientID { get; set; }
        public string status { get; set; }

        public RentModel() { }
        public RentModel(string startTime, int duration, int cartCount, int clientID, string status)
        {
            this.startTime = startTime;
            this.duration = duration;
            this.cartCount = cartCount;
            this.clientID = clientID;
            this.status = status;
        }
    }
}
