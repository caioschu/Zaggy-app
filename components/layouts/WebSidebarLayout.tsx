import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome as Home, DollarSign, Briefcase, Users, ChartBar as BarChart3, LogOut, Menu, Bell } from 'lucide-react-native';
import { router } from 'expo-router';

interface WebSidebarLayoutProps {
  children: React.ReactNode;
  title: string;
  currentRoute?: string;
}

export default function WebSidebarLayout({ children, title, currentRoute }: WebSidebarLayoutProps) {
  const { signOut, profile } = useAuth();

  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  const menuItems = profile?.user_type === 'empresa' ? [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Briefcase, label: 'Vagas', route: '/vagas' },
    { icon: Users, label: 'Entregadores', route: '/entregadores' },
    { icon: DollarSign, label: 'Financeiro', route: '/financeiro' },
    { icon: BarChart3, label: 'Relatórios', route: '/relatorios' },
  ] : [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: DollarSign, label: 'Financeiro', route: '/financeiro' },
    { icon: Briefcase, label: 'Vagas', route: '/vagas' },
    { icon: BarChart3, label: 'Relatórios', route: '/relatorios' },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.logo}>Zaggy</Text>
          <Text style={styles.userType}>
            {profile?.user_type === 'empresa' ? 'Empresa' : 'Entregador'}
          </Text>
        </View>

        <ScrollView style={styles.menuContainer}>
          {menuItems.map((item) => (
            <Pressable
              key={item.route}
              style={[
                styles.menuItem,
                currentRoute === item.route && styles.menuItemActive
              ]}
              onPress={() => router.push(item.route as any)}
            >
              <item.icon 
                size={20} 
                color={currentRoute === item.route ? '#3B82F6' : '#6B7280'} 
              />
              <Text style={[
                styles.menuItemText,
                currentRoute === item.route && styles.menuItemTextActive
              ]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sidebarFooter}>
          <Pressable style={styles.logoutButton} onPress={handleSignOut}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sair</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Text style={styles.pageTitle}>{title}</Text>
          </View>
          <View style={styles.topBarRight}>
            <Pressable style={styles.notificationButton}>
              <Bell size={20} color="#6B7280" />
            </Pressable>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {profile?.user_type === 'empresa' ? 'Empresa' : 'Entregador'}
              </Text>
              <Text style={styles.userEmail}>{profile?.email}</Text>
            </View>
          </View>
        </View>

        {/* Page Content */}
        <ScrollView style={styles.contentArea}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: '100vh' as any,
    backgroundColor: '#F8FAFC',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userType: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 8,
    cursor: 'pointer' as any,
  },
  menuItemActive: {
    backgroundColor: '#EBF4FF',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  menuItemTextActive: {
    color: '#3B82F6',
  },
  sidebarFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    cursor: 'pointer' as any,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    height: 80,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  topBarLeft: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    cursor: 'pointer' as any,
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  userEmail: {
    fontSize: 12,
    color: '#6B7280',
  },
  contentArea: {
    flex: 1,
    padding: 32,
  },
});