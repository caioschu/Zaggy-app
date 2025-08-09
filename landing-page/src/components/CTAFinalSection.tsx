import React from 'react';
import { Smartphone, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

const CTAFinalSection = () => {
  return (
    <section className="gradient-zaggy section-padding">
      <div className="container-max">
        <div className="text-center text-white">
          <div className="mb-8">
            <ZaggyLogo size="large" color="white" className="mx-auto mb-6" />
          </div>

          <h2 className="text-4xl lg:text-6xl font-black mb-8">
            Sua Vida Profissional
            <br />
            <span className="text-accent">Organizada</span> em 5 Minutos
          </h2>

          <p className="text-xl lg:text-2xl text-white text-opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Mais de <strong>1.000 entregadores</strong> já aumentaram seus ganhos e organizaram suas vidas com o Zaggy. 
            <strong>É grátis</strong> e você pode começar agora mesmo!
          </p>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={24} className="text-accent fill-current" />
                ))}
              </div>
              <span className="text-xl font-bold">4.9</span>
              <span className="text-white text-opacity-80">na App Store</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users size={24} className="text-accent" />
              <span className="text-xl font-bold">1.000+</span>
              <span className="text-white text-opacity-80">entregadores ativos</span>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp size={24} className="text-accent" />
              <span className="text-xl font-bold">+127%</span>
              <span className="text-white text-opacity-80">produtividade média</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="btn-outline flex items-center gap-3 text-xl px-8 py-4">
              <Smartphone size={28} />
              📱 Baixar App Grátis
              <ArrowRight size={24} />
            </button>
            <button className="btn-outline flex items-center gap-3 text-xl px-8 py-4">
              <Users size={28} />
              🍕 Sou Restaurante
            </button>
          </div>

          {/* Garantia */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              🛡️ Garantia de 30 Dias
            </h3>
            <p className="text-lg text-white text-opacity-90">
              Não gostou? Sem problemas! Garantimos 100% do seu dinheiro de volta 
              em até 30 dias. Sem perguntas, sem burocracia.
            </p>
          </div>

          {/* Urgência */}
          <div className="mt-12">
            <p className="text-lg text-accent font-bold mb-2">
              ⚡ Oferta de Lançamento - Tempo Limitado!
            </p>
            <p className="text-white text-opacity-80">
              Primeiros 1.000 usuários ganham acesso vitalício gratuito a todas as funcionalidades premium
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;