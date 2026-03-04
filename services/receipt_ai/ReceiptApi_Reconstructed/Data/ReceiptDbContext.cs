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
		modelBuilder.Entity<ReceiptEntity>().Property(r => r.ParsedJson).HasColumnType("jsonb");
		modelBuilder.Entity<ReceiptEntity>().HasIndex(r => r.BusinessId);
		modelBuilder.Entity<ReceiptEntity>().HasIndex(r => r.Status);
	}
}
