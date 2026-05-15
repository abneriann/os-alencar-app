import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext(null);

const CHAVE_ESTOQUE = '@os-alencar:estoque';
const CHAVE_CARRINHO = '@os-alencar:carrinho';

const produtosIniciais = [
  {
    id: 'tradicional',
    nome: 'Pão de Queijo Tradicional',
    preco: 7.5,
    quantidade: 20,
    descricao: 'Crocante por fora, macio por dentro. Receita clássica da casa.'
  },
  {
    id: 'recheado',
    nome: 'Pão de Queijo Recheado',
    preco: 9.9,
    quantidade: 15,
    descricao: 'Sabor intenso com recheio cremoso. Perfeito para surpreender.'
  },
  {
    id: 'frango',
    nome: 'Pão de Queijo com Frango',
    preco: 10.5,
    quantidade: 12,
    descricao: 'Frango desfiado temperado para um recheio irresistível.'
  },
  {
    id: 'chocolate',
    nome: 'Pão de Queijo com Chocolate',
    preco: 11.2,
    quantidade: 10,
    descricao: 'Doce na medida certa: chocolate envolvido no pão de queijo.'
  },
  {
    id: 'kit-festa',
    nome: 'Kit Festa',
    preco: 45.0,
    quantidade: 8,
    descricao: 'Seleção especial para encontros e celebrações. Delícia garantida.'
  },
  {
    id: 'congelado',
    nome: 'Pão de Queijo Congelado',
    preco: 6.8,
    quantidade: 25,
    descricao: 'Prático para o dia a dia: basta assar e aproveitar.'
  },
];

function formataDecimal(valor) {
  return Math.round(valor * 100) / 100;
}

export function AppProvider({ children }) {
  const [estoque, setEstoque] = useState(produtosIniciais);
  // Carrinho: { [id]: quantidade }
  const [carrinho, setCarrinho] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const [estoqueSalvo, carrinhoSalvo] = await Promise.all([
          AsyncStorage.getItem(CHAVE_ESTOQUE),
          AsyncStorage.getItem(CHAVE_CARRINHO),
        ]);

        if (estoqueSalvo) {
          setEstoque(JSON.parse(estoqueSalvo));
        }
        if (carrinhoSalvo) {
          setCarrinho(JSON.parse(carrinhoSalvo));
        }
      } catch (e) {
        // mantém defaults
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(CHAVE_ESTOQUE, JSON.stringify(estoque));
      } catch (e) {
        // ignore
      }
    })();
  }, [estoque]);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
      } catch (e) {
        // ignore
      }
    })();
  }, [carrinho]);

  const valorTotal = useMemo(() => {
    let total = 0;
    for (const [id, qtd] of Object.entries(carrinho)) {
      const produto = estoque.find((p) => p.id === id);
      if (!produto) continue;
      total += produto.preco * qtd;
    }
    return formataDecimal(total);
  }, [carrinho, estoque]);

  const adicionarAoCarrinho = (id, qtd = 1) => {
    setCarrinho((prev) => {
      const atual = prev[id] ?? 0;
      return { ...prev, [id]: atual + qtd };
    });
  };

  const definirQuantidadeNoCarrinho = (id, novaQtd) => {
    setCarrinho((prev) => {
      const q = Math.max(0, novaQtd);
      if (q === 0) {
        const { [id]: _, ...resto } = prev;
        return resto;
      }
      return { ...prev, [id]: q };
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => {
      const { [id]: _, ...resto } = prev;
      return resto;
    });
  };

  const itensCarrinho = useMemo(() => {
    return Object.entries(carrinho)
      .map(([id, qtd]) => {
        const produto = estoque.find((p) => p.id === id);
        if (!produto) return null;
        return { ...produto, quantidadeNoCarrinho: qtd };
      })
      .filter(Boolean);
  }, [carrinho, estoque]);

  const finalizarPedido = () => {
    setCarrinho({});
  };

  // Estoque CRUD
  const adicionarProduto = (novo) => {
    setEstoque((prev) => {
      const existe = prev.some((p) => p.id === novo.id);
      if (existe) {
        return prev.map((p) => (p.id === novo.id ? { ...p, ...novo } : p));
      }
      return [...prev, novo];
    });
  };

  const atualizarProduto = (id, atualizado) => {
    setEstoque((prev) => prev.map((p) => (p.id === id ? { ...p, ...atualizado } : p)));
  };

  const removerProduto = (id) => {
    setEstoque((prev) => prev.filter((p) => p.id !== id));
    setCarrinho((prev) => {
      if (!prev[id]) return prev;
      const { [id]: _, ...resto } = prev;
      return resto;
    });
  };

  const alterarQuantidade = (id, quantidade) => {
    setEstoque((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade: Math.max(0, quantidade) } : p))
    );
  };

  const valorEstoqueTotal = useMemo(() => {
    return estoque.reduce((acc, p) => acc + (Number(p.quantidade) || 0), 0);
  }, [estoque]);

  const valorEstoqueEmReais = useMemo(() => {
    // apenas indicador: preço * quantidade
    return formataDecimal(
      estoque.reduce((acc, p) => acc + (Number(p.preco) || 0) * (Number(p.quantidade) || 0), 0)
    );
  }, [estoque]);

  const value = {
    estoque,
    carrinho,
    itensCarrinho,
    valorTotal,
    valorEstoqueTotal,
    valorEstoqueEmReais,

    adicionarAoCarrinho,
    definirQuantidadeNoCarrinho,
    removerDoCarrinho,
    finalizarPedido,

    adicionarProduto,
    atualizarProduto,
    removerProduto,
    alterarQuantidade,

    setEstoque,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

