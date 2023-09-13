using CartingLibrary;
using Microsoft.EntityFrameworkCore;

namespace ASPServer.Converters
{
    public class EventConverter
    {
        private readonly ApplicationContext _context;
        public EventConverter(ApplicationContext context)
        {
            _context = context;
        }
        public EventModel Convert(Event e)
        {
            /*if(e.Track == null)
                _context.Track.AsQueryable().Where(t => t.ID == e.Track.ID).Load();*/
            EventModel evTemp = new EventModel(e.ID,e.Name, e.Description, e.GetStartDate, e.GetEndDate, e.TrackID);
            return evTemp;
        }
        public IEnumerable<EventModel> Convert(IEnumerable<Event> events)
        {
            return events.ToList().Select(Convert);
        }
    }
}
