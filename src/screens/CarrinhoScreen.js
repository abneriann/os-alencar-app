import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { Cores } from '../styles/colors';

function formatarValor(valor) {
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
}

export default function CarrinhoScreen() {
  const {
    itensCarrinho,
    valorTotal,
    definirQuantidadeNoCarrinho,
    removerDoCarrinho,
    finalizarPedido,
  } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Header titulo="Carrinho" subtitulo="Ajuste quantidades e finalize" icone="cart" />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {itensCarrinho.length === 0 ? (
          <View style={styles.vazio}>
            <Ionicons name="document-text" size={28} color={Cores.dourado} />
            <Text style={styles.vazioTitulo}>Seu carrinho está vazio.</Text>
            <Text style={styles.vazioTexto}>Vá até a aba “Produtos” e adicione seus pães de queijo favoritos.</Text>
          </View>
        ) : (
          <>
            {itensCarrinho.map((produto) => (
              <View key={produto.id} style={{ marginBottom: 16 }}>
                <ProductCard
                  produto={produto}
                  compact
                  mostrarEstoque={false}
                  botaoTexto=""
                  onAdicionar={null}
                  onRemover={removerDoCarrinho}
                />

                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => definirQuantidadeNoCarrinho(produto.id, produto.quantidadeNoCarrinho - 1)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="remove" size={18} color={Cores.dourado} />
                  </TouchableOpacity>

                  <View style={styles.qtyMid}>
                    <Text style={styles.qtyLabel}>Quantidade</Text>
                    <Text style={styles.qtyValor}>{produto.quantidadeNoCarrinho}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => definirQuantidadeNoCarrinho(produto.id, produto.quantidadeNoCarrinho + 1)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="add" size={18} color={Cores.dourado} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.totalBox}>
              <View>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValor}>{formatarValor(valorTotal)}</Text>
              </View>

              <TouchableOpacity style={styles.finalizarBtn} onPress={finalizarPedido} activeOpacity={0.9}>
                <Ionicons name="checkmark-circle" size={18} color={Cores.vinho} />
                <Text style={styles.finalizarTexto}>Finalizar Pedido</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11060A' },
  vazio: {
    marginTop: 10,
    borderRadius: 18,
    backgroundColor: 'rgba(16,6,10,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
    padding: 18,
    alignItems: 'center',
  },
  vazioTitulo: { color: Cores.branco, fontWeight: '900', fontSize: 16, marginTop: 10 },
  vazioTexto: { color: 'rgba(255,255,255,0.7)', marginTop: 6, textAlign: 'center', fontSize: 13, lineHeight: 18 },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(16,6,10,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
    marginTop: 8,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(201,162,39,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyMid: { flex: 1, alignItems: 'center' },
  qtyLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '700' },
  qtyValor: { color: Cores.dourado, fontSize: 22, fontWeight: '900', marginTop: 2 },

  totalBox: {
    marginTop: 10,
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(16,6,10,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.25)',
    gap: 14,
  },
  totalLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '800' },
  totalValor: { color: Cores.dourado, fontSize: 28, fontWeight: '950', marginTop: 6 },
  finalizarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: Cores.dourado,
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.45)',
  },
  finalizarTexto: { color: Cores.vinho, fontWeight: '1000', fontSize: 16 },
});

