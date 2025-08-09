import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, TrendingUp, TrendingDown, Calendar, Filter, Download, Eye, EyeOff, ChartBar as BarChart3, Target, DollarSign } from 'lucide-react-native';

const FinanceCard = ({ children, style = {} }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const AppFinanceCard = ({ app, data, color }) => (
  <View style={[styles.appFinanceCard, { borderLeftColor: color }]}>
    <View style={styles.appHeader}>
      <Text style={styles.appName}>{app}</Text>
      <TouchableOpacity>
        <Eye size={16} color="#9AA0A6" />
      </TouchableOpacity>
    </View>
    <Text style={styles.appEarnings}>R$ {data.ganhos.toFixed(2)}</Text>
    <View style={styles.appStats}>
      <Text style={styles.appStat}>{data.entregas} entregas</Text>
      <Text style={styles.appStat}>{data.km || 0}km</Text>
    </View>
  </View>
);

export default function FinanceiroScreen() {
  const { user, profile, entregadorProfile } = useAuth();
  const [showValues, setShowValues] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('hoje');
  const [dadosFinanceiros, setDadosFinanceiros] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDadosFinanceiros();
  }, [selectedPeriod, user]);

  const carregarDadosFinanceiros = async () => {
    if (!user || !entregadorProfile) return;

    try {
      // Simular carregamento de dados financeiros
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData = {
        hoje: {
          zaggy: { ganhos: 85.50, entregas: 6, km: 45 },
          ifood: { ganhos: 127.30, entregas: 9, km: 67 },
          rappi: { ganhos: 45.80, entregas: 3, km: 23 },
          uber: { ganhos: 67.20, entregas: 4, km: 31 },
          total_bruto: 325.80,
          gastos: { combustivel: 67.50, alimentacao: 18.00 },
          total_liquido: 240.30,
          ganho_por_hora: 28.23
        },
        semana: {
          total_bruto: 1847.50,
          total_liquido: 1456.20,
          gastos_total: 391.30,
          dias_trabalhados: 6
        },
        mes: {
          total_bruto: 7890.40,
          total_liquido: 6234.80,
          gastos_total: 1655.60,
          dias_trabalhados: 24
        }
      };

      setDadosFinanceiros(mockData);
    } catch (error) {
      console.error('Erro ao carregar dados financeiros:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados financeiros');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando dados financeiros...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const dados = dadosFinanceiros?.[selectedPeriod];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Central Financeira</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setShowValues(!showValues)}
            >
              {showValues ? <Eye size={20} color="#5F6368" /> : <EyeOff size={20} color="#5F6368" />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Filter size={20} color="#5F6368" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Período Selector */}
        <View style={styles.periodSelector}>
          {['hoje', 'semana', 'mes'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive
              ]}>
                {period === 'hoje' ? 'Hoje' : period === 'semana' ? 'Semana' : 'Mês'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resumo Financeiro */}
        <FinanceCard style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Resumo {selectedPeriod === 'hoje' ? 'de Hoje' : selectedPeriod === 'semana' ? 'da Semana' : 'do Mês'}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Receita Bruta</Text>
              <Text style={styles.summaryValue}>
                {showValues ? `R$ ${dados?.total_bruto?.toFixed(2) || '0,00'}` : '••••••'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Gastos</Text>
              <Text style={styles.summaryValueNegative}>
                {showValues ? `- R$ ${dados?.gastos_total?.toFixed(2) || (dados?.gastos ? (dados.gastos.combustivel + dados.gastos.alimentacao).toFixed(2) : '0,00')}` : '••••••'}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Líquido</Text>
              <Text style={styles.summaryValueFinal}>
                {showValues ? `R$ ${dados?.total_liquido?.toFixed(2) || '0,00'}` : '••••••'}
              </Text>
            </View>
          </View>

          {selectedPeriod === 'hoje' && dados?.ganho_por_hora && (
            <View style={styles.hourlyRate}>
              <TrendingUp size={16} color="#27AE60" />
              <Text style={styles.hourlyRateText}>
                R$ {dados.ganho_por_hora.toFixed(2)}/hora
              </Text>
            </View>
          )}
        </FinanceCard>

        {/* Apps Performance */}
        {selectedPeriod === 'hoje' && dados?.zaggy && (
          <FinanceCard>
            <View style={styles.appsHeader}>
              <Text style={styles.sectionTitle}>Performance por App</Text>
              <TouchableOpacity>
                <Text style={styles.viewDetails}>Detalhes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.appsGrid}>
              <AppFinanceCard 
                app="Zaggy" 
                data={dados.zaggy} 
                color="#FF6B35" 
              />
              <AppFinanceCard 
                app="iFood" 
                data={dados.ifood} 
                color="#EA1D2C" 
              />
              <AppFinanceCard 
                app="Rappi" 
                data={dados.rappi} 
                color="#FF1744" 
              />
              <AppFinanceCard 
                app="Uber" 
                data={dados.uber} 
                color="#000000" 
              />
            </View>

            <View style={styles.bestApp}>
              <Text style={styles.bestAppLabel}>Melhor performance hoje:</Text>
              <Text style={styles.bestAppName}>iFood - R$ 127,30</Text>
            </View>
          </FinanceCard>
        )}

        {/* Lançamento Rápido */}
        <FinanceCard>
          <Text style={styles.sectionTitle}>Lançamento Rápido</Text>
          
          <View style={styles.quickEntryForm}>
            <View style={styles.formRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>App</Text>
                <TouchableOpacity style={styles.appSelector}>
                  <Text style={styles.appSelectorText}>Selecionar App</Text>
                </TouchableOpacity>
                <View style={styles.appOptions}>
                  <TouchableOpacity style={styles.appOption}>
                    <Text style={styles.appOptionText}>Zaggy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.appOption}>
                    <Text style={styles.appOptionText}>iFood</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.appOption}>
                    <Text style={styles.appOptionText}>Rappi</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.appOption}>
                    <Text style={styles.appOptionText}>Uber Eats</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Valor</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.formRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Entregas</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>KM</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>SALVAR RECEITA</Text>
            </TouchableOpacity>
          </View>
        </FinanceCard>

        {/* Gastos Recentes */}
        <FinanceCard>
          <View style={styles.gastosHeader}>
            <Text style={styles.sectionTitle}>Gastos Recentes</Text>
            <TouchableOpacity style={styles.addGastoButton}>
              <Plus size={16} color="#FF6B35" />
              <Text style={styles.addGastoText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gastosQuickAdd}>
            <Text style={styles.gastosQuickTitle}>Adicionar Rápido:</Text>
            <View style={styles.gastosQuickButtons}>
              <TouchableOpacity style={styles.gastoQuickButton}>
                <Text style={styles.gastoQuickText}>Combustível</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gastoQuickButton}>
                <Text style={styles.gastoQuickText}>Alimentação</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gastoQuickButton}>
                <Text style={styles.gastoQuickText}>Manutenção</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.gastosList}>
            <View style={styles.gastoItem}>
              <View style={styles.gastoInfo}>
                <Text style={styles.gastoDescription}>Combustível - Shell Centro</Text>
                <Text style={styles.gastoDate}>Hoje, 14:30</Text>
              </View>
              <Text style={styles.gastoValue}>- R$ 45,00</Text>
            </View>
            
            <View style={styles.gastoItem}>
              <View style={styles.gastoInfo}>
                <Text style={styles.gastoDescription}>Almoço - Restaurante do João</Text>
                <Text style={styles.gastoDate}>Hoje, 12:15</Text>
              </View>
              <Text style={styles.gastoValue}>- R$ 18,00</Text>
            </View>
            
            <View style={styles.gastoItem}>
              <View style={styles.gastoInfo}>
                <Text style={styles.gastoDescription}>Manutenção - Troca óleo</Text>
                <Text style={styles.gastoDate}>Ontem</Text>
              </View>
              <Text style={styles.gastoValue}>- R$ 35,00</Text>
            </View>
          </View>
        </FinanceCard>

        {/* Ações Rápidas */}
        <FinanceCard>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Calendar size={24} color="#FF6B35" />
              <Text style={styles.quickActionText}>Relatório Mensal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <Download size={24} color="#FF6B35" />
              <Text style={styles.quickActionText}>Exportar PDF</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <Target size={24} color="#FF6B35" />
              <Text style={styles.quickActionText}>Metas</Text>
            </TouchableOpacity>
          </View>
        </FinanceCard>

        {/* Análise Avançada */}
        <FinanceCard>
          <Text style={styles.sectionTitle}>Análise Avançada</Text>
          
          <View style={styles.analysisGrid}>
            <View style={styles.analysisItem}>
              <BarChart3 size={20} color="#FF6B35" />
              <Text style={styles.analysisLabel}>Ticket Médio</Text>
              <Text style={styles.analysisValue}>R$ 14,80</Text>
            </View>
            
            <View style={styles.analysisItem}>
              <TrendingUp size={20} color="#27AE60" />
              <Text style={styles.analysisLabel}>Crescimento</Text>
              <Text style={styles.analysisValue}>+12%</Text>
            </View>
            
            <View style={styles.analysisItem}>
              <DollarSign size={20} color="#3B82F6" />
              <Text style={styles.analysisLabel}>Margem</Text>
              <Text style={styles.analysisValue}>73.8%</Text>
            </View>
          </View>
        </FinanceCard>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#FF6B35',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5F6368',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
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
  summaryCard: {
    backgroundColor: '#27AE60',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  summaryStats: {
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryValueNegative: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFB3B3',
  },
  summaryValueFinal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 8,
  },
  hourlyRate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  hourlyRateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  appsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewDetails: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  appsGrid: {
    gap: 12,
  },
  appFinanceCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  appEarnings: {
    fontSize: 20,
    fontWeight: '700',
    color: '#27AE60',
    marginBottom: 8,
  },
  appStats: {
    flexDirection: 'row',
    gap: 16,
  },
  appStat: {
    fontSize: 12,
    color: '#5F6368',
  },
  bestApp: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
    alignItems: 'center',
  },
  bestAppLabel: {
    fontSize: 14,
    color: '#5F6368',
  },
  bestAppName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
    marginTop: 4,
  },
  quickEntryForm: {
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  appSelector: {
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  appSelectorText: {
    fontSize: 16,
    color: '#202124',
  },
  appOptions: {
    marginTop: 8,
    gap: 8,
  },
  appOption: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  appOptionText: {
    fontSize: 14,
    color: '#202124',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  gastosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addGastoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addGastoText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  gastosQuickAdd: {
    marginBottom: 16,
  },
  gastosQuickTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 8,
  },
  gastosQuickButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  gastoQuickButton: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  gastoQuickText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  gastosList: {
    gap: 12,
  },
  gastoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  gastoInfo: {
    flex: 1,
  },
  gastoDescription: {
    fontSize: 16,
    color: '#202124',
    marginBottom: 2,
  },
  gastoDate: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  gastoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E74C3C',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#5F6368',
    fontWeight: '600',
  },
  analysisGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  analysisItem: {
    alignItems: 'center',
    gap: 8,
  },
  analysisLabel: {
    fontSize: 12,
    color: '#5F6368',
    fontWeight: '600',
  },
  analysisValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#202124',
  },
});