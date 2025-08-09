import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProblemasSection = () => {
  const problemas = [
    {
      emoji: '💸',
      titulo: 'Receitas Desorganizadas',
      descricao: 'Dinheiro espalhado entre iFood, Rappi, Uber... Sem controle real dos ganhos diários.'
    },
    {
      emoji: '📄',
      titulo: 'Documentos Esquecidos',
      descricao: 'CNH vencida = sem trabalho. Multas acumulando. MEI bagunçado. Stress constante.'
    },
    {
      emoji: '⚖️',
      titulo: 'Riscos Trabalhistas',
      descricao: 'Restaurantes com medo de processo. Você perdendo oportunidades de trabalho.'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textCenter}>
          <Text style={styles.title}>
            Você está cansado de...
          </Text>
          <Text style={styles.subtitle}>
            Sabemos exatamente os problemas que você enfrenta todo dia. 
            Por isso criamos a solução definitiva.
          </Text>
        </View>

        <View style={styles.problemsGrid}>
          {problemas.map((problema, index) => (
            <View key={index} style={styles.problemCard}>
              <Text style={styles.problemEmoji}>{problema.emoji}</Text>
              <Text style={styles.problemTitle}>
                {problema.titulo}
              </Text>
              <Text style={styles.problemDescription}>
                {problema.descricao}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.textCenter}>
          <Text style={styles.finalMessage}>
            Chega de perder tempo e dinheiro! 😤
          </Text>
          <Text style={styles.finalSubtext}>
            A solução que você precisa está aqui ⬇️
          </Text>
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
  },
  subtitle: {
    fontSize: 20,
    color: '#5F6368',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
  },
  problemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
    marginBottom: 64,
  },
  problemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  problemEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  problemTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 16,
  },
  problemDescription: {
    fontSize: 16,
    color: '#5F6368',
    textAlign: 'center',
    lineHeight: 24,
  },
  finalMessage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 16,
  },
  finalSubtext: {
    fontSize: 18,
    color: '#5F6368',
    textAlign: 'center',
  },
});

export default ProblemasSection;