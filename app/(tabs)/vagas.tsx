import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, MapPin, Clock, Users, DollarSign, Calendar, Filter, Search, Eye, CreditCard as Edit, Trash2, Target } from 'lucide-react-native';

const VagaCard = ({ vaga, onEdit, onDelete, onView }) => (
  <View style={styles.vagaCard}>
    <View style={styles.vagaHeader}>
      <View style={styles.vagaInfo}>
        <Text style={styles.vagaTipo}>{vaga.tipo.charAt(0).toUpperCase() + vaga.tipo.slice(1)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vaga.status) }]}>
          <Text style={styles.statusText}>{getStatusText(vaga.status)}</Text>
        </View>
      </View>
      <View style={styles.vagaActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onView(vaga)}>
          <Eye size={16} color="#5F6368" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(vaga)}>
          <Edit size={16} color="#5F6368" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(vaga)}>
          <Trash2 size={16} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.vagaDetails}>
      <View style={styles.vagaDetailRow}>
        <Calendar size={16} color="#9AA0A6" />
        <Text style={styles.vagaDetailText}>
          {new Date(vaga.data_inicio).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      <View style={styles.vagaDetailRow}>
        <Clock size={16} color="#9AA0A6" />
        <Text style={styles.vagaDetailText}>
          {vaga.horario_inicio} - {vaga.horario_fim}
        </Text>
      </View>
      <View style={styles.vagaDetailRow}>
        <Users size={16} color="#9AA0A6" />
        <Text style={styles.vagaDetailText}>
          {vaga.quantidade_entregadores} entregador{vaga.quantidade_entregadores > 1 ? 'es' : ''}
        </Text>
      </View>
      <View style={styles.vagaDetailRow}>
        <MapPin size={16} color="#9AA0A6" />
        <Text style={styles.vagaDetailText}>{vaga.endereco_retirada}</Text>
      </View>
    </View>

    <View style={styles.vagaFooter}>
      <View style={styles.vagaStats}>
        <Text style={styles.vagaStatsText}>{vaga.candidatos} candidatos</Text>
        <Text style={styles.vagaStatsText}>{vaga.aceites} aceites</Text>
      </View>
      <View style={styles.vagaValor}>
        <Text style={styles.vagaValorText}>R$ {vaga.valor_entregador.toFixed(2)}</Text>
        <Text style={styles.vagaValorLabel}>por entregador</Text>
      </View>
    </View>
  </View>
);

export default function VagasScreen() {
  const { user, profile, empresaProfile } = useAuth();
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('todas');

  useEffect(() => {
    carregarVagas();
  }, [user]);

  const carregarVagas = async () => {
    try {
      // Simular carregamento de vagas
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockVagas = [
        {
          id: '1',
          tipo: 'turno',
          data_inicio: '2024-12-15',
          horario_inicio: '18:00',
          horario_fim: '22:00',
          quantidade_entregadores: 2,
          valor_entregador: 80.00,
          endereco_retirada: 'Av. Brasil, 1234 - Centro',
          status: 'aberta',
          candidatos: 8,
          aceites: 2
        },
        {
          id: '2',
          tipo: 'avulsa',
          data_inicio: '2024-12-16',
          horario_inicio: '11:00',
          horario_fim: '15:00',
          quantidade_entregadores: 1,
          valor_entregador: 60.00,
          endereco_retirada: 'Av. Brasil, 1234 - Centro',
          status: 'aberta',
          candidatos: 5,
          aceites: 0
        },
        {
          id: '3',
          tipo: 'semanal',
          data_inicio: '2024-12-16',
          horario_inicio: '17:00',
          horario_fim: '23:00',
          quantidade_entregadores: 3,
          valor_entregador: 400.00,
          endereco_retirada: 'Av. Brasil, 1234 - Centro',
          status: 'preenchida',
          candidatos: 12,
          aceites: 3
        }
      ];

      setVagas(mockVagas);
    } catch (error) {
      console.error('Erro ao carregar vagas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVaga = () => {
    setShowCreateForm(true);
  };

  const handleViewVaga = (vaga) => {
    Alert.alert(
      `Vaga ${vaga.tipo}`,
      `Data: ${new Date(vaga.data_inicio).toLocaleDateString('pt-BR')}\nHorário: ${vaga.horario_inicio} - ${vaga.horario_fim}\nValor: R$ ${vaga.valor_entregador.toFixed(2)}\nCandidatos: ${vaga.candidatos}\nAceites: ${vaga.aceites}`
    );
  };

  const handleEditVaga = (vaga) => {
    Alert.alert('Editar Vaga', `Editar vaga ${vaga.tipo} de ${vaga.data_inicio}`);
  };

  const handleDeleteVaga = (vaga) => {
    Alert.alert(
      'Excluir Vaga',
      `Tem certeza que deseja excluir esta vaga?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => {
          setVagas(vagas.filter(v => v.id !== vaga.id));
        }}
      ]
    );
  };

  if (profile?.user_type !== 'empresa') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.accessDenied}>
          <Target size={48} color="#DADCE0" />
          <Text style={styles.accessDeniedTitle}>Acesso Restrito</Text>
          <Text style={styles.accessDeniedText}>
            Esta seção é exclusiva para empresas
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Gestão de Vagas</Text>
            <Text style={styles.subtitle}>{empresaProfile?.nome_fantasia}</Text>
          </View>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateVaga}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Nova Vaga</Text>
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#9AA0A6" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar vagas..."
              placeholderTextColor="#9AA0A6"
            />
          </View>
          
          <View style={styles.filterButtons}>
            {['todas', 'abertas', 'preenchidas', 'canceladas'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive
                ]}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Estatísticas Rápidas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{vagas.length}</Text>
            <Text style={styles.statLabel}>Total Vagas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{vagas.filter(v => v.status === 'aberta').length}</Text>
            <Text style={styles.statLabel}>Abertas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {vagas.reduce((acc, v) => acc + v.candidatos, 0)}
            </Text>
            <Text style={styles.statLabel}>Candidatos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>Taxa Preenchimento</Text>
          </View>
        </View>

        {/* Lista de Vagas */}
        <View style={styles.vagasContainer}>
          <Text style={styles.sectionTitle}>Suas Vagas</Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Carregando vagas...</Text>
            </View>
          ) : vagas.length === 0 ? (
            <View style={styles.emptyState}>
              <Target size={48} color="#DADCE0" />
              <Text style={styles.emptyTitle}>Nenhuma vaga criada</Text>
              <Text style={styles.emptyDescription}>
                Crie sua primeira vaga para começar a contratar entregadores
              </Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={handleCreateVaga}
              >
                <Text style={styles.emptyButtonText}>CRIAR PRIMEIRA VAGA</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.vagasList}>
              {vagas
                .filter(vaga => selectedFilter === 'todas' || vaga.status === selectedFilter.slice(0, -1))
                .map((vaga) => (
                  <VagaCard
                    key={vaga.id}
                    vaga={vaga}
                    onView={handleViewVaga}
                    onEdit={handleEditVaga}
                    onDelete={handleDeleteVaga}
                  />
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'preenchida': return '#F0F9FF';
    case 'cancelada': return '#FFF5F5';
    default: return '#F0FDF4';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'preenchida': return 'Preenchida';
    case 'cancelada': return 'Cancelada';
    default: return 'Aberta';
  }
};

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
  createButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DADCE0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#202124',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DADCE0',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5F6368',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9AA0A6',
    textAlign: 'center',
  },
  vagasContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#5F6368',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5F6368',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9AA0A6',
    textAlign: 'center',
    maxWidth: 300,
  },
  emptyButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  vagasList: {
    gap: 16,
  },
  vagaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  vagaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vagaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vagaTipo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5F6368',
  },
  vagaActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
  },
  vagaDetails: {
    gap: 8,
    marginBottom: 16,
  },
  vagaDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vagaDetailText: {
    fontSize: 14,
    color: '#5F6368',
  },
  vagaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F4',
  },
  vagaStats: {
    flexDirection: 'row',
    gap: 16,
  },
  vagaStatsText: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  vagaValor: {
    alignItems: 'flex-end',
  },
  vagaValorText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27AE60',
  },
  vagaValorLabel: {
    fontSize: 12,
    color: '#9AA0A6',
  },
});