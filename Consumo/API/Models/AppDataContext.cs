using Microsoft.EntityFrameworkCore;
using ConsumoDeAguaAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace ConsumoDeAguaAPI.Data
{
    public class AppDataContext : DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) { }

        public DbSet<RegistroConsumoAgua> RegistrosConsumo { get; set; }
    }
}
