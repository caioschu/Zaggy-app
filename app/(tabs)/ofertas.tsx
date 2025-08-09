import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Tag, 
  MapPin, 
  Clock, 
  Star,
  Fuel,
  Wrench,
  Utensils,
  Stethoscope,
  Filter,
  Heart,
  Gift
} from 'lucide-react-native';

const OfertaCard = ({ oferta, onPress }) => {
  const getCategoryIcon = (categoria) => {
    switch (categoria) {
      case 'combustivel': return <Fuel size={20} color="#FF6B35" />;
      case 'manutencao': return <Wrench size={20} color="#FF6B35" />;
      case 'alimentacao': return <Utensils size={20} color="#FF6B35" />;
      case 'saude': return <Stethoscope size={20} color="#FF6B35" />;
      default: return <Tag size={20} color="#FF6B35" />;
    }
  };

  const getDiscountColor = (desconto) => {
    if (desconto >= 20) return '#E74C3C';
    if (desconto >= 10) return '#F39C12';
    return '#27AE60';
  };

  return (
    <TouchableOpacity style={styles.ofertaCard} onPress={onPress}>
      <View style={styles.ofertaHeader}>
        <View style={styles.ofertaCategory}>
          {getCategoryIcon(oferta.categoria)}
          <Text style={styles.ofertaCategoryText}>{oferta.categoria}</Text>
        </View>
        <View style={[styles.discountBadge, { backgroundColor: getDiscountColor(oferta.desconto) }]}>
          <Text style={styles.discountText}>{oferta.desconto}% OFF</Text>
        </View>
      </View>

      <View style={styles.ofertaContent}>
        <Text style={styles.ofertaTitulo}>{oferta.titulo}</Text>
        <Text style={styles.ofertaDescricao}>{oferta.descricao}</Text>
        
        <View style={styles.ofertaDetails}>
          <View style={styles.ofertaLocation}>
            <MapPin size={14} color="#9AA0A6" />
            <Text style={styles.ofertaDistance}>{oferta.distancia}m de você</Text>
          </View>
          
          <View style={styles.ofertaRating}>
            <Star size={14} color="#FFD700" />
            <Text style={styles.ofertaRatingText}>{oferta.avaliacao}</Text>
          </View>
        </View>

        <View style={styles.ofertaFooter}>
          <View style={styles.ofertaPrice}>
            <Text style={styles.ofertaPriceOld}>R$ {oferta.preco_original.toFixed(2)}</Text>
            <Text style={styles.ofertaPriceNew}>R$ {oferta.preco_desconto.toFixed(2)}</Text>
          </View>
          
          <View style={styles.ofertaValidity}>
            <Clock size={14} color="#F39C12" />
            <Text style={styles.ofertaValidityText}>{oferta.validade}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteButton}>
        <Heart size={16} color={oferta.favorito ? "#E74C3C" : "#DADCE0"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function OfertasScreen() {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [showFavorites, setShowFavorites] = useState(false);

  const ofertas = [
    {
      id: 1,
      categoria: 'combustivel',
      titulo: 'Shell Centro - Desconto Zaggy',
      descricao: 'Gasolina comum e aditivada com desconto exclusivo',
      preco_original: 5.85,
      preco_desconto: 5.27,
      desconto: 10,
      distancia: 300,
      avaliacao: 4.8,
      validade: 'Até 18h hoje',
      favorito: true,
      empresa: 'Shell',
      endereco: 'Av. Brasil, 1234 - Centro'
    },
    {
      id: 2,
      categoria: 'manutencao',
      titulo: 'Oficina do João - Troca de Óleo',
      descricao: 'Troca de óleo + filtro com garantia de 6 meses',
      preco_original: 45.00,
      preco_desconto: 36.00,
      desconto: 20,
      distancia: 850,
      avaliacao: 4.9,
      validade: 'Válido até sexta',
      favorito: false,
      empresa: 'Oficina do João',
      endereco: 'Rua das Flores, 567 - Bairro'
    },
    {
      id: 3,
      categoria: 'alimentacao',
      titulo: 'Restaurante Popular - Almoço',
      descricao: 'Prato feito completo com bebida inclusa',
      preco_original: 18.00,
      preco_desconto: 14.40,
      desconto: 20,
      distancia: 150,
      avaliacao: 4.6,
      validade: 'Até 15h',
      favorito: true,
      empresa: 'Restaurante Popular',
      endereco: 'Rua XV de Novembro, 89'
    },
    {
      id: 4,
      categoria: 'saude',
      titulo: 'Dr. João - Renovação CNH',
      descricao: 'Exame médico para renovação de CNH categoria AB',
      preco_original: 200.00,
      preco_desconto: 180.00,
      desconto: 10,
      distancia: 500,
      avaliacao: 4.7,
      validade: 'Agendamento até amanhã',
      favorito: false,
      empresa: 'Dr. João Medicina do Tráfego',
      endereco: 'Av. Independência, 456'
    },
    {
      id: 5,
      categoria: 'combustivel',
      titulo: 'Posto Ipiranga - Cashback',
      descricao: 'Gasolina + 3% de cashback no Zaggy Pay',
      preco_original: 5.92,
      preco_desconto: 5.74,
      desconto: 3,
      distancia: 1200,
      avaliacao: 4.5,
      validade: 'Cashback até domingo',
      favorito: false,
      empresa: 'Posto Ipiranga',
      endereco: 'Rua Principal, 789'
    }
  ];

  const categorias = [
    { key: 'todas', label: 'Todas', icon: Tag },
    { key: 'combustivel', label: 'Combustível', icon: Fuel },
    { key: 'manutencao', label: 'Manutenção', icon: Wrench },
    { key: 'alimentacao', label: 'Alimentação', icon: Utensils },
    { key: 'saude', label: 'Saúde', icon: Stethoscope }
  ];

  const ofertasFiltradas = ofertas.filter(oferta => {
    if (showFavorites && !oferta.favorito) return false;
    if (selectedCategory === 'todas') return true;
    return oferta.categoria === selectedCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ofertas para Você</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={[styles.headerButton, showFavorites && styles.headerButtonActive]}
              onPress={() => setShowFavorites(!showFavorites)}
            >
              <Heart size={20} color={showFavorites ? "#FFFFFF" : "#5F6368"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Filter size={20} color="#5F6368" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Destaque do Dia */}
        <View style={styles.destaqueContainer}>
          <View style={styles.destaqueCard}>
            <View style={styles.destaqueBadge}>
              <Gift size={16} color="#FFFFFF" />
              <Text style={styles.destaqueLabel}>OFERTA DO DIA</Text>
            </View>
            <Text style={styles.destaqueTitulo}>Combustível 15% OFF</Text>
            <Text style={styles.destaqueDescricao}>
              Shell Centro • Válido apenas hoje até 18h
            </Text>
            <TouchableOpacity style={styles.destaqueButton}>
              <Text style={styles.destaqueButtonText}>USAR AGORA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categorias */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categorias.map((categoria) => {
            const IconComponent = categoria.icon;
            return (
              <TouchableOpacity
                key={categoria.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === categoria.key && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(categoria.key)}
              >
                <IconComponent 
                  size={20} 
                  color={selectedCategory === categoria.key ? '#FFFFFF' : '#9AA0A6'} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === categoria.key && styles.categoryButtonTextActive
                ]}>
                  {categoria.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Lista de Ofertas */}
        <View style={styles.ofertasContainer}>
          <View style={styles.ofertasHeader}>
            <Text style={styles.ofertasTitle}>
              {showFavorites ? 'Suas Ofertas Favoritas' : 
               selectedCategory === 'todas' ? 'Todas as Ofertas' : 
               `Ofertas de ${categorias.find(c => c.key === selectedCategory)?.label}`}
            </Text>
            <Text style={styles.ofertasCount}>
              {ofertasFiltradas.length} {ofertasFiltradas.length === 1 ? 'oferta' : 'ofertas'}
            </Text>
          </View>

          {ofertasFiltradas.map((oferta) => (
            <OfertaCard
              key={oferta.id}
              oferta={oferta}
              onPress={() => Alert.alert(
                oferta.titulo,
                `${oferta.descricao}\n\nEndereço: ${oferta.endereco}\n\nDeseja usar esta oferta?`,
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'USAR OFERTA', onPress: () => Alert.alert('Sucesso!', 'Oferta ativada! Mostre este cupom no estabelecimento.') }
                ]
              )}
            />
          ))}

          {ofertasFiltradas.length === 0 && (
            <View style={styles.emptyState}>
              <Tag size={48} color="#DADCE0" />
              <Text style={styles.emptyTitle}>Nenhuma oferta encontrada</Text>
              <Text style={styles.emptyDescription}>
                {showFavorites ? 
                  'Você ainda não tem ofertas favoritas' : 
                  'Não há ofertas disponíveis nesta categoria'
                }
              </Text>
            </View>
          )}
        </View>

        {/* Cashback Info */}
        <View style={styles.cashbackCard}>
          <View style={styles.cashbackHeader}>
            <Text style={styles.cashbackTitle}>💰 Zaggy Cashback</Text>
            <Text style={styles.cashbackSaldo}>R$ 23,45</Text>
          </View>
          <Text style={styles.cashbackDescription}>
            Acumule cashback em todas as ofertas e use como desconto
          </Text>
          <TouchableOpacity style={styles.cashbackButton}>
            <Text style={styles.cashbackButtonText}>VER EXTRATO</Text>
          </TouchableOpacity>
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
  headerButtonActive: {
    backgroundColor: '#FF6B35',
  },
  destaqueContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  destaqueCard: {
    backgroundColor: '#FF6B35',
    padding: 20,
    borderRadius: 12,
    position: 'relative',
  },
  destaqueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 4,
  },
  destaqueLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  destaqueTitulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  destaqueDescricao: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  destaqueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  destaqueButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '700',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9AA0A6',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  ofertasContainer: {
    paddingHorizontal: 20,
  },
  ofertasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ofertasTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  ofertasCount: {
    fontSize: 14,
    color: '#9AA0A6',
  },
  ofertaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  ofertaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ofertaCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ofertaCategoryText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ofertaContent: {
    marginBottom: 12,
  },
  ofertaTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  ofertaDescricao: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 12,
    lineHeight: 20,
  },
  ofertaDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ofertaLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ofertaDistance: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  ofertaRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ofertaRatingText: {
    fontSize: 12,
    color: '#9AA0A6',
  },
  ofertaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ofertaPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ofertaPriceOld: {
    fontSize: 14,
    color: '#9AA0A6',
    textDecorationLine: 'line-through',
  },
  ofertaPriceNew: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27AE60',
  },
  ofertaValidity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ofertaValidityText: {
    fontSize: 12,
    color: '#F39C12',
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5F6368',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9AA0A6',
    textAlign: 'center',
  },
  cashbackCard: {
    backgroundColor: '#F0F9FF',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B3E5FC',
  },
  cashbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cashbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },
  cashbackSaldo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#27AE60',
  },
  cashbackDescription: {
    fontSize: 14,
    color: '#5F6368',
    marginBottom: 16,
    lineHeight: 20,
  },
  cashbackButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cashbackButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});