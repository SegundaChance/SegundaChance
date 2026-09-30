using ReHope.Domains;

namespace ReHope.Interfaces
{
    public interface IInstituicaoRepository
    {
        List<Instituicao> ListarInstituicao();

        Instituicao? ObterPorId(int id);

        Instituicao? BuscarPorNome(string nomeInsituicao);

        bool NomeInstituicaoExiste(string nome, int? InstituicaoIdAtual = null);

        void Adicionar(Instituicao instituicao);

        void Atualizar(Instituicao instituicao);

        void Remover(int id);
    }
}
