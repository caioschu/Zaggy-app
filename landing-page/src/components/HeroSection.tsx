import React from 'react';
import { Smartphone, Users, Star, ArrowRight } from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

const HeroSection = () => {
  return (
    <section className="gradient-zaggy min-h-screen flex items-center">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-slide-up">
            {/* Badge de Lançamento */}
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-bounce-subtle"></span>
              <span className="text-sm font-semibold">🚀 Lançamento Oficial</span>
            </div>

            {/* Logo e Título */}
            <div className="mb-6">
              <ZaggyLogo size="large" color="white" className="mb-4" />
              <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                O Primeiro
                <br />
                <span className="text-accent">Super App</span>
                <br />
                para Entregadores
                <br />
                do Brasil
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-white text-opacity-90 mb-8 leading-relaxed">
              Organize toda sua vida profissional em um só lugar. 
              Controle receitas de <strong>todos os apps</strong>, documentos, MEI e muito mais.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn-outline flex items-center justify-center gap-3 text-lg">
                <Smartphone size={24} />
                📱 Baixar App Grátis
                <ArrowRight size={20} />
              </button>
              <button className="btn-outline flex items-center justify-center gap-3 text-lg">
                <Users size={24} />
                🍕 Sou Restaurante
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 text-white text-opacity-80">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={20} className="text-accent fill-current" />
                  ))}
                </div>
                <span className="font-semibold">4.9</span>
              </div>
              <div className="h-6 w-px bg-white bg-opacity-30"></div>
              <span className="font-semibold">Mais de 1.000 entregadores já usam</span>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              {/* Phone Frame */}
              <div className="bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-gray-900 h-8 flex items-center justify-center">
                    <div className="w-20 h-1 bg-white rounded-full"></div>
                  </div>
                  
                  {/* App Content */}
                  <div className="h-[600px] bg-light p-4">
                    <div className="flex items-center gap-3 mb-6">
                      <ZaggyLogo size="small" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Boa tarde, João! 👋</p>
                        <p className="text-xs text-gray-600">Vamos fazer um ótimo dia</p>
                      </div>
                    </div>
                    
                    {/* Performance Card */}
                    <div className="bg-zaggy-orange rounded-xl p-4 mb-4">
                      <h3 className="text-white font-bold mb-3">Performance Hoje</h3>
                      <div className="grid grid-cols-3 gap-2 text-white text-center">
                        <div>
                          <p className="text-lg font-bold">R$ 240</p>
                          <p className="text-xs opacity-80">Líquido</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold">R$ 28</p>
                          <p className="text-xs opacity-80">Por hora</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold">22</p>
                          <p className="text-xs opacity-80">Entregas</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Apps Cards */}
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-red-500 flex justify-between">
                        <div>
                          <p className="font-semibold text-sm">iFood</p>
                          <p className="text-xs text-gray-600">9 entregas</p>
                        </div>
                        <p className="font-bold text-success">R$ 127</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-zaggy-orange flex justify-between">
                        <div>
                          <p className="font-semibold text-sm">Zaggy</p>
                          <p className="text-xs text-gray-600">6 entregas</p>
                        </div>
                        <p className="font-bold text-success">R$ 85</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-black flex justify-between">
                        <div>
                          <p className="font-semibold text-sm">Uber</p>
                          <p className="text-xs text-gray-600">4 entregas</p>
                        </div>
                        <p className="font-bold text-success">R$ 67</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-accent rounded-full p-3 shadow-lg animate-bounce-subtle">
              <span className="text-2xl">💰</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-secondary rounded-full p-3 shadow-lg animate-bounce-subtle" style={{animationDelay: '1s'}}>
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;