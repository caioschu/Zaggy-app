import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import ZaggyLogo from '@/components/ZaggyLogo';
import { TrendingUp, Clock, MapPin, TriangleAlert as AlertTriangle, Star, Target, DollarSign, Users, Calendar, Plus, Eye, CreditCard as Edit, Trash2 } from 'lucide-react-native';

export default function DashboardScreen() {
  const { user, profile, entregadorProfile, empresaProfile } = useAuth();
  const [dadosFinanceiros, setDadosFinanceiros] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && profile) {
      carregarDadosDashboard();
    }
  }, [user, profile]);

  const carregarDadosDashboard = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (profile?.user_type === 'entregador') {
        setDadosFinanceiros({
          hoje: {
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
          }
        });
      } else {
        setDadosFinanceiros({
          hoje: {
            vagas_ativas: 3,
            entregadores_trabalhando: 8,
            gastos_total: 340.00,
            receita_estimada: 1240.00
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dashboard...</Text>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return <WebDashboard />;
  } else {
    return <MobileDashboard />;
  }
}

function WebDashboard() {
  const { profile, entregadorProfile, empresaProfile } = useAuth();

  if (profile?.user_type === 'entregador') {
    return (
      <div style={webStyles.container}>
        <div style={webStyles.header}>
          <div>
            <h1 style={webStyles.title}>Dashboard Entregador</h1>
            <p style={webStyles.subtitle}>Bem-vindo, {entregadorProfile?.nome}</p>
          </div>
          <div style={webStyles.headerActions}>
            <button style={webStyles.primaryButton}>
              <Plus size={20} color="#FFFFFF" />
              <span>Nova Receita</span>
            </button>
          </div>
        </div>

        <div style={webStyles.grid}>
          {/* Performance Card */}
          <div style={webStyles.cardLarge}>
            <div style={webStyles.cardHeader}>
              <h2 style={webStyles.cardTitle}>Performance Hoje</h2>
              <TrendingUp size={24} color="#27AE60" />
            </div>
            
            <div style={webStyles.statsGrid}>
              <div style={webStyles.statItem}>
                <span style={webStyles.statValue}>R$ 240,30</span>
                <span style={webStyles.statLabel}>Líquido</span>
              </div>
              <div style={webStyles.statItem}>
                <span style={webStyles.statValue}>R$ 28,23</span>
                <span style={webStyles.statLabel}>Por hora</span>
              </div>
              <div style={webStyles.statItem}>
                <span style={webStyles.statValue}>22</span>
                <span style={webStyles.statLabel}>Entregas</span>
              </div>
            </div>

            <div style={webStyles.progressContainer}>
              <div style={webStyles.progressHeader}>
                <span>Meta diária</span>
                <span>80%</span>
              </div>
              <div style={webStyles.progressBar}>
                <div style={{...webStyles.progressFill, width: '80%'}} />
              </div>
            </div>
          </div>

          {/* Apps Performance */}
          <div style={webStyles.cardMedium}>
            <h3 style={webStyles.cardTitle}>Receitas por App</h3>
            <div style={webStyles.appsList}>
              <div style={{...webStyles.appItem, borderLeftColor: '#EA1D2C'}}>
                <span style={webStyles.appName}>iFood</span>
                <span style={webStyles.appValue}>R$ 127,30</span>
              </div>
              <div style={{...webStyles.appItem, borderLeftColor: '#FF6B35'}}>
                <span style={webStyles.appName}>Zaggy</span>
                <span style={webStyles.appValue}>R$ 85,50</span>
              </div>
              <div style={{...webStyles.appItem, borderLeftColor: '#000000'}}>
                <span style={webStyles.appName}>Uber</span>
                <span style={webStyles.appValue}>R$ 67,20</span>
              </div>
            </div>
          </div>

          {/* Vagas Disponíveis */}
          <div style={webStyles.cardMedium}>
            <div style={webStyles.cardHeader}>
              <h3 style={webStyles.cardTitle}>Vagas Disponíveis</h3>
              <button style={webStyles.linkButton}>Ver todas</button>
            </div>
            
            <div style={webStyles.vagasList}>
              <div style={webStyles.vagaItem}>
                <div>
                  <h4 style={webStyles.vagaTitle}>Burger King Centro</h4>
                  <p style={webStyles.vagaDetails}>Hoje 18h-22h • 1.2km</p>
                </div>
                <div style={webStyles.vagaActions}>
                  <span style={webStyles.vagaValue}>R$ 80,00</span>
                  <button style={webStyles.acceptButton}>Aceitar</button>
                </div>
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div style={webStyles.cardMedium}>
            <h3 style={webStyles.cardTitle}>Alertas Importantes</h3>
            <div style={webStyles.alertsList}>
              <div style={webStyles.alertItem}>
                <AlertTriangle size={20} color="#E74C3C" />
                <div>
                  <p style={webStyles.alertTitle}>CNH vence em 25 dias</p>
                  <p style={webStyles.alertDesc}>Agende renovação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Empresa
  return (
    <div style={webStyles.container}>
      <div style={webStyles.header}>
        <div>
          <h1 style={webStyles.title}>Dashboard Empresa</h1>
          <p style={webStyles.subtitle}>{empresaProfile?.nome_fantasia}</p>
        </div>
        <div style={webStyles.headerActions}>
          <button style={webStyles.primaryButton}>
            <Plus size={20} color="#FFFFFF" />
            <span>Nova Vaga</span>
          </button>
        </div>
      </div>

      <div style={webStyles.statsRow}>
        <div style={webStyles.statCard}>
          <Target size={32} color="#FF6B35" />
          <span style={webStyles.statValue}>3</span>
          <span style={webStyles.statLabel}>Vagas Ativas</span>
        </div>
        <div style={webStyles.statCard}>
          <Users size={32} color="#27AE60" />
          <span style={webStyles.statValue}>8</span>
          <span style={webStyles.statLabel}>Entregadores</span>
        </div>
        <div style={webStyles.statCard}>
          <DollarSign size={32} color="#E74C3C" />
          <span style={webStyles.statValue}>R$ 340</span>
          <span style={webStyles.statLabel}>Gastos Hoje</span>
        </div>
      </div>

      <div style={webStyles.grid}>
        <div style={webStyles.cardLarge}>
          <div style={webStyles.cardHeader}>
            <h2 style={webStyles.cardTitle}>Vagas Recentes</h2>
            <button style={webStyles.linkButton}>Gerenciar</button>
          </div>
          
          <div style={webStyles.table}>
            <div style={webStyles.tableHeader}>
              <span>Vaga</span>
              <span>Data</span>
              <span>Valor</span>
              <span>Status</span>
              <span>Ações</span>
            </div>
            <div style={webStyles.tableRow}>
              <span>Turno 18h-22h</span>
              <span>Hoje</span>
              <span>R$ 80,00</span>
              <span style={webStyles.statusBadge}>Aberta</span>
              <div style={webStyles.tableActions}>
                <button style={webStyles.iconButton}>
                  <Eye size={16} color="#5F6368" />
                </button>
                <button style={webStyles.iconButton}>
                  <Edit size={16} color="#5F6368" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={webStyles.cardMedium}>
          <h3 style={webStyles.cardTitle}>Entregadores Ativos</h3>
          <div style={webStyles.entregadoresList}>
            <div style={webStyles.entregadorItem}>
              <div style={webStyles.entregadorAvatar}>JS</div>
              <div>
                <p style={webStyles.entregadorNome}>João Silva</p>
                <div style={webStyles.entregadorRating}>
                  <Star size={14} color="#FFD700" />
                  <span>4.8</span>
                </div>
              </div>
              <div style={webStyles.onlineIndicator} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDashboard() {
  const { profile, entregadorProfile, empresaProfile } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mobileHeader}>
          <ZaggyLogo size="medium" />
          <View style={styles.mobileHeaderText}>
            <Text style={styles.mobileGreeting}>
              Olá, {profile?.user_type === 'entregador' ? entregadorProfile?.nome : empresaProfile?.nome_fantasia}
            </Text>
            <Text style={styles.mobileSubtitle}>
              {profile?.user_type === 'entregador' ? 'Vamos trabalhar hoje' : 'Dashboard de gestão'}
            </Text>
          </View>
        </View>

        {profile?.user_type === 'entregador' ? (
          <>
            <View style={[styles.card, styles.performanceCard]}>
              <Text style={styles.performanceTitle}>Performance Hoje</Text>
              <View style={styles.performanceStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>R$ 240,30</Text>
                  <Text style={styles.statLabel}>Líquido</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>22</Text>
                  <Text style={styles.statLabel}>Entregas</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Receitas por App</Text>
              <View style={styles.appsGrid}>
                <View style={[styles.appCard, { borderLeftColor: '#EA1D2C' }]}>
                  <Text style={styles.appName}>iFood</Text>
                  <Text style={styles.appEarnings}>R$ 127,30</Text>
                </View>
                <View style={[styles.appCard, { borderLeftColor: '#FF6B35' }]}>
                  <Text style={styles.appName}>Zaggy</Text>
                  <Text style={styles.appEarnings}>R$ 85,50</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Target size={24} color="#FF6B35" />
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Vagas</Text>
              </View>
              <View style={styles.statCard}>
                <Users size={24} color="#27AE60" />
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Entregadores</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const webStyles = {
  container: {
    padding: '32px',
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #E5E7EB',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 4px 0',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6B7280',
    margin: '0',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FF6B35',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  linkButton: {
    backgroundColor: 'transparent',
    color: '#FF6B35',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: '32px',
  },
  cardLarge: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
  },
  cardMedium: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    margin: '0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: '24px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '4px',
  },
  progressContainer: {
    marginTop: '16px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#6B7280',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#F3F4F6',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: '3px',
  },
  appsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  appItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: '16px',
    borderRadius: '8px',
    borderLeft: '4px solid',
  },
  appName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },
  appValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#059669',
  },
  vagasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  vagaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: '16px',
    borderRadius: '8px',
  },
  vagaTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0',
  },
  vagaDetails: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
  },
  vagaActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
  vagaValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#059669',
  },
  acceptButton: {
    backgroundColor: '#FF6B35',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  alertItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#F9FAFB',
    padding: '16px',
    borderRadius: '8px',
  },
  alertTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 2px 0',
  },
  alertDesc: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 100px',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '14px',
    fontWeight: '600',
    color: '#6B7280',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 100px',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid #F3F4F6',
    alignItems: 'center',
    fontSize: '14px',
    color: '#111827',
  },
  statusBadge: {
    backgroundColor: '#EBF4FF',
    color: '#3B82F6',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
  },
  tableActions: {
    display: 'flex',
    gap: '8px',
  },
  iconButton: {
    backgroundColor: '#F9FAFB',
    border: 'none',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  entregadoresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  entregadorItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#F9FAFB',
    padding: '16px',
    borderRadius: '8px',
  },
  entregadorAvatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#FF6B35',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '700',
  },
  entregadorNome: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 2px 0',
  },
  entregadorRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#6B7280',
  },
  onlineIndicator: {
    width: '12px',
    height: '12px',
    backgroundColor: '#10B981',
    borderRadius: '6px',
    marginLeft: 'auto',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#5F6368',
    fontWeight: '600',
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 16,
  },
  mobileHeaderText: {
    flex: 1,
  },
  mobileGreeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202124',
  },
  mobileSubtitle: {
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  performanceCard: {
    backgroundColor: '#FF6B35',
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
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
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const getAppColor = (app: string) => {
  const colors = {
    zaggy: '#FF6B35',
    ifood: '#EA1D2C',
    rappi: '#FF1744',
    uber: '#000000'
  };
  return colors[app] || '#9AA0A6';
};