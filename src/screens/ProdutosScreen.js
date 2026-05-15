import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { Cores } from '../styles/colors';

export default function ProdutosScreen() {
  const { estoque, adicionarAoCarrinho, carrinho } = useContext(AppContext);

  const totalNoCarrinho = useMemo(() => {
    return Object.values(carrinho).reduce((a, b) => a + b, 0);
  }, [carrinho]);

  return (
    <View style={styles.container}>
      <Header titulo="Produtos" subtitulo="Escolha e adicione ao carrinho" icone="egg" />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.topInfo}>
          <Ionicons name="cart" size={16} color={Cores.dourado} />
          <Text style={styles.topInfoText}>No carrinho: {totalNoCarrinho}</Text>
          <TouchableOpacity style={styles.irCarrinho} onPress={() => {}} activeOpacity={0.8}>
            <Text style={styles.irCarrinhoTexto}>Use a aba Carrinho</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
          {estoque.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              onAdicionar={(id) => adicionarAoCarrinho(id, 1)}
              botaoTexto="Adicionar ao Carrinho"
              mostrarEstoque
            />
          ))}
        </View>

        <Text style={styles.rodape}>
          Dica: ajuste seu carrinho na aba “Carrinho” antes de finalizar.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11060A' },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(16,6,10,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
  },
  topInfoText: { color: 'rgba(255,255,255,0.9)', fontWeight: '800' },
  irCarrinho: {
    marginLeft: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(201,162,39,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.28)',
  },
  irCarrinhoTexto: { color: Cores.dourado, fontWeight: '900' },
  rodape: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
  },
});

