using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ReHope.Migrations
{
    /// <inheritdoc />
    public partial class InitialPostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Instituicao",
                columns: table => new
                {
                    InstituicaoID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NomeInstituicao = table.Column<string>(type: "character varying(100)", unicode: false, maxLength: 100, nullable: false),
                    MesInstituicao = table.Column<DateOnly>(type: "date", nullable: false),
                    Missao = table.Column<string>(type: "text", unicode: false, nullable: false),
                    LogoInstituicao = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Institui__5FC566D0E8D53A9E", x => x.InstituicaoID);
                });

            migrationBuilder.CreateTable(
                name: "Localizacao",
                columns: table => new
                {
                    LocalizacaoID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NomeLocalizacao = table.Column<string>(type: "character varying(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Localiza__83ABDECAFA82414E", x => x.LocalizacaoID);
                });

            migrationBuilder.CreateTable(
                name: "TipoProduto",
                columns: table => new
                {
                    TipoProdutoID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NomeTipo = table.Column<string>(type: "character varying(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TipoProd__99B538EBC98FB7DA", x => x.TipoProdutoID);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    UsuarioID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Senha = table.Column<byte[]>(type: "bytea", maxLength: 32, nullable: false),
                    Telefone = table.Column<string>(type: "character varying(15)", unicode: false, maxLength: 15, nullable: false),
                    StatusUsuario = table.Column<bool>(type: "boolean", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuario__2B3DE798909CA0B3", x => x.UsuarioID);
                });

            migrationBuilder.CreateTable(
                name: "Categoria",
                columns: table => new
                {
                    CategoriaID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NomeCategoria = table.Column<string>(type: "character varying(100)", unicode: false, maxLength: 100, nullable: false),
                    TipoProdutoID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Categori__F353C1C519739161", x => x.CategoriaID);
                    table.ForeignKey(
                        name: "FK_Categoria_TipoProduto",
                        column: x => x.TipoProdutoID,
                        principalTable: "TipoProduto",
                        principalColumn: "TipoProdutoID");
                });

            migrationBuilder.CreateTable(
                name: "Produto",
                columns: table => new
                {
                    ProdutoID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    NomeProduto = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Preco = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    Descricao = table.Column<string>(type: "text", nullable: false),
                    Codigo = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Tamanho = table.Column<string>(type: "character varying(100)", unicode: false, maxLength: 100, nullable: true),
                    StatusProduto = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CategoriaID = table.Column<int>(type: "integer", nullable: false),
                    LocalizacaoID = table.Column<int>(type: "integer", nullable: false),
                    UsuarioID = table.Column<Guid>(type: "uuid", nullable: false),
                    Imagem = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Produto__9C8800C3EB326883", x => x.ProdutoID);
                    table.UniqueConstraint("AK_Produto_Codigo", x => x.Codigo);
                    table.ForeignKey(
                        name: "FK_Produto_Categoria",
                        column: x => x.CategoriaID,
                        principalTable: "Categoria",
                        principalColumn: "CategoriaID");
                    table.ForeignKey(
                        name: "FK_Produto_Localizacao",
                        column: x => x.LocalizacaoID,
                        principalTable: "Localizacao",
                        principalColumn: "LocalizacaoID");
                    table.ForeignKey(
                        name: "FK_Produto_Usuario",
                        column: x => x.UsuarioID,
                        principalTable: "Usuario",
                        principalColumn: "UsuarioID");
                });

            migrationBuilder.CreateTable(
                name: "LogProduto",
                columns: table => new
                {
                    LogProdutoID = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    DataAlteracao = table.Column<DateTime>(type: "timestamp(0) with time zone", precision: 0, nullable: false),
                    NomeAnterior = table.Column<string>(type: "character varying(100)", unicode: false, maxLength: 100, nullable: false),
                    PrecoAnterior = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    StatusProduto = table.Column<bool>(type: "boolean", nullable: false),
                    ProdutoID = table.Column<Guid>(type: "uuid", nullable: false),
                    Codigo = table.Column<int>(type: "integer", nullable: false),
                    LocalizacaoIDAnterior = table.Column<int>(type: "integer", nullable: false),
                    UsuarioID = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LogProdu__C4788A9B863C7024", x => x.LogProdutoID);
                    table.ForeignKey(
                        name: "FK_LogProduto_Codigo",
                        column: x => x.Codigo,
                        principalTable: "Produto",
                        principalColumn: "Codigo");
                    table.ForeignKey(
                        name: "FK_LogProduto_Localizacao",
                        column: x => x.LocalizacaoIDAnterior,
                        principalTable: "Localizacao",
                        principalColumn: "LocalizacaoID");
                    table.ForeignKey(
                        name: "FK_LogProduto_Produto",
                        column: x => x.ProdutoID,
                        principalTable: "Produto",
                        principalColumn: "ProdutoID");
                    table.ForeignKey(
                        name: "FK_LogProduto_Usuario",
                        column: x => x.UsuarioID,
                        principalTable: "Usuario",
                        principalColumn: "UsuarioID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categoria_TipoProdutoID",
                table: "Categoria",
                column: "TipoProdutoID");

            migrationBuilder.CreateIndex(
                name: "UQ__Categori__98459A0B1CDEB0E8",
                table: "Categoria",
                column: "NomeCategoria",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Localiza__76AA639A437A6B27",
                table: "Localizacao",
                column: "NomeLocalizacao",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LogProduto_Codigo",
                table: "LogProduto",
                column: "Codigo");

            migrationBuilder.CreateIndex(
                name: "IX_LogProduto_LocalizacaoIDAnterior",
                table: "LogProduto",
                column: "LocalizacaoIDAnterior");

            migrationBuilder.CreateIndex(
                name: "IX_LogProduto_ProdutoID",
                table: "LogProduto",
                column: "ProdutoID");

            migrationBuilder.CreateIndex(
                name: "IX_LogProduto_UsuarioID",
                table: "LogProduto",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_CategoriaID",
                table: "Produto",
                column: "CategoriaID");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_LocalizacaoID",
                table: "Produto",
                column: "LocalizacaoID");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_UsuarioID",
                table: "Produto",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "UQ__Produto__06370DAC5DD0E397",
                table: "Produto",
                column: "Codigo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__TipoProd__7859A10A1A13AD1E",
                table: "TipoProduto",
                column: "NomeTipo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Usuario__4EC504B65A86C5C3",
                table: "Usuario",
                column: "Telefone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Usuario__A9D105342317C405",
                table: "Usuario",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Instituicao");

            migrationBuilder.DropTable(
                name: "LogProduto");

            migrationBuilder.DropTable(
                name: "Produto");

            migrationBuilder.DropTable(
                name: "Categoria");

            migrationBuilder.DropTable(
                name: "Localizacao");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "TipoProduto");
        }
    }
}
