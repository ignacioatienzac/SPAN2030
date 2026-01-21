import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="bg-hku-green p-2 rounded-lg text-white">
              <BookOpen size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-hku-ash text-xl tracking-tight">SPAN2030</span>
              <span className="text-xs text-hku-blue font-semibold uppercase tracking-wider hidden sm:block">The University of Hong Kong</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-hku-ash hover:text-hku-blue font-medium transition-colors">Inicio</a>
            <a href="#syllabus" className="text-hku-ash hover:text-hku-blue font-medium transition-colors">Sílabo</a>
            <a href="#parte-1" className="text-hku-ash hover:text-hku-blue font-medium transition-colors">Primera Parte</a>
            <a href="#parte-2" className="text-hku-ash hover:text-hku-blue font-medium transition-colors">Segunda Parte</a>
            <button className="bg-hku-green text-white px-5 py-2 rounded-full font-semibold hover:bg-[#7cb335] transition-colors shadow-sm">
              Moodle
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-hku-ash hover:text-hku-blue focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-hku-ash hover:bg-gray-50 hover:text-hku-blue font-medium rounded-md">Inicio</a>
            <a href="#syllabus" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-hku-ash hover:bg-gray-50 hover:text-hku-blue font-medium rounded-md">Sílabo</a>
            <a href="#parte-1" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-hku-ash hover:bg-gray-50 hover:text-hku-blue font-medium rounded-md">Primera Parte</a>
            <a href="#parte-2" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-hku-ash hover:bg-gray-50 hover:text-hku-blue font-medium rounded-md">Segunda Parte</a>
            <div className="pt-4 px-3">
               <button className="w-full bg-hku-green text-white px-5 py-3 rounded-lg font-semibold shadow-sm">
                Ir a Moodle
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};