import React, { useState } from 'react';
import { Topic } from '../types';
import { ArrowLeft, BookOpen, PenTool, Lightbulb, Layers, GitBranch, Key, Globe, Scissors, Search, CheckCircle, XCircle, RefreshCw, ChevronRight, Hash, MapPin, Clock, AlertTriangle, ListOrdered, Eye, MessageSquare, MousePointer, HelpCircle, User, Users, Split } from 'lucide-react';

interface TopicViewerProps {
  topic: Topic;
  onBack: () => void;
}

type DeterminantsTab = 'introduccion' | 'numerales' | 'demostrativos' | 'posesivos' | 'indefinidos' | 'articulos' | 'practica';

export const TopicViewer: React.FC<TopicViewerProps> = ({ topic, onBack }) => {
  const [activeTab, setActiveTab] = useState<'teoria' | 'practica'>('teoria');
  const [determinantsTab, setDeterminantsTab] = useState<DeterminantsTab>('introduccion');

  // Topic IDs
  const isMorphology = topic.id === '1-1';
  const isDeterminants = topic.id === '1-2';

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-20">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-6">
            <div className="flex items-center mb-4 md:mb-0">
              <button 
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <span className="text-hku-green text-sm font-bold uppercase tracking-wider">Tema 1</span>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-hku-ash">{topic.title}</h1>
              </div>
            </div>

            {/* Tabs for Morphology */}
            {!isDeterminants && (
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('teoria')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'teoria' 
                      ? 'bg-white text-hku-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BookOpen size={16} className="mr-2" />
                  Teoría
                </button>
                <button
                  onClick={() => setActiveTab('practica')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'practica' 
                      ? 'bg-white text-hku-green shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <PenTool size={16} className="mr-2" />
                  Práctica
                </button>
              </div>
            )}
          </div>

          {/* Tabs for Determinants - 7 tabs */}
          {isDeterminants && (
            <div className="overflow-x-auto -mx-4 px-4 pb-4">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg min-w-max">
                <button
                  onClick={() => setDeterminantsTab('introduccion')}
                  className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    determinantsTab === 'introduccion' 
                      ? 'bg-white text-hku-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BookOpen size={14} className="mr-1.5" />
                  Introducción
                </button>
                <button
                  onClick={() => setDeterminantsTab('numerales')}
                  className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    determinantsTab === 'numerales' 
                      ? 'bg-white text-hku-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Hash size={14} className="mr-1.5" />
                  Numerales
                </button>
                <button
                  onClick={() => setDeterminantsTab('demostrativos')}
                  className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    determinantsTab === 'demostrativos' 
                      ? 'bg-white text-hku-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MapPin size={14} className="mr-1.5" />
                  Demostrativos
                </button>
                <button
                  onClick={() => setDeterminantsTab('posesivos')}
                  className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    determinantsTab === 'posesivos' 
                      ? 'bg-white text-hku-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <User size={14} className="mr-1.5" />
                  Posesivos
                </button>
                <button
                  onClick={() => setDeterminantsTab('indefinidos')}
                  className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    determinantsTab === 'indefinidos' 
                      ? 'bg-white text-hku-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <HelpCircle size={14} className="mr-1.5" />
                  Indefinidos
                </button>
                <button
                  onClick={() => setDeterminantsTab('articulos')}
                  className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    determinantsTab === 'articulos' 
                      ? 'bg-white text-hku-blue shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Key size={14} className="mr-1.5" />
                  Artículos
                </button>
                <button
                  onClick={() => setDeterminantsTab('practica')}
                  className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    determinantsTab === 'practica' 
                      ? 'bg-white text-hku-green shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <PenTool size={14} className="mr-1.5" />
                  Práctica
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isDeterminants ? (
          <div className="space-y-12">
            {determinantsTab === 'introduccion' && <DeterminantsIntroduccion />}
            {determinantsTab === 'numerales' && <DeterminantsNumerales />}
            {determinantsTab === 'demostrativos' && <DeterminantsDemostrativos />}
            {determinantsTab === 'posesivos' && <DeterminantsPosesivos />}
            {determinantsTab === 'indefinidos' && <DeterminantsIndefinidos />}
            {determinantsTab === 'articulos' && <DeterminantsArticulos />}
            {determinantsTab === 'practica' && <DeterminantsPractica />}
          </div>
        ) : (
          <>
            {activeTab === 'teoria' ? (
              <div className="space-y-12">
                {isMorphology && <MorphologyContent />}
                {!isMorphology && (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500">Contenido disponible próximamente para {topic.title}.</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {isMorphology ? (
                  <MorphologyPractice />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm border-l-4 border-l-hku-green">
                    <div className="bg-green-50 p-4 rounded-full mb-4">
                      <PenTool className="w-8 h-8 text-hku-green" />
                    </div>
                    <h3 className="text-xl font-bold text-hku-ash mb-2">Sección de Práctica</h3>
                    <p className="text-gray-500 text-center max-w-md">
                      Próximamente incluiremos ejercicios para este tema.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// --- CONTENT COMPONENT: MORPHOLOGY (Topic 1-1) ---
const MorphologyContent: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      
      {/* 1. Intro Gramática */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <BookOpen className="mr-2" /> Introducción: La lógica de la gramática
        </h2>
        
        <div className="flex flex-col gap-8 mb-8">
            <div className="">
                <p className="mb-4 leading-relaxed text-lg text-gray-600">
                    A menudo pensamos en la gramática como una lista estricta de prohibiciones (lo "correcto" vs lo "incorrecto"). Sin embargo, la gramática real es flexible y depende mucho de la intención del hablante y de la variedad regional. Observa este ejemplo:
                </p>
                
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-hku-blue my-6 shadow-inner">
                    <div className="flex flex-col md:flex-row justify-around items-center gap-6 text-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm w-full md:w-auto">
                            <p className="font-bold text-hku-ash text-lg mb-1">"La serie <span className="text-hku-blue bg-blue-100 px-1 rounded">es</span> muy violenta"</p>
                            <p className="text-xs text-gray-500">Define una característica esencial de la serie.</p>
                        </div>
                        <div className="text-gray-400 font-bold text-xl">VS</div>
                        <div className="bg-white p-4 rounded-lg shadow-sm w-full md:w-auto">
                            <p className="font-bold text-hku-ash text-lg mb-1">"La serie <span className="text-hku-green bg-green-100 px-1 rounded">está</span> muy violenta"</p>
                            <p className="text-xs text-gray-500">Enfoque en el resultado o percepción (Muy común en LatAm).</p>
                        </div>
                    </div>
                    <p className="mt-6 text-sm text-gray-700 text-center italic border-t border-blue-200 pt-4">
                        ¿Cuál es correcta? <strong>Ambas.</strong> La gramática no es solo seguir reglas, es elegir la forma adecuada para expresar exactamente lo que queremos decir. Por eso en este curso usamos la <strong>Gramática Cognitiva</strong>: para entender el <em>por qué</em> detrás de las reglas.
                    </p>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
            <h3 className="font-bold text-hku-ash mb-6 flex items-center text-xl"><Key className="w-5 h-5 mr-2 text-hku-green"/> Categorías Gramaticales</h3>
            <p className="mb-6 text-sm text-gray-600">Para analizar la lengua, clasificamos las palabras según su función. Estas son las principales:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { name: 'Sustantivo', def: 'Nombra entidades (personas, animales, cosas, ideas).', ex: 'Gato, libertad, Juan, mesa' },
                    { name: 'Verbo', def: 'Expresa acciones, estados o procesos. Es el núcleo de la oración.', ex: 'Correr, ser, pensar, llover' },
                    { name: 'Adjetivo', def: 'Describe cualidades, propiedades o estados del sustantivo.', ex: 'Rojo, grande, difícil, feliz' },
                    { name: 'Adverbio', def: 'Modifica al verbo, al adjetivo o a otro adverbio. Indica circunstancias.', ex: 'Rápidamente, muy, ayer, aquí' },
                    { name: 'Determinante', def: 'Acompaña al sustantivo para identificarlo, localizarlo o cuantificarlo.', ex: 'El, mi, tres, este, algunos' },
                    { name: 'Pronombre', def: 'Sustituye al sustantivo o a un grupo nominal completo.', ex: 'Ella, lo, nosotros, esto, quién' },
                    { name: 'Preposición', def: 'Palabra invariable que relaciona palabras estableciendo dependencias.', ex: 'De, con, para, en, por' },
                    { name: 'Conjunción', def: 'Conecta palabras, frases u oraciones entre sí.', ex: 'Y, pero, porque, si, aunque' }
                ].map((cat) => (
                    <div key={cat.name} className="bg-gray-50 p-5 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100 group">
                        <span className="font-bold text-hku-blue block mb-1 text-lg group-hover:text-hku-green transition-colors">{cat.name}</span>
                        <p className="text-sm text-gray-700 mb-3 leading-snug">{cat.def}</p>
                        <div className="flex items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase mr-2">Ej:</span>
                            <span className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded border border-gray-200 w-full">{cat.ex}</span>
                        </div>
                    </div>
                ))}
            </div>
            
             {/* Visual cues footer */}
             <div className="mt-6 flex flex-wrap gap-6 text-xs text-gray-400 justify-center bg-white p-4 rounded-lg border border-dashed border-gray-200">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-hku-green mr-2"></span>Género (Masc/Fem)</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-hku-blue mr-2"></span>Número (Sing/Pl)</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-400 mr-2"></span>Concordancia</span>
            </div>
        </div>
      </section>

      {/* 2. Tipos de Lenguas */}
      <section>
        <div className="flex items-center mb-6">
            <div className="bg-hku-green p-2 rounded-lg text-white mr-3"><Globe size={20} /></div>
            <h2 className="text-2xl font-bold text-hku-ash font-serif">Tipos de Lenguas</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Analíticas */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-yellow-400">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Lenguas Analíticas</h3>
                <p className="text-sm text-gray-600 mb-4 h-20">
                    Cada palabra o sílaba tiene un significado y se añaden otras independientes para aportar información extra (tiempos, plurales).
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase mb-1">Ejemplo: Chino</p>
                    <p className="text-2xl mb-2">我去<span className="text-blue-500 bg-blue-100 px-1 rounded">過</span><span className="text-green-600 bg-green-100 px-1 rounded">很多</span>國家</p>
                    <p className="text-xs text-gray-500">
                        Se añaden caracteres: <br/>
                        <span className="text-blue-500 font-bold">過</span> (experiencia pasada) <br/>
                        <span className="text-green-600 font-bold">很多</span> (plural/cantidad)
                    </p>
                </div>
            </div>

            {/* Flexivas */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-hku-green">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Lenguas Flexivas</h3>
                <p className="text-sm text-gray-600 mb-4 h-20">
                    Las palabras son flexibles: tienen una raíz y usan prefijos y sufijos integrados para dar información extra.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase mb-1">Ejemplo: Español</p>
                    <p className="text-xl mb-2">"<span className="bg-blue-100 text-blue-600 px-1 rounded font-bold">He ido</span> a mucho<span className="bg-green-100 text-hku-green px-1 rounded font-bold">es</span> país<span className="bg-green-100 text-hku-green px-1 rounded font-bold">es</span>"</p>
                    <p className="text-xs text-gray-500">
                        Se conjuga el verbo o se añaden terminaciones:<br/>
                        <span className="text-blue-600 font-bold">He ido</span> (conjugación pasado)<br/>
                        <span className="text-hku-green font-bold">-s / -es</span> (plural)
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* 3. Estructura de la Palabra */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
         <h2 className="text-2xl font-bold text-hku-ash mb-6 flex items-center font-serif">
            <Layers className="mr-2 text-hku-blue" /> Estructura de la Palabra: Morfemas
         </h2>
         <p className="mb-6 text-gray-600">
             Para entender cómo se construyen las palabras, debemos analizar sus piezas (morfemas) desde dos perspectivas distintas: su <strong>significado</strong> (contenido) y su <strong>posición</strong> (estructura).
         </p>

         {/* CLASIFICACIÓN 1: CONTENIDO */}
         <div className="mb-10">
             <h3 className="text-lg font-bold text-hku-ash mb-4 border-b border-gray-200 pb-2 flex items-center">
                <div className="bg-hku-blue text-white w-6 h-6 rounded flex items-center justify-center text-xs mr-2">1</div>
                Según su Contenido (Significado)
             </h3>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <h4 className="font-bold text-lg text-hku-blue mb-2">Lexema</h4>
                    <p className="text-sm text-gray-700 mb-3">Es la parte que aporta el <strong>significado léxico</strong> (lo que buscas en el diccionario).</p>
                    <div className="bg-white text-blue-800 px-3 py-2 rounded font-mono text-center text-sm shadow-sm">
                        <span className="font-bold">Gat</span>-os (Mamífero felino...)
                    </div>
                </div>
                <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                    <h4 className="font-bold text-lg text-hku-green mb-2">Gramema</h4>
                    <p className="text-sm text-gray-700 mb-3">Es la parte que aporta el <strong>significado gramatical</strong> (género, número, tiempo) o crea palabras nuevas.</p>
                    <div className="bg-white text-green-800 px-3 py-2 rounded font-mono text-center text-sm shadow-sm">
                        Gat-<span className="font-bold">os</span> (Masculino, Plural)
                    </div>
                </div>
             </div>
         </div>

         {/* CLARIFICATION BOX */}
         <div className="mb-10 bg-gray-50 p-6 rounded-xl border-l-4 border-orange-400">
             <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                 <Lightbulb className="w-5 h-5 text-orange-400 mr-2"/>
                 ¿Cuál es la diferencia entre Gramema y Afijo?
             </h4>
             <p className="text-sm text-gray-600 leading-relaxed">
                 A menudo se confunden, pero son clasificaciones distintas de lo mismo.
             </p>
             <ul className="mt-3 space-y-2 text-sm">
                 <li className="flex items-start">
                    <span className="font-bold text-hku-ash min-w-[80px]">Gramema:</span>
                    <span className="text-gray-600">Define <strong>qué hace</strong> (aporta información gramatical). Es como el "alma" o función de esa parte.</span>
                 </li>
                 <li className="flex items-start">
                    <span className="font-bold text-hku-ash min-w-[80px]">Afijo:</span>
                    <span className="text-gray-600">Define <strong>dónde está</strong> (pegado a una raíz). Es el "cuerpo" o estructura física.</span>
                 </li>
             </ul>
             <p className="mt-3 text-xs italic text-gray-500">
                 *Casi todos los afijos son gramemas, porque al pegarse a la raíz añaden información gramatical.
             </p>
         </div>

         {/* CLASIFICACIÓN 2: ESTRUCTURA */}
         <div className="mb-10">
             <h3 className="text-lg font-bold text-hku-ash mb-4 border-b border-gray-200 pb-2 flex items-center">
                <div className="bg-hku-green text-white w-6 h-6 rounded flex items-center justify-center text-xs mr-2">2</div>
                Según su Estructura (Posición)
             </h3>
             
             <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 bg-white border border-gray-200 p-4 rounded-lg">
                    <span className="text-hku-ash font-bold block mb-1">La Raíz</span>
                    <p className="text-xs text-gray-500">Es el centro estructural de la palabra. Normalmente coincide con el Lexema.</p>
                </div>
                <div className="flex-1 bg-white border border-gray-200 p-4 rounded-lg">
                    <span className="text-hku-ash font-bold block mb-1">Los Afijos</span>
                    <p className="text-xs text-gray-500">Son los elementos que se pegan a la raíz. Se clasifican según su posición exacta:</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 rounded-bl">Antes</div>
                     <span className="text-hku-blue font-bold text-sm uppercase tracking-wider block mb-1">Prefijos</span>
                     <p className="text-xs text-gray-500 mb-2">Van delante de la raíz.</p>
                     <p className="font-mono text-sm bg-blue-50 px-2 py-1 rounded inline-block"><span className="font-bold">Pre</span>-historia</p>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 rounded-bl">Después</div>
                     <span className="text-hku-blue font-bold text-sm uppercase tracking-wider block mb-1">Sufijos</span>
                     <p className="text-xs text-gray-500 mb-2">Van detrás de la raíz.</p>
                     <p className="font-mono text-sm bg-blue-50 px-2 py-1 rounded inline-block">Nacion-<span className="font-bold">al</span></p>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 rounded-bl">En medio</div>
                     <span className="text-hku-blue font-bold text-sm uppercase tracking-wider block mb-1">Interfijos</span>
                     <p className="text-xs text-gray-500 mb-2">Entre raíz y sufijo (unión).</p>
                     <p className="font-mono text-sm bg-blue-50 px-2 py-1 rounded inline-block">Café-<span className="font-bold">c</span>-ito</p>
                 </div>
             </div>
         </div>

         {/* Afijos Example Visual */}
         <div className="mb-8">
             <h4 className="font-bold text-gray-800 mb-4">Ejemplo Visual Completo:</h4>
             <div className="relative bg-gray-50 rounded-xl p-8 flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xl md:text-3xl font-mono border-2 border-dashed border-gray-200">
                 
                 <div className="group relative cursor-help">
                    <span className="bg-yellow-200 px-2 py-1 rounded">sub</span>
                    <span className="absolute -top-10 left-0 text-xs font-sans text-gray-500 bg-white border px-2 py-1 rounded shadow-sm w-full text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <span className="font-bold block text-hku-blue">Prefijo</span> (Debajo)
                    </span>
                 </div>
                 
                 <div className="group relative cursor-help">
                    <span className="border-b-4 border-hku-blue px-2 py-1">mar</span>
                    <span className="absolute -top-10 left-0 text-xs font-sans text-hku-blue font-bold bg-white border px-2 py-1 rounded shadow-sm w-full text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <span className="font-bold block text-hku-blue">Raíz</span> (Lexema)
                    </span>
                 </div>

                 <div className="group relative cursor-help">
                    <span className="bg-green-200 px-2 py-1 rounded">in</span>
                    <span className="absolute -top-10 left-0 text-xs font-sans text-gray-500 bg-white border px-2 py-1 rounded shadow-sm w-full text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <span className="font-bold block text-hku-blue">Interfijo</span> (Unión)
                    </span>
                 </div>

                 <div className="group relative cursor-help">
                    <span className="bg-red-200 px-2 py-1 rounded">ismo</span>
                    <span className="absolute -top-10 left-0 text-xs font-sans text-gray-500 bg-white border px-2 py-1 rounded shadow-sm w-full text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <span className="font-bold block text-hku-blue">Sufijo</span> (Actividad)
                    </span>
                 </div>
             </div>
             <p className="text-center text-xs text-gray-500 mt-2">Pasa el ratón sobre las partes de "Submarinismo" para ver la función.</p>
         </div>

         {/* Ejemplos de Análisis */}
         <div className="grid md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
             <div>
                 <h5 className="font-bold text-hku-ash mb-3 flex items-center"><Search className="w-4 h-4 mr-2"/> Ejemplo 1</h5>
                 <div className="text-2xl font-serif mb-2">Internacional</div>
                 <ul className="space-y-2 text-sm text-gray-600">
                     <li><strong className="text-hku-blue">Inter-</strong> (Prefijo): "Entre" o "en medio".</li>
                     <li><strong className="text-hku-ash">-nacion-</strong> (Raíz): Lexema base.</li>
                     <li><strong className="text-hku-green">-al</strong> (Sufijo): Cambia sustantivo a adjetivo.</li>
                 </ul>
             </div>
             <div>
                 <h5 className="font-bold text-hku-ash mb-3 flex items-center"><Search className="w-4 h-4 mr-2"/> Ejemplo 2</h5>
                 <div className="text-2xl font-serif mb-2">Bicicletas</div>
                 <ul className="space-y-2 text-sm text-gray-600">
                     <li><strong className="text-hku-blue">Bi-</strong> (Prefijo): Significa "dos".</li>
                     <li><strong className="text-hku-ash">-cicl-</strong> (Raíz): Lexema (círculo/rueda).</li>
                     <li><strong className="text-hku-green">-etas</strong> (Sufijo): Indica diminutivo/objeto y género/número.</li>
                 </ul>
             </div>
         </div>
      </section>

      {/* 4. Tipos de Gramemas (Detalle) */}
      <section>
          <h2 className="text-2xl font-bold text-hku-ash mb-6 flex items-center font-serif">
            <GitBranch className="mr-2 text-hku-green" /> Profundizando en los Gramemas
          </h2>
          <p className="mb-6 text-gray-600 text-sm">
              Si nos fijamos en el <strong>tipo de información</strong> que aportan los gramemas (ya sean afijos o no), podemos dividirlos en dos clases fundamentales:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
              {/* Derivativos */}
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-hku-blue">
                  <h3 className="text-lg font-bold text-hku-blue mb-2">Gramemas Derivativos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                      Crean palabras nuevas con significados diferentes. A menudo cambian la categoría gramatical.
                  </p>
                  <div className="bg-gray-50 p-4 rounded space-y-2 font-mono text-sm">
                      <div className="flex justify-between">
                          <span>Perr-<span className="font-bold text-hku-blue">era</span></span>
                          <span className="text-gray-400 font-sans italic">Lugar (Sustantivo)</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Perr-<span className="font-bold text-hku-blue">uno</span></span>
                          <span className="text-gray-400 font-sans italic">Cualidad (Adjetivo)</span>
                      </div>
                  </div>
              </div>

              {/* Flexivos */}
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-hku-green">
                  <h3 className="text-lg font-bold text-hku-green mb-2">Gramemas Flexivos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                      No crean palabras nuevas, solo añaden matices gramaticales obligatorios (género, número, tiempo, persona).
                  </p>
                  <div className="bg-gray-50 p-4 rounded space-y-2 font-mono text-sm">
                      <div className="flex justify-between">
                          <span>Com-<span className="font-bold text-hku-green">er</span></span>
                          <span className="text-gray-400 font-sans italic">Infinitivo</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Com-<span className="font-bold text-hku-green">í</span></span>
                          <span className="text-gray-400 font-sans italic">Pretérito, 1ª p.</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. Morfemas Libres */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-hku-ash mb-4">Morfemas Libres</h3>
          <p className="text-sm text-gray-600 mb-4">Son palabras que constituyen un morfema por sí mismas, sin necesidad de afijos.</p>
          <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Conjunciones (y, pero)</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Preposiciones (de, con)</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Determinantes (el, mi)</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Sustantivos simples (pan, sol)</span>
          </div>
      </section>

      {/* 6. Estrategias de Identificación */}
      <section className="bg-hku-ash/5 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-hku-ash mb-6 flex items-center font-serif">
            <Scissors className="mr-2" /> ¿Cómo identificar morfemas?
          </h2>
          <div className="space-y-4">
              <div className="flex items-start">
                  <div className="bg-hku-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                      <h4 className="font-bold text-lg mb-1">Segmentación</h4>
                      <p className="text-gray-600 text-sm">Comparar palabras que comparten el <strong>mismo morfema</strong> (sufijo/prefijo) para aislarlo.</p>
                      <p className="mt-1 font-mono text-sm bg-white inline-block px-2 py-1 rounded border">Zapat-<span className="text-hku-blue font-bold">ero</span> / Panad-<span className="text-hku-blue font-bold">ero</span></p>
                  </div>
              </div>
              <div className="flex items-start">
                  <div className="bg-hku-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                      <h4 className="font-bold text-lg mb-1">Conmutación</h4>
                      <p className="text-gray-600 text-sm">Comparar palabras de la <strong>misma familia léxica</strong> para aislar la raíz.</p>
                      <p className="mt-1 font-mono text-sm bg-white inline-block px-2 py-1 rounded border"><span className="text-hku-green font-bold">Zapat</span>-o / <span className="text-hku-green font-bold">Zapat</span>-illa</p>
                  </div>
              </div>
          </div>
      </section>

       {/* NEW SECTION: Common Prefixes and Suffixes */}
       <section>
          <h2 className="text-2xl font-bold text-hku-ash mb-6 flex items-center font-serif">
            <ListOrdered className="mr-2 text-hku-blue" /> Listados de Referencia
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
             {/* Prefixes Table */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                   <h3 className="font-bold text-hku-blue">Prefijos Comunes</h3>
                   <p className="text-xs text-gray-500">Se colocan antes de la raíz.</p>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                         <tr>
                            <th className="px-4 py-3 w-1/4">Prefijo</th>
                            <th className="px-4 py-3 w-1/3">Significado</th>
                            <th className="px-4 py-3">Ejemplos</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {[
                            { p: 'Ante-', s: 'Delante de / Anterioridad', e: 'Anteayer, anteojos, anteproyecto.' },
                            { p: 'Anti-', s: 'Oposición / Contrario a', e: 'Anticuerpo, antisocial, antiaéreo.' },
                            { p: 'Bi- / Bis-', s: 'Dos o doble', e: 'Bilingüe, bicicleta, bisnieto.' },
                            { p: 'Des-', s: 'Negación / Inversión', e: 'Desorden, deshacer, despeinar.' },
                            { p: 'Extra-', s: 'Fuera de', e: 'Extraterrestre, extraordinario.' },
                            { p: 'Inter-', s: 'Entre / En medio de', e: 'Intercambio, internacional, intermedio.' },
                            { p: 'Multi-', s: 'Muchos', e: 'Multinacional, multicolor, multitud.' },
                            { p: 'Pre-', s: 'Antes de / Anterioridad', e: 'Prehistoria, prefijo, predecir.' },
                            { p: 'Re-', s: 'Repetición / Intensidad', e: 'Rehacer, reluciente, revivir.' },
                            { p: 'Sub-', s: 'Bajo / Debajo de', e: 'Subterráneo, subrayar, subdirector.' },
                         ].map((row, i) => (
                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                               <td className="px-4 py-3 font-bold text-hku-blue">{row.p}</td>
                               <td className="px-4 py-3 text-gray-600">{row.s}</td>
                               <td className="px-4 py-3 text-gray-500 italic">{row.e}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Suffixes Table */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                   <h3 className="font-bold text-hku-green">Sufijos Comunes</h3>
                   <p className="text-xs text-gray-500">Se colocan después de la raíz.</p>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                         <tr>
                            <th className="px-4 py-3 w-1/4">Sufijo</th>
                            <th className="px-4 py-3 w-1/3">Significado</th>
                            <th className="px-4 py-3">Ejemplos</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {[
                            { s: '-able / -ible', m: 'Capacidad o posibilidad', e: 'Lavable, creíble, amable.' },
                            { s: '-ario / -aria', m: 'Oficio, lugar o conjunto', e: 'Bibliotecario, campanario, temario.' },
                            { s: '-ción', m: 'Acción y efecto', e: 'Evolución, canción, clasificación.' },
                            { s: '-dor / -dora', m: 'Persona o máquina que actúa', e: 'Explorador, lavadora, trabajador.' },
                            { s: '-ero / -era', m: 'Oficio o lugar donde se guarda', e: 'Cartero, frutero, billetera.' },
                            { s: '-ez / -eza', m: 'Cualidad abstracta', e: 'Vejez, riqueza, honradez.' },
                            { s: '-ista', m: 'Profesión, oficio o ideología', e: 'Dentista, optimista, pianista.' },
                            { s: '-ito / -ita', m: 'Diminutivo o valor afectivo', e: 'Gatito, abuelita, rapidito.' },
                            { s: '-mente', m: 'De manera o modo (adverbios)', e: 'Lentamente, felizmente, rápidamente.' },
                            { s: '-oso / -osa', m: 'Abundancia o posesión', e: 'Ruidoso, pecosa, caluroso.' },
                         ].map((row, i) => (
                            <tr key={i} className="hover:bg-green-50/30 transition-colors">
                               <td className="px-4 py-3 font-bold text-hku-green">{row.s}</td>
                               <td className="px-4 py-3 text-gray-600">{row.m}</td>
                               <td className="px-4 py-3 text-gray-500 italic">{row.e}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
       </section>

    </div>
  );
};

// --- DETERMINANTS COMPONENTS (Topic 1-2) ---

// 1. INTRODUCCIÓN
const DeterminantsIntroduccion: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* Definición de Determinante */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <BookOpen className="mr-2" /> ¿Qué es un determinante?
        </h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-hku-blue">
            <p className="text-lg text-gray-800 leading-relaxed">
              Un <strong>determinante</strong> es una palabra que <strong>acompaña</strong> y <strong>modifica</strong> al sustantivo, 
              aportando información sobre él. <span className="text-hku-blue font-semibold">Siempre se coloca delante del sustantivo</span> y 
              concuerda con él en <strong>género</strong> y <strong>número</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-hku-ash mb-3 flex items-center">
                <CheckCircle size={20} className="mr-2 text-green-500" />
                Ejemplos correctos
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-hku-blue font-bold mr-2">•</span>
                  <span><span className="bg-blue-100 px-2 py-0.5 rounded font-semibold">El</span> perro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hku-blue font-bold mr-2">•</span>
                  <span><span className="bg-blue-100 px-2 py-0.5 rounded font-semibold">Mi</span> casa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hku-blue font-bold mr-2">•</span>
                  <span><span className="bg-blue-100 px-2 py-0.5 rounded font-semibold">Tres</span> gatos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-hku-blue font-bold mr-2">•</span>
                  <span><span className="bg-blue-100 px-2 py-0.5 rounded font-semibold">Este</span> libro</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center">
                <Lightbulb size={20} className="mr-2 text-yellow-500" />
                Función principal
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Los determinantes <strong>actualizan</strong> y <strong>concretan</strong> el significado del sustantivo. 
                Es decir, nos dan más información sobre él: si es conocido, a quién pertenece, cuántos hay, dónde está, etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Determinantes - Overview */}
      <section>
        <h2 className="text-2xl font-bold text-hku-ash mb-6 flex items-center font-serif">
          <Layers className="mr-2 text-hku-green" /> Tipos de Determinantes
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Artículos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-400 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Artículos</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Identifican al sustantivo como conocido (determinado) o desconocido (indeterminado).
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 mb-1">Ejemplos:</p>
              <p className="text-sm font-mono"><span className="font-bold text-blue-600">El</span> niño, <span className="font-bold text-blue-600">una</span> mesa</p>
            </div>
          </div>

          {/* Numerales */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-400 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <Hash className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Numerales</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Expresan cantidad exacta (cardinales) o posición en una serie (ordinales).
            </p>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 mb-1">Ejemplos:</p>
              <p className="text-sm font-mono"><span className="font-bold text-purple-600">Dos</span> perros, el <span className="font-bold text-purple-600">primer</span> día</p>
            </div>
          </div>

          {/* Demostrativos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-orange-400 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Demostrativos</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Ubican al sustantivo en el espacio o en el tiempo respecto al hablante.
            </p>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 mb-1">Ejemplos:</p>
              <p className="text-sm font-mono"><span className="font-bold text-orange-600">Este</span> libro, <span className="font-bold text-orange-600">aquella</span> casa</p>
            </div>
          </div>

          {/* Posesivos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-400 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Posesivos</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Indican posesión o pertenencia del sustantivo a una persona.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 mb-1">Ejemplos:</p>
              <p className="text-sm font-mono"><span className="font-bold text-green-600">Mi</span> coche, <span className="font-bold text-green-600">su</span> familia</p>
            </div>
          </div>

          {/* Indefinidos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-yellow-400 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                <HelpCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Indefinidos</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Expresan cantidad o existencia de forma imprecisa o vaga.
            </p>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 mb-1">Ejemplos:</p>
              <p className="text-sm font-mono"><span className="font-bold text-yellow-600">Algunos</span> días, <span className="font-bold text-yellow-600">mucha</span> gente</p>
            </div>
          </div>

          {/* Interrogativos/Exclamativos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-red-400 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-red-100 p-2 rounded-lg mr-3">
                <MessageSquare className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Interrog./Exclam.</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Introducen preguntas o exclamaciones sobre el sustantivo.
            </p>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 mb-1">Ejemplos:</p>
              <p className="text-sm font-mono"><span className="font-bold text-red-600">¿Qué</span> libro?, <span className="font-bold text-red-600">¡Cuánto</span> dinero!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Concordancia */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 flex items-center font-serif">
          <Split className="mr-2 text-hku-blue" /> Concordancia
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Los determinantes <strong>siempre concuerdan</strong> con el sustantivo al que acompañan en <strong>género</strong> (masculino/femenino) 
          y <strong>número</strong> (singular/plural).
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-hku-blue flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Concordancia correcta
            </h3>
            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-mono text-sm">
                  <span className="text-green-600 font-bold">El</span> <span className="underline">perro</span>
                  <span className="text-xs text-gray-500 ml-2">(Masc. Sing. + Masc. Sing.)</span>
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-mono text-sm">
                  <span className="text-green-600 font-bold">Las</span> <span className="underline">casas</span>
                  <span className="text-xs text-gray-500 ml-2">(Fem. Pl. + Fem. Pl.)</span>
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-mono text-sm">
                  <span className="text-green-600 font-bold">Mis</span> <span className="underline">libros</span>
                  <span className="text-xs text-gray-500 ml-2">(Masc. Pl. + Masc. Pl.)</span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-red-600 flex items-center">
              <XCircle size={18} className="mr-2" />
              Errores de concordancia
            </h3>
            <div className="space-y-3">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="font-mono text-sm line-through text-red-600">
                  <span className="font-bold">El</span> <span className="underline">casa</span>
                  <span className="text-xs text-gray-500 ml-2">(Masc. ≠ Fem.)</span>
                </p>
                <p className="font-mono text-sm text-green-600 mt-2">
                  ✓ <span className="font-bold">La</span> <span className="underline">casa</span>
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="font-mono text-sm line-through text-red-600">
                  <span className="font-bold">Los</span> <span className="underline">niña</span>
                  <span className="text-xs text-gray-500 ml-2">(Masc. ≠ Fem.)</span>
                </p>
                <p className="font-mono text-sm text-green-600 mt-2">
                  ✓ <span className="font-bold">La</span> <span className="underline">niña</span>
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="font-mono text-sm line-through text-red-600">
                  <span className="font-bold">Este</span> <span className="underline">flores</span>
                  <span className="text-xs text-gray-500 ml-2">(Sing. ≠ Pl.)</span>
                </p>
                <p className="font-mono text-sm text-green-600 mt-2">
                  ✓ <span className="font-bold">Estas</span> <span className="underline">flores</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-5 rounded-xl border-l-4 border-hku-blue">
          <h4 className="font-bold text-hku-ash mb-2 flex items-center">
            <AlertTriangle size={18} className="mr-2 text-blue-600" />
            Recuerda
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            La concordancia es <strong>obligatoria</strong>. Un determinante que no concuerda con su sustantivo 
            es un error gramatical que puede dificultar la comprensión del mensaje.
          </p>
        </div>
      </section>
    </div>
  );
};

// 2. NUMERALES
const DeterminantsNumerales: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Hash className="mr-2" /> Determinantes Numerales
        </h2>
        <p className="text-gray-600">Contenido de numerales próximamente...</p>
      </section>
    </div>
  );
};

// 3. DEMOSTRATIVOS
const DeterminantsDemostrativos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <MapPin className="mr-2" /> Determinantes Demostrativos
        </h2>
        <p className="text-gray-600">Contenido próximamente...</p>
      </section>
    </div>
  );
};

// 4. POSESIVOS
const DeterminantsPosesivos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <User className="mr-2" /> Determinantes Posesivos
        </h2>
        <p className="text-gray-600">Contenido próximamente...</p>
      </section>
    </div>
  );
};

// 5. INDEFINIDOS
const DeterminantsIndefinidos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <HelpCircle className="mr-2" /> Determinantes Indefinidos
        </h2>
        <p className="text-gray-600">Contenido próximamente...</p>
      </section>
    </div>
  );
};

// 6. ARTÍCULOS
const DeterminantsArticulos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Key className="mr-2" /> Artículos
        </h2>
        <p className="text-gray-600">Contenido próximamente...</p>
      </section>
    </div>
  );
};

// 7. PRÁCTICA
const DeterminantsPractica: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-hku-green p-2 rounded-lg text-white mr-3"><PenTool size={20} /></div>
          <h2 className="text-2xl font-bold text-hku-ash font-serif">Práctica de Determinantes</h2>
        </div>
        <p className="text-gray-600">Ejercicios próximamente...</p>
      </div>
    </div>
  );
};

// --- PRACTICE COMPONENT: MORPHOLOGY ---
const MorphologyPractice: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                     <div className="bg-hku-green p-2 rounded-lg text-white mr-3"><PenTool size={20} /></div>
                     <h2 className="text-2xl font-bold text-hku-ash font-serif">Práctica de Morfología</h2>
                </div>
                
                <p className="text-gray-600 mb-8">
                    Analiza la estructura de las siguientes palabras identificando la raíz y los afijos.
                </p>

                {/* Example interactive element (mock) */}
                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-lg text-gray-800 mb-3">1. Desigualdad</h4>
                        <div className="flex gap-2">
                             <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm">Ver Solución</button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-lg text-gray-800 mb-3">2. Inmortal</h4>
                        <div className="flex gap-2">
                             <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm">Ver Solución</button>
                        </div>
                    </div>
                     <div className="bg-blue-50 p-4 rounded-lg text-sm text-hku-blue flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Más ejercicios interactivos serán añadidos pronto.
                    </div>
                </div>
            </div>
        </div>
    );
};