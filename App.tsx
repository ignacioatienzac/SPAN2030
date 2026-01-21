import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CourseSection } from './components/CourseSection';
import { Footer } from './components/Footer';
import { TopicViewer } from './components/TopicViewer';
import { COURSE_TOPICS_PART_1, COURSE_TOPICS_PART_2, Topic } from './types';

function App() {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  const handleTopicClick = (topic: Topic) => {
    setCurrentTopic(topic);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentTopic(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-16">
        {currentTopic ? (
          <TopicViewer topic={currentTopic} onBack={handleBackToHome} />
        ) : (
          <>
            <Hero />
            
            {/* Info Banner */}
            <div id="syllabus" className="bg-hku-ash py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Estructura del Curso</h3>
                    <p className="text-gray-300 leading-relaxed">
                        El curso está dividido en dos grandes bloques temáticos. La primera parte se centra en la morfología y las categorías gramaticales básicas, culminando en el examen de mitad de semestre. La segunda parte profundiza en aspectos sintácticos más complejos y usos específicos que suelen presentar dificultades para los estudiantes avanzados.
                    </p>
                </div>
            </div>

            {/* Part 1 */}
            <CourseSection 
              id="parte-1"
              title="Fundamentos Gramaticales" 
              subtitle="Primera Parte · Antes del Examen Parcial"
              topics={COURSE_TOPICS_PART_1}
              isAlternate={true}
              onTopicClick={handleTopicClick}
            />

            {/* Midterm Divider */}
            <div className="bg-hku-blue py-8 text-center text-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                 <p className="text-lg font-bold tracking-widest uppercase relative z-10">Examen de Mitad de Semestre</p>
            </div>

            {/* Part 2 */}
            <CourseSection 
              id="parte-2"
              title="Sintaxis y Usos Avanzados" 
              subtitle="Segunda Parte · Hacia el Examen Final"
              topics={COURSE_TOPICS_PART_2}
              isAlternate={false}
              onTopicClick={handleTopicClick}
            />
            
            {/* Call to Action for Resources */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-5xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                    <div>
                        <h3 className="text-2xl font-bold text-hku-ash mb-2">¿Buscas material extra?</h3>
                        <p className="text-gray-600">Accede al repositorio de lecturas, ejercicios prácticos y exámenes anteriores.</p>
                    </div>
                    <button className="bg-hku-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2399cc] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap">
                        Ir a Recursos
                    </button>
                </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;