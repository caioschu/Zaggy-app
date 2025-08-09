import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import LandingPage from './landing';
import MobileWelcomeScreen from '../components/MobileWelcomeScreen';
import LoadingScreen from '../components/LoadingScreen';

export default function HomePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !redirected) {
      if (user && profile) {
        setRedirected(true);
        router.replace('/(tabs)');
      }
    }
  }, [user, profile, loading, redirected]);

  if (loading) {
    return <LoadingScreen />;
  }

  // Se usuário logado, não mostrar landing/welcome
  if (user && profile) {
    return <LoadingScreen />;
  }

  // Usuário não logado
  if (Platform.OS === 'web') {
    return <LandingPage />;
  } else {
    return <MobileWelcomeScreen />;
  }
}