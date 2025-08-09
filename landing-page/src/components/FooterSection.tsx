import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

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
    <footer className="bg-dark text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <ZaggyLogo size="large" color="white" className="mb-6" />
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              O primeiro super app brasileiro desenvolvido especificamente para entregadores. 
              Organize sua vida profissional e aumente seus ganhos.
            </p>
            
            {/* Contato */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-zaggy-orange" />
                <span className="text-gray-300">contato@zaggy.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-zaggy-orange" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-zaggy-orange" />
                <span className="text-gray-300">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Produto</h3>
            <div className="space-y-3">
              {links.produto.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-zaggy-orange transition-colors"
                >
                  {link.nome}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Empresa</h3>
            <div className="space-y-3">
              {links.empresa.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-zaggy-orange transition-colors"
                >
                  {link.nome}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Suporte</h3>
            <div className="space-y-3">
              {links.suporte.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="block text-gray-300 hover:text-zaggy-orange transition-colors"
                >
                  {link.nome}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                📧 Fique por Dentro das Novidades
              </h3>
              <p className="text-gray-300">
                Receba dicas exclusivas, atualizações do app e ofertas especiais
              </p>
            </div>
            
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zaggy-orange"
              />
              <button className="btn-primary px-6">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Redes Sociais e Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-zaggy-orange transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-zaggy-orange transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-zaggy-orange transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-6 text-gray-400 text-sm">
            <div className="flex gap-6">
              {links.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="hover:text-zaggy-orange transition-colors"
                >
                  {link.nome}
                </a>
              ))}
            </div>
            <span>© 2025 Zaggy Brasil. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;