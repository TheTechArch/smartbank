using smartbank.Server.Clients;
using smartbank.Server.Clients.Interface;
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

//// Enable CORS
app.UseCors();

//// Enable CORS
app.UseCors();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

void ConfigureServices(IServiceCollection services, IConfiguration config)
{

    services.AddHttpClient<IResourceRegistryClient, ResourceRegistryClient>();
    services.AddTransient<IResourceRegistry, ResourceRegistryService>();
    services.AddControllers();
    services.AddOpenApi();
    services.AddMemoryCache();

    // Add other necessary services here
}