using System;
using System.Linq.Expressions;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace ReceiptApi.Data;

public class ReceiptDbContext : DbContext
{
	public DbSet<ReceiptEntity> Receipts { get; set; }

	public ReceiptDbContext(DbContextOptions<ReceiptDbContext> options)
		: base((DbContextOptions)(object)options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		RelationalPropertyBuilderExtensions.HasColumnType<JsonDocument>(modelBuilder.Entity<ReceiptEntity>().Property<JsonDocument>((Expression<Func<ReceiptEntity, JsonDocument>>)((ReceiptEntity r) => r.ParsedJson)), "jsonb");
		modelBuilder.Entity<ReceiptEntity>().HasIndex((Expression<Func<ReceiptEntity, object>>)((ReceiptEntity r) => r.BusinessId));
		modelBuilder.Entity<ReceiptEntity>().HasIndex((Expression<Func<ReceiptEntity, object>>)((ReceiptEntity r) => r.Status));
	}
}
