import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Cores } from '../styles/colors';

export default function ProductCard({
  produto,
  onAdicionar,
  mostrarEstoque = true,
  botaoTexto = 'Adicionar ao Carrinho',
  onRemover,
  compact = false,
}) {
  const precoFormatado = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;

  return (
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={['rgba(201,162,39,0.18)', 'rgba(90,14,26,0.18)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={[styles.topRow, compact && { alignItems: 'flex-start' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>{precoFormatado}</Text>
            <Text style={styles.desc} numberOfLines={compact ? 2 : 3}>
              {produto.descricao}
            </Text>
            {mostrarEstoque && (
              <View style={styles.estoqueRow}>
                <Ionicons name="flame" size={16} color={Cores.amarelo} />
                <Text style={styles.estoqueText}>Estoque: {produto.quantidade}</Text>
              </View>
            )}
            {produto.quantidadeNoCarrinho != null && (
              <View style={styles.estoqueRow}>
                <Ionicons name="cart" size={16} color={Cores.dourado} />
                <Text style={styles.estoqueText}>No carrinho: {produto.quantidadeNoCarrinho}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actionsRow}>
          {!!onAdicionar && (
            <TouchableOpacity style={styles.btnAdicionar} onPress={() => onAdicionar(produto.id)} activeOpacity={0.85}>
              <Ionicons name="add-circle" size={18} color={Cores.vinho} />
              <Text style={styles.btnAdicionarTexto}>{botaoTexto}</Text>
            </TouchableOpacity>
          )}

          {!!onRemover && (
            <TouchableOpacity style={styles.btnRemover} onPress={() => onRemover(produto.id)} activeOpacity={0.85}>
              <Ionicons name="trash" size={18} color={Cores.dourado} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    elevation: 8,
    marginBottom: 14,
  },
  card: {
    borderRadius: 18,
    backgroundColor: 'rgba(16, 6, 10, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.25)',
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  nome: {
    color: Cores.branco,
    fontSize: 16,
    fontWeight: '800',
  },
  preco: {
    color: Cores.dourado,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  desc: {
    color: 'rgba(255,255,255,0.78)',
    marginTop: 8,
    fontSize: 13,
  },
  estoqueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  estoqueText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 12,
  },
  btnAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: Cores.dourado,
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.45)',
    minHeight: 42,
  },
  btnAdicionarTexto: {
    color: Cores.vinho,
    fontWeight: '900',
    fontSize: 14,
  },
  btnRemover: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(201,162,39,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

