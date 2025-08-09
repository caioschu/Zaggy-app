import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ZaggyLogo from '@/components/ZaggyLogo';
import { Star, ArrowRight, Smartphone, Building } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function MobileWelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <ZaggyLogo size="large" />
          <Text style={styles.title}>
            O Super App que{'\n'}
            <Text style={styles.highlightText}>Conecta Tudo</Text>
          </Text>
          <Text style={styles.subtitle}>
            Para entregadores organizarem suas vidas{'\n'}
            e empresas encontrarem profissionais
          </Text>
          
          {/* Social Proof */}
          <View style={styles.socialProof}>
            <View style={styles.stars}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} color="#FFD700" />
              ))}
            </View>
            <Text style={styles.socialText}>4.9 • Mais de 1.000 usuários ativos</Text>
          </View>
        </View>

        {/* Ilustração Central */}
        <View style={styles.illustration}>
          <View style={styles.illustrationGrid}>
            <View style={styles.illustrationCard}>
              <View style={[styles.cardIcon, { backgroundColor: '#FFF3E0' }]}>
                <Smartphone size={32} color="#FF6B35" />
              </View>
              <Text style={styles.cardTitle}>Entregadores</Text>
              <Text style={styles.cardDescription}>
                Central financeira{'\n'}
                Controle de documentos{'\n'}
                Gestão da moto
              </Text>
            </View>
            
            <View style={styles.connector} />
            
            <View style={styles.illustrationCard}>
              <View style={[styles.cardIcon, { backgroundColor: '#EFF6FF' }]}>
                <Building size={32} color="#3B82F6" />
              </View>
              <Text style={styles.cardTitle}>Empresas</Text>
              <Text style={styles.cardDescription}>
                Gestão de vagas{'\n'}
                Controle de entregadores{'\n'}
                Pagamentos automáticos
              </Text>
            </View>
          </View>
        </View>

        {/* CTAs */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/auth/signup')}
          >
            <Text style={styles.primaryButtonText}>Começar Grátis</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.secondaryButtonText}>Já tenho conta</Text>
          </TouchableOpacity>
          
          <Text style={styles.guaranteeText}>
            Grátis para começar • Sem compromisso
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#202124',
    textAlign: 'center',
    lineHeight: 38,
    marginTop: 20,
    marginBottom: 12,
  },
  highlightText: {
    color: '#FF6B35',
  },
  subtitle: {
    fontSize: 16,
    color: '#5F6368',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  socialProof: {
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  socialText: {
    fontSize: 14,
    color: '#9AA0A6',
    fontWeight: '600',
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  illustrationGrid: {
    alignItems: 'center',
    gap: 20,
  },
  illustrationCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardIcon: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#5F6368',
    textAlign: 'center',
    lineHeight: 16,
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: '#DADCE0',
  },
  ctaContainer: {
    gap: 16,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    gap: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#DADCE0',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5F6368',
  },
  guaranteeText: {
    fontSize: 14,
    color: '#9AA0A6',
    textAlign: 'center',
    marginTop: 8,
  },
});