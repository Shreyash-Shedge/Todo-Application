using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TodoApplicationAPI.BLL.Interfaces;
using TodoApplicationAPI.BLL.Repositories;
using TodoApplicationAPI.BLL.Services;
using TodoApplicationAPI.Data;
using TodoApplicationAPI.Models;

namespace TodoApplicationAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();


            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultSQLConnection")));


            builder.Services.AddScoped<ApplicationDbContext>();

            // Register PasswordHasher<User> explicitly
            builder.Services.AddScoped<PasswordHasher<User>>();


            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            builder.Services.AddScoped<ITodoService, TodoService>();
            builder.Services.AddScoped<ITodoRepository, TodoRepository>();


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactCORS", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.UseCors("ReactCORS");

            app.UseHttpsRedirection();


            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
