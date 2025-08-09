import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Calendar, MapPin, Phone, FileText, Download, RefreshCw, Clock } from 'lucide-react-native';

const DocumentCard = ({ children, style = {} }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const StatusBadge = ({ status, text }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'critico':
        return { backgroundColor: '#FFF5F5', color: '#E74C3C', borderColor: '#E74C3C' };
      case 'atencao':
        return { backgroundColor: '#FFF3CD', color: '#856404', borderColor: '#F39C12' };
      case 'ok':
        return { backgroundColor: '#F0F9FF', color: '#27AE60', borderColor: '#27AE60' };
      default:
        return { backgroundColor: '#F8F9FA', color: '#9AA0A6', borderColor: '#DADCE0' };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor, borderColor: statusStyle.borderColor }]}>
      <Text style={[styles.statusBadgeText, { color: statusStyle.color }]}>{text}</Text>
    </View>
  );
};

export default function DocumentosScreen() {
  const [selectedTab, setSelectedTab] = useState('cnh');

  const documentosData = {
    cnh: {
      numero: "12345678901",
      validade: "2025-03-15",
      dias_para_vencer: 45,
      pontos_atual: 3,
      situacao: "ativa",
      categoria: "AB"
    },
    multas: [
      {
        id: 1,
        data: "2024-12-10",
        valor: 195.23,
        descricao: "Excesso de velocidade",
        local: "Av. Brasil, Centro",
        status: "pendente",
        desconto_prazo: "20% até 10 dias",
        dias_restantes: 8
      },
      {
        id: 2,
        data: "2024-11-28",
        valor: 130.16,
        descricao: "Estacionamento irregular",
        local: "Rua XV de Novembro",
        status: "pago",
        pago_em: "2024-12-01"
      }
    ],
    veiculo: {
      placa: "ABC1234",
      licenciamento: "2025-02-28",
      ipva_2025: "pago",
      seguro: "2025-06-15",
      marca: "Honda",
      modelo: "CG 160",
      ano: 2020
    }
  };

  const getDiasParaVencer = (dataVencimento) => {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTime = vencimento - hoje;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusVencimento = (dias) => {
    if (dias < 0) return 'critico';
    if (dias < 30) return 'atencao';
    return 'ok';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meus Documentos</Text>
          <TouchableOpacity style={styles.syncButton}>
            <RefreshCw size={16} color="#FFFFFF" />
            <Text style={styles.syncButtonText}>SINCRONIZAR</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSelector}>
          {[
            { key: 'cnh', label: 'CNH', icon: CreditCard },
            { key: 'multas', label: 'Multas', icon: AlertTriangle },
            { key: 'veiculo', label: 'Veículo', icon: FileText }
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

        {/* CNH Tab */}
        {selectedTab === 'cnh' && (
          <>
            {/* Status CNH */}
            <DocumentCard style={[
              styles.cnhCard,
              { 
                backgroundColor: getStatusVencimento(documentosData.cnh.dias_para_vencer) === 'critico' ? '#FFF5F5' : 
                                getStatusVencimento(documentosData.cnh.dias_para_vencer) === 'atencao' ? '#FFF3CD' : '#FFFFFF'
              }
            ]}>
              <View style={styles.cnhHeader}>
                <View style={styles.cnhInfo}>
                  <Text style={styles.cnhTitle}>Carteira Nacional de Habilitação</Text>
                  <Text style={styles.cnhNumero}>Nº {documentosData.cnh.numero}</Text>
                </View>
                <StatusBadge 
                  status={getStatusVencimento(documentosData.cnh.dias_para_vencer)}
                  text={documentosData.cnh.situacao.toUpperCase()}
                />
              </View>

              <View style={styles.cnhDetails}>
                <View style={styles.cnhDetailItem}>
                  <Text style={styles.cnhDetailLabel}>Categoria</Text>
                  <Text style={styles.cnhDetailValue}>{documentosData.cnh.categoria}</Text>
                </View>
                <View style={styles.cnhDetailItem}>
                  <Text style={styles.cnhDetailLabel}>Pontos</Text>
                  <Text style={styles.cnhDetailValue}>{documentosData.cnh.pontos_atual}/20</Text>
                </View>
                <View style={styles.cnhDetailItem}>
                  <Text style={styles.cnhDetailLabel}>Vencimento</Text>
                  <Text style={styles.cnhDetailValue}>
                    {new Date(documentosData.cnh.validade).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              </View>

              <View style={styles.cnhCountdown}>
                <Calendar size={20} color={getStatusVencimento(documentosData.cnh.dias_para_vencer) === 'critico' ? '#E74C3C' : '#F39C12'} />
                <Text style={[
                  styles.cnhCountdownText,
                  { color: getStatusVencimento(documentosData.cnh.dias_para_vencer) === 'critico' ? '#E74C3C' : '#F39C12' }
                ]}>
                  {documentosData.cnh.dias_para_vencer > 0 ? 
                    `Vence em ${documentosData.cnh.dias_para_vencer} dias` : 
                    `Vencida há ${Math.abs(documentosData.cnh.dias_para_vencer)} dias`
                  }
                </Text>
              </View>

              {documentosData.cnh.dias_para_vencer < 60 && (
                <TouchableOpacity style={styles.renewButton}>
                  <Text style={styles.renewButtonText}>RENOVAR CNH</Text>
                </TouchableOpacity>
              )}
            </DocumentCard>

            {/* Clínicas Próximas */}
            {documentosData.cnh.dias_para_vencer < 60 && (
              <DocumentCard>
                <Text style={styles.sectionTitle}>Clínicas Credenciadas Próximas</Text>
                
                <View style={styles.clinicaItem}>
                  <View style={styles.clinicaInfo}>
                    <Text style={styles.clinicaNome}>Dr. João - Medicina do Tráfego</Text>
                    <Text style={styles.clinicaPreco}>R$ 180,00 • Renovação expressa</Text>
                    <View style={styles.clinicaLocation}>
                      <MapPin size={14} color="#9AA0A6" />
                      <Text style={styles.clinicaDistance}>500m de você</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.clinicaButton}>
                    <Phone size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                <View style={styles.clinicaItem}>
                  <View style={styles.clinicaInfo}>
                    <Text style={styles.clinicaNome}>Clínica Vida - DETRAN</Text>
                    <Text style={styles.clinicaPreco}>R$ 165,00 • Agendamento online</Text>
                    <View style={styles.clinicaLocation}>
                      <MapPin size={14} color="#9AA0A6" />
                      <Text style={styles.clinicaDistance}>1.2km de você</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.clinicaButton}>
                    <Phone size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </DocumentCard>
            )}
          </>
        )}

        {/* Multas Tab */}
        {selectedTab === 'multas' && (
          <>
            {/* Resumo Multas */}
            <DocumentCard>
              <View style={styles.multasResumo}>
                <View style={styles.multasStats}>
                  <View style={styles.multasStat}>
                    <Text style={styles.multasStatValue}>
                      {documentosData.multas.filter(m => m.status === 'pendente').length}
                    </Text>
                    <Text style={styles.multasStatLabel}>Pendentes</Text>
                  </View>
                  <View style={styles.multasStat}>
                    <Text style={styles.multasStatValue}>
                      R$ {documentosData.multas
                        .filter(m => m.status === 'pendente')
                        .reduce((acc, m) => acc + m.valor, 0)
                        .toFixed(2)
                      }
                    </Text>
                    <Text style={styles.multasStatLabel}>Total devido</Text>
                  </View>
                </View>
              </View>
            </DocumentCard>

            {/* Lista de Multas */}
            <DocumentCard>
              <Text style={styles.sectionTitle}>Suas Multas</Text>
              
              {documentosData.multas.map((multa) => (
                <View key={multa.id} style={styles.multaItem}>
                  <View style={styles.multaHeader}>
                    <Text style={styles.multaDescricao}>{multa.descricao}</Text>
                    <StatusBadge 
                      status={multa.status === 'pendente' ? 'atencao' : 'ok'}
                      text={multa.status.toUpperCase()}
                    />
                  </View>
                  
                  <Text style={styles.multaLocal}>{multa.local}</Text>
                  <Text style={styles.multaData}>
                    {new Date(multa.data).toLocaleDateString('pt-BR')}
                  </Text>
                  
                  <View style={styles.multaFooter}>
                    <Text style={styles.multaValor}>R$ {multa.valor.toFixed(2)}</Text>
                    
                    {multa.status === 'pendente' && (
                      <View style={styles.multaActions}>
                        {multa.desconto_prazo && (
                          <View style={styles.descontoInfo}>
                            <Clock size={14} color="#F39C12" />
                            <Text style={styles.descontoText}>
                              {multa.desconto_prazo} ({multa.dias_restantes} dias)
                            </Text>
                          </View>
                        )}
                        <TouchableOpacity style={styles.pagarButton}>
                          <Text style={styles.pagarButtonText}>PAGAR</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    
                    {multa.status === 'pago' && (
                      <View style={styles.pagoInfo}>
                        <CheckCircle size={16} color="#27AE60" />
                        <Text style={styles.pagoText}>
                          Pago em {new Date(multa.pago_em).toLocaleDateString('pt-BR')}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </DocumentCard>
          </>
        )}

        {/* Veículo Tab */}
        {selectedTab === 'veiculo' && (
          <>
            {/* Dados do Veículo */}
            <DocumentCard>
              <Text style={styles.sectionTitle}>Dados do Veículo</Text>
              
              <View style={styles.veiculoInfo}>
                <View style={styles.veiculoHeader}>
                  <Text style={styles.veiculoModelo}>
                    {documentosData.veiculo.marca} {documentosData.veiculo.modelo}
                  </Text>
                  <Text style={styles.veiculoAno}>{documentosData.veiculo.ano}</Text>
                </View>
                <Text style={styles.veiculoPlaca}>Placa: {documentosData.veiculo.placa}</Text>
              </View>
            </DocumentCard>

            {/* Status Documentos Veículo */}
            <DocumentCard>
              <Text style={styles.sectionTitle}>Status dos Documentos</Text>
              
              <View style={styles.documentosList}>
                <View style={styles.documentoItem}>
                  <View style={styles.documentoInfo}>
                    <Text style={styles.documentoTipo}>Licenciamento 2025</Text>
                    <Text style={styles.documentoVencimento}>
                      Vence: {new Date(documentosData.veiculo.licenciamento).toLocaleDateString('pt-BR')}
                    </Text>
                    <Text style={styles.documentoDias}>
                      {getDiasParaVencer(documentosData.veiculo.licenciamento)} dias restantes
                    </Text>
                  </View>
                  <StatusBadge 
                    status={getStatusVencimento(getDiasParaVencer(documentosData.veiculo.licenciamento))}
                    text={getDiasParaVencer(documentosData.veiculo.licenciamento) > 0 ? 'EM DIA' : 'VENCIDO'}
                  />
                </View>

                <View style={styles.documentoItem}>
                  <View style={styles.documentoInfo}>
                    <Text style={styles.documentoTipo}>IPVA 2025</Text>
                    <Text style={styles.documentoStatus}>Status: {documentosData.veiculo.ipva_2025}</Text>
                  </View>
                  <StatusBadge 
                    status="ok"
                    text="PAGO"
                  />
                </View>

                <View style={styles.documentoItem}>
                  <View style={styles.documentoInfo}>
                    <Text style={styles.documentoTipo}>Seguro Obrigatório</Text>
                    <Text style={styles.documentoVencimento}>
                      Vence: {new Date(documentosData.veiculo.seguro).toLocaleDateString('pt-BR')}
                    </Text>
                    <Text style={styles.documentoDias}>
                      {getDiasParaVencer(documentosData.veiculo.seguro)} dias restantes
                    </Text>
                  </View>
                  <StatusBadge 
                    status={getStatusVencimento(getDiasParaVencer(documentosData.veiculo.seguro))}
                    text="EM DIA"
                  />
                </View>
              </View>
            </DocumentCard>

            {/* Ações Rápidas */}
            <DocumentCard>
              <Text style={styles.sectionTitle}>Ações Rápidas</Text>
              
              <View style={styles.acoesRapidas}>
                <TouchableOpacity style={styles.acaoButton}>
                  <Download size={20} color="#FF6B35" />
                  <Text style={styles.acaoButtonText}>Baixar CRLV</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.acaoButton}>
                  <FileText size={20} color="#FF6B35" />
                  <Text style={styles.acaoButtonText}>Consultar Débitos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.acaoButton}>
                  <Calendar size={20} color="#FF6B35" />
                  <Text style={styles.acaoButtonText}>Agendar Vistoria</Text>
                </TouchableOpacity>
              </View>
            </DocumentCard>
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
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  syncButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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
  cnhCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  cnhHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cnhInfo: {
    flex: 1,
  },
  cnhTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  cnhNumero: {
    fontSize: 14,
    color: '#9AA0A6',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cnhDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cnhDetailItem: {
    alignItems: 'center',
  },
  cnhDetailLabel: {
    fontSize: 12,
    color: '#9AA0A6',
    marginBottom: 4,
  },
  cnhDetailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#202124',
  },
  cnhCountdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cnhCountdownText: {
    fontSize: 16,
    fontWeight: '600',
  },
  renewButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  renewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  clinicaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
    gap: 12,
  },
  clinicaInfo: {
    flex: 1,
  },
  clinicaNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  clinicaPreco: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '600',
    marginBottom: 4,
  },
  clinicaLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicaDistance: {
    fontSize: 12,
    color: '#9AA0A6',
    marginLeft: 4,
  },
  clinicaButton: {
    backgroundColor: '#FF6B35',
    padding: 12,
    borderRadius: 8,
  },
  multasResumo: {
    alignItems: 'center',
  },
  multasStats: {
    flexDirection: 'row',
    gap: 40,
  },
  multasStat: {
    alignItems: 'center',
  },
  multasStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E74C3C',
  },
  multasStatLabel: {
    fontSize: 14,
    color: '#9AA0A6',
    marginTop: 4,
  },
  multaItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  multaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  multaDescricao: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    flex: 1,
  },
  multaLocal: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 4,
  },
  multaData: {
    fontSize: 12,
    color: '#9AA0A6',
    marginBottom: 12,
  },
  multaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  multaValor: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E74C3C',
  },
  multaActions: {
    alignItems: 'flex-end',
  },
  descontoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  descontoText: {
    fontSize: 12,
    color: '#F39C12',
    fontWeight: '600',
  },
  pagarButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  pagarButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pagoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pagoText: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '600',
  },
  veiculoInfo: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  veiculoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  veiculoModelo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  veiculoAno: {
    fontSize: 16,
    color: '#9AA0A6',
  },
  veiculoPlaca: {
    fontSize: 16,
    color: '#5F6368',
  },
  documentosList: {
    gap: 16,
  },
  documentoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  documentoInfo: {
    flex: 1,
  },
  documentoTipo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  documentoVencimento: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 2,
  },
  documentoStatus: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 2,
  },
  documentoDias: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  acoesRapidas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  acaoButton: {
    alignItems: 'center',
    gap: 8,
  },
  acaoButtonText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
});