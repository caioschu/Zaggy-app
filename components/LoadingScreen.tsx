import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ZaggyLogo from '@/components/ZaggyLogo';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ZaggyLogo size="large" />
      <ActivityIndicator size="large" color="#FF6B35" style={styles.spinner} />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: '#5F6368',
    fontWeight: '600',
  },
});