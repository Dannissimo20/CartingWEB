using System.Net;
using System.Net.Mail;
using System.Text;
using ASPServer.Converters;
using CartingLibrary;
using CartingLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ASPServer
{
    [Route("event")]
    [ApiController]
    public class EventController
    {
        private IEventRepository _eventRepository;
        private EventConverter _eventConverter;
        private IClientRepository _clientRepository;
        public EventController(IEventRepository eventRepository, EventConverter eventConverter, IClientRepository clientRepository)
        {
            _eventRepository = eventRepository;
            _eventConverter = eventConverter;
            _clientRepository = clientRepository;
        }
        
        [HttpGet("get")]
        public IEnumerable<EventModel> GetEvents()
        {
            IEnumerable<Event> ev = _eventRepository.GetActiveEvents();
            return _eventConverter.Convert(ev);
        }
        
        [HttpPost("add")]
        public Event AddMemberToEvent(EventModel eventModel)
        {
            var client = _clientRepository.GetClientById(101);
            var ev = _eventRepository.GetEventById(eventModel.ID);
            ev.Members.Add(client);
            ev.MemberCount++;
            ev.EndDate.AddHours(12);
            _eventRepository.Save();
            CommitMessage(ev, client);
            ev.Members.Clear();
            return ev;
        }
        
        public static void CommitMessage(Event ev, Client client)
        {
            var from = new MailAddress("mashinki_carting_center@mail.ru", "Картинг-центр Машинки");
            var to = new MailAddress(client.EMail, "Пользователь");

            var msg2 = new MailMessage(from, to);
            msg2.Subject = "Соревнования в картинг-центре";
            msg2.Body = FillTable(ev, client);
            msg2.IsBodyHtml = true;
            using (var smtp = new SmtpClient("smtp.mail.ru", 587))
            {
                smtp.Credentials = new NetworkCredential("mashinki_carting_center@mail.ru", "0wLrmej5bMyxxPXPn6Rz");
                smtp.EnableSsl = true;
                smtp.Send(msg2);
            }
        }
        public static string FillTable(Event ev, Client client)
        {
            var s = new StringBuilder("<h2 style = \"text-align:center;\"> Уважаемый(-ая) " + client.Surname + " " + client.Name + "! Вы записаны на соревнование \""+ ev.Name + "\" проходящее в картинг-центре \"Машинки\"</h2>" + Environment.NewLine);
            s.Append("<div style = \"border:3px solid black;max-width:380px;margin:auto\">" + Environment.NewLine);
            s.Append("<h3 style = \"text-align:center; \">" + "Дата проведения: " + ev.EndDate + "</h3> " + Environment.NewLine);
            s.Append("<h3 style = \"text-align:center;\" >" + "Трасса: " + ev.TrackID + "</h3>");
            s.Append("<h3 style = \"text-align:center; \">" + "</ h3 >");
            return s.ToString();
        }
    }
}
