import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Smartphone, Users, Star } from 'lucide-react-native';
import ZaggyLogo from '@/components/ZaggyLogo';
import { useRouter } from 'expo-router';

const HeroSection = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContent}>
          {/* Badge de Lançamento */}
          <View style={styles.launchBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.launchText}>🚀 Lançamento Oficial</Text>
          </View>

          {/* Logo e Título */}
          <View style={styles.titleSection}>
            <ZaggyLogo size="large" color="white" />
            <Text style={styles.mainTitle}>
              O Primeiro{'\n'}
              <Text style={styles.highlightText}>Super App</Text>{'\n'}
              para Entregadores{'\n'}
              do Brasil
            </Text>
          </View>

          <Text style={styles.subtitle}>
            Organize toda sua vida profissional em um só lugar. 
            Controle receitas de <Text style={styles.boldText}>todos os apps</Text>, documentos, MEI e muito mais.
          </Text>

          {/* CTAs */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => {
                router.push('/auth/signup');
              }}
            >
              <Smartphone size={24} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>📱 Começar Grátis</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => {
                Alert.alert(
                  '🍕 Portal Restaurante',
                  'Em breve: Dashboard completo para restaurantes!\n\n• Criar vagas\n• Gerenciar entregadores\n• Pagamentos automáticos',
                  [
                    { text: 'OK' }
                  ]
                );
              }}
            >
              <Users size={24} color="#FFFFFF" />
              <Text style={styles.secondaryButtonText}>🍕 Sou Restaurante</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginLinkText}>
              Já tem conta? <Text style={styles.loginLinkHighlight}>Fazer login</Text>
            </Text>
          </TouchableOpacity>

          {/* Social Proof */}
          <View style={styles.socialProof}>
            <View style={styles.rating}>
              <View style={styles.stars}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={20} color="#FFD700" />
                ))}
              </View>
              <Text style={styles.ratingText}>4.9</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.usersText}>Mais de 1.000 entregadores já usam</Text>
          </View>
        </View>

        {/* Phone Mockup */}
        <View style={styles.phoneContainer}>
          <View style={styles.phoneFrame}>
            <View style={styles.phoneScreen}>
              {/* Status Bar */}
              <View style={styles.statusBar}>
                <View style={styles.notch} />
              </View>
              
              {/* App Content */}
              <View style={styles.appContent}>
                <View style={styles.appHeader}>
                  <ZaggyLogo size="small" />
                  <View>
                    <Text style={styles.greetingText}>Boa tarde, João! 👋</Text>
                    <Text style={styles.greetingSubtext}>Vamos fazer um ótimo dia</Text>
                  </View>
                </View>
                
                {/* Performance Card */}
                <View style={styles.performanceCard}>
                  <Text style={styles.performanceTitle}>Performance Hoje</Text>
                  <View style={styles.performanceStats}>
                    <View style={styles.performanceStat}>
                      <Text style={styles.performanceValue}>R$ 240</Text>
                      <Text style={styles.performanceLabel}>Líquido</Text>
                    </View>
                    <View style={styles.performanceStat}>
                      <Text style={styles.performanceValue}>R$ 28</Text>
                      <Text style={styles.performanceLabel}>Por hora</Text>
                    </View>
                    <View style={styles.performanceStat}>
                      <Text style={styles.performanceValue}>22</Text>
                      <Text style={styles.performanceLabel}>Entregas</Text>
                    </View>
                  </View>
                </View>
                
                {/* Apps Cards */}
                <View style={styles.appsCards}>
                  <View style={[styles.appCard, { borderLeftColor: '#EA1D2C' }]}>
                    <View>
                      <Text style={styles.appName}>iFood</Text>
                      <Text style={styles.appDeliveries}>9 entregas</Text>
                    </View>
                    <Text style={styles.appEarnings}>R$ 127</Text>
                  </View>
                  <View style={[styles.appCard, { borderLeftColor: '#FF6B35' }]}>
                    <View>
                      <Text style={styles.appName}>Zaggy</Text>
                      <Text style={styles.appDeliveries}>6 entregas</Text>
                    </View>
                    <Text style={styles.appEarnings}>R$ 85</Text>
                  </View>
                  <View style={[styles.appCard, { borderLeftColor: '#000000' }]}>
                    <View>
                      <Text style={styles.appName}>Uber</Text>
                      <Text style={styles.appDeliveries}>4 entregas</Text>
                    </View>
                    <Text style={styles.appEarnings}>R$ 67</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          {/* Floating Elements */}
          <View style={[styles.floatingElement, styles.floatingTop]}>
            <Text style={styles.floatingEmoji}>💰</Text>
          </View>
          <View style={[styles.floatingElement, styles.floatingBottom]}>
            <Text style={styles.floatingEmoji}>📊</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6B35',
    minHeight: 800,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
    gap: 40,
  },
  textContent: {
    flex: 1,
  },
  launchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 32,
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  launchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  titleSection: {
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 56,
    marginTop: 16,
  },
  highlightText: {
    color: '#FFD700',
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 28,
    marginBottom: 32,
  },
  boldText: {
    fontWeight: '700',
  },
  ctaContainer: {
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginLinkText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loginLinkHighlight: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  usersText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  phoneContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  phoneFrame: {
    backgroundColor: '#1F2937',
    borderRadius: 48,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  phoneScreen: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    width: 280,
    height: 600,
    overflow: 'hidden',
  },
  statusBar: {
    backgroundColor: '#1F2937',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notch: {
    width: 80,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  appContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
  },
  greetingSubtext: {
    fontSize: 12,
    color: '#5F6368',
  },
  performanceCard: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceStat: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  performanceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  appsCards: {
    gap: 8,
  },
  appCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
  },
  appDeliveries: {
    fontSize: 12,
    color: '#5F6368',
  },
  appEarnings: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
  },
  floatingElement: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingTop: {
    top: -16,
    right: -16,
  },
  floatingBottom: {
    bottom: -16,
    left: -16,
    backgroundColor: '#00D4AA',
  },
  floatingEmoji: {
    fontSize: 24,
  },
});

export default HeroSection;