import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Mail, Phone, MapPin } from 'lucide-react-native';
import ZaggyLogo from '@/components/ZaggyLogo';

const FooterSection = () => {
  const links = {
    produto: [
      { nome: 'App Entregador', href: '#' },
      { nome: 'Dashboard Restaurante', href: '#' },
      { nome: 'Funcionalidades', href: '#funcionalidades' },
      { nome: 'Preços', href: '#precos' }
    ],
    empresa: [
      { nome: 'Sobre Nós', href: '#' },
      { nome: 'Blog', href: '#' },
      { nome: 'Carreiras', href: '#' },
      { nome: 'Imprensa', href: '#' }
    ],
    suporte: [
      { nome: 'Central de Ajuda', href: '#' },
      { nome: 'WhatsApp', href: '#' },
      { nome: 'Status do Sistema', href: '#' },
      { nome: 'API Docs', href: '#' }
    ],
    legal: [
      { nome: 'Termos de Uso', href: '#' },
      { nome: 'Política de Privacidade', href: '#' },
      { nome: 'LGPD', href: '#' },
      { nome: 'Cookies', href: '#' }
    ]
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainSection}>
          {/* Logo e Descrição */}
          <View style={styles.logoSection}>
            <ZaggyLogo size="large" color="white" />
            <Text style={styles.description}>
              O primeiro super app brasileiro desenvolvido especificamente para entregadores. 
              Organize sua vida profissional e aumente seus ganhos.
            </Text>
            
            {/* Contato */}
            <View style={styles.contatoContainer}>
              <View style={styles.contatoItem}>
                <Mail size={20} color="#FF6B35" />
                <Text style={styles.contatoText}>contato@zaggy.com.br</Text>
              </View>
              <View style={styles.contatoItem}>
                <Phone size={20} color="#FF6B35" />
                <Text style={styles.contatoText}>(11) 99999-9999</Text>
              </View>
              <View style={styles.contatoItem}>
                <MapPin size={20} color="#FF6B35" />
                <Text style={styles.contatoText}>São Paulo, SP - Brasil</Text>
              </View>
            </View>
          </View>

          {/* Links */}
          <View style={styles.linksSection}>
            <View style={styles.linkColumn}>
              <Text style={styles.linkColumnTitle}>Produto</Text>
              <View style={styles.linksList}>
                {links.produto.map((link, index) => (
                  <TouchableOpacity key={index}>
                    <Text style={styles.linkText}>{link.nome}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.linkColumn}>
              <Text style={styles.linkColumnTitle}>Empresa</Text>
              <View style={styles.linksList}>
                {links.empresa.map((link, index) => (
                  <TouchableOpacity key={index}>
                    <Text style={styles.linkText}>{link.nome}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.linkColumn}>
              <Text style={styles.linkColumnTitle}>Suporte</Text>
              <View style={styles.linksList}>
                {links.suporte.map((link, index) => (
                  <TouchableOpacity key={index}>
                    <Text style={styles.linkText}>{link.nome}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Newsletter */}
        <View style={styles.newsletterSection}>
          <View style={styles.newsletterContent}>
            <View>
              <Text style={styles.newsletterTitle}>
                📧 Fique por Dentro das Novidades
              </Text>
              <Text style={styles.newsletterDescription}>
                Receba dicas exclusivas, atualizações do app e ofertas especiais
              </Text>
            </View>
            
            <View style={styles.newsletterForm}>
              <TextInput 
                placeholder="Seu melhor e-mail"
                placeholderTextColor="#9AA0A6"
                style={styles.newsletterInput}
              />
              <TouchableOpacity style={styles.newsletterButton}>
                <Text style={styles.newsletterButtonText}>Inscrever</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <View style={styles.legalLinks}>
            {links.legal.map((link, index) => (
              <TouchableOpacity key={index}>
                <Text style={styles.legalLinkText}>{link.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.copyrightText}>
            © 2025 Zaggy Brasil. Todos os direitos reservados.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3E50',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
  mainSection: {
    flexDirection: 'row',
    gap: 48,
    marginBottom: 64,
  },
  logoSection: {
    flex: 2,
  },
  description: {
    fontSize: 18,
    color: '#BDC3C7',
    lineHeight: 26,
    marginTop: 24,
    marginBottom: 32,
  },
  contatoContainer: {
    gap: 16,
  },
  contatoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contatoText: {
    fontSize: 16,
    color: '#BDC3C7',
  },
  linksSection: {
    flex: 3,
    flexDirection: 'row',
    gap: 48,
  },
  linkColumn: {
    flex: 1,
  },
  linkColumnTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  linksList: {
    gap: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#BDC3C7',
  },
  newsletterSection: {
    paddingTop: 48,
    borderTopWidth: 1,
    borderTopColor: '#34495E',
    marginBottom: 48,
  },
  newsletterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  newsletterTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  newsletterDescription: {
    fontSize: 16,
    color: '#BDC3C7',
  },
  newsletterForm: {
    flexDirection: 'row',
    gap: 16,
    flex: 1,
  },
  newsletterInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#34495E',
    borderWidth: 1,
    borderColor: '#4A5568',
    color: '#FFFFFF',
    fontSize: 16,
  },
  newsletterButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  newsletterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  copyrightSection: {
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#34495E',
    alignItems: 'center',
    gap: 24,
  },
  legalLinks: {
    flexDirection: 'row',
    gap: 24,
  },
  legalLinkText: {
    fontSize: 14,
    color: '#9AA0A6',
  },
  copyrightText: {
    fontSize: 14,
    color: '#9AA0A6',
  },
});

export default FooterSection;