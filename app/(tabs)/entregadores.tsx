import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, Star, MapPin, Phone, MessageSquare, Heart, UserPlus, MoveHorizontal as MoreHorizontal, Users, TrendingUp } from 'lucide-react-native';

const EntregadorCard = ({ entregador, onToggleFavorite, onContact, onInvite }) => (
  <View style={styles.entregadorCard}>
    <View style={styles.entregadorHeader}>
      <View style={styles.entregadorInfo}>
        <View style={styles.entregadorAvatarContainer}>
          <View style={styles.entregadorAvatar}>
            <Text style={styles.entregadorInitials}>
              {entregador.nome.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          {entregador.online && (
            <View style={styles.onlineIndicator} />
          )}
        </View>
        <View style={styles.entregadorDetails}>
          <Text style={styles.entregadorNome}>{entregador.nome}</Text>
          <View style={styles.entregadorRating}>
            <Star size={14} color="#FFD700" />
            <Text style={styles.entregadorRatingText}>{entregador.pontuacao}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.entregadorActions}>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(entregador.id)}
        >
          <Heart 
            size={16} 
            color={entregador.favorito ? "#E74C3C" : "#DADCE0"} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MoreHorizontal size={16} color="#5F6368" />
        </TouchableOpacity>
      </View>
    </View>

    {/* Status Indicators */}
    <View style={styles.statusIndicators}>
      <View style={[styles.statusBadge, { backgroundColor: entregador.mei_status === 'ativo' ? '#F0F9FF' : '#FFF5F5' }]}>
        <Text style={[styles.statusBadgeText, { color: entregador.mei_status === 'ativo' ? '#3B82F6' : '#E74C3C' }]}>
          MEI {entregador.mei_status}
        </Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: entregador.cnh_valida ? '#F0F9FF' : '#FFF5F5' }]}>
        <Text style={[styles.statusBadgeText, { color: entregador.cnh_valida ? '#3B82F6' : '#E74C3C' }]}>
          CNH {entregador.cnh_valida ? 'válida' : 'problema'}
        </Text>
      </View>
      {entregador.online && (
        <View style={[styles.statusBadge, { backgroundColor: '#F0F9FF' }]}>
          <Text style={[styles.statusBadgeText, { color: '#27AE60' }]}>Online</Text>
        </View>
      )}
    </View>

    {/* Estatísticas */}
    <View style={styles.entregadorStats}>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Entregas este mês:</Text>
        <Text style={styles.statValue}>{entregador.entregas_mes}</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Ganhos este mês:</Text>
        <Text style={[styles.statValue, { color: '#27AE60' }]}>R$ {entregador.valor_ganho_mes.toFixed(2)}</Text>
      </View>
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>Total entregas:</Text>
        <Text style={styles.statValue}>{entregador.entregas_total}</Text>
      </View>
    </View>

    {/* Áreas de Atuação */}
    <View style={styles.areasContainer}>
      <MapPin size={12} color="#9AA0A6" />
      <Text style={styles.areasText}>{entregador.areas_atuacao.join(', ')}</Text>
    </View>

    {/* Ações */}
    <View style={styles.entregadorFooter}>
      <TouchableOpacity 
        style={styles.inviteButton}
        onPress={() => onInvite(entregador)}
      >
        <Text style={styles.inviteButtonText}>Convidar para Vaga</Text>
      </TouchableOpacity>
      <View style={styles.contactButtons}>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => onContact(entregador, 'message')}
        >
          <MessageSquare size={16} color="#FF6B35" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => onContact(entregador, 'phone')}
        >
          <Phone size={16} color="#FF6B35" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function EntregadoresScreen() {
  const { user, profile, empresaProfile } = useAuth();
  const [entregadores, setEntregadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    carregarEntregadores();
  }, [user]);

  const carregarEntregadores = async () => {
    try {
      // Simular carregamento de entregadores
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockEntregadores = [
        {
          id: '1',
          nome: 'João Silva',
          pontuacao: 4.8,
          online: true,
          areas_atuacao: ['Centro', 'Zona Sul'],
          entregas_total: 247,
          entregas_mes: 45,
          valor_ganho_mes: 1850.00,
          telefone: '(32) 99999-1111',
          favorito: true,
          mei_status: 'ativo',
          cnh_valida: true,
          ultima_atividade: '2024-12-15T14:30:00Z'
        },
        {
          id: '2',
          nome: 'Maria Santos',
          pontuacao: 4.9,
          online: false,
          areas_atuacao: ['Shopping', 'Centro'],
          entregas_total: 189,
          entregas_mes: 38,
          valor_ganho_mes: 1620.00,
          telefone: '(32) 99999-2222',
          favorito: true,
          mei_status: 'ativo',
          cnh_valida: true,
          ultima_atividade: '2024-12-14T22:15:00Z'
        },
        {
          id: '3',
          nome: 'Carlos Oliveira',
          pontuacao: 4.7,
          online: true,
          areas_atuacao: ['Centro', 'Zona Norte'],
          entregas_total: 156,
          entregas_mes: 32,
          valor_ganho_mes: 1340.00,
          telefone: '(32) 99999-3333',
          favorito: false,
          mei_status: 'ativo',
          cnh_valida: false,
          ultima_atividade: '2024-12-15T13:45:00Z'
        }
      ];

      setEntregadores(mockEntregadores);
    } catch (error) {
      console.error('Erro ao carregar entregadores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (entregadorId: string) => {
    setEntregadores(prev => 
      prev.map(e => 
        e.id === entregadorId ? { ...e, favorito: !e.favorito } : e
      )
    );
  };

  const handleContact = (entregador, type: 'message' | 'phone') => {
    if (type === 'phone') {
      Alert.alert('Ligar', `Ligar para ${entregador.nome}?\n${entregador.telefone}`);
    } else {
      Alert.alert('Mensagem', `Enviar mensagem para ${entregador.nome}`);
    }
  };

  const handleInvite = (entregador) => {
    Alert.alert(
      'Convidar para Vaga',
      `Convidar ${entregador.nome} para qual vaga?`,
      [
        { text: 'Cancelar' },
        { text: 'Turno 18h-22h', onPress: () => Alert.alert('Sucesso', 'Convite enviado!') }
      ]
    );
  };

  if (profile?.user_type !== 'empresa') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.accessDenied}>
          <Users size={48} color="#DADCE0" />
          <Text style={styles.accessDeniedTitle}>Acesso Restrito</Text>
          <Text style={styles.accessDeniedText}>
            Esta seção é exclusiva para empresas
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const entregadoresFiltrados = entregadores.filter(entregador => {
    if (showFavoritesOnly && !entregador.favorito) return false;
    
    switch (selectedFilter) {
      case 'online': return entregador.online;
      case 'favoritos': return entregador.favorito;
      case 'problemas': return !entregador.cnh_valida || entregador.mei_status === 'inativo';
      default: return true;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Meus Entregadores</Text>
            <Text style={styles.subtitle}>{empresaProfile?.nome_fantasia}</Text>
          </View>
          <TouchableOpacity style={styles.createButton}>
            <UserPlus size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Convidar</Text>
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#9AA0A6" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar entregadores..."
              placeholderTextColor="#9AA0A6"
            />
          </View>
          
          <View style={styles.filterButtons}>
            {[
              { key: 'todos', label: 'Todos' },
              { key: 'online', label: 'Online' },
              { key: 'favoritos', label: 'Favoritos' },
              { key: 'problemas', label: 'Problemas' }
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter.key && styles.filterButtonTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{entregadores.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{entregadores.filter(e => e.favorito).length}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{entregadores.filter(e => e.online).length}</Text>
            <Text style={styles.statLabel}>Online</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {entregadores.length > 0 ? 
                (entregadores.reduce((acc, e) => acc + e.pontuacao, 0) / entregadores.length).toFixed(1) : 
                '0.0'
              }
            </Text>
            <Text style={styles.statLabel}>Média</Text>
          </View>
        </View>

        {/* Lista de Entregadores */}
        <View style={styles.entregadoresContainer}>
          <Text style={styles.sectionTitle}>
            {showFavoritesOnly ? 'Entregadores Favoritos' : 
             selectedFilter === 'todos' ? 'Todos os Entregadores' : 
             `Entregadores ${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}`}
          </Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Carregando entregadores...</Text>
            </View>
          ) : entregadoresFiltrados.length === 0 ? (
            <View style={styles.emptyState}>
              <Users size={48} color="#DADCE0" />
              <Text style={styles.emptyTitle}>Nenhum entregador encontrado</Text>
              <Text style={styles.emptyDescription}>
                {showFavoritesOnly ? 
                  'Você ainda não tem entregadores favoritos' : 
                  'Não há entregadores nesta categoria'
                }
              </Text>
            </View>
          ) : (
            <View style={styles.entregadoresList}>
              {entregadoresFiltrados.map((entregador) => (
                <EntregadorCard
                  key={entregador.id}
                  entregador={entregador}
                  onToggleFavorite={handleToggleFavorite}
                  onContact={handleContact}
                  onInvite={handleInvite}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
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
  entregadoresContainer: {
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
  entregadoresList: {
    gap: 16,
  },
  entregadorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entregadorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entregadorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  entregadorAvatarContainer: {
    position: 'relative',
  },
  entregadorAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#FF6B35',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entregadorInitials: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    backgroundColor: '#27AE60',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  entregadorDetails: {
    flex: 1,
  },
  entregadorNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  entregadorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  entregadorRatingText: {
    fontSize: 14,
    color: '#5F6368',
  },
  entregadorActions: {
    flexDirection: 'row',
    gap: 8,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
  },
  statusIndicators: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  entregadorStats: {
    gap: 8,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  areasText: {
    fontSize: 14,
    color: '#5F6368',
  },
  entregadorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#FFF3E0',
  },
});