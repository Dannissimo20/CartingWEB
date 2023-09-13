namespace ASPServer
{
    public class AchievmentModel
    {
        public int Track { get; set; }
        public string BestLap { get; set; }
        public int MaxSpeed { get; set; }
        public string DateBestLap { get; set; }
        public string DateMaxSpeed { get; set; }

        public AchievmentModel() { }
        public AchievmentModel(int track, string bestLap, int maxSpeed, string dateBestLap, string dateMaxSpeed)
        {
            this.Track = track;
            this.BestLap = bestLap;
            this.MaxSpeed = maxSpeed;
            this.DateBestLap = dateBestLap;
            this.DateMaxSpeed = dateMaxSpeed;
        }
    }
}
