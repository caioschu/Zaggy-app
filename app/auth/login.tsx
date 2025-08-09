import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import ZaggyLogo from '../../components/ZaggyLogo';
import { ArrowLeft, Mail, Lock, ChevronDown, Smartphone, Building } from 'lucide-react-native';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'entregador' as 'entregador' | 'empresa'
  });
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const userTypes = [
    { 
      key: 'entregador' as const, 
      label: 'Entregador', 
      icon: <Smartphone size={20} color="#FF6B35" />,
      description: 'Acesse seu dashboard'
    },
    { 
      key: 'empresa' as const, 
      label: 'Empresa', 
      icon: <Building size={20} color="#3B82F6" />,
      description: 'Gerencie suas vagas'
    }
  ];

  const selectedUserType = userTypes.find(type => type.key === formData.userType);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    const { error } = await signIn(formData.email, formData.password);
    setLoading(false);

    if (error) {
      Alert.alert('Erro no Login', error.message);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header Fixo */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#5F6368" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <ZaggyLogo size="medium" />
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Entre na sua conta</Text>
          </View>
        </View>

        {/* Área Scrollável */}
        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View style={styles.form}>
              {/* Dropdown Tipo de Usuário */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Conta</Text>
                <TouchableOpacity
                  style={[styles.dropdown, showUserTypeDropdown && styles.dropdownActive]}
                  onPress={() => setShowUserTypeDropdown(!showUserTypeDropdown)}
                >
                  <View style={styles.dropdownSelected}>
                    {selectedUserType?.icon}
                    <Text style={styles.dropdownText}>{selectedUserType?.label}</Text>
                  </View>
                  <ChevronDown size={20} color="#9AA0A6" />
                </TouchableOpacity>
                
                {showUserTypeDropdown && (
                  <View style={styles.dropdownOptions}>
                    {userTypes.map((type) => (
                      <TouchableOpacity
                        key={type.key}
                        style={[
                          styles.dropdownOption,
                          formData.userType === type.key && styles.dropdownOptionSelected
                        ]}
                        onPress={() => {
                          setFormData({...formData, userType: type.key});
                          setShowUserTypeDropdown(false);
                        }}
                      >
                        {type.icon}
                        <View style={styles.dropdownOptionText}>
                          <Text style={styles.dropdownOptionLabel}>{type.label}</Text>
                          <Text style={styles.dropdownOptionDescription}>{type.description}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <View style={styles.inputContainer}>
                  <Mail size={20} color="#9AA0A6" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChangeText={(text) => setFormData({...formData, email: text})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#9AA0A6" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChangeText={(text) => setFormData({...formData, password: text})}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                </View>
              </View>

              {/* Espaço extra para o teclado */}
              <View style={styles.extraSpace} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Footer Fixo */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Entrando...' : 'ENTRAR'}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupLink}>
            <Text style={styles.signupLinkText}>Não tem conta? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={styles.signupLinkHighlight}>Cadastre-se grátis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 10,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F6368',
    textAlign: 'center',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 200, // Espaço extra para o teclado
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 52,
  },
  dropdownActive: {
    borderColor: '#FF6B35',
    zIndex: 1000,
  },
  dropdownSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#202124',
    fontWeight: '500',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
    gap: 12,
  },
  dropdownOptionSelected: {
    backgroundColor: '#FFF3E0',
  },
  dropdownOptionText: {
    flex: 1,
  },
  dropdownOptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 2,
  },
  dropdownOptionDescription: {
    fontSize: 14,
    color: '#5F6368',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADCE0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minHeight: 52,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#202124',
  },
  extraSpace: {
    height: 100,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F4',
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#DADCE0',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupLinkText: {
    fontSize: 14,
    color: '#5F6368',
  },
  signupLinkHighlight: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
});