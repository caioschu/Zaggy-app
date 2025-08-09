import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Smartphone, Users } from 'lucide-react-native';

const PrecosSection = () => {
  const planos = [
    {
      nome: 'Entregador',
      preco: 'Grátis',
      periodo: 'para sempre',
      descricao: 'Tudo que você precisa para organizar sua vida profissional',
      popular: true,
      funcionalidades: [
        'Central financeira multi-apps',
        'Controle de documentos',
        'Gestão completa da moto',
        'MEI organizado',
        'Ofertas exclusivas',
        'Suporte via WhatsApp',
        'Relatórios ilimitados',
        'Alertas inteligentes'
      ],
      cta: 'Baixar Grátis',
      icon: <Smartphone size={32} color="#FF6B35" />
    },
    {
      nome: 'Restaurante',
      preco: 'R$ 10',
      periodo: 'por vaga + entregador',
      descricao: 'Plataforma completa para gestão de entregadores',
      popular: false,
      funcionalidades: [
        'Dashboard de gestão',
        'Criação de vagas',
        'Pagamentos automáticos',
        'Nota fiscal automática',
        'Entregadores favoritos',
        'Relatórios financeiros',
        'Suporte prioritário',
        'API para integração'
      ],
      cta: 'Começar Teste Grátis',
      icon: <Users size={32} color="#3B82F6" />
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textCenter}>
          <Text style={styles.title}>
            Preços Justos e{'\n'}
            <Text style={styles.highlightText}>Transparentes</Text>
          </Text>
          <Text style={styles.subtitle}>
            Sem pegadinhas, sem taxas escondidas. Você sabe exatamente o que paga.
          </Text>
        </View>

        <View style={styles.planosGrid}>
          {planos.map((plano, index) => (
            <View 
              key={index}
              style={[
                styles.planoCard,
                plano.popular && styles.planoCardPopular
              ]}
            >
              {plano.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>⭐ MAIS POPULAR</Text>
                </View>
              )}

              <View style={styles.planoHeader}>
                <View style={styles.planoIcon}>
                  {plano.icon}
                </View>
                
                <Text style={styles.planoNome}>{plano.nome}</Text>
                <Text style={styles.planoDescricao}>{plano.descricao}</Text>
                
                <View style={styles.precoContainer}>
                  <Text style={[styles.preco, { color: plano.popular ? '#FF6B35' : '#3B82F6' }]}>
                    {plano.preco}
                  </Text>
                  <Text style={styles.periodo}>
                    {plano.periodo}
                  </Text>
                </View>
              </View>

              <View style={styles.funcionalidadesList}>
                {plano.funcionalidades.map((func, idx) => (
                  <View key={idx} style={styles.funcionalidadeItem}>
                    <View style={[styles.checkIcon, { backgroundColor: plano.popular ? '#FFF3E0' : '#EFF6FF' }]}>
                      <Check size={16} color={plano.popular ? '#FF6B35' : '#3B82F6'} />
                    </View>
                    <Text style={styles.funcionalidadeText}>{func}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={[
                styles.ctaButton,
                { backgroundColor: plano.popular ? '#FF6B35' : '#3B82F6' }
              ]}>
                <Text style={styles.ctaButtonText}>{plano.cta}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Comparativo */}
        <View style={styles.comparativoSection}>
          <Text style={styles.comparativoTitle}>
            Compare com os Apps Tradicionais
          </Text>
          
          <View style={styles.comparativoGrid}>
            <View style={[styles.comparativoCard, { backgroundColor: '#FEF2F2' }]}>
              <Text style={styles.comparativoCardTitle}>Apps Tradicionais</Text>
              <View style={styles.comparativoItems}>
                <Text style={styles.comparativoItemNegative}>❌ 30% de comissão</Text>
                <Text style={styles.comparativoItemNegative}>❌ Sem controle financeiro</Text>
                <Text style={styles.comparativoItemNegative}>❌ Documentos por conta própria</Text>
                <Text style={styles.comparativoItemNegative}>❌ Sem suporte real</Text>
              </View>
            </View>
            
            <View style={[styles.comparativoCard, styles.comparativoCardZaggy]}>
              <Text style={styles.comparativoCardTitle}>Zaggy</Text>
              <View style={styles.comparativoItems}>
                <Text style={styles.comparativoItemPositive}>✅ 10% sobretaxa justa</Text>
                <Text style={styles.comparativoItemPositive}>✅ Central financeira completa</Text>
                <Text style={styles.comparativoItemPositive}>✅ Documentos organizados</Text>
                <Text style={styles.comparativoItemPositive}>✅ Suporte especializado</Text>
              </View>
            </View>
            
            <View style={[styles.comparativoCard, { backgroundColor: '#F0FDF4' }]}>
              <Text style={styles.comparativoCardTitle}>Sua Economia</Text>
              <View style={styles.comparativoItems}>
                <Text style={styles.comparativoItemPositive}>💰 R$ 2.340/mês</Text>
                <Text style={styles.comparativoItemPositive}>⏰ 15h/semana</Text>
                <Text style={styles.comparativoItemPositive}>📈 +127% produtividade</Text>
                <Text style={styles.comparativoItemPositive}>😌 Menos stress</Text>
              </View>
            </View>
          </View>
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
  planosGrid: {
    flexDirection: 'row',
    gap: 32,
    justifyContent: 'center',
    marginBottom: 80,
  },
  planoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    position: 'relative',
  },
  planoCardPopular: {
    borderWidth: 4,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  popularBadge: {
    position: 'absolute',
    top: -16,
    left: '50%',
    marginLeft: -60,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  planoHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  planoIcon: {
    backgroundColor: '#F8F9FA',
    borderRadius: 40,
    padding: 16,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  planoNome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  planoDescricao: {
    fontSize: 16,
    color: '#5F6368',
    textAlign: 'center',
    marginBottom: 24,
  },
  precoContainer: {
    alignItems: 'center',
  },
  preco: {
    fontSize: 48,
    fontWeight: '900',
  },
  periodo: {
    fontSize: 16,
    color: '#5F6368',
    marginTop: 8,
  },
  funcionalidadesList: {
    gap: 16,
    marginBottom: 32,
  },
  funcionalidadeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    borderRadius: 12,
    padding: 4,
  },
  funcionalidadeText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  ctaButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  comparativoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  comparativoTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 48,
  },
  comparativoGrid: {
    flexDirection: 'row',
    gap: 32,
    justifyContent: 'center',
  },
  comparativoCard: {
    borderRadius: 12,
    padding: 24,
    width: 250,
    alignItems: 'center',
  },
  comparativoCardZaggy: {
    backgroundColor: '#FFF3E0',
    borderWidth: 4,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  comparativoCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  comparativoItems: {
    gap: 12,
  },
  comparativoItemNegative: {
    fontSize: 16,
    color: '#EF4444',
  },
  comparativoItemPositive: {
    fontSize: 16,
    color: '#FF6B35',
  },
});

export default PrecosSection;