using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ReceiptApi.Data;
using ReceiptApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Register our services including the reinstated Grammar parser
builder.Services.AddSingleton<ValidationEngine>();
builder.Services.AddSingleton<GrammarBasedOcrParser>();
builder.Services.AddSingleton<OcrParserService>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Host=localhost;Database=receipt_db;Username=postgres;Password=password;";
builder.Services.AddDbContext<ReceiptDbContext>(options => options.UseNpgsql(connectionString));

var workerUrl = builder.Configuration.GetValue<string>("WorkerBaseUrl") ?? "http://localhost:8000";
builder.Services.AddHttpClient("PythonWorker", client => {
    client.BaseAddress = new Uri(workerUrl);
});

var app = builder.Build();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.MapOpenApi();
}

app.MapControllers();
app.Run();
