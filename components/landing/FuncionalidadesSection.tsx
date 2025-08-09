import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { 
  DollarSign, 
  FileText, 
  Bike, 
  Briefcase, 
  Target, 
  Gift,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react-native';

const FuncionalidadesSection = () => {
  const funcionalidades = [
    {
      icon: <DollarSign color="#27AE60" size={32} />,
      titulo: 'Central Financeira',
      descricao: 'Dashboard unificado com receitas de todos os apps de delivery',
      detalhes: ['Comparativo de performance', 'Metas e projeções', 'Relatórios automáticos']
    },
    {
      icon: <FileText color="#3B82F6" size={32} />,
      titulo: 'Gestão de Documentos',
      descricao: 'Controle total de CNH, multas, licenciamento e MEI',
      detalhes: ['Alertas de vencimento', 'Renovação expressa', 'Consulta automática']
    },
    {
      icon: <Bike color="#FF6B35" size={32} />,
      titulo: 'Minha Moto',
      descricao: 'Monitor de combustível, manutenção e custos operacionais',
      detalhes: ['Postos mais baratos', 'Manutenção preventiva', 'Custo por km']
    },
    {
      icon: <Briefcase color="#8B5CF6" size={32} />,
      titulo: 'MEI Organizado',
      descricao: 'Emissão automática de NF, controle de limite e DAS',
      detalhes: ['NF automática', 'Controle de limite', 'Relatórios contábeis']
    },
    {
      icon: <Target color="#EF4444" size={32} />,
      titulo: 'Vagas Zaggy',
      descricao: 'Marketplace exclusivo com vagas de restaurantes parceiros',
      detalhes: ['Sem comissão abusiva', 'Pagamento garantido', 'Trabalho seguro']
    },
    {
      icon: <Gift color="#FFD700" size={32} />,
      titulo: 'Ofertas Exclusivas',
      descricao: 'Descontos em combustível, manutenção e alimentação',
      detalhes: ['Baseado na localização', 'Cashback Zaggy', 'Parcerias locais']
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textCenter}>
          <Text style={styles.title}>
            Tudo que Você Precisa em{'\n'}
            <Text style={styles.highlightText}>Um Só App</Text>
          </Text>
          <Text style={styles.subtitle}>
            Desenvolvido especificamente para entregadores brasileiros. 
            Cada funcionalidade pensada para resolver seus problemas reais.
          </Text>
        </View>

        <View style={styles.funcionalidadesGrid}>
          {funcionalidades.map((func, index) => (
            <View key={index} style={styles.funcionalidadeCard}>
              <View style={styles.funcionalidadeIcon}>
                {func.icon}
              </View>
              
              <Text style={styles.funcionalidadeTitle}>
                {func.titulo}
              </Text>
              
              <Text style={styles.funcionalidadeDescription}>
                {func.descricao}
              </Text>
              
              <View style={styles.detalhesList}>
                {func.detalhes.map((detalhe, idx) => (
                  <View key={idx} style={styles.detalheItem}>
                    <View style={styles.detalheDot} />
                    <Text style={styles.detalheText}>{detalhe}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.textCenter}>
            <Text style={styles.statsTitle}>
              Resultados Reais dos Nossos Usuários
            </Text>
            <Text style={styles.statsSubtitle}>
              Dados coletados de mais de 1.000 entregadores ativos
            </Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
                <TrendingUp color="#27AE60" size={32} />
              </View>
              <Text style={styles.statValue}>+127%</Text>
              <Text style={styles.statLabel}>Aumento na produtividade</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
                <DollarSign color="#FF6B35" size={32} />
              </View>
              <Text style={styles.statValue}>R$ 2.340</Text>
              <Text style={styles.statLabel}>Economia média mensal</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#EFF6FF' }]}>
                <Shield color="#3B82F6" size={32} />
              </View>
              <Text style={styles.statValue}>100%</Text>
              <Text style={styles.statLabel}>Documentos em dia</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#F3E8FF' }]}>
                <Zap color="#8B5CF6" size={32} />
              </View>
              <Text style={styles.statValue}>4.9⭐</Text>
              <Text style={styles.statLabel}>Avaliação na loja</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
  textCenter: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 48,
  },
  highlightText: {
    color: '#FF6B35',
  },
  subtitle: {
    fontSize: 20,
    color: '#5F6368',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
  },
  funcionalidadesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
  },
  funcionalidadeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  funcionalidadeIcon: {
    marginBottom: 24,
  },
  funcionalidadeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  funcionalidadeDescription: {
    fontSize: 16,
    color: '#5F6368',
    lineHeight: 24,
    marginBottom: 24,
  },
  detalhesList: {
    gap: 8,
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detalheDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  detalheText: {
    fontSize: 14,
    color: '#5F6368',
  },
  statsSection: {
    marginTop: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  statsTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsSubtitle: {
    fontSize: 18,
    color: '#5F6368',
    textAlign: 'center',
    marginBottom: 48,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
  },
  statCard: {
    alignItems: 'center',
    width: 200,
  },
  statIcon: {
    borderRadius: 40,
    padding: 16,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#5F6368',
    textAlign: 'center',
  },
});

export default FuncionalidadesSection;