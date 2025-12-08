using ConsumoDeAguaAPI.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Configure o banco de dados SQLite
builder.Services.AddDbContext<AppDataContext>(options =>
    options.UseSqlite("Data Source=consumo_de_agua.db"));

var app = builder.Build();

// Configure o pipeline de requisição
app.MapPost("/api/consumo/cadastrar", async (AppDataContext db, RegistroConsumoAgua consumo) =>
{
    consumo.CalcularConsumoIdeal();
    consumo.CriadoEm = DateTime.Now;
    db.RegistrosConsumo.Add(consumo);
    await db.SaveChangesAsync();
    return Results.Created($"/api/consumo/{consumo.Id}", consumo.Id);
});

app.MapGet("/api/consumo/listar", async (AppDataContext db) =>
    await db.RegistrosConsumo.ToListAsync());

app.MapGet("/api/consumo/listarporstatus/{classificacao}", async (AppDataContext db, string classificacao) =>
{
    return await db.RegistrosConsumo.Where(c => c.Classificacao.ToLower() == classificacao.ToLower()).ToListAsync();
});

app.MapPut("/api/consumo/alterar/{id}", async (AppDataContext db, int id, RegistroConsumoAgua consumoAtualizado) =>
{
    var consumo = await db.RegistrosConsumo.FindAsync(id);
    if (consumo == null)
    {
        return Results.NotFound();
    }
    
    consumo.Peso = consumoAtualizado.Peso;
    consumo.CalcularConsumoIdeal();
    
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

