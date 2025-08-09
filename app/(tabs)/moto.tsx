import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fuel, Wrench, MapPin, Calendar, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Camera, TrendingDown, Navigation } from 'lucide-react-native';

const MotoCard = ({ children, style = {} }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const StatusIndicator = ({ status, label }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critico': return '#E74C3C';
      case 'atencao': return '#F39C12';
      case 'ok': return '#27AE60';
      default: return '#9AA0A6';
    }
  };

  return (
    <View style={styles.statusIndicator}>
      <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
      <Text style={styles.statusLabel}>{label}</Text>
    </View>
  );
};

export default function MotoScreen() {
  const [selectedTab, setSelectedTab] = useState('combustivel');

  const dadosMoto = {
    combustivel: {
      nivel_atual: 25,
      km_restantes: 45,
      consumo_medio: 15.6,
      posto_sugerido: {
        nome: "Shell Centro",
        preco: 5.85,
        distancia: 300
      }
    },
    manutencao: {
      km_atual: 45280,
      proxima_revisao: 46000,
      dias_estimados: 8,
      alertas: [
        { tipo: "Troca de óleo", urgencia: "media", km_restantes: 720 },
        { tipo: "Pneu traseiro", desgaste: 78, urgencia: "alta" }
      ]
    },
    gastos_mes: {
      combustivel: 890.50,
      manutencao: 245.00,
      total: 1135.50
    }
  };

  const getNivelCombustivelStatus = (nivel) => {
    if (nivel < 20) return 'critico';
    if (nivel < 40) return 'atencao';
    return 'ok';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Minha Moto</Text>
          <View style={styles.headerFilters}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Hoje</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Semana</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Mês</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSelector}>
          {[
            { key: 'combustivel', label: 'Combustível', icon: Fuel },
            { key: 'manutencao', label: 'Manutenção', icon: Wrench },
            { key: 'gastos', label: 'Gastos', icon: TrendingDown }
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
                  size={20} 
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

        {/* Combustível Tab */}
        {selectedTab === 'combustivel' && (
          <>
            {/* Nível Combustível */}
            <MotoCard style={[
              styles.fuelCard,
              { backgroundColor: getNivelCombustivelStatus(dadosMoto.combustivel.nivel_atual) === 'critico' ? '#FFF5F5' : '#FFFFFF' }
            ]}>
              <View style={styles.fuelHeader}>
                <Text style={styles.sectionTitle}>Nível de Combustível</Text>
                <StatusIndicator 
                  status={getNivelCombustivelStatus(dadosMoto.combustivel.nivel_atual)}
                  label={dadosMoto.combustivel.nivel_atual < 20 ? 'CRÍTICO' : dadosMoto.combustivel.nivel_atual < 40 ? 'BAIXO' : 'OK'}
                />
              </View>

              <View style={styles.fuelGauge}>
                <View style={styles.fuelGaugeContainer}>
                  <View 
                    style={[
                      styles.fuelGaugeFill, 
                      { 
                        width: `${dadosMoto.combustivel.nivel_atual}%`,
                        backgroundColor: getNivelCombustivelStatus(dadosMoto.combustivel.nivel_atual) === 'critico' ? '#E74C3C' : 
                                       getNivelCombustivelStatus(dadosMoto.combustivel.nivel_atual) === 'atencao' ? '#F39C12' : '#27AE60'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.fuelPercentage}>{dadosMoto.combustivel.nivel_atual}%</Text>
              </View>

              <View style={styles.fuelStats}>
                <View style={styles.fuelStat}>
                  <Text style={styles.fuelStatValue}>{dadosMoto.combustivel.km_restantes}km</Text>
                  <Text style={styles.fuelStatLabel}>Restantes</Text>
                </View>
                <View style={styles.fuelStat}>
                  <Text style={styles.fuelStatValue}>{dadosMoto.combustivel.consumo_medio} km/L</Text>
                  <Text style={styles.fuelStatLabel}>Consumo médio</Text>
                </View>
              </View>

              {dadosMoto.combustivel.nivel_atual < 40 && (
                <TouchableOpacity style={styles.fuelAlert}>
                  <AlertTriangle size={20} color="#F39C12" />
                  <Text style={styles.fuelAlertText}>
                    Combustível baixo! Posto mais próximo: {dadosMoto.combustivel.posto_sugerido.nome}
                  </Text>
                </TouchableOpacity>
              )}
            </MotoCard>

            {/* Posto Sugerido */}
            <MotoCard>
              <View style={styles.postoHeader}>
                <Text style={styles.sectionTitle}>Posto Mais Barato Próximo</Text>
                <TouchableOpacity style={styles.navigateButton}>
                  <Navigation size={16} color="#FFFFFF" />
                  <Text style={styles.navigateButtonText}>IR</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.postoInfo}>
                <View style={styles.postoDetails}>
                  <Text style={styles.postoNome}>{dadosMoto.combustivel.posto_sugerido.nome}</Text>
                  <Text style={styles.postoPreco}>R$ {dadosMoto.combustivel.posto_sugerido.preco.toFixed(2)}/L</Text>
                  <View style={styles.postoLocation}>
                    <MapPin size={14} color="#9AA0A6" />
                    <Text style={styles.postoDistance}>{dadosMoto.combustivel.posto_sugerido.distancia}m de você</Text>
                  </View>
                </View>
                <View style={styles.postoSavings}>
                  <Text style={styles.savingsLabel}>Economia</Text>
                  <Text style={styles.savingsValue}>R$ 0,15/L</Text>
                </View>
              </View>
            </MotoCard>
          </>
        )}

        {/* Manutenção Tab */}
        {selectedTab === 'manutencao' && (
          <>
            {/* Status Geral */}
            <MotoCard>
              <Text style={styles.sectionTitle}>Status da Moto</Text>
              
              <View style={styles.kmInfo}>
                <Text style={styles.kmAtual}>{dadosMoto.manutencao.km_atual.toLocaleString()} km</Text>
                <Text style={styles.kmLabel}>Quilometragem atual</Text>
              </View>

              <View style={styles.proximaRevisao}>
                <Calendar size={20} color="#FF6B35" />
                <View style={styles.revisaoInfo}>
                  <Text style={styles.revisaoTitle}>Próxima revisão em {dadosMoto.manutencao.dias_estimados} dias</Text>
                  <Text style={styles.revisaoKm}>{dadosMoto.manutencao.proxima_revisao.toLocaleString()} km</Text>
                </View>
              </View>
            </MotoCard>

            {/* Alertas de Manutenção */}
            <MotoCard>
              <Text style={styles.sectionTitle}>Alertas de Manutenção</Text>
              
              {dadosMoto.manutencao.alertas.map((alerta, index) => (
                <View key={index} style={styles.alertaItem}>
                  <View style={styles.alertaIcon}>
                    <AlertTriangle 
                      size={20} 
                      color={alerta.urgencia === 'alta' ? '#E74C3C' : '#F39C12'} 
                    />
                  </View>
                  <View style={styles.alertaContent}>
                    <Text style={styles.alertaTitle}>{alerta.tipo}</Text>
                    <Text style={styles.alertaDescription}>
                      {alerta.km_restantes ? 
                        `${alerta.km_restantes}km restantes` : 
                        `${alerta.desgaste}% de desgaste`
                      }
                    </Text>
                  </View>
                  <TouchableOpacity style={[
                    styles.alertaButton,
                    { backgroundColor: alerta.urgencia === 'alta' ? '#E74C3C' : '#F39C12' }
                  ]}>
                    <Text style={styles.alertaButtonText}>AGENDAR</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </MotoCard>

            {/* Histórico Manutenção */}
            <MotoCard>
              <Text style={styles.sectionTitle}>Histórico Recente</Text>
              
              <View style={styles.historicoItem}>
                <CheckCircle size={20} color="#27AE60" />
                <View style={styles.historicoContent}>
                  <Text style={styles.historicoTitle}>Troca de óleo</Text>
                  <Text style={styles.historicoDate}>15/12/2024 • 44.560 km</Text>
                  <Text style={styles.historicoValue}>R$ 35,00</Text>
                </View>
              </View>

              <View style={styles.historicoItem}>
                <CheckCircle size={20} color="#27AE60" />
                <View style={styles.historicoContent}>
                  <Text style={styles.historicoTitle}>Revisão geral</Text>
                  <Text style={styles.historicoDate}>28/11/2024 • 43.890 km</Text>
                  <Text style={styles.historicoValue}>R$ 180,00</Text>
                </View>
              </View>
            </MotoCard>
          </>
        )}

        {/* Gastos Tab */}
        {selectedTab === 'gastos' && (
          <>
            {/* Resumo Gastos */}
            <MotoCard style={styles.gastosResumo}>
              <Text style={styles.sectionTitle}>Gastos do Mês</Text>
              
              <View style={styles.gastosStats}>
                <View style={styles.gastosStat}>
                  <Fuel size={24} color="#FF6B35" />
                  <View style={styles.gastosStatContent}>
                    <Text style={styles.gastosStatValue}>R$ {dadosMoto.gastos_mes.combustivel.toFixed(2)}</Text>
                    <Text style={styles.gastosStatLabel}>Combustível</Text>
                  </View>
                </View>
                
                <View style={styles.gastosStatDivider} />
                
                <View style={styles.gastosStat}>
                  <Wrench size={24} color="#FF6B35" />
                  <View style={styles.gastosStatContent}>
                    <Text style={styles.gastosStatValue}>R$ {dadosMoto.gastos_mes.manutencao.toFixed(2)}</Text>
                    <Text style={styles.gastosStatLabel}>Manutenção</Text>
                  </View>
                </View>
              </View>

              <View style={styles.gastosTotal}>
                <Text style={styles.gastosTotalLabel}>Total do mês</Text>
                <Text style={styles.gastosTotalValue}>R$ {dadosMoto.gastos_mes.total.toFixed(2)}</Text>
              </View>
            </MotoCard>

            {/* Calculadora Custo por KM */}
            <MotoCard>
              <Text style={styles.sectionTitle}>Custo por KM</Text>
              
              <View style={styles.custoKmCard}>
                <View style={styles.custoKmInfo}>
                  <Text style={styles.custoKmValue}>R$ 0,45</Text>
                  <Text style={styles.custoKmLabel}>Custo médio por km</Text>
                </View>
                <View style={styles.custoKmBreakdown}>
                  <Text style={styles.breakdownItem}>Combustível: R$ 0,32</Text>
                  <Text style={styles.breakdownItem}>Manutenção: R$ 0,13</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.recalcularButton}>
                <Text style={styles.recalcularButtonText}>RECALCULAR</Text>
              </TouchableOpacity>
            </MotoCard>

            {/* Dicas de Economia */}
            <MotoCard>
              <Text style={styles.sectionTitle}>💡 Dicas de Economia</Text>
              
              <View style={styles.dicasList}>
                <View style={styles.dicaItem}>
                  <Text style={styles.dicaTitle}>Calibragem dos pneus</Text>
                  <Text style={styles.dicaDescription}>Pode economizar até 10% no combustível</Text>
                </View>
                
                <View style={styles.dicaItem}>
                  <Text style={styles.dicaTitle}>Acelere suavemente</Text>
                  <Text style={styles.dicaDescription}>Evite acelerações bruscas para economizar</Text>
                </View>
                
                <View style={styles.dicaItem}>
                  <Text style={styles.dicaTitle}>Planeje suas rotas</Text>
                  <Text style={styles.dicaDescription}>Use o GPS para evitar trânsito pesado</Text>
                </View>
              </View>
            </MotoCard>
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
  headerFilters: {
    flexDirection: 'row',
    gap: 4,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#5F6368',
    fontWeight: '600',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#FFF3E0',
  },
  tabButtonText: {
    fontSize: 14,
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
  fuelCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
  },
  fuelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5F6368',
  },
  fuelGauge: {
    marginBottom: 20,
  },
  fuelGaugeContainer: {
    height: 12,
    backgroundColor: '#F1F3F4',
    borderRadius: 6,
    marginBottom: 8,
  },
  fuelGaugeFill: {
    height: '100%',
    borderRadius: 6,
  },
  fuelPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
  },
  fuelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  fuelStat: {
    alignItems: 'center',
  },
  fuelStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  fuelStatLabel: {
    fontSize: 12,
    color: '#9AA0A6',
    marginTop: 4,
  },
  fuelAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  fuelAlertText: {
    flex: 1,
    fontSize: 14,
    color: '#856404',
  },
  postoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigateButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  postoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postoDetails: {
    flex: 1,
  },
  postoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  postoPreco: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27AE60',
    marginBottom: 4,
  },
  postoLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postoDistance: {
    fontSize: 12,
    color: '#9AA0A6',
    marginLeft: 4,
  },
  postoSavings: {
    alignItems: 'flex-end',
  },
  savingsLabel: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  savingsValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
  },
  kmInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  kmAtual: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF6B35',
  },
  kmLabel: {
    fontSize: 14,
    color: '#9AA0A6',
    marginTop: 4,
  },
  proximaRevisao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  revisaoInfo: {
    flex: 1,
  },
  revisaoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  revisaoKm: {
    fontSize: 14,
    color: '#9AA0A6',
    marginTop: 2,
  },
  alertaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
    gap: 12,
  },
  alertaIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
  },
  alertaContent: {
    flex: 1,
  },
  alertaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  alertaDescription: {
    fontSize: 14,
    color: '#9AA0A6',
    marginTop: 2,
  },
  alertaButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  alertaButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  historicoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
    gap: 12,
  },
  historicoContent: {
    flex: 1,
  },
  historicoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  historicoDate: {
    fontSize: 12,
    color: '#9AA0A6',
    marginTop: 2,
  },
  historicoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E74C3C',
    marginTop: 2,
  },
  gastosResumo: {
    backgroundColor: '#F8F9FA',
  },
  gastosStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  gastosStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gastosStatContent: {
    flex: 1,
  },
  gastosStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  gastosStatLabel: {
    fontSize: 12,
    color: '#9AA0A6',
    marginTop: 2,
  },
  gastosStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#DADCE0',
    marginHorizontal: 16,
  },
  gastosTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#DADCE0',
  },
  gastosTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  gastosTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E74C3C',
  },
  custoKmCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  custoKmInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  custoKmValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
  },
  custoKmLabel: {
    fontSize: 14,
    color: '#9AA0A6',
    marginTop: 4,
  },
  custoKmBreakdown: {
    gap: 4,
  },
  breakdownItem: {
    fontSize: 12,
    color: '#5F6368',
    textAlign: 'center',
  },
  recalcularButton: {
    backgroundColor: '#FF6B35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  recalcularButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
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
  },
});