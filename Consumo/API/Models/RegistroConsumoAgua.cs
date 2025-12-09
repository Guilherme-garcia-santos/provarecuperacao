namespace API.Models
{
    public class RegistroConsumoAgua
    {
        public Guid Id { get; set; }  // Alterado para GUID
        public string? Nome { get; set; }
        public double Peso { get; set; }
        public double ConsumoIdeal { get; set; }
        public string? Classificacao { get; set; }
        public DateTime CriadoEm { get; set; }
        public void CalcularConsumoIdeal()
        {
            ConsumoIdeal = Peso * 35;
            Classificacao = ConsumoIdeal switch
            {
                < 1500 => "Baixo consumo",
                >= 1500 and <= 2500 => "Consumo adequado",
                _ => "Alto consumo"
            };
        }
    }
}
