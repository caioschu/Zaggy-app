import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { ChartBar as BarChart3, Download, Calendar, TrendingUp, DollarSign, Users, Target, FileText, Eye, Filter } from 'lucide-react-native';

const ReportCard = ({ title, description, icon, onGenerate, onView }) => (
  <View style={styles.reportCard}>
    <View style={styles.reportIcon}>
      {icon}
    </View>
    <View style={styles.reportContent}>
      <Text style={styles.reportTitle}>{title}</Text>
      <Text style={styles.reportDescription}>{description}</Text>
    </View>
    <View style={styles.reportActions}>
      <TouchableOpacity style={styles.reportActionButton} onPress={onView}>
        <Eye size={16} color="#5F6368" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.reportActionButton} onPress={onGenerate}>
        <Download size={16} color="#FF6B35" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function RelatoriosScreen() {
  const { user, profile, empresaProfile, entregadorProfile } = useAuth();
  const [dadosRelatorios, setDadosRelatorios] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDadosRelatorios();
  }, [user]);

  const carregarDadosRelatorios = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (profile?.user_type === 'entregador') {
        setDadosRelatorios({
          performance_mensal: {
            receita_total: 7890.40,
            gastos_total: 1655.60,
            lucro_liquido: 6234.80,
            entregas_total: 156,
            dias_trabalhados: 24
          },
          apps_breakdown: {
            zaggy: 2340.00,
            ifood: 2890.50,
            rappi: 1450.20,
            uber: 1209.70
          },
          mei_data: {
            faturamento_2024: 40200.00,
            limite_anual: 81000.00,
            das_pendentes: 1
          }
        });
      } else {
        setDadosRelatorios({
          vagas_performance: {
            total_vagas: 47,
            taxa_preenchimento: 94,
            gasto_total: 4580.00,
            economia_vs_apps: 1240.00
          },
          entregadores_stats: {
            total_cadastrados: 23,
            favoritos: 8,
            media_avaliacao: 4.7,
            ativos_mes: 18
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados de relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = (type: string) => {
    Alert.alert(
      'Gerar Relatório',
      `Relatório ${type} será gerado e enviado por email`,
      [
        { text: 'Cancelar' },
        { text: 'Gerar', onPress: () => Alert.alert('Sucesso', 'Relatório gerado com sucesso!') }
      ]
    );
  };

  const handleViewReport = (type: string) => {
    Alert.alert('Visualizar', `Abrindo relatório ${type}...`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando relatórios...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Relatórios para Entregadores
  if (profile?.user_type === 'entregador') {
    const dados = dadosRelatorios;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Meus Relatórios</Text>
              <Text style={styles.subtitle}>Análises detalhadas da sua performance</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#5F6368" />
            </TouchableOpacity>
          </View>

          {/* Resumo Rápido */}
          <View style={styles.quickSummary}>
            <View style={styles.summaryCard}>
              <DollarSign size={24} color="#27AE60" />
              <Text style={styles.summaryValue}>R$ {dados?.performance_mensal?.lucro_liquido?.toFixed(2) || '0,00'}</Text>
              <Text style={styles.summaryLabel}>Lucro Líquido (Mês)</Text>
            </View>
            <View style={styles.summaryCard}>
              <Target size={24} color="#FF6B35" />
              <Text style={styles.summaryValue}>{dados?.performance_mensal?.entregas_total || 0}</Text>
              <Text style={styles.summaryLabel}>Entregas (Mês)</Text>
            </View>
            <View style={styles.summaryCard}>
              <TrendingUp size={24} color="#3B82F6" />
              <Text style={styles.summaryValue}>
                {dados?.performance_mensal ? 
                  ((dados.performance_mensal.lucro_liquido / dados.performance_mensal.receita_total) * 100).toFixed(1) : 0
                }%
              </Text>
              <Text style={styles.summaryLabel}>Margem Lucro</Text>
            </View>
          </View>

          {/* Relatórios Disponíveis */}
          <View style={styles.reportsContainer}>
            <Text style={styles.sectionTitle}>Relatórios Disponíveis</Text>
            
            <ReportCard
              title="Performance Mensal"
              description="Análise completa de receitas, gastos e produtividade"
              icon={<BarChart3 size={24} color="#FF6B35" />}
              onGenerate={() => handleGenerateReport('Performance Mensal')}
              onView={() => handleViewReport('Performance Mensal')}
            />
            
            <ReportCard
              title="Relatório MEI"
              description="Dados organizados para sua contabilidade e Receita Federal"
              icon={<FileText size={24} color="#3B82F6" />}
              onGenerate={() => handleGenerateReport('MEI')}
              onView={() => handleViewReport('MEI')}
            />
            
            <ReportCard
              title="Comparativo de Apps"
              description="Performance detalhada por aplicativo de delivery"
              icon={<TrendingUp size={24} color="#27AE60" />}
              onGenerate={() => handleGenerateReport('Comparativo Apps')}
              onView={() => handleViewReport('Comparativo Apps')}
            />
            
            <ReportCard
              title="Histórico Anual"
              description="Todos os dados de 2024 para Imposto de Renda"
              icon={<Calendar size={24} color="#8B5CF6" />}
              onGenerate={() => handleGenerateReport('Histórico Anual')}
              onView={() => handleViewReport('Histórico Anual')}
            />
          </View>

          {/* Ações Rápidas */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionCard}>
                <Download size={24} color="#FF6B35" />
                <Text style={styles.quickActionText}>Exportar Tudo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <Calendar size={24} color="#FF6B35" />
                <Text style={styles.quickActionText}>Período Custom</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <FileText size={24} color="#FF6B35" />
                <Text style={styles.quickActionText}>Enviar Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Relatórios para Empresas
  if (profile?.user_type === 'empresa') {
    const dados = dadosRelatorios;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Relatórios Empresariais</Text>
              <Text style={styles.subtitle}>{empresaProfile?.nome_fantasia}</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#5F6368" />
            </TouchableOpacity>
          </View>

          {/* Resumo Rápido */}
          <View style={styles.quickSummary}>
            <View style={styles.summaryCard}>
              <Target size={24} color="#FF6B35" />
              <Text style={styles.summaryValue}>{dados?.vagas_performance?.total_vagas || 0}</Text>
              <Text style={styles.summaryLabel}>Vagas Criadas</Text>
            </View>
            <View style={styles.summaryCard}>
              <Users size={24} color="#3B82F6" />
              <Text style={styles.summaryValue}>{dados?.entregadores_stats?.total_cadastrados || 0}</Text>
              <Text style={styles.summaryLabel}>Entregadores</Text>
            </View>
            <View style={styles.summaryCard}>
              <DollarSign size={24} color="#27AE60" />
              <Text style={styles.summaryValue}>R$ {dados?.vagas_performance?.economia_vs_apps?.toFixed(0) || '0'}</Text>
              <Text style={styles.summaryLabel}>Economia (Mês)</Text>
            </View>
          </View>

          {/* Relatórios Disponíveis */}
          <View style={styles.reportsContainer}>
            <Text style={styles.sectionTitle}>Relatórios Disponíveis</Text>
            
            <ReportCard
              title="Performance de Vagas"
              description="Análise de candidatos, preenchimento e custos"
              icon={<Target size={24} color="#FF6B35" />}
              onGenerate={() => handleGenerateReport('Performance Vagas')}
              onView={() => handleViewReport('Performance Vagas')}
            />
            
            <ReportCard
              title="Gestão de Entregadores"
              description="Estatísticas dos seus entregadores favoritos"
              icon={<Users size={24} color="#3B82F6" />}
              onGenerate={() => handleGenerateReport('Entregadores')}
              onView={() => handleViewReport('Entregadores')}
            />
            
            <ReportCard
              title="Financeiro Detalhado"
              description="Custos, pagamentos e comparativo com outros apps"
              icon={<DollarSign size={24} color="#27AE60" />}
              onGenerate={() => handleGenerateReport('Financeiro')}
              onView={() => handleViewReport('Financeiro')}
            />
            
            <ReportCard
              title="Notas Fiscais"
              description="Relatório de todas as NFs emitidas e pendentes"
              icon={<FileText size={24} color="#8B5CF6" />}
              onGenerate={() => handleGenerateReport('Notas Fiscais')}
              onView={() => handleViewReport('Notas Fiscais')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accessDenied}>
        <BarChart3 size={48} color="#DADCE0" />
        <Text style={styles.accessDeniedTitle}>Relatórios</Text>
        <Text style={styles.accessDeniedText}>
          Faça login para acessar seus relatórios
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  accessDeniedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5F6368',
  },
  accessDeniedText: {
    fontSize: 16,
    color: '#9AA0A6',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#5F6368',
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
  subtitle: {
    fontSize: 14,
    color: '#5F6368',
    marginTop: 2,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  quickSummary: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202124',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9AA0A6',
    textAlign: 'center',
  },
  reportsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportIcon: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: '#5F6368',
    lineHeight: 20,
  },
  reportActions: {
    flexDirection: 'row',
    gap: 8,
  },
  reportActionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: '#5F6368',
    fontWeight: '600',
    textAlign: 'center',
  },
});