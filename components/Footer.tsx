import React from 'react';
import { Mail, Globe, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-hku-ash text-white py-12 border-t-4 border-hku-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <h4 className="text-2xl font-serif font-bold mb-4 text-white">SPAN2030</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              School of Modern Languages and Cultures<br/>
              The University of Hong Kong
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-lg font-bold text-hku-green mb-4">Enlaces Rápidos</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="https://hku.hk" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">HKU Homepage</a></li>
              <li><a href="https://moodle.hku.hk" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">HKU Moodle</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recursos de Biblioteca</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-lg font-bold text-hku-green mb-4">Contacto</h5>
            <div className="flex items-start space-x-3 text-gray-300 text-sm">
              <MapPin className="w-5 h-5 flex-shrink-0 text-hku-blue" />
              <span>Office 522, Run Run Shaw Tower, Centennial Campus</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <Mail className="w-5 h-5 flex-shrink-0 text-hku-blue" />
              <a href="mailto:ignacio@hku.hk" className="hover:text-white">ignacio@hku.hk</a>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 text-sm">
              <Globe className="w-5 h-5 flex-shrink-0 text-hku-blue" />
              <a href="https://smlc.hku.hk" target="_blank" rel="noreferrer" className="hover:text-white">smlc.hku.hk</a>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} The University of Hong Kong. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Diseñado para SPAN2030</p>
        </div>
      </div>
    </footer>
  );
};