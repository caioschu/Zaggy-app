import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Smartphone, Users, Star, TrendingUp } from 'lucide-react-native';
import ZaggyLogo from '@/components/ZaggyLogo';

const CTAFinalSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <ZaggyLogo size="large" color="white" />
        </View>

        <Text style={styles.title}>
          Sua Vida Profissional{'\n'}
          <Text style={styles.highlightText}>Organizada</Text> em 5 Minutos
        </Text>

        <Text style={styles.subtitle}>
          Mais de <Text style={styles.boldText}>1.000 entregadores</Text> já aumentaram seus ganhos e organizaram suas vidas com o Zaggy. 
          <Text style={styles.boldText}> É grátis</Text> e você pode começar agora mesmo!
        </Text>

        {/* Social Proof */}
        <View style={styles.socialProofContainer}>
          <View style={styles.socialProofItem}>
            <View style={styles.stars}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={24} color="#FFD700" />
              ))}
            </View>
            <Text style={styles.socialProofValue}>4.9</Text>
            <Text style={styles.socialProofLabel}>na App Store</Text>
          </View>
          
          <View style={styles.socialProofItem}>
            <Users size={24} color="#FFD700" />
            <Text style={styles.socialProofValue}>1.000+</Text>
            <Text style={styles.socialProofLabel}>entregadores ativos</Text>
          </View>
          
          <View style={styles.socialProofItem}>
            <TrendingUp size={24} color="#FFD700" />
            <Text style={styles.socialProofValue}>+127%</Text>
            <Text style={styles.socialProofLabel}>produtividade média</Text>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Smartphone size={28} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>📱 Baixar App Grátis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Users size={28} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>🍕 Sou Restaurante</Text>
          </TouchableOpacity>
        </View>

        {/* Garantia */}
        <View style={styles.garantiaCard}>
          <Text style={styles.garantiaTitle}>
            🛡️ Garantia de 30 Dias
          </Text>
          <Text style={styles.garantiaText}>
            Não gostou? Sem problemas! Garantimos 100% do seu dinheiro de volta 
            em até 30 dias. Sem perguntas, sem burocracia.
          </Text>
        </View>

        {/* Urgência */}
        <View style={styles.urgenciaContainer}>
          <Text style={styles.urgenciaTitle}>
            ⚡ Oferta de Lançamento - Tempo Limitado!
          </Text>
          <Text style={styles.urgenciaText}>
            Primeiros 1.000 usuários ganham acesso vitalício gratuito a todas as funcionalidades premium
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6B35',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 56,
  },
  highlightText: {
    color: '#FFD700',
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 48,
    maxWidth: 800,
  },
  boldText: {
    fontWeight: '700',
  },
  socialProofContainer: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 48,
  },
  socialProofItem: {
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  socialProofValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  socialProofLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 48,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 12,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 12,
  },
  secondaryButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  garantiaCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    maxWidth: 500,
    marginBottom: 48,
  },
  garantiaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  garantiaText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
  },
  urgenciaContainer: {
    alignItems: 'center',
  },
  urgenciaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 8,
  },
  urgenciaText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});

export default CTAFinalSection;