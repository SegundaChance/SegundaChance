// hooks/useProdutoForm.ts
import {
  cadastrarProduto,
  editarProduto,
  listarProdutoPorId,
} from "../api/produtoService";
import { useRouter } from "next/router";
import { erro, notificacao } from "@/utils/toast";
import { Usuario } from "@/types/usuarioInterface";
import { listarUsuario } from "../api/usuarioService";
import { Categoria } from "@/types/categoriaInterface";
import { ProdutoForm } from "@/types/produtoInterface";
import { listarCategoria } from "../api/categoriaService";
import { Localizacao } from "@/types/localizacaoInterface";
import { TipoProduto } from "@/types/tipoProdutoInterface";
import { listarTipoProduto } from "../api/tipoProdutoService";
import { listarLocalizacao } from "../api/localizacaoService";
import { useState, useEffect, useRef, ChangeEvent } from "react";

export function useProdutoForm() {
  const router = useRouter();
  const { id } = router.query;
  const telaEditar = !!id;

  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);
  const [arquivoImagem, setArquivoImagem] = useState<File | null>(null);

  const [listaTipos, setListaTipos] = useState<TipoProduto[]>([]);
  const [listaLocalizacoes, setListaLocalizacoes] = useState<Localizacao[]>([]);
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
  const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState<Categoria[]>(
    [],
  );

  const [valoresSelect, setValoresSelect] = useState<Record<string, string>>({
    tipo: "",
    categoria: "",
    localizacao: "",
    usuario: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const renderizarPreview = (url: string | null) => {
    if (!url) return "";
    if (url.startsWith("blob:")) return url;
    return url.startsWith("data:") ? url : `data:image/jpeg;base64,${url}`;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArquivoImagem(file);
      const imagemUrl = URL.createObjectURL(file);
      setPreview(imagemUrl);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setArquivoImagem(null);
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    async function carregarCombos() {
      try {
        const [tipos, categorias, localizacoes, usuarios] = await Promise.all([
          listarTipoProduto().catch(() => []),
          listarCategoria().catch(() => []),
          listarLocalizacao().catch(() => []),
          listarUsuario().catch(() => []),
        ]);

        setListaTipos(Array.isArray(tipos) ? tipos : []);
        setListaCategorias(Array.isArray(categorias) ? categorias : []);
        setListaLocalizacoes(Array.isArray(localizacoes) ? localizacoes : []);
        setListaUsuarios(Array.isArray(usuarios) ? usuarios : []);
      } catch (err) {
        console.error("Erro ao carregar dados dos selects:", err);
      }
    }

    carregarCombos();
  }, []);

  useEffect(() => {
    if (!valoresSelect.tipo || listaCategorias.length === 0) {
      setCategoriasFiltradas([]);
      return;
    }

    const categorias = listaCategorias.filter(
      (categoria) => categoria.tipoProdutoID === Number(valoresSelect.tipo),
    );

    setCategoriasFiltradas(categorias);
  }, [valoresSelect.tipo, listaCategorias]);

  useEffect(() => {
    async function carregarInformacoes() {
      if (!id) return;

      try {
        const produto = await listarProdutoPorId(id as string);

        setTitulo(produto.nomeProduto || "");
        setPreco(produto.preco || "");
        setDescricao(produto.descricao || "");
        setTamanho(produto.tamanho || (produto as any).Tamanho || "");

        const tipoSeguro =
          produto.tipoProdutoID ?? (produto as any).tipoProdutoId;
        const categoriaSegura =
          produto.categoriaID ?? (produto as any).categoriaId;
        const localizacaoSegura =
          produto.localizacaoID ?? (produto as any).localizacaoId;
        const usuarioSeguro = produto.usuarioID ?? (produto as any).usuarioId;

        setValoresSelect({
          tipo: tipoSeguro != null ? String(tipoSeguro) : "",
          categoria: categoriaSegura != null ? String(categoriaSegura) : "",
          localizacao:
            localizacaoSegura != null ? String(localizacaoSegura) : "",
          usuario: usuarioSeguro != null ? String(usuarioSeguro) : "",
        });

        if (produto.imagem) {
          setPreview(produto.imagem);
        } else if (produto.imagemUrl) {
          setPreview(produto.imagemUrl);
        }
      } catch (error) {
        erro("Erro ao carregar dados do produto");
      }
    }

    if (!router.isReady) return;
    if (telaEditar && listaCategorias.length > 0) {
      carregarInformacoes();
    }
  }, [router.isReady, id, listaCategorias.length, telaEditar]);

  const handleSelecionarOpcao = (campo: string, valor: string) => {
    setValoresSelect((prev) => {
      const novosValores = { ...prev, [campo]: valor };
      if (campo === "tipo") {
        novosValores.categoria = "";
      }
      return novosValores;
    });
  };

  async function salvarProduto(e: React.FormEvent) {
    e.preventDefault();

    if (telaEditar && !id) {
      erro("ID do produto não encontrado para edição.");
      return;
    }

    try {
      setCarregando(true);
      const dados: ProdutoForm = {
        nomeProduto: titulo,
        preco: preco,
        descricao: descricao,
        tamanho: tamanho,
        statusProduto: true,
        categoriaID: Number(valoresSelect.categoria) || 0,
        localizacaoID: Number(valoresSelect.localizacao) || 0,
        usuarioID: valoresSelect.usuario,
        tipoProdutoID: Number(valoresSelect.tipo) || 0,
        imagem: arquivoImagem,
      };

      if (
        !dados.categoriaID ||
        !dados.localizacaoID ||
        !dados.usuarioID ||
        !dados.tipoProdutoID
      ) {
        erro("Por favor, selecione todas as opções obrigatórias.");
        return;
      }

      if (telaEditar) {
        await editarProduto(String(id), dados);
        notificacao("Produto editado com sucesso!");
      } else {
        await cadastrarProduto(dados);
        notificacao("Produto cadastrado com sucesso!");
      }
      router.push("/home");
    } catch (error: any) {
      erro(error.message || "Erro ao salvar o produto.");
    } finally {
      setCarregando(false);
    }
  }

  return {
    telaEditar,
    formRef,
    titulo,
    setTitulo,
    preco,
    setPreco,
    descricao,
    setDescricao,
    tamanho,
    setTamanho,
    preview,
    carregando,
    listaTipos,
    listaLocalizacoes,
    listaUsuarios,
    categoriasFiltradas,
    valoresSelect,
    handleFileChange,
    handleRemoveImage,
    handleSelecionarOpcao,
    salvarProduto,
    renderizarPreview,
  };
}
