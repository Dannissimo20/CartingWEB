using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ASPServer;
using ASPServer.Converters;
using CartingLibrary.Repository;
using CartingLibrary.Services;
using CartingLibrary;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddCors();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = AuthOptions.ISSUER,
        ValidateAudience = true,
        ValidAudience = AuthOptions.AUDIENCE,
        ValidateLifetime = true,
        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
        ValidateIssuerSigningKey = true
    };
});

var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationContext>(ac => ac.UseNpgsql(connection));
builder.Services.AddTransient<IHistoryRepository, HistoryService>();
builder.Services.AddTransient<IClientRepository, ClientService>();
builder.Services.AddTransient<IRaceRepository, RaceService>();
builder.Services.AddTransient<ITrackRepository, TrackService>();
builder.Services.AddTransient<IEventRepository, EventService>();
builder.Services.AddTransient<ICartRepository, CartService>();
builder.Services.AddTransient<IRentRepository, RentService>();
builder.Services.AddTransient<OrderConverter>();
builder.Services.AddTransient<EventConverter>();
builder.Services.AddTransient<ClientConverter>();
builder.Services.AddTransient<RentConverter>();

var app = builder.Build();
app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials());
app.UseRouting();
app.UseAuthentication().UseAuthorization();
app.UseEndpoints(e => e.MapControllers());


app.Run();