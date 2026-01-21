import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div id="inicio" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-hku-blue/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-hku-green/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-hku-green animate-pulse"></span>
              <span className="text-sm font-medium text-hku-ash">Semestre 1, 2024-2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-hku-ash leading-tight">
              Aspectos clave de la <span className="text-hku-blue">gramática del español</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              De la teoría a la práctica. Un curso diseñado para profundizar en las estructuras fundamentales del idioma y perfeccionar tu expresión escrita y oral.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#syllabus" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-hku-blue hover:bg-[#1e8cc0] transition-all duration-200">
                Ver Contenidos
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </a>
              <button className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-hku-ash bg-white hover:bg-gray-50 hover:border-hku-green transition-all duration-200">
                <Download className="mr-2 -ml-1 h-5 w-5 text-hku-green" />
                Descargar Sílabo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
               {/* Using a placeholder image related to studying/architecture similar to HKU */}
              <img 
                src="https://picsum.photos/800/600?grayscale" 
                alt="University of Hong Kong Campus vibe" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-hku-blue/20 to-transparent pointer-events-none"></div>
            </div>
            {/* Decorative card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden md:block border-l-4 border-hku-green max-w-xs">
              <p className="font-serif italic text-gray-600">"La gramática es el andamiaje del pensamiento."</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};