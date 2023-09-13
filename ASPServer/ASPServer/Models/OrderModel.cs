namespace ASPServer
{
    public class OrderModel
    {
        public int id { get; set; }
        public string date { get; set; }
        public string time { get; set; }
        public int duration { get; set; }
        public int cartCount { get; set; }
        public int trackID { get; set; }
        public int maxSpeed { get; set; }
        public TimeSpan bestLap { get; set; }


        public OrderModel(int id, string date, string time, int duration, int cartCount, int trackID, int maxSpeed, TimeSpan bestLap)
        {
            this.id = id;
            this.date = date;
            this.time = time;
            this.duration = duration;
            this.cartCount = cartCount;
            this.trackID = trackID;
            this.maxSpeed = maxSpeed;
            this.bestLap = bestLap;
        }
    }
}
