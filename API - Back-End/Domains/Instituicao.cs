using System;
using System.Collections.Generic;

namespace ReHope.Domains;

public partial class Instituicao
{
    public int InstituicaoID { get; set; }

    public string NomeInstituicao { get; set; } = null!;

    public DateOnly MesInstituicao { get; set; }

    public string Missao { get; set; } = null!;

    public byte[] LogoInstituicao { get; set; } = null!;
}
