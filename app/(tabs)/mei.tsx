import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Briefcase, Calendar, FileText, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Download, Calculator, DollarSign, Clock } from 'lucide-react-native';

const MeiCard = ({ children, style = {} }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const ProgressBar = ({ value, max, color = '#FF6B35' }) => {
  const percentage = (value / max) * 100;
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${Math.min(percentage, 100)}%`, backgroundColor: color }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        {percentage.toFixed(1)}% do limite anual
      </Text>
    </View>
  );
};

export default function MeiScreen() {
  const [selectedTab, setSelectedTab] = useState('status');

  const meiData = {
    status: "ativo",
    cnpj: "12.345.678/0001-90",
    vencimento_das: "2025-01-15",
    faturamento_2025: {
      total: 40200.00,
      limite: 81000.00,
      percentual: 49.6,
      por_app: {
        zaggy: 8450.00,
        ifood: 15780.00,
        rappi: 3290.00,
        uber: 12680.00
      }
    },
    nfs_pendentes: 15,
    das_historico: [
      { mes: "Dezembro 2024", valor: 75.00, status: "pago", vencimento: "2024-12-20" },
      { mes: "Janeiro 2025", valor: 75.00, status: "pendente", vencimento: "2025-01-15" }
    ]
  };

  const getDiasParaVencimento = (dataVencimento) => {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTime = vencimento - hoje;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusDAS = (dias) => {
    if (dias < 0) return 'vencido';
    if (dias <= 5) return 'critico';
    if (dias <= 15) return 'atencao';
    return 'ok';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meu MEI</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Calculator size={20} color="#5F6368" />
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSelector}>
          {[
            { key: 'status', label: 'Status', icon: Briefcase },
            { key: 'faturamento', label: 'Faturamento', icon: TrendingUp },
            { key: 'das', label: 'DAS', icon: Calendar },
            { key: 'nfs', label: 'Notas Fiscais', icon: FileText }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  selectedTab === tab.key && styles.tabButtonActive
                ]}
                onPress={() => setSelectedTab(tab.key)}
              >
                <IconComponent 
                  size={18} 
                  color={selectedTab === tab.key ? '#FF6B35' : '#9AA0A6'} 
                />
                <Text style={[
                  styles.tabButtonText,
                  selectedTab === tab.key && styles.tabButtonTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Status Tab */}
        {selectedTab === 'status' && (
          <>
            {/* Status MEI */}
            <MeiCard style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusTitle}>MEI Ativo</Text>
                  <Text style={styles.statusCnpj}>CNPJ: {meiData.cnpj}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <CheckCircle size={20} color="#27AE60" />
                  <Text style={styles.statusBadgeText}>ATIVO</Text>
                </View>
              </View>

              <View style={styles.statusDetails}>
                <Text style={styles.statusDescription}>
                  Seu MEI está regular e você pode emitir notas fiscais normalmente.
                </Text>
              </View>
            </MeiCard>

            {/* Próximo DAS */}
            <MeiCard style={[
              styles.dasCard,
              { 
                backgroundColor: getStatusDAS(getDiasParaVencimento(meiData.vencimento_das)) === 'critico' ? '#FFF5F5' : 
                                getStatusDAS(getDiasParaVencimento(meiData.vencimento_das)) === 'atencao' ? '#FFF3CD' : '#FFFFFF'
              }
            ]}>
              <View style={styles.dasHeader}>
                <Text style={styles.sectionTitle}>Próximo DAS</Text>
                <View style={styles.dasStatus}>
                  {getStatusDAS(getDiasParaVencimento(meiData.vencimento_das)) === 'critico' && (
                    <AlertTriangle size={20} color="#E74C3C" />
                  )}
                  {getStatusDAS(getDiasParaVencimento(meiData.vencimento_das)) === 'atencao' && (
                    <Clock size={20} color="#F39C12" />
                  )}
                </View>
              </View>

              <View style={styles.dasInfo}>
                <Text style={styles.dasValor}>R$ 75,00</Text>
                <Text style={styles.dasVencimento}>
                  Vence em {getDiasParaVencimento(meiData.vencimento_das)} dias
                </Text>
                <Text style={styles.dasData}>
                  {new Date(meiData.vencimento_das).toLocaleDateString('pt-BR')}
                </Text>
              </View>

              <TouchableOpacity style={[
                styles.pagarDasButton,
                { backgroundColor: getStatusDAS(getDiasParaVencimento(meiData.vencimento_das)) === 'critico' ? '#E74C3C' : '#FF6B35' }
              ]}>
                <Text style={styles.pagarDasButtonText}>PAGAR DAS</Text>
              </TouchableOpacity>
            </MeiCard>

            {/* Ações Rápidas */}
            <MeiCard>
              <Text style={styles.sectionTitle}>Ações Rápidas</Text>
              
              <View style={styles.acoesGrid}>
                <TouchableOpacity style={styles.acaoItem}>
                  <FileText size={24} color="#FF6B35" />
                  <Text style={styles.acaoText}>Emitir NF</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.acaoItem}>
                  <Download size={24} color="#FF6B35" />
                  <Text style={styles.acaoText}>Relatório Mensal</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.acaoItem}>
                  <Calculator size={24} color="#FF6B35" />
                  <Text style={styles.acaoText}>Calcular Impostos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.acaoItem}>
                  <DollarSign size={24} color="#FF6B35" />
                  <Text style={styles.acaoText}>Histórico DAS</Text>
                </TouchableOpacity>
              </View>
            </MeiCard>
          </>
        )}

        {/* Faturamento Tab */}
        {selectedTab === 'faturamento' && (
          <>
            {/* Limite Anual */}
            <MeiCard>
              <Text style={styles.sectionTitle}>Limite Anual 2025</Text>
              
              <View style={styles.limiteInfo}>
                <Text style={styles.faturamentoAtual}>
                  R$ {meiData.faturamento_2025.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.limiteTotalLabel}>
                  de R$ {meiData.faturamento_2025.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>

              <ProgressBar 
                value={meiData.faturamento_2025.total} 
                max={meiData.faturamento_2025.limite}
                color={meiData.faturamento_2025.percentual > 80 ? '#E74C3C' : '#FF6B35'}
              />

              <View style={styles.limiteRestante}>
                <Text style={styles.limiteRestanteLabel}>Restante para o limite</Text>
                <Text style={styles.limiteRestanteValue}>
                  R$ {(meiData.faturamento_2025.limite - meiData.faturamento_2025.total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            </MeiCard>

            {/* Faturamento por App */}
            <MeiCard>
              <Text style={styles.sectionTitle}>Faturamento por App</Text>
              
              <View style={styles.appsFaturamento}>
                {Object.entries(meiData.faturamento_2025.por_app).map(([app, valor]) => {
                  const percentage = (valor / meiData.faturamento_2025.total) * 100;
                  const appColors = {
                    zaggy: '#FF6B35',
                    ifood: '#EA1D2C',
                    rappi: '#FF1744',
                    uber: '#000000'
                  };
                  
                  return (
                    <View key={app} style={styles.appFaturamentoItem}>
                      <View style={styles.appFaturamentoHeader}>
                        <Text style={styles.appFaturamentoNome}>
                          {app.charAt(0).toUpperCase() + app.slice(1)}
                        </Text>
                        <Text style={styles.appFaturamentoPercentual}>
                          {percentage.toFixed(1)}%
                        </Text>
                      </View>
                      <Text style={styles.appFaturamentoValor}>
                        R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </Text>
                      <View style={styles.appProgressBar}>
                        <View 
                          style={[
                            styles.appProgressFill, 
                            { 
                              width: `${percentage}%`, 
                              backgroundColor: appColors[app] || '#9AA0A6' 
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </MeiCard>
          </>
        )}

        {/* DAS Tab */}
        {selectedTab === 'das' && (
          <>
            {/* Histórico DAS */}
            <MeiCard>
              <Text style={styles.sectionTitle}>Histórico DAS</Text>
              
              {meiData.das_historico.map((das, index) => (
                <View key={index} style={styles.dasHistoricoItem}>
                  <View style={styles.dasHistoricoInfo}>
                    <Text style={styles.dasHistoricoMes}>{das.mes}</Text>
                    <Text style={styles.dasHistoricoVencimento}>
                      Vencimento: {new Date(das.vencimento).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                  
                  <View style={styles.dasHistoricoStatus}>
                    <Text style={styles.dasHistoricoValor}>R$ {das.valor.toFixed(2)}</Text>
                    <View style={[
                      styles.dasStatusBadge,
                      { backgroundColor: das.status === 'pago' ? '#F0F9FF' : '#FFF3CD' }
                    ]}>
                      {das.status === 'pago' ? (
                        <CheckCircle size={16} color="#27AE60" />
                      ) : (
                        <Clock size={16} color="#F39C12" />
                      )}
                      <Text style={[
                        styles.dasStatusText,
                        { color: das.status === 'pago' ? '#27AE60' : '#F39C12' }
                      ]}>
                        {das.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </MeiCard>

            {/* Calculadora DAS */}
            <MeiCard>
              <Text style={styles.sectionTitle}>Calculadora DAS</Text>
              
              <View style={styles.calculadoraInfo}>
                <Text style={styles.calculadoraDescricao}>
                  Como MEI, você paga um valor fixo mensal de R$ 75,00 independente do faturamento.
                </Text>
                
                <View style={styles.calculadoraBreakdown}>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>INSS</Text>
                    <Text style={styles.breakdownValue}>R$ 66,00</Text>
                  </View>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>ICMS</Text>
                    <Text style={styles.breakdownValue}>R$ 1,00</Text>
                  </View>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>ISS</Text>
                    <Text style={styles.breakdownValue}>R$ 5,00</Text>
                  </View>
                  <View style={styles.breakdownDivider} />
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabelTotal}>Total</Text>
                    <Text style={styles.breakdownValueTotal}>R$ 75,00</Text>
                  </View>
                </View>
              </View>
            </MeiCard>
          </>
        )}

        {/* Notas Fiscais Tab */}
        {selectedTab === 'nfs' && (
          <>
            {/* Resumo NFs */}
            <MeiCard>
              <View style={styles.nfsResumo}>
                <View style={styles.nfsStats}>
                  <View style={styles.nfsStat}>
                    <Text style={styles.nfsStatValue}>{meiData.nfs_pendentes}</Text>
                    <Text style={styles.nfsStatLabel}>Pendentes</Text>
                  </View>
                  <View style={styles.nfsStat}>
                    <Text style={styles.nfsStatValue}>47</Text>
                    <Text style={styles.nfsStatLabel}>Emitidas este mês</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.emitirNfButton}>
                  <FileText size={20} color="#FFFFFF" />
                  <Text style={styles.emitirNfButtonText}>EMITIR NF</Text>
                </TouchableOpacity>
              </View>
            </MeiCard>

            {/* Lista NFs Recentes */}
            <MeiCard>
              <Text style={styles.sectionTitle}>Notas Fiscais Recentes</Text>
              
              <View style={styles.nfsList}>
                <View style={styles.nfItem}>
                  <View style={styles.nfInfo}>
                    <Text style={styles.nfNumero}>NF 000047</Text>
                    <Text style={styles.nfTomador}>Burger King Centro</Text>
                    <Text style={styles.nfData}>15/12/2024</Text>
                  </View>
                  <View style={styles.nfActions}>
                    <Text style={styles.nfValor}>R$ 80,00</Text>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={16} color="#FF6B35" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.nfItem}>
                  <View style={styles.nfInfo}>
                    <Text style={styles.nfNumero}>NF 000046</Text>
                    <Text style={styles.nfTomador}>McDonald's Shopping</Text>
                    <Text style={styles.nfData}>14/12/2024</Text>
                  </View>
                  <View style={styles.nfActions}>
                    <Text style={styles.nfValor}>R$ 60,00</Text>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={16} color="#FF6B35" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.nfItem}>
                  <View style={styles.nfInfo}>
                    <Text style={styles.nfNumero}>NF 000045</Text>
                    <Text style={styles.nfTomador}>Pizza Hut Centro</Text>
                    <Text style={styles.nfData}>13/12/2024</Text>
                  </View>
                  <View style={styles.nfActions}>
                    <Text style={styles.nfValor}>R$ 45,00</Text>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download size={16} color="#FF6B35" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.verTodasNfs}>
                <Text style={styles.verTodasNfsText}>VER TODAS AS NOTAS FISCAIS</Text>
              </TouchableOpacity>
            </MeiCard>

            {/* Dicas MEI */}
            <MeiCard>
              <Text style={styles.sectionTitle}>💡 Dicas MEI</Text>
              
              <View style={styles.dicasList}>
                <View style={styles.dicaItem}>
                  <Text style={styles.dicaTitle}>Emita NF para todos os serviços</Text>
                  <Text style={styles.dicaDescription}>
                    Comprove sua renda e mantenha seu MEI regular
                  </Text>
                </View>
                
                <View style={styles.dicaItem}>
                  <Text style={styles.dicaTitle}>Pague o DAS em dia</Text>
                  <Text style={styles.dicaDescription}>
                    Evite juros e mantenha seus direitos previdenciários
                  </Text>
                </View>
                
                <View style={styles.dicaItem}>
                  <Text style={styles.dicaTitle}>Controle o limite anual</Text>
                  <Text style={styles.dicaDescription}>
                    Não ultrapasse R$ 81.000 para não perder o MEI
                  </Text>
                </View>
              </View>
            </MeiCard>
          </>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  tabSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    gap: 4,
  },
  tabButtonActive: {
    backgroundColor: '#FFF3E0',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9AA0A6',
  },
  tabButtonTextActive: {
    color: '#FF6B35',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  statusCard: {
    backgroundColor: '#F0F9FF',
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 4,
  },
  statusCnpj: {
    fontSize: 14,
    color: '#9AA0A6',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#27AE60',
  },
  statusDetails: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
  },
  statusDescription: {
    fontSize: 14,
    color: '#5F6368',
    lineHeight: 20,
  },
  dasCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
  },
  dasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dasStatus: {
    padding: 8,
  },
  dasInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dasValor: {
    fontSize: 32,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 4,
  },
  dasVencimento: {
    fontSize: 16,
    color: '#5F6368',
    marginBottom: 4,
  },
  dasData: {
    fontSize: 14,
    color: '#9AA0A6',
  },
  pagarDasButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pagarDasButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  acoesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  acaoItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 8,
    gap: 8,
  },
  acaoText: {
    fontSize: 12,
    color: '#5F6368',
    fontWeight: '600',
    textAlign: 'center',
  },
  limiteInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  faturamentoAtual: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF6B35',
  },
  limiteTotalLabel: {
    fontSize: 16,
    color: '#9AA0A6',
    marginTop: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F1F3F4',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#9AA0A6',
    textAlign: 'center',
  },
  limiteRestante: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
  },
  limiteRestanteLabel: {
    fontSize: 14,
    color: '#5F6368',
  },
  limiteRestanteValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
  },
  appsFaturamento: {
    gap: 16,
  },
  appFaturamentoItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  appFaturamentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appFaturamentoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  appFaturamentoPercentual: {
    fontSize: 14,
    color: '#9AA0A6',
  },
  appFaturamentoValor: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27AE60',
    marginBottom: 8,
  },
  appProgressBar: {
    height: 4,
    backgroundColor: '#E8EAED',
    borderRadius: 2,
  },
  appProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  dasHistoricoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  dasHistoricoInfo: {
    flex: 1,
  },
  dasHistoricoMes: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  dasHistoricoVencimento: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  dasHistoricoStatus: {
    alignItems: 'flex-end',
  },
  dasHistoricoValor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  dasStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dasStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  calculadoraInfo: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  calculadoraDescricao: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 16,
    lineHeight: 20,
  },
  calculadoraBreakdown: {
    gap: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#5F6368',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: '#DADCE0',
    marginVertical: 8,
  },
  breakdownLabelTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#202124',
  },
  breakdownValueTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  nfsResumo: {
    alignItems: 'center',
  },
  nfsStats: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 20,
  },
  nfsStat: {
    alignItems: 'center',
  },
  nfsStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
  },
  nfsStatLabel: {
    fontSize: 12,
    color: '#9AA0A6',
    marginTop: 4,
  },
  emitirNfButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  emitirNfButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  nfsList: {
    gap: 12,
  },
  nfItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  nfInfo: {
    flex: 1,
  },
  nfNumero: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  nfTomador: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 2,
  },
  nfData: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  nfActions: {
    alignItems: 'flex-end',
  },
  nfValor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
    marginBottom: 8,
  },
  downloadButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#FFF3E0',
  },
  verTodasNfs: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
    alignItems: 'center',
  },
  verTodasNfsText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '700',
  },
  dicasList: {
    gap: 16,
  },
  dicaItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
  },
  dicaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  dicaDescription: {
    fontSize: 14,
    color: '#5F6368',
    lineHeight: 20,
  },
});