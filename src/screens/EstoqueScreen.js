import React, { useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import { Cores } from '../styles/colors';

function formatarValor(valor) {
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
}

export default function EstoqueScreen() {
  const {
    estoque,
    adicionarProduto,
    atualizarProduto,
    removerProduto,
    alterarQuantidade,
    valorEstoqueTotal,
    valorEstoqueEmReais,
  } = useContext(AppContext);

  const [modo, setModo] = useState('criar'); // criar | editar
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');

  const precoNum = useMemo(() => {
    const v = Number(String(preco).replace(',', '.'));
    return Number.isFinite(v) ? v : 0;
  }, [preco]);

  const qtdNum = useMemo(() => {
    const v = Number(String(quantidade));
    return Number.isFinite(v) ? v : 0;
  }, [quantidade]);

  const limparFormulario = () => {
    setModo('criar');
    setId('');
    setNome('');
    setPreco('');
    setQuantidade('');
    setDescricao('');
  };

  const validar = () => {
    if (!id.trim()) return 'Informe o ID.';
    if (!nome.trim()) return 'Informe o nome.';
    if (precoNum <= 0) return 'Informe um preço válido.';
    if (qtdNum < 0) return 'Informe uma quantidade válida.';
    if (!descricao.trim()) return 'Informe a descrição.';
    return null;
  };

  const aoSalvar = () => {
    const erro = validar();
    if (erro) {
      Alert.alert('Verifique os dados', erro);
      return;
    }

    const produto = {
      id: id.trim(),
      nome: nome.trim(),
      preco: precoNum,
      quantidade: qtdNum,
      descricao: descricao.trim(),
    };

    if (modo === 'criar') {
      adicionarProduto(produto);
    } else {
      atualizarProduto(id.trim(), produto);
    }

    limparFormulario();
    Alert.alert('Salvo com sucesso', 'O estoque foi atualizado.');
  };

  const aoEditar = (produto) => {
    setModo('editar');
    setId(produto.id);
    setNome(produto.nome);
    setPreco(String(produto.preco));
    setQuantidade(String(produto.quantidade));
    setDescricao(produto.descricao);
  };

  return (
    <View style={styles.container}>
      <Header
        titulo="Estoque"
        subtitulo="CRUD completo (salva no AsyncStorage)"
        icone="cube"
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.resumo}>
          <View style={styles.resumoItem}>
            <Ionicons name="layers" size={18} color={Cores.dourado} />
            <Text style={styles.resumoTexto}>Itens no estoque: <Text style={styles.resumoValor}>{valorEstoqueTotal}</Text></Text>
          </View>
          <View style={styles.resumoItem}>
            <Ionicons name="pricetags" size={18} color={Cores.amarelo} />
            <Text style={styles.resumoTexto}>Valor estimado: <Text style={styles.resumoValor}>{formatarValor(valorEstoqueEmReais)}</Text></Text>
          </View>
        </View>

        <View style={styles.formBox}>
          <Text style={styles.formTitulo}>{modo === 'criar' ? 'Adicionar produto' : 'Editar produto'}</Text>

          <View style={styles.grid}>
            <TextInput style={styles.input} placeholder="ID" placeholderTextColor="rgba(255,255,255,0.45)" value={id} onChangeText={setId} />
            <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="rgba(255,255,255,0.45)" value={nome} onChangeText={setNome} />
            <TextInput
              style={styles.input}
              placeholder="Preço (ex: 9,90)"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={preco}
              onChangeText={setPreco}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="number-pad"
            />
          </View>

          <TextInput
            style={[styles.input, styles.inputDescricao]}
            placeholder="Descrição"
            placeholderTextColor="rgba(255,255,255,0.45)"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <View style={styles.formActions}>
            <TouchableOpacity style={styles.btnSalvar} onPress={aoSalvar} activeOpacity={0.9}>
              <Ionicons name="save" size={18} color={Cores.vinho} />
              <Text style={styles.btnSalvarTexto}>{modo === 'criar' ? 'Adicionar' : 'Salvar Alterações'}</Text>
            </TouchableOpacity>

            {modo === 'editar' && (
              <TouchableOpacity style={styles.btnCancelar} onPress={limparFormulario} activeOpacity={0.9}>
                <Ionicons name="close" size={18} color={Cores.amarelo} />
                <Text style={styles.btnCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.listaTitulo}>Produtos cadastrados</Text>

        {estoque.map((p) => (
          <View key={p.id} style={styles.prodBox}>
            <View style={{ flex: 1 }}>
              <Text style={styles.prodNome}>{p.nome}</Text>
              <Text style={styles.prodMeta}>ID: {p.id}</Text>
              <Text style={styles.prodMeta}>Preço: {formatarValor(p.preco)}</Text>
              <Text style={styles.prodDesc} numberOfLines={2}>{p.descricao}</Text>
            </View>

            <View style={styles.actionsCol}>
              <TouchableOpacity style={styles.btnEditar} onPress={() => aoEditar(p)} activeOpacity={0.9}>
                <Ionicons name="create" size={18} color={Cores.dourado} />
                <Text style={styles.btnTexto}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnQtd}
                onPress={() => {
                  // modo simples: altera para (quantidade - 1)
                  alterarQuantidade(p.id, (p.quantidade || 0) - 1);
                }}
                activeOpacity={0.9}
              >
                <Ionicons name="remove-circle" size={18} color={Cores.amarelo} />
                <Text style={styles.btnTexto}>-1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnQtd}
                onPress={() => {
                  alterarQuantidade(p.id, (p.quantidade || 0) + 1);
                }}
                activeOpacity={0.9}
              >
                <Ionicons name="add-circle" size={18} color={Cores.amarelo} />
                <Text style={styles.btnTexto}>+1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnRemover}
                onPress={() => {
                  Alert.alert('Remover produto?', `Remover “${p.nome}” do estoque?`, [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Remover', style: 'destructive', onPress: () => removerProduto(p.id) },
                  ]);
                }}
                activeOpacity={0.9}
              >
                <Ionicons name="trash" size={18} color={Cores.vinho} />
                <Text style={styles.btnRemoverTexto}>Remover</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.quantidadeLinha}>
              <Text style={styles.quantidadeLabel}>Quantidade atual:</Text>
              <Text style={styles.quantidadeValor}>{p.quantidade}</Text>
            </View>
          </View>
        ))}

        <View style={styles.admNota}>
          <Ionicons name="shield-checkmark" size={16} color={Cores.dourado} />
          <Text style={styles.admTexto}>
            Futuramente, esta tela ficará restrita a administradores. Por enquanto, ela está visível.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11060A' },

  resumo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  resumoItem: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(16,6,10,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resumoTexto: { color: 'rgba(255,255,255,0.85)', fontWeight: '800', fontSize: 13 },
  resumoValor: { color: Cores.dourado, fontWeight: '1000' },

  formBox: {
    borderRadius: 18,
    backgroundColor: 'rgba(16,6,10,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.25)',
    padding: 16,
    marginBottom: 18,
  },
  formTitulo: { color: Cores.branco, fontWeight: '1000', fontSize: 16, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  input: {
    flex: 1,
    minWidth: 140,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(11,11,12,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
    color: Cores.branco,
    marginBottom: 10,
  },
  inputDescricao: { minWidth: '100%', height: 90, textAlignVertical: 'top' },

  formActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  btnSalvar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Cores.dourado,
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.45)',
  },
  btnSalvarTexto: { color: Cores.vinho, fontWeight: '1000', fontSize: 15 },
  btnCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(201,162,39,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.28)',
  },
  btnCancelarTexto: { color: Cores.amarelo, fontWeight: '1000', fontSize: 14 },

  listaTitulo: { color: Cores.branco, fontWeight: '1000', fontSize: 16, marginBottom: 10 },

  prodBox: {
    borderRadius: 18,
    backgroundColor: 'rgba(16,6,10,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
    padding: 14,
    marginBottom: 14,
  },
  prodNome: { color: Cores.branco, fontWeight: '1000', fontSize: 15 },
  prodMeta: { color: 'rgba(255,255,255,0.75)', marginTop: 4, fontWeight: '700', fontSize: 12 },
  prodDesc: { color: 'rgba(255,255,255,0.72)', marginTop: 8, fontWeight: '650', fontSize: 13 },

  actionsCol: {
    position: 'absolute',
    right: 10,
    top: 10,
    gap: 8,
    alignItems: 'flex-end',
  },
  btnEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(201,162,39,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.28)',
  },
  btnQtd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(201,162,39,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
  },
  btnRemover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: Cores.dourado,
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.45)',
    marginTop: 6,
  },
  btnTexto: { color: 'rgba(255,255,255,0.9)', fontWeight: '900', fontSize: 12 },
  btnRemoverTexto: { color: Cores.vinho, fontWeight: '1000', fontSize: 12 },

  quantidadeLinha: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  quantidadeLabel: { color: 'rgba(255,255,255,0.72)', fontWeight: '800', fontSize: 12 },
  quantidadeValor: { color: Cores.amarelo, fontWeight: '1000', fontSize: 18 },

  admNota: {
    marginTop: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(201,162,39,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.20)',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  admTexto: { color: 'rgba(255,255,255,0.78)', fontWeight: '700', lineHeight: 18, flex: 1 },
});

