using ReHope.Domains;
using ReHope.DTOs.ProdutoDto;

namespace ReHope.Applications.Conversoes
{
    public class ConverterProdutoParaDto
    {
        public static LerProdutoDto ConverterParaDto(Produto produto)
        {
            return new LerProdutoDto()
            {
                ProdutoID = produto.ProdutoID,
                NomeProduto = produto.NomeProduto,
                Preco = produto.Preco,
                Descricao = produto.Descricao,
                Codigo = produto.Codigo,
                Tamanho = produto.Tamanho,
                StatusProduto = produto.StatusProduto,
                CategoriaID = produto.CategoriaID,
                LocalizacaoID = produto.LocalizacaoID,
                UsuarioID = produto.UsuarioID,

                // Atribuição direta da URL da imagem
                Imagem = produto.Imagem,

                TipoProdutoID = produto.Categoria != null ? produto.Categoria.TipoProdutoID : 0
            };
        }
    }
}