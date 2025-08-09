import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Star } from 'lucide-react-native';

const DepoimentosSection = () => {
  const depoimentos = [
    {
      nome: 'João Silva',
      cidade: 'São Paulo, SP',
      foto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      avaliacao: 5,
      texto: 'Zaggy mudou minha vida! Agora sei exatamente quanto ganho em cada app e nunca mais perco documento. Aumentei meus ganhos em 40% só organizando melhor.',
      ganho_aumento: '+40%'
    },
    {
      nome: 'Maria Santos',
      cidade: 'Rio de Janeiro, RJ',
      foto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      avaliacao: 5,
      texto: 'Antes eu perdia tempo indo em vários postos. Agora o app me mostra o mais barato na rota. Só de combustível economizo R$ 300 por mês!',
      economia: 'R$ 300/mês'
    },
    {
      nome: 'Carlos Oliveira',
      cidade: 'Belo Horizonte, MG',
      foto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      avaliacao: 5,
      texto: 'O MEI organizado automaticamente é sensacional! Minha contadora fica impressionada com os relatórios. Nunca mais atraso o DAS.',
      beneficio: 'MEI em dia'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textCenter}>
          <Text style={styles.title}>
            O que Nossos{'\n'}
            <Text style={styles.highlightText}>Entregadores Dizem</Text>
          </Text>
          <Text style={styles.subtitle}>
            Mais de 1.000 entregadores já transformaram suas vidas profissionais com o Zaggy
          </Text>
        </View>

        <View style={styles.depoimentosGrid}>
          {depoimentos.map((depoimento, index) => (
            <View key={index} style={styles.depoimentoCard}>
              <View style={styles.quoteIcon}>
                <Text style={styles.quoteText}>"</Text>
              </View>

              <View style={styles.depoimentoContent}>
                <View style={styles.rating}>
                  {[1,2,3,4,5].map(i => (
                    <Star 
                      key={i} 
                      size={16} 
                      color={i <= depoimento.avaliacao ? '#FFD700' : '#E5E7EB'}
                    />
                  ))}
                </View>

                <Text style={styles.depoimentoTexto}>
                  "{depoimento.texto}"
                </Text>

                <View style={styles.autorInfo}>
                  <Image 
                    source={{ uri: depoimento.foto }}
                    style={styles.autorFoto}
                  />
                  <View>
                    <Text style={styles.autorNome}>{depoimento.nome}</Text>
                    <Text style={styles.autorCidade}>{depoimento.cidade}</Text>
                  </View>
                </View>

                <View style={styles.beneficioCard}>
                  <Text style={styles.beneficioText}>
                    {depoimento.ganho_aumento || depoimento.economia || depoimento.beneficio}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>
            Junte-se a Mais de 1.000 Entregadores Satisfeitos! 🚀
          </Text>
          <Text style={styles.ctaSubtitle}>
            Baixe grátis e comece a organizar sua vida profissional hoje mesmo
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => {
              Alert.alert(
                '🚀 Junte-se aos 1.000+ Entregadores!',
                'Faça como João, Maria e Carlos:\n\n💰 Aumente seus ganhos\n📋 Organize documentos\n⏰ Economize tempo\n\nGrátis para sempre!',
                [
                  { text: 'Continuar Navegando' },
                  { text: 'Baixar Zaggy', onPress: () => console.log('Download app') }
                ]
              );
            }}
          >
            <Text style={styles.ctaButtonText}>📱 Baixar Zaggy Grátis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
  textCenter: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 48,
  },
  highlightText: {
    color: '#FF6B35',
  },
  subtitle: {
    fontSize: 20,
    color: '#5F6368',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
  },
  depoimentosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
    marginBottom: 64,
  },
  depoimentoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 32,
    width: 350,
    position: 'relative',
  },
  quoteIcon: {
    position: 'absolute',
    top: -16,
    left: 32,
    backgroundColor: '#FF6B35',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  depoimentoContent: {
    paddingTop: 32,
  },
  rating: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  depoimentoTexto: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 24,
  },
  autorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  autorFoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  autorNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  autorCidade: {
    fontSize: 14,
    color: '#5F6368',
  },
  beneficioCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  beneficioText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  ctaSection: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    maxWidth: 800,
    alignSelf: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: '#5F6368',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default DepoimentosSection;