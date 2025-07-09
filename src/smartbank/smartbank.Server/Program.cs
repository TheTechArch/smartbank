using smartbank.Server.Clients;
using smartbank.Server.Clients.Interface;
using smartbank.Server.Config;
using smartbank.Server.Services;
using smartbank.Server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.UseCors();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();

void ConfigureServices(IServiceCollection services, IConfiguration config)
{

    string[] allowedOrigins = new[]
{   "https://localhost:51442",
    "https://mydevsite.local",
    // Add more as needed
};

    // Add CORS support
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // Allow cookies!
        });
    });
    services.Configure<MaskinportenConfig>(config.GetSection("Maskinporten"));
    services.Configure<ConsentConfig>(config.GetSection("Consent"));
    services.AddHttpClient<IResourceRegistryClient, ResourceRegistryClient>();
    services.AddHttpClient<IMaskinportenClient, MaskinportenClient>();
    services.AddTransient<IResourceRegistry, ResourceRegistryService>();
    services.AddControllers();
    services.AddOpenApi();
    services.AddMemoryCache();



    // Add other necessary services here
}