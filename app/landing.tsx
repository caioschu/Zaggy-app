import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroSection from '@/components/landing/HeroSection';
import ProblemasSection from '@/components/landing/ProblemasSection';
import SolucoesSection from '@/components/landing/SolucoesSection';
import FuncionalidadesSection from '@/components/landing/FuncionalidadesSection';
import DepoimentosSection from '@/components/landing/DepoimentosSection';
import PrecosSection from '@/components/landing/PrecosSection';
import CTAFinalSection from '@/components/landing/CTAFinalSection';
import FooterSection from '@/components/landing/FooterSection';

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection />
        <ProblemasSection />
        <SolucoesSection />
        <FuncionalidadesSection />
        <DepoimentosSection />
        <PrecosSection />
        <CTAFinalSection />
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});