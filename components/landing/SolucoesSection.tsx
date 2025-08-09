import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Smartphone } from 'lucide-react-native';
import ZaggyLogo from '@/components/ZaggyLogo';

const SolucoesSection = () => {
  const solucoes = [
    {
      icon: '💰',
      titulo: 'Central Financeira Multi-Apps',
      descricao: 'Todas suas receitas de iFood, Rappi, Uber em um dashboard único. Compare performance e otimize seus ganhos.',
      beneficios: ['Dashboard unificado', 'Comparativo de apps', 'Metas e projeções']
    },
    {
      icon: '🆔',
      titulo: 'Documentos Sempre em Dia',
      descricao: 'Alertas automáticos para CNH, multas, licenciamento, MEI. Nunca mais perca oportunidades por documento vencido.',
      beneficios: ['Alertas inteligentes', 'Renovação expressa', 'Clínicas próximas']
    },
    {
      icon: '🏍️',
      titulo: 'Gestão Completa da Moto',
      descricao: 'Controle combustível, manutenção, custos. Postos mais baratos na rota e economia real.',
      beneficios: ['Monitor combustível', 'Manutenção preventiva', 'Economia de custos']
    },
    {
      icon: '📋',
      titulo: 'MEI Organizado',
      descricao: 'Nota fiscal automática, relatórios prontos para contabilidade, DAS sempre em dia.',
      beneficios: ['NF automática', 'Relatórios prontos', 'Controle de limite']
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.grid}>
          <View style={styles.textContent}>
            <Text style={styles.title}>
              A Solução Completa que{'\n'}
              <Text style={styles.highlightText}>Você Precisava</Text>
            </Text>
            
            <View style={styles.solucoesContainer}>
              {solucoes.map((solucao, index) => (
                <View key={index} style={styles.solucaoItem}>
                  <Text style={styles.solucaoIcon}>{solucao.icon}</Text>
                  <View style={styles.solucaoContent}>
                    <Text style={styles.solucaoTitle}>
                      {solucao.titulo}
                    </Text>
                    <Text style={styles.solucaoDescription}>
                      {solucao.descricao}
                    </Text>
                    <View style={styles.beneficiosList}>
                      {solucao.beneficios.map((beneficio, idx) => (
                        <View key={idx} style={styles.beneficioItem}>
                          <CheckCircle size={16} color="#27AE60" />
                          <Text style={styles.beneficioText}>{beneficio}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.ctaButton}>
              <Smartphone size={24} color="#FFFFFF" />
              <Text style={styles.ctaButtonText}>Começar Agora - É Grátis!</Text>
            </TouchableOpacity>
          </View>

          {/* App Screenshots */}
          <View style={styles.screenshotsContainer}>
            <View style={styles.screenshotsGrid}>
              {/* Screenshot 1 - Dashboard */}
              <View style={[styles.screenshot, styles.screenshotRotated]}>
                <View style={styles.screenshotContent}>
                  <View style={styles.screenshotHeader}>
                    <ZaggyLogo size="small" />
                    <View>
                      <Text style={styles.screenshotUser}>João Silva</Text>
                      <Text style={styles.screenshotLabel}>Dashboard</Text>
                    </View>
                  </View>
                  <View style={styles.screenshotCard}>
                    <Text style={styles.screenshotCardTitle}>Hoje</Text>
                    <Text style={styles.screenshotCardValue}>R$ 240,30</Text>
                    <Text style={styles.screenshotCardSubtext}>22 entregas</Text>
                  </View>
                  <View style={styles.screenshotApps}>
                    <View style={styles.screenshotAppItem}>
                      <Text style={styles.screenshotAppName}>iFood</Text>
                      <Text style={styles.screenshotAppValue}>R$ 127</Text>
                    </View>
                    <View style={styles.screenshotAppItem}>
                      <Text style={styles.screenshotAppName}>Zaggy</Text>
                      <Text style={styles.screenshotAppValue}>R$ 85</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Screenshot 2 - Documentos */}
              <View style={[styles.screenshot, styles.screenshotRotatedReverse]}>
                <View style={styles.screenshotContent}>
                  <Text style={styles.screenshotTitle}>Meus Documentos</Text>
                  <View style={styles.documentsContainer}>
                    <View style={[styles.documentItem, { backgroundColor: '#F0F9FF', borderColor: '#27AE60' }]}>
                      <Text style={styles.documentType}>CNH</Text>
                      <Text style={styles.documentStatus}>Válida até Mar/2025</Text>
                      <Text style={styles.documentDays}>✓ 45 dias restantes</Text>
                    </View>
                    <View style={[styles.documentItem, { backgroundColor: '#FFF3CD', borderColor: '#F39C12' }]}>
                      <Text style={styles.documentType}>DAS MEI</Text>
                      <Text style={styles.documentStatus}>Vence em 5 dias</Text>
                      <Text style={styles.documentDays}>⚠️ R$ 75,00</Text>
                    </View>
                    <View style={[styles.documentItem, { backgroundColor: '#F0F9FF', borderColor: '#3B82F6' }]}>
                      <Text style={styles.documentType}>Licenciamento</Text>
                      <Text style={styles.documentStatus}>Em dia até Fev/2025</Text>
                      <Text style={styles.documentDays}>✓ IPVA pago</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Floating Stats */}
            <View style={[styles.floatingStat, styles.floatingStatTop]}>
              <Text style={styles.floatingStatText}>+127% produtividade</Text>
            </View>
            <View style={[styles.floatingStat, styles.floatingStatBottom]}>
              <Text style={styles.floatingStatText}>R$ 2.340 economizados</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 64,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#202124',
    marginBottom: 32,
    lineHeight: 48,
  },
  highlightText: {
    color: '#FF6B35',
  },
  solucoesContainer: {
    gap: 32,
    marginBottom: 48,
  },
  solucaoItem: {
    flexDirection: 'row',
    gap: 16,
  },
  solucaoIcon: {
    fontSize: 40,
  },
  solucaoContent: {
    flex: 1,
  },
  solucaoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  solucaoDescription: {
    fontSize: 16,
    color: '#5F6368',
    lineHeight: 24,
    marginBottom: 12,
  },
  beneficiosList: {
    gap: 4,
  },
  beneficioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  beneficioText: {
    fontSize: 14,
    color: '#5F6368',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  screenshotsContainer: {
    flex: 1,
    position: 'relative',
  },
  screenshotsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  screenshot: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  screenshotRotated: {
    transform: [{ rotate: '3deg' }],
  },
  screenshotRotatedReverse: {
    transform: [{ rotate: '-3deg' }],
    marginTop: 32,
  },
  screenshotContent: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    width: 200,
    height: 320,
  },
  screenshotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  screenshotUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#202124',
  },
  screenshotLabel: {
    fontSize: 10,
    color: '#5F6368',
  },
  screenshotCard: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  screenshotCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  screenshotCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  screenshotCardSubtext: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  screenshotApps: {
    gap: 8,
  },
  screenshotAppItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenshotAppName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#202124',
  },
  screenshotAppValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#27AE60',
  },
  screenshotTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  documentsContainer: {
    gap: 12,
  },
  documentItem: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  documentType: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  documentStatus: {
    fontSize: 10,
    marginBottom: 2,
  },
  documentDays: {
    fontSize: 10,
  },
  floatingStat: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingStatTop: {
    top: -32,
    left: '50%',
    marginLeft: -80,
  },
  floatingStatBottom: {
    bottom: -32,
    right: 32,
  },
  floatingStatText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
});

export default SolucoesSection;