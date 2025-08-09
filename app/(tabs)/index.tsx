import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZaggyLogo from '@/components/ZaggyLogo';
import { TrendingUp, Clock, MapPin, TriangleAlert as AlertTriangle, Star, Zap, Cloud, Phone } from 'lucide-react-native';

const DashboardCard = ({ children, style = {} }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const AlertCard = ({ icon, title, description, action, type = 'warning' }) => (
  <TouchableOpacity 
    style={[styles.alertCard, type === 'critical' && styles.criticalAlert]}
    onPress={() => Alert.alert(title, description)}
  >
    <View style={styles.alertIcon}>
      {icon}
    </View>
    <View style={styles.alertContent}>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertDescription}>{description}</Text>
      {action && (
        <Text style={styles.alertAction}>{action}</Text>
      )}
    </View>
  </TouchableOpacity>
);

export default function DashboardScreen() {
  const dadosHoje = {
    total_bruto: 325.80,
    total_liquido: 240.30,
    ganho_por_hora: 28.23,
    meta_diaria: 300.00,
    apps: {
      zaggy: { ganhos: 85.50, entregas: 6 },
      ifood: { ganhos: 127.30, entregas: 9 },
      rappi: { ganhos: 45.80, entregas: 3 },
      uber: { ganhos: 67.20, entregas: 4 }
    }
  };

  const progressoMeta = (dadosHoje.total_liquido / dadosHoje.meta_diaria) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ZaggyLogo size="medium" />
            <View>
              <Text style={styles.greeting}>Boa tarde, João! 👋</Text>
              <Text style={styles.subtitle}>Vamos fazer um ótimo dia de trabalho</Text>
            </View>
          </View>
        </View>

        {/* Vagas Zaggy Disponíveis - PRIORIDADE MÁXIMA */}
        <DashboardCard>
          <View style={styles.vagasHeader}>
            <Text style={styles.sectionTitlePriority}>🎯 Vagas Zaggy Disponíveis</Text>
            <TouchableOpacity>
              <Text style={styles.verTodas}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.vagaCard}>
            <View style={styles.vagaInfo}>
              <Text style={styles.vagaRestaurante}>Burger King Centro</Text>
              <Text style={styles.vagaDetalhes}>Hoje 18h-22h • R$ 80,00</Text>
              <View style={styles.vagaLocation}>
                <MapPin size={14} color="#9AA0A6" />
                <Text style={styles.vagaDistance}>1.2km de você</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.vagaButton}>
              <Text style={styles.vagaButtonText}>ACEITAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.vagaCard}>
            <View style={styles.vagaInfo}>
              <Text style={styles.vagaRestaurante}>McDonald's Shopping</Text>
              <Text style={styles.vagaDetalhes}>Amanhã 11h-15h • R$ 60,00</Text>
              <View style={styles.vagaLocation}>
                <MapPin size={14} color="#9AA0A6" />
                <Text style={styles.vagaDistance}>2.8km de você</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.vagaButton, styles.vagaButtonSecondary]}>
              <Text style={styles.vagaButtonSecondaryText}>FAVORITAR</Text>
            </TouchableOpacity>
          </View>
        </DashboardCard>

        {/* Performance Card */}
        <DashboardCard style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <Text style={styles.performanceTitle}>Performance Hoje</Text>
            <View style={styles.trendingIcon}>
              <TrendingUp size={20} color="#27AE60" />
            </View>
          </View>
          
          <View style={styles.performanceStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>R$ {dadosHoje.total_liquido.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Líquido</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>R$ {dadosHoje.ganho_por_hora.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Por hora</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Object.values(dadosHoje.apps).reduce((acc, app) => acc + app.entregas, 0)}</Text>
              <Text style={styles.statLabel}>Entregas</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Meta diária</Text>
              <Text style={styles.progressValue}>{progressoMeta.toFixed(0)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(progressoMeta, 100)}%` }]} />
            </View>
            <Text style={styles.progressTarget}>Meta: R$ {dadosHoje.meta_diaria.toFixed(2)}</Text>
          </View>
        </DashboardCard>

        {/* Multi-App Dashboard */}
        <DashboardCard>
          <Text style={styles.sectionTitle}>Receitas por App</Text>
          <View style={styles.appsGrid}>
            <View style={[styles.appCard, { borderLeftColor: '#FF6B35' }]}>
              <Text style={styles.appName}>Zaggy</Text>
              <Text style={styles.appEarnings}>R$ {dadosHoje.apps.zaggy.ganhos.toFixed(2)}</Text>
              <Text style={styles.appStats}>{dadosHoje.apps.zaggy.entregas} entregas</Text>
            </View>
            <View style={[styles.appCard, { borderLeftColor: '#EA1D2C' }]}>
              <Text style={styles.appName}>iFood</Text>
              <Text style={styles.appEarnings}>R$ {dadosHoje.apps.ifood.ganhos.toFixed(2)}</Text>
              <Text style={styles.appStats}>{dadosHoje.apps.ifood.entregas} entregas</Text>
            </View>
            <View style={[styles.appCard, { borderLeftColor: '#FF1744' }]}>
              <Text style={styles.appName}>Rappi</Text>
              <Text style={styles.appEarnings}>R$ {dadosHoje.apps.rappi.ganhos.toFixed(2)}</Text>
              <Text style={styles.appStats}>{dadosHoje.apps.rappi.entregas} entregas</Text>
            </View>
            <View style={[styles.appCard, { borderLeftColor: '#000000' }]}>
              <Text style={styles.appName}>Uber</Text>
              <Text style={styles.appEarnings}>R$ {dadosHoje.apps.uber.ganhos.toFixed(2)}</Text>
              <Text style={styles.appStats}>{dadosHoje.apps.uber.entregas} entregas</Text>
            </View>
          </View>
        </DashboardCard>

        {/* Alertas Críticos */}
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>Alertas Importantes</Text>
          
          <AlertCard
            icon={<AlertTriangle size={24} color="#E74C3C" />}
            title="CNH VENCE EM 25 DIAS!"
            description="Dr. João - Renovação expressa"
            action="R$ 180 • 500m de você • AGENDAR"
            type="critical"
          />
          
          <AlertCard
            icon={<Clock size={24} color="#F39C12" />}
            title="DAS MEI vence em 5 dias"
            description="Janeiro 2025 - R$ 75,00"
            action="PAGAR AGORA"
          />
        </View>

        {/* Ofertas Personalizadas */}
        <DashboardCard>
          <Text style={styles.sectionTitle}>Ofertas para Você</Text>
          
          <View style={styles.ofertaCard}>
            <View style={styles.ofertaIcon}>
              <Zap size={20} color="#FFD700" />
            </View>
            <View style={styles.ofertaContent}>
              <Text style={styles.ofertaTitle}>Combustível 10% OFF</Text>
              <Text style={styles.ofertaDescription}>Shell Centro • Válido até 18h</Text>
            </View>
            <TouchableOpacity style={styles.ofertaButton}>
              <Text style={styles.ofertaButtonText}>USAR</Text>
            </TouchableOpacity>
          </View>
        </DashboardCard>

        {/* Clima e Trânsito */}
        <DashboardCard>
          <View style={styles.weatherCard}>
            <View style={styles.weatherInfo}>
              <Cloud size={24} color="#5F6368" />
              <View style={styles.weatherText}>
                <Text style={styles.weatherTemp}>24°C</Text>
                <Text style={styles.weatherDesc}>Parcialmente nublado</Text>
              </View>
            </View>
            <View style={styles.trafficInfo}>
              <Text style={styles.trafficLabel}>Trânsito Centro</Text>
              <Text style={styles.trafficStatus}>🟡 Moderado</Text>
            </View>
          </View>
        </DashboardCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
  },
  subtitle: {
    fontSize: 14,
    color: '#5F6368',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  performanceCard: {
    backgroundColor: '#FF6B35',
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  trendingIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressTarget: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  sectionTitlePriority: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 16,
  },
  appsGrid: {
    gap: 12,
  },
  appCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  appEarnings: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27AE60',
  },
  appStats: {
    fontSize: 12,
    color: '#5F6368',
    marginTop: 2,
  },
  alertsSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
  },
  criticalAlert: {
    borderLeftColor: '#E74C3C',
    backgroundColor: '#FFF5F5',
  },
  alertIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 4,
  },
  alertAction: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  vagasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  verTodas: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  vagaCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vagaInfo: {
    flex: 1,
  },
  vagaRestaurante: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  vagaDetalhes: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 4,
  },
  vagaLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vagaDistance: {
    fontSize: 12,
    color: '#9AA0A6',
    marginLeft: 4,
  },
  vagaButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  vagaButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  vagaButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  vagaButtonSecondaryText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '700',
  },
  ofertaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  ofertaIcon: {
    backgroundColor: '#FFF3CD',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  ofertaContent: {
    flex: 1,
  },
  ofertaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 2,
  },
  ofertaDescription: {
    fontSize: 12,
    color: '#5F6368',
  },
  ofertaButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  ofertaButtonText: {
    color: '#202124',
    fontSize: 12,
    fontWeight: '700',
  },
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    marginLeft: 12,
  },
  weatherTemp: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  weatherDesc: {
    fontSize: 12,
    color: '#5F6368',
  },
  trafficInfo: {
    alignItems: 'flex-end',
  },
  trafficLabel: {
    fontSize: 12,
    color: '#5F6368',
  },
  trafficStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
  },
});