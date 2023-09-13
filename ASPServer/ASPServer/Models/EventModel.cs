namespace ASPServer
{
    public class EventModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int Track { get; set; }

        public EventModel() { }
        public EventModel(int Id, string name, string description, string startDate, string endDate, int track)
        {
            ID = Id;
            Name = name;
            Description = description;
            StartDate = startDate;
            EndDate = endDate;
            Track = track;
        }
    }
}
