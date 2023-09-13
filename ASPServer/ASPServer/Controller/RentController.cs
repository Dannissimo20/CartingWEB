using System.Net;
using System.Net.Mail;
using System.Text;
using ASPServer.Converters;
using CartingLibrary;
using CartingLibrary.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ASPServer
{
    [Route("rent")]
    [ApiController]
    public class RentController
    {
        private IRentRepository _rentRepository;
        private RentConverter _rentConverter;
        public RentController(IRentRepository rentRepository, RentConverter rentConverter)
        {
            _rentRepository = rentRepository;
            _rentConverter = rentConverter;
        }


        [HttpPost("add")]
        public Rent AddRent(RentModel rentModel)
        {
            var rent1 = _rentConverter.Convert(rentModel);
            _rentRepository.Add(rent1);
            CommitMessage(rent1, rent1.Client);
            foreach (var cart in rent1.Carts)
            {
                cart.Rents.Clear();
            }
            return rent1;
        }
        
        public static void CommitMessage(Rent rent, Client client)
        {
            var from = new MailAddress("mashinki_carting_center@mail.ru", "Картинг-центр Машинки");
            var to = new MailAddress(client.EMail, "Пользователь");

            var msg2 = new MailMessage(from, to);
            msg2.Subject = "Билет в картинг центр";
            msg2.Body = FillTable(rent, client);
            msg2.IsBodyHtml = true;
            using (var smtp = new SmtpClient("smtp.mail.ru", 587))
            {
                smtp.Credentials = new NetworkCredential("mashinki_carting_center@mail.ru", "0wLrmej5bMyxxPXPn6Rz");
                smtp.EnableSsl = true;
                smtp.Send(msg2);
            }
        }
        public static string FillTable(Rent rent, Client client)
        {
            var s = new StringBuilder("<h2 style = \"text-align:center;\"> Уважаемый(-ая) " + client.Surname + " " + client.Name + "! Благодарим вас за то,что выбрали наш картинг-центр.</h2>" + Environment.NewLine);
            s.Append("<div style = \"border:3px solid black;max-width:380px;margin:auto\">" + Environment.NewLine);
            s.Append("<h3 style = \"text-align:center; \">" + "Время начала: " + rent.StartTime + "</h3> " + Environment.NewLine);
            s.Append("<h3 style = \"text-align:center;\" >" + "Продолжительность: " + rent.Duration + "мин" + "</h3>");
            s.Append("<h3 style = \"text-align:center; \">" + "Количество человек: " + rent.CartCount + "</ h3 >");
            s.Append("<h3 style = \"text-align:center; \">" + "Сумма: " + rent.CartCount*rent.Duration*6.5 + " липовых листьев" + "</ h3 >");
            s.Append("<h3 style = \"text-align:center; \">" + "</ h3 >");
            return s.ToString();
        }
    }
}
