import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Chrome as Home, DollarSign, Bike, FileText, Briefcase, Tag, Users, Target, ChartBar as BarChart3 } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { profile } = useAuth();

  // No web, não mostrar tabs - será gerenciado pelo WebSidebarLayout
  if (Platform.OS === 'web') {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="financeiro" />
        <Tabs.Screen name="vagas" />
        <Tabs.Screen name="entregadores" />
        <Tabs.Screen name="relatorios" />
        <Tabs.Screen name="moto" />
        <Tabs.Screen name="documentos" />
        <Tabs.Screen name="mei" />
        <Tabs.Screen name="ofertas" />
      </Tabs>
    );
  }

  // No mobile, tabs condicionais
  const isEntregador = profile?.user_type === 'entregador';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#9AA0A6',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E8EAED',
          height: 70,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="financeiro"
        options={{
          title: 'Financeiro',
          tabBarIcon: ({ size, color }) => (
            <DollarSign size={size} color={color} />
          ),
        }}
      />
      {!isEntregador && (
        <>
          <Tabs.Screen
            name="vagas"
            options={{
              title: 'Vagas',
              tabBarIcon: ({ size, color }) => (
                <Target size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="entregadores"
            options={{
              title: 'Entregadores',
              tabBarIcon: ({ size, color }) => (
                <Users size={size} color={color} />
              ),
            }}
          />
        </>
      )}
      <Tabs.Screen
        name="relatorios"
        options={{
          title: 'Relatórios',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      {isEntregador && (
        <>
          <Tabs.Screen
            name="moto"
            options={{
              title: 'Minha Moto',
              tabBarIcon: ({ size, color }) => (
                <Bike size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="documentos"
            options={{
              title: 'Documentos',
              tabBarIcon: ({ size, color }) => (
                <FileText size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="mei"
            options={{
              title: 'MEI',
              tabBarIcon: ({ size, color }) => (
                <Briefcase size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="ofertas"
            options={{
              title: 'Ofertas',
              tabBarIcon: ({ size, color }) => (
                <Tag size={size} color={color} />
              ),
            }}
          />
        </>
      )}
    </Tabs>
  );
}