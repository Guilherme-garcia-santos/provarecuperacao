using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);
var app = builder.Build();



app.MapPost("/api/consumo/cadastrarteste", async (AppDataContext db, [FromBody] RegistroConsumoAgua consumo) =>
{
    consumo.CalcularConsumoIdeal();
    consumo.CriadoEm = DateTime.Now;
    db.RegistrosConsumo.Add(consumo);
    await db.SaveChangesAsync();
    return Results.Created("", consumo);
});

app.MapPost("/api/consumo/cadastrar", async (AppDataContext db, [FromBody] RegistroConsumoAgua consumo) =>
{
    if (consumo == null)
    {
        return Results.BadRequest("O corpo da requisição está vazio ou inválido.");
    }

    consumo.CalcularConsumoIdeal();
    consumo.CriadoEm = DateTime.Now;

    db.RegistrosConsumo.Add(consumo);
    await db.SaveChangesAsync();

    return Results.Created($"/api/consumo/cadastrar/{consumo.Id}", consumo);
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
app.UseCors("Acesso Total");
app.Run();

