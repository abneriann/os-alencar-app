import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header';
import { Cores } from '../styles/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header titulo="Os Alencar" subtitulo="Realeza artesanal em cada mordida" icone="crown" />

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['rgba(201,162,39,0.28)', 'rgba(90,14,26,0.22)', 'rgba(16,6,10,0.55)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitulo}>Sua próxima refeição começa aqui.</Text>
              <Text style={styles.bannerTexto}>
                Boas-vindas! Aqui você encontra pão de queijo com sabor de casa, assado com carinho e
                finalizado com a assinatura Os Alencar.
              </Text>

              <TouchableOpacity
                style={styles.bannerBtn}
                onPress={() => navigation.navigate('Produtos')}
                activeOpacity={0.9}
              >
                <Ionicons name="sparkles" size={18} color={Cores.vinho} />
                <Text style={styles.bannerBtnTexto}>Ver Produtos</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.badge}>
              <Ionicons name="flame" size={18} color={Cores.amarelo} />
              <Text style={styles.badgeTitulo}>Destaques do Dia</Text>
              <Text style={styles.badgeTexto}>Crocância + recheio + amor</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitulo}>Recomendados</Text>
          <View style={styles.destaques}>
            <View style={styles.itemDestaque}>
              <Ionicons name="flash" size={18} color={Cores.dourado} />
              <Text style={styles.itemTexto}>Kit Festa para celebrar</Text>
            </View>
            <View style={styles.itemDestaque}>
              <Ionicons name="restaurant" size={18} color={Cores.amarelo} />
              <Text style={styles.itemTexto}>Tradicional com toque real</Text>
            </View>
            <View style={styles.itemDestaque}>
              <Ionicons name="heart" size={18} color={Cores.laranjaQueimado} />
              <Text style={styles.itemTexto}>Chocolate: sobremesa perfeita</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitulo}>Como funciona</Text>
          <View style={styles.passos}>
            <View style={styles.pass}>
              <Text style={styles.passNum}>1</Text>
              <Text style={styles.passText}>Escolha seu pão de queijo</Text>
            </View>
            <View style={styles.pass}>
              <Text style={styles.passNum}>2</Text>
              <Text style={styles.passText}>Monte seu carrinho</Text>
            </View>
            <View style={styles.pass}>
              <Text style={styles.passNum}>3</Text>
              <Text style={styles.passText}>Finalize o pedido e aproveite</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11060A' },
  banner: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.25)',
    padding: 16,
    marginBottom: 18,
  },
  bannerRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  bannerTitulo: { color: Cores.branco, fontSize: 20, fontWeight: '900' },
  bannerTexto: { color: 'rgba(255,255,255,0.78)', marginTop: 8, fontSize: 14, lineHeight: 20 },
  bannerBtn: {
    marginTop: 14,
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
  bannerBtnTexto: { color: Cores.vinho, fontWeight: '900', fontSize: 16 },
  badge: {
    width: 150,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(11,11,12,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.25)',
    alignItems: 'flex-start',
  },
  badgeTitulo: { color: Cores.branco, marginTop: 10, fontWeight: '900' },
  badgeTexto: { color: 'rgba(255,255,255,0.75)', marginTop: 6, fontSize: 12, lineHeight: 16 },

  section: { marginTop: 8, paddingBottom: 6 },
  sectionTitulo: { color: Cores.branco, fontWeight: '900', fontSize: 16, marginBottom: 12 },
  destaques: { gap: 10 },
  itemDestaque: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(16,6,10,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
  },
  itemTexto: { color: 'rgba(255,255,255,0.86)', fontWeight: '700', fontSize: 13 },

  passos: { gap: 10 },
  pass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(16,6,10,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.18)',
  },
  passNum: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(201,162,39,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(201,162,39,0.35)',
    color: Cores.dourado,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 32,
  },
  passText: { color: 'rgba(255,255,255,0.86)', fontWeight: '700', fontSize: 13 },
});

