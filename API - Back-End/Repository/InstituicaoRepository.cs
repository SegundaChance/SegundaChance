using ReHope.Contexts;
using ReHope.Domains;
using ReHope.Interfaces;

namespace ReHope.Repository
{
    public class InstituicaoRepository : IInstituicaoRepository
    {
        private readonly SegundaChanceContext _context;

        public InstituicaoRepository(SegundaChanceContext context)
        {
            _context = context;
        }

        public List<Instituicao> ListarInstituicao()
        {
            return _context.Instituicao.ToList();
        }

        // Corrigido: Agora retorna Instituicao? em vez de List<Instituicao>
        public Instituicao? ObterPorId(int id)
        {
            return _context.Instituicao.FirstOrDefault(i => i.InstituicaoID == id);
        }

        public Instituicao? BuscarPorNome(string nomeInsituicao)
        {
            return _context.Instituicao.FirstOrDefault(i => i.NomeInstituicao.ToLower() == nomeInsituicao.ToLower());
        }

        public bool NomeInstituicaoExiste(string nome, int? InstituicaoIdAtual = null)
        {
            var consulta = _context.Instituicao.AsQueryable();

            if (InstituicaoIdAtual.HasValue)
            {
                consulta = consulta.Where(i => i.InstituicaoID != InstituicaoIdAtual.Value);
            }

            return consulta.Any(i => i.NomeInstituicao.ToLower() == nome.ToLower());
        }

        public void Adicionar(Instituicao instituicao)
        {
            _context.Instituicao.Add(instituicao);
            _context.SaveChanges();
        }

        public void Atualizar(Instituicao instituicao)
        {
            if (instituicao == null)
            {
                return;
            }

            var existente = _context.Instituicao.Find(instituicao.InstituicaoID);
            if (existente == null)
            {
                return;
            }

            existente.NomeInstituicao = instituicao.NomeInstituicao;
            _context.SaveChanges();
        }

        public void Remover(int id)
        {
            Instituicao? instituicao = _context.Instituicao.FirstOrDefault(i => i.InstituicaoID == id);

            if (instituicao == null)
            {
                return;
            }

            _context.Instituicao.Remove(instituicao);
            _context.SaveChanges();
        }
    }
}