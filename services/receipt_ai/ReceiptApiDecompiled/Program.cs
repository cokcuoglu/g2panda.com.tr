using System;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;
using ReceiptApi.Data;
using ReceiptApi.Services;

[CompilerGenerated]
internal class Program
{
	private static void _003CMain_003E_0024(string[] args)
	{
		WebApplicationBuilder webApplicationBuilder = WebApplication.CreateBuilder(args);
		webApplicationBuilder.Services.AddControllers().AddJsonOptions(delegate(JsonOptions options)
		{
			options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
		});
		webApplicationBuilder.Services.AddEndpointsApiExplorer();
		OpenApiServiceCollectionExtensions.AddOpenApi(webApplicationBuilder.Services);
		webApplicationBuilder.Services.AddSingleton<ValidationEngine>();
		webApplicationBuilder.Services.AddSingleton<OcrParserService>();
		string connectionString = webApplicationBuilder.Configuration.GetConnectionString("DefaultConnection") ?? "Host=localhost;Database=receipt_db;Username=postgres;Password=password;";
		EntityFrameworkServiceCollectionExtensions.AddDbContext<ReceiptDbContext>(webApplicationBuilder.Services, (Action<DbContextOptionsBuilder>)delegate(DbContextOptionsBuilder options)
		{
			NpgsqlDbContextOptionsBuilderExtensions.UseNpgsql(options, connectionString, (Action<NpgsqlDbContextOptionsBuilder>)null);
		}, ServiceLifetime.Scoped, ServiceLifetime.Scoped);
		string workerUrl = webApplicationBuilder.Configuration.GetValue<string>("WorkerBaseUrl") ?? "http://localhost:8000";
		webApplicationBuilder.Services.AddHttpClient("PythonWorker", delegate(HttpClient client)
		{
			client.BaseAddress = new Uri(workerUrl);
		});
		WebApplication webApplication = webApplicationBuilder.Build();
		if (webApplication.Environment.IsDevelopment() || webApplication.Environment.IsProduction())
		{
			OpenApiEndpointRouteBuilderExtensions.MapOpenApi((IEndpointRouteBuilder)webApplication, "/openapi/{documentName}.json");
		}
		webApplication.MapControllers();
		webApplication.Run();
	}
}
