using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ASPServer.Converters;
using CartingLibrary;
using CartingLibrary.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ASPServer
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IClientRepository _clientRepository;
        private readonly ClientConverter _clientConverter;
        public AuthController(IClientRepository clientRepository, ClientConverter clientConverter)
        {
            _clientRepository = clientRepository;
            _clientConverter = clientConverter;
        }
        [HttpPost("signin")]
        public IActionResult Login(LoginModel login)
        {
            var client1 = _clientRepository.GetClientAuth(login.phone,login.password);
            var claims = new List<Claim> {new Claim(ClaimTypes.Name, client1.PhoneNumber) };
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromHours(2)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var clientModel = _clientConverter.Convert(client1);
            return Ok(new {
                status = true,
                access_token = encodedJwt,
                user = clientModel
            });
        }

        [HttpPost("signup")]
        public IActionResult SignUp(SignUpModel model)
        {
            var client = new Client(model.lastname, model.firstname,model.middlename,model.phone,model.email,model.password);
            _clientRepository.Add(client);
            var claims = new List<Claim> {new Claim(ClaimTypes.Name, client.PhoneNumber) };
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromHours(2)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var clientModel = _clientConverter.Convert(client);
            return Ok(new {
                status = true,
                access_token = encodedJwt,
                user = clientModel
            });
        }
    }
}
