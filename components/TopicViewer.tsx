import React, { useState } from 'react';
import { Topic } from '../types';
import { ArrowLeft, BookOpen, PenTool, Lightbulb, Layers, GitBranch, Key, Globe, Scissors, Search, CheckCircle, XCircle, RefreshCw, ChevronRight, Hash, MapPin, Clock, AlertTriangle, ListOrdered, Eye, MessageSquare, MousePointer, HelpCircle, User, Users, Split, Menu, X, ChevronDown, Award, UserCheck, AlertCircle, Pencil, Tag, Copy } from 'lucide-react';

interface TopicViewerProps {
  topic: Topic;
  onBack: () => void;
}

type DeterminantsTab = 'introduccion' | 'numerales' | 'demostrativos' | 'posesivos' | 'indefinidos' | 'articulos' | 'practica';

export const TopicViewer: React.FC<TopicViewerProps> = ({ topic, onBack }) => {
  const [activeTab, setActiveTab] = useState<'teoria' | 'practica'>('teoria');
  const [determinantsTab, setDeterminantsTab] = useState<DeterminantsTab>('introduccion');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Topic IDs
  const isMorphology = topic.id === '1-1';
  const isDeterminants = topic.id === '1-2';
  const isNouns = topic.id === '1-3';
  const isAdjectives = topic.id === '1-4';
  const isVerbs = topic.id === '1-5';

  // Tabs configuration for Determinants
  const determinantsTabs = [
    { id: 'introduccion' as DeterminantsTab, label: 'Introducción', icon: BookOpen },
    { id: 'numerales' as DeterminantsTab, label: 'Numerales', icon: Hash },
    { id: 'demostrativos' as DeterminantsTab, label: 'Demostrativos', icon: MapPin },
    { id: 'posesivos' as DeterminantsTab, label: 'Posesivos', icon: User },
    { id: 'indefinidos' as DeterminantsTab, label: 'Indefinidos', icon: HelpCircle },
    { id: 'articulos' as DeterminantsTab, label: 'Artículos', icon: Key },
    { id: 'practica' as DeterminantsTab, label: 'Práctica', icon: PenTool }
  ];

  const getCurrentTabLabel = () => {
    const currentTab = determinantsTabs.find(tab => tab.id === determinantsTab);
    return currentTab?.label || 'Introducción';
  };

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

            {/* Tabs for Morphology and Determinants */}
            {!isDeterminants ? (
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
            ) : (
              <>
                {/* Mobile Menu Button - Only visible on small screens */}
                <div className="relative md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-all"
                  >
                    <span className="flex items-center">
                      <Menu size={18} className="mr-2" />
                      {getCurrentTabLabel()}
                    </span>
                    <ChevronDown size={18} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                      {determinantsTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isPractica = tab.id === 'practica';
                        const isActive = determinantsTab === tab.id;
                        
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setDeterminantsTab(tab.id);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all border-b border-gray-100 last:border-b-0 ${
                              isActive
                                ? isPractica 
                                  ? 'bg-green-50 text-hku-green' 
                                  : 'bg-blue-50 text-hku-blue'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon size={16} className="mr-3" />
                            {tab.label}
                            {isActive && (
                              <CheckCircle size={16} className="ml-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Desktop Tabs - Only visible on medium+ screens */}
                <div className="hidden md:block overflow-x-auto">
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg min-w-max">
                    {determinantsTabs.map((tab) => {
                      const Icon = tab.icon;
                      const isPractica = tab.id === 'practica';
                      const isActive = determinantsTab === tab.id;
                      
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setDeterminantsTab(tab.id)}
                          className={`flex items-center px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                            isActive
                              ? isPractica 
                                ? 'bg-white text-hku-green shadow-sm' 
                                : 'bg-white text-hku-blue shadow-sm'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <Icon size={14} className="mr-1.5" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
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
                {isNouns && <NounsContent />}
                {isAdjectives && <AdjectivesContent />}
                {isVerbs && <VerbsContent />}
                {!isMorphology && !isNouns && !isAdjectives && !isVerbs && (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500">Contenido disponible próximamente para {topic.title}.</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {isMorphology ? (
                  <MorphologyPractice />
                ) : isNouns ? (
                  <NounsPractice />
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

// --- NOUNS CONTENT (Topic 1-3) ---
const NounsContent: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* 1. ¿Qué es un sustantivo? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <BookOpen className="mr-3" size={32} /> 1. ¿Qué es un sustantivo?
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Los sustantivos son palabras que utilizamos para referirnos a <strong>personas, animales, objetos o ideas abstractas</strong> (como pensamientos y sentimientos).
        </p>

        <h3 className="text-2xl font-bold text-hku-ash mb-6">Clasificación de los sustantivos</h3>
        
        <p className="text-gray-700 mb-6">
          Podemos agrupar los sustantivos en diferentes categorías según lo que representan:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="px-6 py-4 text-left font-semibold">Categoría</th>
                <th className="px-6 py-4 text-left font-semibold">Descripción y Ejemplos</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Comunes vs. Propios</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Comunes:</strong> Objetos o seres generales{' '}
                    <span className="text-gray-600 italic">(manzana, conejo)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Propios:</strong> Nombres específicos, siempre con mayúscula{' '}
                    <span className="text-gray-600 italic">(Irlanda, Felipe)</span>.
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Concretos vs. Abstractos</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Concretos:</strong> Cosas que podemos percibir{' '}
                    <span className="text-gray-600 italic">(pelota, billete)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Abstractos:</strong> Conceptos e ideas{' '}
                    <span className="text-gray-600 italic">(libertad, esperanza)</span>.
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Contables vs. Incontables</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Contables:</strong> Se pueden contar por unidades{' '}
                    <span className="text-gray-600 italic">(carros, vasos)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Incontables:</strong> No se pueden dividir fácilmente en unidades{' '}
                    <span className="text-gray-600 italic">(agua, azúcar)</span>.
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Individuales vs. Colectivos</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Individuales:</strong> Un solo elemento{' '}
                    <span className="text-gray-600 italic">(árbol, jugador)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Colectivos:</strong> Un conjunto de elementos en singular{' '}
                    <span className="text-gray-600 italic">(bosque, equipo)</span>.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. El Género de los Sustantivos */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Users className="mr-3" size={32} /> 2. El Género de los Sustantivos
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          En español, todos los sustantivos tienen un género: <strong>masculino</strong> o <strong>femenino</strong>.
        </p>

        {/* Regla General */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-4">Regla General</h3>
          <div className="bg-blue-50 p-6 rounded-lg space-y-3">
            <div className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <div>
                <strong className="text-hku-blue">Masculinos:</strong> Suelen terminar en <strong>-o</strong>{' '}
                <span className="text-gray-600 italic">(el bolígrafo, el vaso)</span>.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <div>
                <strong className="text-hku-blue">Femeninos:</strong> Suelen terminar en <strong>-a</strong>{' '}
                <span className="text-gray-600 italic">(la mesa, la pera)</span>.
              </div>
            </div>
          </div>
        </div>

        {/* Otras terminaciones comunes */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-4">Otras terminaciones comunes</h3>
          <p className="text-gray-700 mb-6">
            Para identificar el género de palabras que no terminan en -o / -a, puedes usar estas pistas:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Masculinos */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-hku-blue mb-4 text-lg">Son masculinos si terminan en:</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    <strong>-ma</strong> (solo si vienen del griego):
                  </p>
                  <p className="text-gray-600 italic ml-4">problema, idioma, sistema</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1"><strong>-or:</strong></p>
                  <p className="text-gray-600 italic ml-4">amor, ordenador, error</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1"><strong>-aje:</strong></p>
                  <p className="text-gray-600 italic ml-4">aprendizaje, paisaje, viaje</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1"><strong>-bre:</strong></p>
                  <p className="text-gray-600 italic ml-4">hambre, alambre</p>
                </div>
              </div>
            </div>

            {/* Femeninos */}
            <div className="bg-pink-50 p-6 rounded-lg">
              <h4 className="font-bold text-pink-700 mb-4 text-lg">Son femeninos si terminan en:</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800 mb-1"><strong>-ción / -sión / -xión:</strong></p>
                  <p className="text-gray-600 italic ml-4">habitación, discusión, conexión</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1"><strong>-ad:</strong></p>
                  <p className="text-gray-600 italic ml-4">libertad, universidad, amistad</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1"><strong>-ie:</strong></p>
                  <p className="text-gray-600 italic ml-4">serie, especie, superficie</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cambios de género en personas y animales */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-hku-ash mb-4">Cambios de género en personas y animales</h3>
          <p className="text-gray-700 mb-6">
            Cuando nos referimos a seres vivos, el género suele cambiar según el sexo:
          </p>

          <div className="space-y-4">
            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">De -o a -a:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">
                el alumno / la alumna, el gato / la gata
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">Consonante + -a:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">
                el doctor / la doctora, el león / la leona
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">Palabras invariables:</strong>
              </p>
              <p className="text-gray-600 ml-4">
                Los que terminan en <strong>-e</strong> no suelen cambiar <span className="italic">(el/la estudiante)</span>, 
                aunque hay excepciones como <span className="italic">el jefe / la jefa</span>.
              </p>
            </div>

            <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-400">
              <p className="font-semibold text-gray-800 mb-3">
                <strong className="text-orange-700">Casos especiales:</strong>
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span className="text-gray-700">
                    Misma palabra para ambos sexos: <span className="italic">el/la artista, el/la cantante</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span className="text-gray-700">
                    Palabras totalmente diferentes: <span className="italic">el padre / la madre, el caballo / la yegua</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span className="text-gray-700">
                    Terminaciones especiales: <span className="italic">el actor / la actriz, el gallo / la gallina, el tigre / la tigresa</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nota sobre animales */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
          <p className="text-gray-700 flex items-start">
            <AlertCircle size={20} className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
            <span>
              <strong>Nota sobre animales:</strong> Algunos animales tienen una sola forma y se especifica el sexo añadiendo la palabra "macho" o "hembra" 
              <span className="italic"> (la serpiente macho / la serpiente hembra)</span>.
            </span>
          </p>
        </div>
      </section>

      {/* 3. El Número: Singular y Plural */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Hash className="mr-3" size={32} /> 3. El Número: Singular y Plural
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          El número indica si hablamos de uno (<strong>singular</strong>) o de varios (<strong>plural</strong>) elementos.
        </p>

        <h3 className="text-2xl font-bold text-hku-ash mb-6">Reglas para formar el plural</h3>

        <div className="space-y-5">
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-start mb-3">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  <strong>Termina en vocal:</strong> Añadimos <strong>-s</strong>
                </p>
                <p className="text-gray-600 italic ml-1">mapa → mapas, café → cafés</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-start mb-3">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  <strong>Termina en consonante:</strong> Añadimos <strong>-es</strong>
                </p>
                <p className="text-gray-600 italic ml-1 mb-2">motor → motores, país → países</p>
                <p className="text-sm text-gray-600 ml-1">
                  <em>Nota:</em> Si termina en <strong>-z</strong>, cambia a <strong>-ces</strong> <span className="italic">(pez → peces)</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-start mb-3">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</span>
              <div>
                <p className="font-semibold text-gray-800 mb-2">
                  <strong>Termina en -í o -ú (acentuadas):</strong> Pueden admitir tanto <strong>-s</strong> como <strong>-es</strong>
                </p>
                <p className="text-gray-600 italic ml-1">tabús / tabúes</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-start mb-3">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</span>
              <div>
                <p className="font-semibold text-gray-800 mb-3"><strong>Termina en -y:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700">
                      Origen extranjero: suele añadir <strong>-s</strong> <span className="italic">(jersey → jerséis, penalti → penaltis)</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700">
                      Origen español: añade <strong>-es</strong> <span className="italic">(rey → reyes, ley → leyes)</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Casos Especiales */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <AlertTriangle className="mr-3" size={32} /> 4. Casos Especiales
        </h2>

        {/* Sustantivos Incontables */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-4 flex items-center">
            <ListOrdered className="mr-2 text-hku-green" size={24} />
            Sustantivos Incontables
          </h3>
          <p className="text-gray-700 mb-6">
            Son materiales o sustancias que no se pueden dividir en unidades.
          </p>

          <div className="space-y-4">
            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-yellow-700">Uso normal:</strong> Se usan en <strong>singular</strong> para hablar de la materia en general
              </p>
              <p className="text-gray-600 italic ml-4">Me encanta el arroz</p>
            </div>

            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-yellow-700">Uso en plural:</strong> Se usa para hablar de diferentes tipos o variedades
              </p>
              <p className="text-gray-600 italic ml-4">Venden muchos arroces diferentes</p>
            </div>

            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-yellow-700">Ejemplos comunes:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">agua, carne, madera, música, vino</p>
            </div>
          </div>
        </div>

        {/* Sustantivos Colectivos */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-4 flex items-center">
            <Users className="mr-2 text-hku-green" size={24} />
            Sustantivos Colectivos
          </h3>
          <p className="text-gray-700 mb-6">
            Se refieren a un grupo, pero se usan siempre en <strong>singular</strong>.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-teal-50 p-5 rounded-lg text-center">
              <p className="font-bold text-teal-700 text-lg mb-1">Gente</p>
              <p className="text-sm text-gray-600">grupo de personas</p>
            </div>
            <div className="bg-teal-50 p-5 rounded-lg text-center">
              <p className="font-bold text-teal-700 text-lg mb-1">Familia</p>
              <p className="text-sm text-gray-600">padres e hijos</p>
            </div>
            <div className="bg-teal-50 p-5 rounded-lg text-center">
              <p className="font-bold text-teal-700 text-lg mb-1">Profesorado</p>
              <p className="text-sm text-gray-600">grupo de profesores</p>
            </div>
          </div>
        </div>

        {/* Sustantivos "Siempre Plural" */}
        <div>
          <h3 className="text-2xl font-bold text-hku-ash mb-4 flex items-center">
            <Eye className="mr-2 text-hku-green" size={24} />
            Sustantivos "Siempre Plural"
          </h3>
          <p className="text-gray-700 mb-6">
            Algunas palabras se usan normalmente solo en plural porque se refieren a objetos compuestos por dos partes o que vienen en pares.
          </p>

          <div className="bg-red-50 p-6 rounded-lg">
            <p className="font-semibold text-gray-800 mb-3">
              <strong className="text-red-700">Ejemplos:</strong>
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white rounded-full text-gray-700 border border-red-200">las gafas</span>
              <span className="px-4 py-2 bg-white rounded-full text-gray-700 border border-red-200">las tijeras</span>
              <span className="px-4 py-2 bg-white rounded-full text-gray-700 border border-red-200">los pantalones</span>
              <span className="px-4 py-2 bg-white rounded-full text-gray-700 border border-red-200">los prismáticos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Nota final */}
      <section className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-l-4 border-green-500">
        <p className="text-gray-700 flex items-start">
          <Lightbulb size={20} className="mr-2 text-green-600 flex-shrink-0 mt-1" />
          <span>
            <strong>Consejo:</strong> El género y el número de los sustantivos son fundamentales en español porque afectan a todos los elementos que los acompañan 
            (determinantes, adjetivos, etc.). Practica identificando estos elementos en textos reales para mejorar tu comprensión.
          </span>
        </p>
      </section>
    </div>
  );
};

// --- ADJECTIVES CONTENT (Topic 1-4) ---
const AdjectivesContent: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* Introducción */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border-l-4 border-purple-500">
        <p className="text-lg text-gray-700 leading-relaxed">
          Esta guía te ayudará a comprender cómo funcionan los <strong>adjetivos</strong> en español, 
          una parte fundamental para describir el mundo que nos rodea.
        </p>
      </section>

      {/* 1. ¿Para qué sirve el adjetivo? */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <BookOpen className="mr-3" size={32} /> 1. ¿Para qué sirve el adjetivo?
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          El adjetivo es una palabra que se utiliza para informarnos sobre las <strong>propiedades o cualidades</strong> de un sustantivo. 
          Nos permite dar más detalles sobre una persona, un animal o una cosa.
        </p>
      </section>

      {/* 2. Concordancia de Género */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Users className="mr-3" size={32} /> 2. Concordancia de Género
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          En español, el adjetivo siempre debe "combinar" con el sustantivo al que acompaña.
        </p>

        {/* Adjetivos que cambian de género */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-6 flex items-center">
            <ChevronRight className="mr-2 text-hku-green" size={24} />
            Adjetivos que cambian de género
          </h3>
          <p className="text-gray-700 mb-6">
            Estos adjetivos tienen una forma para el masculino y otra para el femenino:
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-blue-700">Terminados en -o / -a:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">el coche rojo / la casa roja</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-blue-700">Terminados en -or / -ora:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un hombre trabajador / una mujer trabajadora</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-blue-700">Vocal tónica + n / + na:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un capitán alemán / una capitana alemana</p>
            </div>
          </div>
        </div>

        {/* Adjetivos que NO cambian de género */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-hku-ash mb-6 flex items-center">
            <ChevronRight className="mr-2 text-hku-green" size={24} />
            Adjetivos que NO cambian de género
          </h3>
          <p className="text-gray-700 mb-6">
            Existen adjetivos que tienen la <strong>misma forma</strong> para el masculino y el femenino. 
            No cambian si terminan en:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">-e:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un chico inteligente / una chica inteligente</p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">-í o -ú:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un postre tabú / una práctica tabú</p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">-ista:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un hombre optimista / una mujer optimista</p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">-l, -n, -r, -s, -z:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un ejercicio fácil / una tarea fácil</p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-green-700">-a:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un hombre hipócrita / una mujer hipócrita</p>
            </div>
          </div>
        </div>

        {/* Excepción de nacionalidad */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-500">
          <p className="text-gray-700 flex items-start">
            <AlertCircle size={20} className="mr-2 text-orange-600 flex-shrink-0 mt-1" />
            <span>
              <strong>¡Atención! La excepción de nacionalidad:</strong> Aunque la regla dice que los adjetivos que terminan en consonante no cambian, 
              los adjetivos de <strong>nacionalidad</strong> sí lo hacen añadiendo una <strong>-a</strong> para el femenino 
              <span className="italic"> (español → española)</span>.
            </span>
          </p>
        </div>
      </section>

      {/* 3. Concordancia de Número */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Hash className="mr-3" size={32} /> 3. Concordancia de Número (Singular y Plural)
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Los adjetivos siguen las mismas reglas que los sustantivos para formar el plural:
        </p>

        <div className="space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <p className="text-gray-700">
                  Si el singular termina en <strong>vocal</strong>, añadimos <strong>-s</strong>
                </p>
                <p className="text-gray-600 italic ml-1 mt-2">grande → grandes</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <p className="text-gray-700">
                  Si el singular termina en <strong>consonante</strong>, añadimos <strong>-es</strong>
                </p>
                <p className="text-gray-600 italic ml-1 mt-2">azul → azules</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. La Posición del Adjetivo */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <MapPin className="mr-3" size={32} /> 4. La Posición del Adjetivo
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          En español, el adjetivo puede ir antes o después del sustantivo, pero su significado cambia.
        </p>

        {/* Después del sustantivo */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-6 flex items-center">
            <ArrowLeft className="mr-2 text-hku-green rotate-180" size={24} />
            Después del sustantivo (Posición Distintiva)
          </h3>
          <p className="text-gray-700 mb-6">
            Es la posición más común. Sirve para <strong>distinguir</strong> un objeto de otros del mismo tipo. 
            Casi siempre van después:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-teal-700">Colores:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un coche azul</p>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-teal-700">Formas:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un objeto cuadrado</p>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-teal-700">Estados:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">una caja abierta</p>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">
                <strong className="text-teal-700">Tipo o procedencia:</strong>
              </p>
              <p className="text-gray-600 italic ml-4">un tema español</p>
            </div>
          </div>
        </div>

        {/* Antes del sustantivo */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-6 flex items-center">
            <ArrowLeft className="mr-2 text-hku-green" size={24} />
            Antes del sustantivo (Posición Valorativa)
          </h3>
          <p className="text-gray-700 mb-6">
            Se usa para <strong>enfatizar</strong> una cualidad o dar una opinión personal.
          </p>

          <div className="space-y-4">
            <div className="bg-indigo-50 p-5 rounded-lg">
              <p className="text-gray-700 mb-2">
                Se usa mucho con adjetivos de significado relativo (largo/corto, frío/caliente, grande/pequeño).
              </p>
              <p className="text-gray-600 italic ml-4 mt-2">
                <em>Ejemplo:</em> El frío invierno.
              </p>
            </div>

            <div className="bg-indigo-50 p-5 rounded-lg">
              <p className="text-gray-700">
                Es común en el lenguaje poético o periodístico.
              </p>
            </div>
          </div>
        </div>

        {/* Adjetivos que cambian de forma (Apócope) */}
        <div>
          <h3 className="text-2xl font-bold text-hku-ash mb-6 flex items-center">
            <Scissors className="mr-2 text-hku-green" size={24} />
            Adjetivos que cambian de forma (Apócope)
          </h3>
          <p className="text-gray-700 mb-6">
            Tres adjetivos comunes se "acortan" cuando van justo <strong>antes de un sustantivo masculino singular</strong>:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-6 rounded-lg text-center border-2 border-yellow-300">
              <p className="font-bold text-yellow-800 text-xl mb-2">Malo</p>
              <p className="text-gray-700 mb-1">→</p>
              <p className="text-yellow-700 font-semibold">un <span className="text-2xl">mal</span> día</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg text-center border-2 border-yellow-300">
              <p className="font-bold text-yellow-800 text-xl mb-2">Bueno</p>
              <p className="text-gray-700 mb-1">→</p>
              <p className="text-yellow-700 font-semibold">un <span className="text-2xl">buen</span> amigo</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg text-center border-2 border-yellow-300">
              <p className="font-bold text-yellow-800 text-xl mb-2">Grande</p>
              <p className="text-gray-700 mb-1">→</p>
              <p className="text-yellow-700 font-semibold">una <span className="text-2xl">gran</span> ciudad</p>
              <p className="text-xs text-gray-600 mt-2">(también se acorta ante femeninos)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Cambio de Significado según la Posición */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Split className="mr-3" size={32} /> 5. Cambio de Significado según la Posición
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          A veces, poner el adjetivo antes o después cambia totalmente lo que queremos decir:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="px-6 py-4 text-left font-semibold">Adjetivo</th>
                <th className="px-6 py-4 text-left font-semibold">Antes del sustantivo</th>
                <th className="px-6 py-4 text-left font-semibold">Después del sustantivo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash">Pobre</td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-800">Un pobre hombre</p>
                  <p className="text-sm text-gray-600 italic">(desdichado)</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-800">Un hombre pobre</p>
                  <p className="text-sm text-gray-600 italic">(sin dinero)</p>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash">Antiguo</td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-800">Mi antiguo coche</p>
                  <p className="text-sm text-gray-600 italic">(el anterior)</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-800">Un coche antiguo</p>
                  <p className="text-sm text-gray-600 italic">(viejo)</p>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash">Nuevo</td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-800">Mi nuevo libro</p>
                  <p className="text-sm text-gray-600 italic">(otro más)</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-800">Un libro nuevo</p>
                  <p className="text-sm text-gray-600 italic">(recién comprado)</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-700">
            Otros adjetivos que funcionan así son: <span className="italic font-semibold">cierto, grande, simple, triste, único, verdadero</span> o <span className="italic font-semibold">viejo</span>.
          </p>
        </div>
      </section>

      {/* Nota final */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
        <p className="text-gray-700 flex items-start">
          <Lightbulb size={20} className="mr-2 text-purple-600 flex-shrink-0 mt-1" />
          <span>
            <strong>Consejo:</strong> La posición del adjetivo es uno de los aspectos más sutiles del español. 
            Presta atención a cómo los hablantes nativos usan los adjetivos en diferentes contextos para desarrollar tu intuición sobre cuándo usar cada posición.
          </span>
        </p>
      </section>
    </div>
  );
};

// --- VERBS CONTENT (Topic 1-5) ---
const VerbsContent: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* Introducción */}
      <section className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-l-4 border-green-500">
        <p className="text-lg text-gray-700 leading-relaxed">
          Esta guía te ayudará a dominar el <strong>verbo</strong> en español, 
          el motor de nuestras oraciones que indica acciones, estados o procesos.
        </p>
      </section>

      {/* 1. Tipos de verbos según su función */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Layers className="mr-3" size={32} /> 1. Tipos de verbos según su función
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Podemos clasificar los verbos según cómo interactúan con el sujeto y los complementos:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                <th className="px-6 py-4 text-left font-semibold">Descripción y Ejemplos</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Principales vs. Auxiliares</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Principales:</strong> Tienen el significado de la acción{' '}
                    <span className="text-gray-600 italic">(trabajar)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Auxiliares:</strong> Aportan información gramatical extra{' '}
                    <span className="text-gray-600 italic">(tengo que + trabajar)</span>.
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Transitivos vs. Intransitivos</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Transitivos:</strong> Necesitan un objeto directo{' '}
                    <span className="text-gray-600 italic">(Estudiar matemáticas)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Intransitivos:</strong> No llevan objeto directo{' '}
                    <span className="text-gray-600 italic">(Luisa salta)</span>.
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Reflexivos vs. Recíprocos</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Reflexivos:</strong> El sujeto realiza y recibe la acción{' '}
                    <span className="text-gray-600 italic">(Me levanto)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Recíprocos:</strong> Acción mutua entre dos personas{' '}
                    <span className="text-gray-600 italic">(Saludarse)</span>.
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-5 font-bold text-hku-ash align-top">Copulativos vs. Predicativos</td>
                <td className="px-6 py-5 space-y-3">
                  <div>
                    <strong className="text-hku-blue">Copulativos:</strong> Indican estado o condición{' '}
                    <span className="text-gray-600 italic">(Ser, estar, parecer)</span>.
                  </div>
                  <div>
                    <strong className="text-hku-blue">Predicativos:</strong> El resto de verbos con significado propio{' '}
                    <span className="text-gray-600 italic">(Sonreír)</span>.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dato importante */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500 mt-6">
          <p className="text-gray-700 flex items-start">
            <AlertCircle size={20} className="mr-2 text-yellow-600 flex-shrink-0 mt-1" />
            <span>
              <strong>Dato importante: Verbos defectivos.</strong> Son verbos "incompletos" que no se pueden conjugar en todas las personas o tiempos 
              (por ejemplo, <span className="italic">llover</span> o <span className="italic">soler</span>).
            </span>
          </p>
        </div>
      </section>

      {/* 2. Las formas del verbo */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <GitBranch className="mr-3" size={32} /> 2. Las formas del verbo
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          El verbo puede presentarse de dos maneras principales:
        </p>

        {/* Formas Impersonales */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-hku-ash mb-6 flex items-center">
            <ChevronRight className="mr-2 text-hku-green" size={24} />
            Formas Impersonales
          </h3>
          <p className="text-gray-700 mb-6">
            No cambian según la persona que habla. Son tres:
          </p>

          <div className="space-y-4">
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
              <div className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">
                    <strong className="text-purple-700">Infinitivo:</strong> La forma base
                  </p>
                  <p className="text-gray-600 italic ml-1">hablar, comer, vivir</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
              <div className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">
                    <strong className="text-purple-700">Gerundio:</strong> Indica una acción en proceso
                  </p>
                  <p className="text-gray-600 italic ml-1">hablando, comiendo, viviendo</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
              <div className="flex items-start">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">
                    <strong className="text-purple-700">Participio:</strong> Indica una acción terminada
                  </p>
                  <p className="text-gray-600 italic ml-1">hablado, comido, vivido</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formas Personales */}
        <div>
          <h3 className="text-2xl font-bold text-hku-ash mb-6 flex items-center">
            <Users className="mr-2 text-hku-green" size={24} />
            Formas Personales (La Conjugación)
          </h3>
          <p className="text-gray-700 mb-6">
            Es el cambio que sufre el verbo para concordar con quien realiza la acción.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <p className="text-gray-700 mb-4">
              <strong className="text-hku-blue">Persona y Número:</strong> Indica quién habla (1ª persona/emisor), 
              a quién se habla (2ª persona/receptor) o de quién se habla (3ª persona).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-hku-green text-white">
                  <th className="px-6 py-4 text-left font-semibold">Persona</th>
                  <th className="px-6 py-4 text-left font-semibold">Singular</th>
                  <th className="px-6 py-4 text-left font-semibold">Plural</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-hku-ash">1ª</td>
                  <td className="px-6 py-4 text-gray-700">Yo</td>
                  <td className="px-6 py-4 text-gray-700">Nosotros / Nosotras</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-hku-ash">2ª</td>
                  <td className="px-6 py-4 text-gray-700">Tú</td>
                  <td className="px-6 py-4 text-gray-700">Vosotros / Vosotras</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-hku-ash">3ª</td>
                  <td className="px-6 py-4 text-gray-700">Él / Ella</td>
                  <td className="px-6 py-4 text-gray-700">Ellos / Ellas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Tiempo y Modo Verbal */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Clock className="mr-3" size={32} /> 3. Tiempo y Modo Verbal
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          El <strong>tiempo</strong> sitúa la acción en el pasado, presente o futuro.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400">
            <p className="font-semibold text-gray-800 mb-2">
              <strong className="text-indigo-700">Tiempos Simples:</strong>
            </p>
            <p className="text-gray-700 mb-2">Formados por un solo verbo</p>
            <p className="text-gray-600 italic ml-4">canto, comía</p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400">
            <p className="font-semibold text-gray-800 mb-2">
              <strong className="text-indigo-700">Tiempos Compuestos:</strong>
            </p>
            <p className="text-gray-700 mb-2">Formados por el verbo <strong>"haber" + participio</strong></p>
            <p className="text-gray-600 italic ml-4">he cantado, había comido</p>
          </div>
        </div>

        {/* Los 3 Modos */}
        <div>
          <h3 className="text-2xl font-bold text-hku-ash mb-6">Los 3 Modos en español</h3>

          <div className="space-y-4">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <div className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold text-gray-800">
                    <strong className="text-green-700">Indicativo:</strong> Para acciones reales u objetivas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <div className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold text-gray-800">
                    <strong className="text-green-700">Subjuntivo:</strong> Para deseos, dudas o situaciones hipotéticas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <div className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">
                    <strong className="text-green-700">Imperativo:</strong> Para dar órdenes o consejos.
                  </p>
                  <p className="text-sm text-gray-600 ml-1">
                    <em>Nota:</em> El imperativo es un modo "defectivo" porque no se conjuga en primera persona 
                    <span className="italic"> (yo)</span> ni en terceras personas <span className="italic">(él/ellos)</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen de tiempos verbales */}
        <div className="mt-8">
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <img 
              src="images/tiempos-verbales.jpg" 
              alt="Tiempos verbales en español" 
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 4. El Aspecto Verbal */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Eye className="mr-3" size={32} /> 4. El Aspecto Verbal
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          El aspecto nos dice si la acción se considera <strong>terminada</strong> o <strong>no terminada</strong>.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="px-6 py-4 text-left font-semibold">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    Aspecto Perfectivo (Acción terminada)
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  <div className="flex items-center">
                    <RefreshCw className="mr-2" size={20} />
                    Aspecto Imperfectivo (Acción no terminada)
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-6 py-5 align-top bg-orange-50">
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-orange-700 mb-2">Tiempos Compuestos:</p>
                      <ul className="space-y-2 ml-4">
                        <li className="text-gray-700">• Pretérito perfecto compuesto: <span className="italic text-gray-600">he hablado</span></li>
                        <li className="text-gray-700">• Pretérito pluscuamperfecto: <span className="italic text-gray-600">había hablado</span></li>
                        <li className="text-gray-700">• Pretérito anterior: <span className="italic text-gray-600">hube hablado</span></li>
                        <li className="text-gray-700">• Futuro perfecto: <span className="italic text-gray-600">habré hablado</span></li>
                        <li className="text-gray-700">• Condicional perfecto: <span className="italic text-gray-600">habría hablado</span></li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-orange-700 mb-2">Tiempo Simple:</p>
                      <ul className="space-y-2 ml-4">
                        <li className="text-gray-700">• Pretérito indefinido: <span className="italic text-gray-600">hablé</span></li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 align-top bg-teal-50">
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-teal-700 mb-2">Tiempos Simples:</p>
                      <ul className="space-y-2 ml-4">
                        <li className="text-gray-700">• Presente: <span className="italic text-gray-600">hablo</span></li>
                        <li className="text-gray-700">• Pretérito imperfecto: <span className="italic text-gray-600">hablaba</span></li>
                        <li className="text-gray-700">• Futuro simple: <span className="italic text-gray-600">hablaré</span></li>
                        <li className="text-gray-700">• Condicional simple: <span className="italic text-gray-600">hablaría</span></li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
          <p className="text-gray-700 flex items-start">
            <AlertCircle size={20} className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
            <span>
              <strong>Importante:</strong> El pretérito indefinido es el único tiempo simple con aspecto perfectivo. 
              Todos los demás tiempos simples tienen aspecto imperfectivo, mientras que todos los tiempos compuestos tienen aspecto perfectivo.
            </span>
          </p>
        </div>
      </section>

      {/* Nota final */}
      <section className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-l-4 border-green-500">
        <p className="text-gray-700 flex items-start">
          <Lightbulb size={20} className="mr-2 text-green-600 flex-shrink-0 mt-1" />
          <span>
            <strong>Consejo:</strong> El sistema verbal español es muy rico y complejo. 
            La mejor manera de dominarlo es practicar la conjugación regularmente y prestar atención 
            a cómo se usan los diferentes tiempos y modos en contextos reales.
          </span>
        </p>
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
      {/* Introducción */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <Hash className="mr-2" /> Los Numerales en Español
        </h2>
        
        <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
          <p className="text-lg text-gray-800 leading-relaxed">
            Los <strong>determinantes numerales</strong> se dividen en dos categorías principales: <strong>cardinales</strong> (expresan cantidad) 
            y <strong>ordinales</strong> (expresan orden o posición).
          </p>
        </div>
      </section>

      {/* CARDINALES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-purple-100 p-2 rounded-lg mr-3">
            <Hash className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-hku-ash font-serif">1. Números Cardinales</h2>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Los números cardinales se utilizan fundamentalmente para expresar <strong>cantidades</strong> precisas.
        </p>

        {/* Reglas de Uso y Colocación */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-hku-blue mb-4 flex items-center">
            <MapPin size={18} className="mr-2" />
            Reglas de Uso y Colocación
          </h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-400">
              <h4 className="font-bold text-blue-800 mb-2">Posición</h4>
              <p className="text-sm text-gray-700">
                Generalmente se sitúan <strong>delante del sustantivo</strong> al que cuantifican.
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-400">
              <h4 className="font-bold text-blue-800 mb-2">Uso independiente</h4>
              <p className="text-sm text-gray-700 mb-3">
                Pueden emplearse sin el sustantivo si este ya se conoce por el contexto previo.
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-200">
                <p className="text-sm italic text-gray-600">
                  <strong>Ejemplo:</strong> "A mi familia le encantan los animales. Yo tengo <span className="text-purple-600 font-bold">tres</span> gatos 
                  y mi primo <span className="text-purple-600 font-bold">uno</span>".
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Normas Gramaticales Específicas */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-hku-green mb-4 flex items-center">
            <CheckCircle size={18} className="mr-2" />
            Normas Gramaticales Específicas
          </h3>

          <div className="space-y-6">
            {/* Concordancia con "1" */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-bold text-green-800 mb-3 flex items-center">
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded mr-2 text-sm">1</span>
                Concordancia con el "1"
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                Cuando un número termina en "1", debe <strong>concordar en género</strong> con el sustantivo que acompaña.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-green-300">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Masculino:</p>
                  <p className="font-mono text-sm">Tengo treinta y <span className="text-green-600 font-bold">un</span> euros</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-300">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Femenino:</p>
                  <p className="font-mono text-sm">Hay treinta y <span className="text-green-600 font-bold">una</span> personas</p>
                </div>
              </div>
            </div>

            {/* Variación de "Cien" */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <h4 className="font-bold text-orange-800 mb-3 flex items-center">
                <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded mr-2 text-sm">100</span>
                Variación de "Cien"
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                La palabra "cien" cambia a <strong>"ciento"</strong> o <strong>"cientos"</strong> cuando la cifra es superior a 100.
              </p>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-lg border border-orange-300">
                  <p className="font-mono text-sm">Tengo <span className="text-orange-600 font-bold">cien</span> dólares</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-orange-300">
                  <p className="font-mono text-sm">Taipei <span className="text-orange-600 font-bold">ciento</span> uno es impresionante</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-orange-300">
                  <p className="font-mono text-sm"><span className="text-orange-600 font-bold">Cientos</span> de personas fueron a la protesta</p>
                </div>
              </div>
            </div>

            {/* Mil vs. Miles */}
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded mr-2 text-sm">1000</span>
                Mil vs. Miles
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                Se utiliza <strong>"mil"</strong> (invariable) para cantidades exactas y <strong>"miles"</strong> para cantidades indeterminadas.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-yellow-300">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Exacta:</p>
                  <p className="font-mono text-sm">Año 2024 (<span className="text-yellow-700 font-bold">dos mil</span> veinticuatro)</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-yellow-300">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Indeterminada:</p>
                  <p className="font-mono text-sm">Había <span className="text-yellow-700 font-bold">miles</span> de personas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grandes Cantidades y Ortografía */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-hku-ash mb-4 flex items-center">
            <Globe size={18} className="mr-2" />
            Grandes Cantidades y Ortografía
          </h3>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-hku-blue">
              <h4 className="font-bold text-gray-800 mb-2">Definición de "Billón"</h4>
              <p className="text-sm text-gray-700">
                En español, un billón equivale a <strong>un millón de millones</strong> (1.000.000.000.000), 
                representado con 12 ceros. No debe confundirse con el "billion" anglosajón.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-hku-green">
              <h4 className="font-bold text-gray-800 mb-3">Uso de la conjunción "y"</h4>
              <p className="text-sm text-gray-700 mb-3">
                Se coloca únicamente <strong>entre los dos últimos dígitos</strong> de cada serie de tres.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-500 mb-2">Ejemplo:</p>
                <p className="font-mono text-sm text-gray-800 mb-1">987.654.321 =</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Novecientos ochenta <span className="text-green-600 font-bold">y</span> siete millones 
                  seiscientos cincuenta <span className="text-green-600 font-bold">y</span> cuatro mil 
                  trescientos veintiuno
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORDINALES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <ListOrdered className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-hku-ash font-serif">2. Números Ordinales</h2>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Los números ordinales expresan el <strong>orden</strong> o la <strong>posición</strong> dentro de una serie.
        </p>

        {/* La Apócope */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center">
            <AlertTriangle size={18} className="mr-2" />
            La Apócope de "Primero" y "Tercero"
          </h3>
          
          <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 mb-6">
            <p className="text-gray-800 mb-4 leading-relaxed">
              Esta es una de las reglas más importantes para los estudiantes. Los ordinales <strong>primero</strong> y <strong>tercero</strong> pierden 
              la "-o" final (se apocopan) cuando aparecen inmediatamente <strong>delante de un sustantivo masculino singular</strong>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <p className="text-xs font-semibold text-gray-500 mb-2">Primer + sustantivo masculino singular:</p>
                <p className="font-mono text-sm">
                  Hoy es mi <span className="text-red-600 font-bold">primer</span> día de clase
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <p className="text-xs font-semibold text-gray-500 mb-2">Tercer + sustantivo masculino singular:</p>
                <p className="font-mono text-sm">
                  Mi oficina está en el <span className="text-red-600 font-bold">tercer</span> piso
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-red-200">
              <p className="text-xs font-semibold text-gray-500 mb-2">Uso sin apócope:</p>
              <p className="text-sm text-gray-700">
                Si el sustantivo no va inmediatamente después, se mantiene la forma completa:
              </p>
              <p className="font-mono text-sm mt-2">
                Él fue el <span className="text-red-600 font-bold">primero</span> en llegar
              </p>
            </div>
          </div>
        </div>

        {/* Características Generales */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-hku-blue mb-4">Características Generales y Ejemplos</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-blue-200 p-4 text-left font-bold text-hku-ash w-1/3">Característica</th>
                  <th className="border border-blue-200 p-4 text-left font-bold text-hku-ash">Explicación y Ejemplos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="border border-blue-200 p-4 font-semibold text-blue-700 align-top">
                    Concordancia completa
                  </td>
                  <td className="border border-blue-200 p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Deben concordar en <strong>género y número</strong> con el sustantivo.
                    </p>
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="font-mono text-sm">• Vivo en el <span className="text-blue-600 font-bold">cuarto</span> piso, <span className="text-blue-600 font-bold">segunda</span> planta</p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="font-mono text-sm">• Mis <span className="text-blue-600 font-bold">primeras</span> clases de español fueron muy divertidas</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="border border-blue-200 p-4 font-semibold text-blue-700 align-top">
                    Uso sin nombrar el sustantivo
                  </td>
                  <td className="border border-blue-200 p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Suelen ir delante del sustantivo, pero este puede omitirse si el contexto es claro.
                    </p>
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-mono text-sm">
                        • Mi <span className="text-blue-600 font-bold">primera</span> novia era buena persona, 
                        pero la <span className="text-blue-600 font-bold">segunda</span>... prefiero no hablar
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="border border-blue-200 p-4 font-semibold text-blue-700 align-top">
                    Combinación con determinantes
                  </td>
                  <td className="border border-blue-200 p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Es habitual que vayan acompañados de <strong>artículos o posesivos</strong>.
                    </p>
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-mono text-sm">
                        • Mi <span className="text-blue-600 font-bold">primera</span> vez esquiando fue estresante, 
                        pero la <span className="text-blue-600 font-bold">segunda</span> ya fue genial
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

// 3. DEMOSTRATIVOS
const DeterminantsDemostrativos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* Introducción */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 flex items-center font-serif">
          <MapPin className="mr-2" /> Los Demostrativos en Español
        </h2>
        
        <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
          <p className="text-lg text-gray-800 leading-relaxed">
            Los demostrativos son palabras que utilizamos para identificar a un sustantivo en relación con la <strong>distancia</strong> (física o temporal) 
            que tiene respecto a la persona que habla.
          </p>
        </div>
      </section>

      {/* Cuadro de Formas */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Layers size={20} className="mr-2 text-orange-600" />
          1. Cuadro de Formas
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Los demostrativos deben concordar en <strong>género</strong> (masculino/femenino) y <strong>número</strong> (singular/plural) 
          con el sustantivo al que acompañan.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-50">
                <th className="border border-orange-200 p-4 text-left font-bold text-hku-ash">Distancia</th>
                <th className="border border-orange-200 p-4 text-center font-bold text-hku-ash">Masculino Singular</th>
                <th className="border border-orange-200 p-4 text-center font-bold text-hku-ash">Femenino Singular</th>
                <th className="border border-orange-200 p-4 text-center font-bold text-hku-ash">Masculino Plural</th>
                <th className="border border-orange-200 p-4 text-center font-bold text-hku-ash">Femenino Plural</th>
                <th className="border border-orange-200 p-4 text-center font-bold text-hku-ash">Neutro (Único)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              <tr className="hover:bg-orange-50/30 transition-colors">
                <td className="border border-orange-200 p-4 font-bold text-orange-700">Cerca (Aquí)</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Este</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Esta</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Estos</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Estas</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Esto</td>
              </tr>
              <tr className="hover:bg-orange-50/30 transition-colors">
                <td className="border border-orange-200 p-4 font-bold text-orange-700">Media (Ahí)</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Ese</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Esa</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Esos</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Esas</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Eso</td>
              </tr>
              <tr className="hover:bg-orange-50/30 transition-colors">
                <td className="border border-orange-200 p-4 font-bold text-orange-700">Lejos (Allí)</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Aquel</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Aquella</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Aquellos</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Aquellas</td>
                <td className="border border-orange-200 p-4 text-center font-mono text-gray-700">Aquello</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Uso en el Espacio */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <MapPin size={20} className="mr-2 text-blue-600" />
          2. Uso en el Espacio (Distancia Física)
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          La elección del demostrativo depende de <strong>dónde se encuentra el objeto</strong> respecto al hablante.
        </p>

        <div className="space-y-6">
          {/* Este/Esta/Estos/Estas */}
          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-800 mb-3 text-lg flex items-center">
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full mr-2 text-sm">Aquí</span>
              Este / Esta / Estos / Estas
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Indican que el objeto está en el <strong>espacio de la persona que habla</strong> o muy cerca de ella.
            </p>
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <p className="text-sm italic text-gray-600">
                <strong>Ejemplo:</strong> "¡Qué rico está <span className="text-green-700 font-bold">este</span> atún y qué buenas están <span className="text-green-700 font-bold">estas</span> gambas!" 
                <span className="text-xs text-gray-500">(Están en mi mesa)</span>
              </p>
            </div>
          </div>

          {/* Ese/Esa/Esos/Esas */}
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-800 mb-3 text-lg flex items-center">
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full mr-2 text-sm">Ahí</span>
              Ese / Esa / Esos / Esas
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Indican que el objeto está a una <strong>distancia media</strong> o en el <strong>espacio de la persona que escucha</strong>.
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-sm italic text-gray-600">
                <strong>Ejemplo:</strong> "<span className="text-blue-700 font-bold">Esa</span> camiseta te sienta estupendamente" 
                <span className="text-xs text-gray-500">(La camiseta la tienes tú, que me escuchas)</span>
              </p>
            </div>
          </div>

          {/* Aquel/Aquella/Aquellos/Aquellas */}
          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
            <h3 className="font-bold text-purple-800 mb-3 text-lg flex items-center">
              <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full mr-2 text-sm">Allí</span>
              Aquel / Aquella / Aquellos / Aquellas
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Indican que el objeto está en un espacio <strong>alejado tanto del que habla como del que escucha</strong>.
            </p>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <p className="text-sm italic text-gray-600">
                <strong>Ejemplo:</strong> "De postre me trae <span className="text-purple-700 font-bold">aquella</span> tarta" 
                <span className="text-xs text-gray-500">(Señalando una tarta que está lejos, en un mostrador)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Uso en el Tiempo */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Clock size={20} className="mr-2 text-green-600" />
          3. Uso en el Tiempo (Distancia Temporal)
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          También usamos estas palabras para situar <strong>eventos en el tiempo</strong>.
        </p>

        <div className="space-y-6">
          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">Este / Esta...</h3>
            <p className="text-sm text-gray-700 mb-3">
              Se refieren a un <strong>presente</strong>, a un <strong>pasado muy cercano</strong> o a un <strong>futuro próximo</strong>.
            </p>
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <p className="text-sm font-mono">"<span className="text-green-700 font-bold">Esta</span> mañana me he levantado tarde"</p>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">Ese / Esa...</h3>
            <p className="text-sm text-gray-700 mb-3">
              Se refieren a un <strong>pasado</strong> o <strong>futuro</strong> con una distancia media.
            </p>
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <p className="text-sm font-mono">"<span className="text-blue-700 font-bold">Ese</span> año fue muy difícil para todos"</p>
            </div>
          </div>

          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-2">Aquel / Aquella...</h3>
            <p className="text-sm text-gray-700 mb-3">
              Se refieren a un <strong>pasado muy lejano</strong>.
            </p>
            <div className="bg-white p-3 rounded-lg border border-purple-200">
              <p className="text-sm font-mono">"En <span className="text-purple-700 font-bold">aquella</span> época no existían los móviles"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demostrativos Neutros */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Eye size={20} className="mr-2 text-yellow-600" />
          4. Los Demostrativos Neutros: Esto, Eso, Aquello
        </h2>
        
        <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 mb-6">
          <p className="text-gray-800 mb-2 font-semibold">
            Estas formas son especiales porque <strong>nunca acompañan a un sustantivo</strong>; siempre van solas.
          </p>
          <p className="text-sm text-gray-700">
            Se utilizan en tres situaciones principales:
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-3">
              <span className="bg-hku-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
              <div>
                <h4 className="font-bold text-hku-ash mb-2">No sabemos el nombre del objeto</h4>
                <p className="text-sm text-gray-600 mb-2">Cuando preguntamos por algo desconocido.</p>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg ml-11">
              <p className="text-sm font-mono">"¿Qué es <span className="text-hku-blue font-bold">eso</span>?"</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-3">
              <span className="bg-hku-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
              <div>
                <h4 className="font-bold text-hku-ash mb-2">No importa el nombre del objeto</h4>
                <p className="text-sm text-gray-600 mb-2">Cuando señalamos algo de forma general.</p>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg ml-11">
              <p className="text-sm font-mono">"Toma, <span className="text-hku-blue font-bold">esto</span> es para ti"</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-3">
              <span className="bg-hku-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
              <div>
                <h4 className="font-bold text-hku-ash mb-2">No es un objeto concreto (Ideas o frases)</h4>
                <p className="text-sm text-gray-600 mb-2">Para referirnos a algo que alguien ha dicho o a una situación abstracta.</p>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg ml-11">
              <p className="text-sm font-mono">
                "¿Por qué dices <span className="text-hku-blue font-bold">eso</span>?" 
                <span className="text-xs text-gray-500 block mt-1">(Refiriéndose a las palabras anteriores del interlocutor)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Omitir el sustantivo */}
      <section className="bg-gradient-to-r from-orange-100 to-yellow-100 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Lightbulb size={20} className="mr-2 text-orange-600" />
          5. ¿Cuándo podemos omitir el sustantivo?
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          No es necesario repetir el nombre del objeto si ya lo hemos mencionado antes o si podemos señalarlo claramente con el dedo.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-200">
          <h3 className="font-bold text-orange-700 mb-3 flex items-center">
            <MessageSquare size={18} className="mr-2" />
            Escenario:
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Dos personas miran camisetas. Una dice:
          </p>
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
            <p className="font-mono text-lg">
              "Me llevo <span className="text-orange-700 font-bold">esta</span> azul"
            </p>
            <p className="text-xs text-gray-500 mt-2 italic">
              (En lugar de decir "esta camiseta azul")
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// 4. POSESIVOS
const DeterminantsPosesivos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* Introducción */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border-l-4 border-purple-500">
        <h1 className="text-3xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <User size={28} className="mr-3 text-purple-600" />
          Los Posesivos en Español
        </h1>
        <p className="text-gray-800 leading-relaxed text-lg">
          Los posesivos se utilizan para indicar a quién pertenece un objeto o con quién se tiene una relación. 
          En español existen dos tipos principales: los <strong>átonos</strong> (que van delante del nombre) y los <strong>tónicos</strong> (que van detrás).
        </p>
      </section>

      {/* 1. Posesivos Átonos */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 font-serif flex items-center">
          <ChevronRight size={24} className="mr-2 text-hku-blue" />
          1. Posesivos Átonos (Delante del nombre)
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          Son las formas más comunes y se colocan siempre antes del sustantivo.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Persona</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Singular</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Plural</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Yo</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Mi</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Mis</span></td>
                <td className="border border-gray-300 px-6 py-4">
                  <div className="font-mono text-sm">
                    <p className="italic">Mi amigo / Mis amigos</p>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Tú</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Tu</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Tus</span></td>
                <td className="border border-gray-300 px-6 py-4">
                  <div className="font-mono text-sm">
                    <p className="italic">Tu primo / Tus primos</p>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Él / Ella / Usted</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Su</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Sus</span></td>
                <td className="border border-gray-300 px-6 py-4">
                  <div className="font-mono text-sm">
                    <p className="italic">Su hermano / Sus hermanos</p>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Nosotros/as</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Nuestro/a</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Nuestros/as</span></td>
                <td className="border border-gray-300 px-6 py-4">
                  <div className="font-mono text-sm">
                    <p className="italic">Nuestro amigo / Nuestras amigas</p>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Vosotros/as</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Vuestro/a</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Vuestros/as</span></td>
                <td className="border border-gray-300 px-6 py-4">
                  <div className="font-mono text-sm">
                    <p className="italic">Vuestro primo / Vuestras primas</p>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Ellos / Ellas / Uds.</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Su</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-hku-blue">Sus</span></td>
                <td className="border border-gray-300 px-6 py-4">
                  <div className="font-mono text-sm">
                    <p className="italic">Su hermano / Sus hermanos</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. La Regla de Oro: Concordancia */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-l-4 border-yellow-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Award size={24} className="mr-2 text-yellow-600" />
          2. La Regla de Oro: La Concordancia
        </h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-200 mb-6">
          <p className="text-gray-800 mb-4 leading-relaxed text-lg">
            Es muy importante recordar que el género y el número del posesivo <strong>concuerdan con el objeto poseído</strong>, no con la persona que posee.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="font-semibold text-gray-800 mb-3 flex items-center">
              <Lightbulb size={18} className="mr-2 text-yellow-600" />
              Ejemplo:
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="font-mono text-sm mb-2">
                "La casa de Juan y María" → "<span className="text-hku-blue font-bold">Su</span> casa"
              </p>
              <p className="text-xs text-gray-600 italic mt-2">
                Aunque los dueños son dos (plural), el posesivo es singular porque "casa" es singular.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="font-semibold text-gray-800 mb-3">Otros ejemplos:</p>
            <div className="space-y-3 ml-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-mono text-sm">"Ésta es <span className="text-hku-blue font-bold">mi</span> cama" <span className="text-xs text-gray-500">(singular)</span></p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-mono text-sm">"Éstos son <span className="text-hku-blue font-bold">mis</span> amigos" <span className="text-xs text-gray-500">(plural)</span></p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-mono text-sm">"Éstos son <span className="text-hku-blue font-bold">nuestros</span> vecinos" <span className="text-xs text-gray-500">(concuerda con vecinos)</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Posesivos Tónicos */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 font-serif flex items-center">
          <ChevronRight size={24} className="mr-2 text-purple-600" />
          3. Posesivos Tónicos (Detrás del nombre)
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          Se utilizan después del sustantivo y suelen ir acompañados de un artículo o un numeral.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Persona</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Masc. Sing.</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Fem. Sing.</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Masc. Plural</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Fem. Plural</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Yo</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Mío</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Mía</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Míos</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Mías</span></td>
              </tr>
              <tr className="bg-gray-50 hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Tú</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Tuyo</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Tuya</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Tuyos</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Tuyas</span></td>
              </tr>
              <tr className="hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Él / Ella / Ud.</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suyo</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suya</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suyos</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suyas</span></td>
              </tr>
              <tr className="bg-gray-50 hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Nosotros/as</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Nuestro</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Nuestra</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Nuestros</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Nuestras</span></td>
              </tr>
              <tr className="hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Vosotros/as</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Vuestro</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Vuestra</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Vuestros</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Vuestras</span></td>
              </tr>
              <tr className="bg-gray-50 hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Ellos / Ellas / Uds.</td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suyo</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suya</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suyos</span></td>
                <td className="border border-gray-300 px-6 py-4"><span className="font-bold text-purple-600">Suyas</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Cuándo usar uno u otro */}
      <section className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-l-4 border-green-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Lightbulb size={24} className="mr-2 text-green-600" />
          4. ¿Cuándo usar uno u otro?
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          La elección entre un posesivo átono o tónico cambia el matiz de la frase:
        </p>

        <div className="space-y-5">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
            <h3 className="font-bold text-green-700 mb-3 flex items-center">
              <Users size={20} className="mr-2" />
              Posesivos Tónicos (mío, tuyo...)
            </h3>
            <p className="text-gray-700 mb-3">
              Se usan cuando el objeto forma parte de un <strong>conjunto o grupo</strong>.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 italic">Ejemplo:</p>
              <p className="font-mono text-sm">
                "Una amiga <span className="text-green-700 font-bold">mía</span> de Menorca"
              </p>
              <p className="text-xs text-gray-500 mt-2 italic">
                (Tengo varias amigas, y ella es una de ellas)
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200">
            <h3 className="font-bold text-hku-blue mb-3 flex items-center">
              <UserCheck size={20} className="mr-2" />
              Posesivos Átonos (mi, tu...)
            </h3>
            <p className="text-gray-700 mb-3">
              Se usan cuando el objeto es <strong>único</strong> para el hablante o es la primera vez que se menciona.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 italic">Ejemplo:</p>
              <p className="font-mono text-sm">
                "Ésta es Paula, <span className="text-hku-blue font-bold">mi</span> amiga"
              </p>
              <p className="text-xs text-gray-500 mt-2 italic">
                (Me refiero a ella de forma específica)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Excepciones */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-2xl border-l-4 border-red-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <AlertCircle size={24} className="mr-2 text-red-600" />
          5. Excepciones: Partes del Cuerpo y Ropa
        </h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200 mb-6">
          <p className="text-gray-800 mb-4 leading-relaxed text-lg">
            A diferencia del inglés, en español <strong>no solemos usar posesivos</strong> para hablar de partes del cuerpo, 
            ropa u objetos personales que llevamos puestos. En su lugar, usamos el <strong>artículo definido</strong> (<em>el, la, los, las</em>).
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-2">Cuerpo:</h4>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="font-mono text-sm">
                    "Me duele <span className="text-red-700 font-bold">la</span> cabeza"
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic">(en lugar de "mi cabeza")</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-2">Higiene:</h4>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="font-mono text-sm">
                    "¿Os habéis lavado <span className="text-red-700 font-bold">las</span> manos?"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-2">Acciones:</h4>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="font-mono text-sm">
                    "Estoy lavándome <span className="text-red-700 font-bold">los</span> dientes"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-2">Ropa:</h4>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="font-mono text-sm">
                    "Llevas una mancha en <span className="text-red-700 font-bold">la</span> camisa"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start mb-2">
              <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-2">Verbos reflexivos:</h4>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">Normalmente no se usan posesivos con estos verbos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// 5. INDEFINIDOS
const DeterminantsIndefinidos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* Introducción */}
      <section className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-2xl border-l-4 border-teal-500">
        <h1 className="text-3xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <HelpCircle size={28} className="mr-3 text-teal-600" />
          Los Indefinidos en Español
        </h1>
        <p className="text-gray-800 leading-relaxed text-lg">
          Los indefinidos son palabras que utilizamos para expresar una <strong>cantidad indeterminada</strong> o imprecisa, 
          es decir, cuando no mencionamos un número exacto.
        </p>
      </section>

      {/* 1. Escala de Cantidad */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 font-serif flex items-center">
          <ListOrdered size={24} className="mr-2 text-hku-blue" />
          1. Escala de Cantidad (De menos a más)
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          Dependiendo de cuánta cantidad queramos expresar, utilizamos diferentes palabras. Es fundamental tener en cuenta 
          si el sustantivo es singular, plural, masculino o femenino.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Nivel de cantidad</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Masculino</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Femenino</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Ejemplos</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Cero / Negativo</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Ningún / Ninguno</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Ninguna</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">No tengo ningún libro.</p>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Cantidad pequeña</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Poco / Pocos</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Poca / Pocas</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">Tengo poco tiempo.</p>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Existencia vaga</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Algún / Algunos</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Alguna / Algunas</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">¿Tienes alguna persona de confianza?</p>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Cantidad media</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Bastante</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Bastantes</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">Hay bastantes personas aquí.</p>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Cantidad grande</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Mucho / Muchos</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Mucha / Muchas</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">Tengo mucha tarea.</p>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Exceso</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Demasiado</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Demasiada</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">Hay demasiado ruido.</p>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Totalidad</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Todo / Todos</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue">Toda / Todas</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">Lo veo todo.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Personas vs. Cosas */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Users size={24} className="mr-2 text-purple-600" />
          2. Personas vs. Cosas
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          Cuando no nos referimos a un sustantivo específico (como "libro" o "persona"), utilizamos formas especiales 
          para hablar de gente o de objetos en general.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Referencia</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Afirmativo (Alguna)</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Negativo (Ninguna)</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Equivalencia</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Personas</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-purple-600">Alguien</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-purple-600">Nadie</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">Alguna persona / Ninguna persona</p>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-purple-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Cosas</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-purple-600">Algo</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-purple-600">Nada</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm italic">Alguna cosa / Ninguna cosa</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Estructura de las Frases Negativas */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-red-600 mb-6 font-serif flex items-center">
          <Split size={24} className="mr-2 text-red-600" />
          3. Estructura de las Frases Negativas
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          En español, las formas negativas (<strong>ningún, nada, nadie</strong>) pueden aparecer en dos posiciones 
          distintas respecto al verbo. Ambas son correctas y significan lo mismo:
        </p>

        <div className="space-y-6">
          {/* Opción A */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
              <ChevronRight size={20} className="mr-2" />
              Opción A: Antes del verbo
            </h3>
            <p className="text-gray-700 mb-4">
              Si el indefinido va primero, no necesitamos la palabra "no".
            </p>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm">
                  "<span className="text-green-700 font-bold">Ningún</span> estudiante ha venido."
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm">
                  "<span className="text-green-700 font-bold">Nada</span> le parece bien."
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm">
                  "<span className="text-green-700 font-bold">Nadie</span> me ha visto."
                </p>
              </div>
            </div>
          </div>

          {/* Opción B */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
              <ChevronRight size={20} className="mr-2" />
              Opción B: Después del verbo
            </h3>
            <p className="text-gray-700 mb-4">
              Si el indefinido va después, es obligatorio poner la palabra <strong>no</strong> antes del verbo (doble negación).
            </p>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm">
                  "<span className="text-orange-700 font-bold">No</span> ha venido <span className="text-orange-700 font-bold">ningún</span> estudiante."
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm">
                  "<span className="text-orange-700 font-bold">No</span> le parece bien <span className="text-orange-700 font-bold">nada</span>."
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm">
                  "<span className="text-orange-700 font-bold">No</span> me ha visto <span className="text-orange-700 font-bold">nadie</span>."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comparativa: Determinante vs. Pronombre */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <GitBranch size={24} className="mr-2 text-blue-600" />
          4. Comparativa: Determinante vs. Pronombre
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          Podemos elegir entre usar el indefinido con un sustantivo o usar la forma corta (pronombre).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Con sustantivo (Persona/Cosa)</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Forma corta (Alguien/Algo/Nadie/Nada)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"No hay <span className="font-bold text-hku-blue">ninguna cosa</span> en la clase."</p>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"No hay <span className="font-bold text-hku-blue">nada</span> en la clase."</p>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"Hay <span className="font-bold text-hku-blue">alguna cosa</span> en la mesa."</p>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"Hay <span className="font-bold text-hku-blue">algo</span> en la mesa."</p>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"He dejado <span className="font-bold text-hku-blue">todas las cosas</span> en tu habitación."</p>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"He dejado <span className="font-bold text-hku-blue">todo</span> en tu habitación."</p>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"No ha ido <span className="font-bold text-hku-blue">ninguna persona</span> a la fiesta."</p>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"No ha ido <span className="font-bold text-hku-blue">nadie</span> a la fiesta."</p>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"¿Sabes de <span className="font-bold text-hku-blue">alguna persona</span> que habla francés?"</p>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <p className="font-mono text-sm">"¿Sabes de <span className="font-bold text-hku-blue">alguien</span> que habla francés?"</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// 6. ARTÍCULOS
const DeterminantsArticulos: React.FC = () => {
  return (
    <div className="space-y-12 text-gray-700 font-sans">
      {/* Introducción */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border-l-4 border-indigo-500">
        <h1 className="text-3xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Key size={28} className="mr-3 text-indigo-600" />
          Los Artículos en Español
        </h1>
        <p className="text-gray-800 leading-relaxed text-lg">
          Los artículos son palabras que anuncian la presencia de un sustantivo y proporcionan información clave sobre él.
        </p>
      </section>

      {/* 1. Funciones Principales */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 font-serif flex items-center">
          <Layers size={24} className="mr-2 text-hku-blue" />
          1. Funciones Principales
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          El artículo nos indica tres aspectos fundamentales del sustantivo al que acompaña:
        </p>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border-l-4 border-blue-500">
            <div className="flex items-start">
              <span className="bg-hku-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Género</h3>
                <p className="text-gray-700">Si es masculino o femenino.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-l-4 border-green-500">
            <div className="flex items-start">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Número</h3>
                <p className="text-gray-700">Si es singular o plural.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-l-4 border-purple-500">
            <div className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Conocimiento</h3>
                <p className="text-gray-700">Si el objeto es conocido o desconocido por los hablantes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tipos de Artículos */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-l-4 border-yellow-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <Split size={24} className="mr-2 text-yellow-600" />
          2. Tipos de Artículos
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          Dependiendo de si nos referimos a algo específico o general, utilizamos artículos definidos o indefinidos.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-hku-blue text-white">
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Género / Número</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Definidos (Singular)</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Definidos (Plural)</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Indefinidos (Singular)</th>
                <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Indefinidos (Plural)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Masculino</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue text-lg">EL</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue text-lg">Los</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-green-600 text-lg">Un</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-green-600 text-lg">Unos</span>
                </td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-800">Femenino</td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue text-lg">La</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-hku-blue text-lg">Las</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-green-600 text-lg">Una</span>
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  <span className="font-bold text-green-600 text-lg">Unas</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-200">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Cuándo usar cada uno:</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <ChevronRight size={20} className="mr-2 text-hku-blue flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800">
                  <strong className="text-hku-blue">Artículos Definidos:</strong> Se usan para referirse a algo específico 
                  o para hablar de algo que ya se ha mencionado previamente en la conversación.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <ChevronRight size={20} className="mr-2 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800">
                  <strong className="text-green-600">Artículos Indefinidos:</strong> Se usan para referirse a algo no específico 
                  o para presentar información nueva por primera vez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ejemplos Prácticos */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 font-serif flex items-center">
          <Lightbulb size={24} className="mr-2 text-purple-600" />
          3. Ejemplos Prácticos de Diferenciación
        </h2>
        
        <p className="text-gray-800 mb-6 leading-relaxed">
          La elección del artículo cambia totalmente el sentido de lo que decimos:
        </p>

        <div className="space-y-6">
          {/* Información Nueva vs. Conocida */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-700 mb-4 flex items-center">
              <Eye size={20} className="mr-2" />
              Información Nueva vs. Conocida
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm mb-2">
                  "He recibido <span className="text-green-600 font-bold">una</span> carta"
                </p>
                <p className="text-xs text-gray-600 italic">
                  Es la primera vez que menciono el objeto (información nueva).
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm mb-2">
                  "<span className="text-hku-blue font-bold">La</span> carta es de mi prima"
                </p>
                <p className="text-xs text-gray-600 italic">
                  Ya sabemos de qué carta estamos hablando (información conocida).
                </p>
              </div>
            </div>
          </div>

          {/* Objeto en un Grupo vs. Objeto Único */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="font-bold text-green-700 mb-4 flex items-center">
              <Layers size={20} className="mr-2" />
              Objeto en un Grupo vs. Objeto Único
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm mb-2">
                  "Hay <span className="text-green-600 font-bold">una</span> carta para ti"
                </p>
                <p className="text-xs text-gray-600 italic">
                  Hay varias y una de ellas es para ti.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-mono text-sm mb-2">
                  "<span className="text-hku-blue font-bold">La</span> carta es para ti"
                </p>
                <p className="text-xs text-gray-600 italic">
                  Solo hay una carta física o nos referimos a una concreta que ya conocemos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Casos Especiales */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <AlertTriangle size={24} className="mr-2 text-orange-600" />
          4. Casos Especiales
        </h2>

        {/* Medios de Comunicación */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-200 mb-6">
          <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <Globe size={20} className="mr-2" />
            Medios de Comunicación vs. Dispositivos
          </h3>
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Sin artículo:</p>
              <p className="text-sm text-gray-700 mb-2">Se usa para hablar del medio en general.</p>
              <div className="bg-white p-3 rounded border-l-4 border-orange-400">
                <p className="font-mono text-sm">
                  "¡Tenemos teléfono!" <span className="text-xs text-gray-500 italic">(ahora tenemos el servicio)</span>
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Con artículo indefinido:</p>
              <p className="text-sm text-gray-700 mb-2">Para un dispositivo que no sabemos cuál es.</p>
              <div className="bg-white p-3 rounded border-l-4 border-green-400">
                <p className="font-mono text-sm">"¡Suena <span className="text-green-600 font-bold">un</span> teléfono!"</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Con artículo definido:</p>
              <p className="text-sm text-gray-700 mb-2">Para un dispositivo concreto que sí identificamos.</p>
              <div className="bg-white p-3 rounded border-l-4 border-blue-400">
                <p className="font-mono text-sm">"Suena <span className="text-hku-blue font-bold">el</span> teléfono"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verbos de Gusto */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-200">
          <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
            <MessageSquare size={20} className="mr-2" />
            Verbos de Gusto (Gustar, Encantar, etc.)
          </h3>
          <div className="bg-yellow-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-4 leading-relaxed">
              Con estos verbos, el sustantivo que va después funciona como el <strong>sujeto</strong> de la oración. 
              Por esta razón, <strong>siempre</strong> debe llevar artículo.
            </p>
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-600 italic mb-2">Ejemplo:</p>
              <p className="font-mono text-sm">
                "Me gustan <span className="text-hku-blue font-bold">los</span> perros"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. El Artículo Cero */}
      <section className="bg-gradient-to-r from-gray-50 to-slate-50 p-8 rounded-2xl border-l-4 border-gray-500">
        <h2 className="text-2xl font-bold text-hku-ash mb-6 font-serif flex items-center">
          <XCircle size={24} className="mr-2 text-gray-600" />
          5. El "Artículo Cero" (Cuándo no usar artículo)
        </h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300 mb-6">
          <p className="text-gray-800 mb-4 leading-relaxed text-lg">
            No se usa ningún artículo cuando hablamos de una <strong>cantidad indeterminada</strong> de algo 
            y no identificamos un objeto concreto.
          </p>
        </div>

        <div className="space-y-5">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start mb-3">
              <span className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">Sustantivos no contables (en singular):</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-mono text-sm">"Compra café y aceite"</p>
                  <p className="font-mono text-sm">"No tengo dinero"</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start mb-3">
              <span className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 text-sm">•</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">Sustantivos contables (en plural):</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-mono text-sm">"¿Venden zapatos?"</p>
                  <p className="font-mono text-sm">"Mi vecino arregla ordenadores"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Componente InputField reutilizable para ejercicios
const PracticeInputField = ({ 
  id, 
  value, 
  onChange, 
  result, 
  width = 'w-32',
  placeholder = ''
}: { 
  id: string; 
  value: string; 
  onChange: (value: string) => void; 
  result: boolean | null; 
  width?: string;
  placeholder?: string;
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`${width} px-3 py-2 border-2 rounded ${
      result === null 
        ? 'border-gray-300 focus:border-hku-blue' 
        : result 
        ? 'border-green-500 bg-green-50' 
        : 'border-red-500 bg-red-50'
    } focus:outline-none`}
  />
);

// 7. PRÁCTICA
const DeterminantsPractica: React.FC = () => {
  // Estados para las respuestas de cada sección
  const [articulosAnswers, setArticulosAnswers] = useState<{ [key: string]: string }>({});
  const [demonstrativosAnswers, setDemonstrativosAnswers] = useState<{ [key: string]: string }>({});
  const [posesivosAnswers, setPosesivosAnswers] = useState<{ [key: string]: string }>({});
  const [numeralesAnswers, setNumeralesAnswers] = useState<{ [key: string]: string }>({});
  const [indefinidosAnswers, setIndefinidosAnswers] = useState<{ [key: string]: string }>({});
  const [repasoAnswers, setRepasoAnswers] = useState<{ [key: string]: string }>({});
  
  // Estados para mostrar resultados
  const [articulosResults, setArticulosResults] = useState<{ [key: string]: boolean | null }>({});
  const [demonstrativosResults, setDemonstrativosResults] = useState<{ [key: string]: boolean | null }>({});
  const [posesivosResults, setPosesivosResults] = useState<{ [key: string]: boolean | null }>({});
  const [numeralesResults, setNumeralesResults] = useState<{ [key: string]: boolean | null }>({});
  const [indefinidosResults, setIndefinidosResults] = useState<{ [key: string]: boolean | null }>({});
  const [repasoResults, setRepasoResults] = useState<{ [key: string]: boolean | null }>({});

  // Soluciones correctas
  const articulosSolutions = {
    '1a': 'un', '1b': 'una', '1c': 'La', '1d': 'el',
    '2': 'una',
    '3': 'Los',
    '4': 'Los'
  };

  const demonstrativosSolutions = {
    '1': 'este',
    '2': 'Aquella',
    '3': 'esa',
    '4': 'eso',
    '5': 'aquellos',
    '6': 'Este',
    '7': 'eso',
    '8': 'Ese',
    '9': 'esto',
    '10': 'Estas'
  };

  const posesivosSolutions = {
    '1': 'mío',
    '2': 'la',
    '3': 'tuya',
    '4': 'las',
    '5': 'el',
    '6': 'Nuestra',
    '7': 'suyo',
    '8': 'la',
    '9': 'mías',
    '10': 'la'
  };

  const numeralesSolutions = {
    'ordinal1': 'primer',
    'ordinal2': 'tercer',
    'ordinal3': 'quinta',
    'ordinal4': 'décima',
    'ordinal5': 'séptimo',
    'cardinal1': 'setecientos cuarenta y dos mil trescientos quince',
    'cardinal2': 'ocho millones cuatrocientos mil veintiuno',
    'cardinal3': 'sesenta y cinco millones doscientos mil cien',
    'cardinal4': 'quinientos millones setecientos mil tres',
    'cardinal5': 'novecientos diez millones'
  };

  const indefinidosSolutions = {
    'a1': 'mucho',
    'a2': 'muchos',
    'a3': 'alguna',
    'b1': 'nadie',
    'b2': 'algo',
    'b3': 'nada'
  };

  const repasoSolutions = {
    '1': 'Posesivo átono',
    '2': 'Demostrativo',
    '3-correcta': 'incorrecta',
    '3-correccion': 'No he comprado nada de fruta',
    '4': 'Indefinido',
    '5-correcta': 'incorrecta',
    '5-correccion': 'Es el tercer chico',
    '6': 'Indefinido',
    '7': 'Artículo definido',
    '8-correcta': 'incorrecta',
    '8-correccion': 'Me duele la mano',
    '9': 'Artículo indefinido',
    '10': 'Artículo neutro',
    '11': 'Artículo indefinido',
    '12-correcta': 'incorrecta',
    '12-correccion': 'Ese reloj es mío',
    '13': 'Indefinido',
    '14-correcta': 'incorrecta',
    '14-correccion': 'Me gusta este café',
    '15-correcta': 'correcta',
    '15-correccion': 'correcta'
  };

  const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    return userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
  };

  const checkArticulos = () => {
    const results: { [key: string]: boolean | null } = {};
    Object.keys(articulosSolutions).forEach(key => {
      results[key] = checkAnswer(articulosAnswers[key] || '', articulosSolutions[key as keyof typeof articulosSolutions]);
    });
    setArticulosResults(results);
  };

  const checkDemostrativos = () => {
    const results: { [key: string]: boolean | null } = {};
    Object.keys(demonstrativosSolutions).forEach(key => {
      results[key] = checkAnswer(demonstrativosAnswers[key] || '', demonstrativosSolutions[key as keyof typeof demonstrativosSolutions]);
    });
    setDemonstrativosResults(results);
  };

  const checkPosesivos = () => {
    const results: { [key: string]: boolean | null } = {};
    Object.keys(posesivosSolutions).forEach(key => {
      results[key] = checkAnswer(posesivosAnswers[key] || '', posesivosSolutions[key as keyof typeof posesivosSolutions]);
    });
    setPosesivosResults(results);
  };

  const resetArticulos = () => {
    setArticulosAnswers({});
    setArticulosResults({});
  };

  const resetDemostrativos = () => {
    setDemonstrativosAnswers({});
    setDemonstrativosResults({});
  };

  const resetPosesivos = () => {
    setPosesivosAnswers({});
    setPosesivosResults({});
  };

  const checkNumerales = () => {
    const results: { [key: string]: boolean | null } = {};
    Object.keys(numeralesSolutions).forEach(key => {
      results[key] = checkAnswer(numeralesAnswers[key] || '', numeralesSolutions[key as keyof typeof numeralesSolutions]);
    });
    setNumeralesResults(results);
  };

  const resetNumerales = () => {
    setNumeralesAnswers({});
    setNumeralesResults({});
  };

  const checkIndefinidos = () => {
    const results: { [key: string]: boolean | null } = {};
    Object.keys(indefinidosSolutions).forEach(key => {
      results[key] = checkAnswer(indefinidosAnswers[key] || '', indefinidosSolutions[key as keyof typeof indefinidosSolutions]);
    });
    setIndefinidosResults(results);
  };

  const resetIndefinidos = () => {
    setIndefinidosAnswers({});
    setIndefinidosResults({});
  };

  const checkRepaso = () => {
    const results: { [key: string]: boolean | null } = {};
    Object.keys(repasoSolutions).forEach(key => {
      results[key] = checkAnswer(repasoAnswers[key] || '', repasoSolutions[key as keyof typeof repasoSolutions]);
    });
    setRepasoResults(results);
  };

  const resetRepaso = () => {
    setRepasoAnswers({});
    setRepasoResults({});
  };

  return (
    <div className="space-y-8 text-gray-700 font-sans">
      {/* Introducción */}
      <section className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-l-4 border-green-500">
        <h1 className="text-3xl font-bold text-hku-ash mb-4 font-serif flex items-center">
          <PenTool size={28} className="mr-3 text-green-600" />
          Ejercicios de Práctica: Los Determinantes
        </h1>
        <p className="text-gray-700 leading-relaxed">
          Completa los ejercicios y haz clic en "Comprobar" para ver tus resultados. 
          Los campos correctos se marcarán en verde y los incorrectos en rojo.
        </p>
      </section>

      {/* 1. LOS ARTÍCULOS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-hku-blue mb-6 font-serif flex items-center">
          <Key size={24} className="mr-2 text-hku-blue" />
          1. Los Artículos
        </h2>
        
        <p className="text-gray-700 mb-6">
          <strong>Instrucciones:</strong> Completa con el artículo adecuado (el, la, los, las, un, una, unos, unas):
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-hku-blue">1.</span> Compré{' '}
              <PracticeInputField 
                id="1a" 
                value={articulosAnswers['1a'] || ''} 
                onChange={(v) => setArticulosAnswers({...articulosAnswers, '1a': v})}
                result={articulosResults['1a'] ?? null}
              />
              {' '}sofá y{' '}
              <PracticeInputField 
                id="1b" 
                value={articulosAnswers['1b'] || ''} 
                onChange={(v) => setArticulosAnswers({...articulosAnswers, '1b': v})}
                result={articulosResults['1b'] ?? null}
              />
              {' '}lámpara para el salón.{' '}
              <PracticeInputField 
                id="1c" 
                value={articulosAnswers['1c'] || ''} 
                onChange={(v) => setArticulosAnswers({...articulosAnswers, '1c': v})}
                result={articulosResults['1c'] ?? null}
              />
              {' '}lámpara es azul, pero{' '}
              <PracticeInputField 
                id="1d" 
                value={articulosAnswers['1d'] || ''} 
                onChange={(v) => setArticulosAnswers({...articulosAnswers, '1d': v})}
                result={articulosResults['1d'] ?? null}
              />
              {' '}sofá es gris.
            </p>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-hku-blue">2.</span> ¿Sabes si hay{' '}
              <PracticeInputField 
                id="2" 
                value={articulosAnswers['2'] || ''} 
                onChange={(v) => setArticulosAnswers({...articulosAnswers, '2': v})}
                result={articulosResults['2'] ?? null}
              />
              {' '}panadería por aquí cerca?
            </p>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-hku-blue">3.</span>{' '}
              <PracticeInputField 
                id="3" 
                value={articulosAnswers['3'] || ''} 
                onChange={(v) => setArticulosAnswers({...articulosAnswers, '3': v})}
                result={articulosResults['3'] ?? null}
              />
              {' '}abuelos de mi vecino son de un pueblo muy pequeño.
            </p>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-hku-blue">4.</span>{' '}
              <PracticeInputField 
                id="4" 
                value={articulosAnswers['4'] || ''} 
                onChange={(v) => setArticulosAnswers({...articulosAnswers, '4': v})}
                result={articulosResults['4'] ?? null}
              />
              {' '}elefantes son animales extremadamente inteligentes.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={checkArticulos}
            className="bg-hku-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <CheckCircle size={18} className="mr-2" />
            Comprobar respuestas
          </button>
          <button
            onClick={resetArticulos}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Reiniciar
          </button>
        </div>
      </section>

      {/* 2. LOS DEMOSTRATIVOS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 font-serif flex items-center">
          <MapPin size={24} className="mr-2 text-purple-600" />
          2. Los Demostrativos (Espacio, Tiempo y Neutros)
        </h2>
        
        <p className="text-gray-700 mb-6">
          <strong>Instrucciones:</strong> Rellena los huecos con el demostrativo adecuado (este, ese, aquel, esto, eso, aquello y sus variantes). 
          Fíjate en las referencias de distancia o tiempo.
        </p>

        <div className="space-y-6">
          {[
            { id: '1', hint: 'Aquí, en mi mano', text: '¡Mira _____ anillo tan brillante que he encontrado!' },
            { id: '2', hint: 'Pasado muy lejano', text: '_____ década de los años 20 fue una época de grandes cambios.' },
            { id: '3', hint: 'Ahí, cerca de ti', text: 'Pásame _____ servilleta que tienes delante, por favor.' },
            { id: '4', hint: 'No sabes qué es', text: '¿Qué es _____ que suena en el jardín? Parece un animal.' },
            { id: '5', hint: 'Allí, lejos', text: '¿Ves _____ barcos que están cerca del horizonte?' },
            { id: '6', hint: 'Presente / Futuro cercano', text: '_____ viernes voy a ir a cenar con mis antiguos compañeros.' },
            { id: '7', hint: 'Referencia a una idea anterior', text: 'Me han dicho que van a cerrar la tienda. ¿Es verdad _____?' },
            { id: '8', hint: 'Pasado de distancia media', text: '_____ día que fuimos al río lo pasamos genial.' },
            { id: '9', hint: 'Señalando algo sin nombre', text: 'No me gusta nada _____, prefiero que cambiemos de plan.' },
            { id: '10', hint: 'Aquí', text: '_____ llaves que tengo aquí no abren ninguna puerta de la oficina.' }
          ].map((item) => (
            <div key={item.id} className="bg-purple-50 p-5 rounded-lg">
              <p className="text-sm text-purple-700 mb-2 italic">({item.hint})</p>
              <p className="text-gray-800">
                <span className="font-bold text-purple-600">{item.id}.</span>{' '}
                {item.text.split('_____').map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < item.text.split('_____').length - 1 && (
                      <PracticeInputField 
                        id={item.id} 
                        value={demonstrativosAnswers[item.id] || ''} 
                        onChange={(v) => setDemonstrativosAnswers({...demonstrativosAnswers, [item.id]: v})}
                        result={demonstrativosResults[item.id] ?? null}
                        width="w-28"
                      />
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={checkDemostrativos}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <CheckCircle size={18} className="mr-2" />
            Comprobar respuestas
          </button>
          <button
            onClick={resetDemostrativos}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Reiniciar
          </button>
        </div>
      </section>

      {/* 3. POSESIVOS Y ARTÍCULOS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 font-serif flex items-center">
          <User size={24} className="mr-2 text-orange-600" />
          3. Posesivos y Artículos
        </h2>
        
        <p className="text-gray-700 mb-6">
          <strong>Instrucciones:</strong> Elige la opción correcta para cada frase. Deberás decidir entre posesivos átonos, tónicos o artículos según el contexto.
        </p>

        <div className="space-y-6">
          {[
            { id: '1', text: 'Juan es un colega _____ del trabajo.', options: '(mi / mío)' },
            { id: '2', text: 'Al despertar, siempre me lavo _____ cara con agua fría.', options: '(la / mi)' },
            { id: '3', text: 'Esa idea _____ me parece la mejor solución al problema.', options: '(tuya / tu)' },
            { id: '4', text: '¿Has visto _____ gafas? No las encuentro por ninguna parte.', options: '(tus / las)' },
            { id: '5', text: 'Se ha puesto _____ abrigo porque tiene mucho frío.', options: '(el / su)' },
            { id: '6', text: '_____ directora está muy contenta con los resultados.', options: '(Nuestra / Nuestra)' },
            { id: '7', text: 'No me gusta nada ese comportamiento _____.', options: '(suyo / su)' },
            { id: '8', text: '¡Cuidado! Tienes una mancha en _____ mejilla.', options: '(la / tu)' },
            { id: '9', text: 'He quedado con unas primas _____ para ir a merendar.', options: '(mías / mis)' },
            { id: '10', text: '¿Te duele _____ rodilla después de la caída?', options: '(la / tu)' }
          ].map((item) => {
            const optionsArray = item.options.replace('(', '').replace(')', '').split(' / ');
            return (
              <div key={item.id} className="bg-orange-50 p-5 rounded-lg">
                <p className="text-gray-800 mb-3">
                  <span className="font-bold text-orange-600">{item.id}.</span>{' '}
                  {item.text.replace('_____', '______')}
                </p>
                <div className="flex gap-3 ml-6">
                  {optionsArray.map((option) => (
                    <button
                      key={option}
                      onClick={() => setPosesivosAnswers({...posesivosAnswers, [item.id]: option})}
                      className={`px-6 py-2 rounded border-2 transition-colors ${
                        posesivosResults[item.id] === null
                          ? posesivosAnswers[item.id] === option
                            ? 'border-hku-blue bg-hku-blue text-white'
                            : 'border-gray-300 hover:border-orange-400'
                          : posesivosAnswers[item.id] === option
                          ? posesivosResults[item.id]
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={checkPosesivos}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
          >
            <CheckCircle size={18} className="mr-2" />
            Comprobar respuestas
          </button>
          <button
            onClick={resetPosesivos}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Reiniciar
          </button>
        </div>
      </section>

      {/* 4. LOS NUMERALES */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-green-600 mb-6 font-serif flex items-center">
          <Hash size={24} className="mr-2 text-green-600" />
          4. Los Numerales
        </h2>
        
        {/* A. Ordinales */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">A. Escribe el número ordinal correspondiente (¡cuidado con la apócope!):</h3>
          
          <div className="space-y-6">
            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-green-600">1.</span> Es el (1.º){' '}
                <PracticeInputField 
                  id="ordinal1" 
                  value={numeralesAnswers['ordinal1'] || ''} 
                  onChange={(v) => setNumeralesAnswers({...numeralesAnswers, 'ordinal1': v})}
                  result={numeralesResults['ordinal1'] ?? null}
                  width="w-40"
                />
                {' '}viaje que hace solo al extranjero.
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-green-600">2.</span> Ganó el (3.º){' '}
                <PracticeInputField 
                  id="ordinal2" 
                  value={numeralesAnswers['ordinal2'] || ''} 
                  onChange={(v) => setNumeralesAnswers({...numeralesAnswers, 'ordinal2': v})}
                  result={numeralesResults['ordinal2'] ?? null}
                  width="w-40"
                />
                {' '}premio en el concurso de fotografía.
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-green-600">3.</span> Mi habitación está en la (5.ª){' '}
                <PracticeInputField 
                  id="ordinal3" 
                  value={numeralesAnswers['ordinal3'] || ''} 
                  onChange={(v) => setNumeralesAnswers({...numeralesAnswers, 'ordinal3': v})}
                  result={numeralesResults['ordinal3'] ?? null}
                  width="w-40"
                />
                {' '}planta.
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-green-600">4.</span> Es su (10.ª){' '}
                <PracticeInputField 
                  id="ordinal4" 
                  value={numeralesAnswers['ordinal4'] || ''} 
                  onChange={(v) => setNumeralesAnswers({...numeralesAnswers, 'ordinal4': v})}
                  result={numeralesResults['ordinal4'] ?? null}
                  width="w-40"
                />
                {' '}victoria consecutiva esta temporada.
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-green-600">5.</span> Ya estamos en el (7.º){' '}
                <PracticeInputField 
                  id="ordinal5" 
                  value={numeralesAnswers['ordinal5'] || ''} 
                  onChange={(v) => setNumeralesAnswers({...numeralesAnswers, 'ordinal5': v})}
                  result={numeralesResults['ordinal5'] ?? null}
                  width="w-40"
                />
                {' '}mes del año.
              </p>
            </div>
          </div>
        </div>

        {/* B. Cardinales */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">B. Escribe en letras los siguientes números cardinales:</h3>
          
          <div className="space-y-6">
            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800 mb-2">
                <span className="font-bold text-green-600">1.</span> 742.315:
              </p>
              <input
                type="text"
                value={numeralesAnswers['cardinal1'] || ''}
                onChange={(e) => setNumeralesAnswers({...numeralesAnswers, 'cardinal1': e.target.value})}
                className={`w-full px-3 py-2 border-2 rounded ${
                  (numeralesResults['cardinal1'] ?? null) === null 
                    ? 'border-gray-300 focus:border-hku-blue' 
                    : numeralesResults['cardinal1'] 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                } focus:outline-none`}
                placeholder="Escribe el número en letras"
              />
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800 mb-2">
                <span className="font-bold text-green-600">2.</span> 8.400.021:
              </p>
              <input
                type="text"
                value={numeralesAnswers['cardinal2'] || ''}
                onChange={(e) => setNumeralesAnswers({...numeralesAnswers, 'cardinal2': e.target.value})}
                className={`w-full px-3 py-2 border-2 rounded ${
                  (numeralesResults['cardinal2'] ?? null) === null 
                    ? 'border-gray-300 focus:border-hku-blue' 
                    : numeralesResults['cardinal2'] 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                } focus:outline-none`}
                placeholder="Escribe el número en letras"
              />
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800 mb-2">
                <span className="font-bold text-green-600">3.</span> 65.200.100:
              </p>
              <input
                type="text"
                value={numeralesAnswers['cardinal3'] || ''}
                onChange={(e) => setNumeralesAnswers({...numeralesAnswers, 'cardinal3': e.target.value})}
                className={`w-full px-3 py-2 border-2 rounded ${
                  (numeralesResults['cardinal3'] ?? null) === null 
                    ? 'border-gray-300 focus:border-hku-blue' 
                    : numeralesResults['cardinal3'] 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                } focus:outline-none`}
                placeholder="Escribe el número en letras"
              />
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800 mb-2">
                <span className="font-bold text-green-600">4.</span> 500.700.003:
              </p>
              <input
                type="text"
                value={numeralesAnswers['cardinal4'] || ''}
                onChange={(e) => setNumeralesAnswers({...numeralesAnswers, 'cardinal4': e.target.value})}
                className={`w-full px-3 py-2 border-2 rounded ${
                  (numeralesResults['cardinal4'] ?? null) === null 
                    ? 'border-gray-300 focus:border-hku-blue' 
                    : numeralesResults['cardinal4'] 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                } focus:outline-none`}
                placeholder="Escribe el número en letras"
              />
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <p className="text-gray-800 mb-2">
                <span className="font-bold text-green-600">5.</span> 910.000.000:
              </p>
              <input
                type="text"
                value={numeralesAnswers['cardinal5'] || ''}
                onChange={(e) => setNumeralesAnswers({...numeralesAnswers, 'cardinal5': e.target.value})}
                className={`w-full px-3 py-2 border-2 rounded ${
                  (numeralesResults['cardinal5'] ?? null) === null 
                    ? 'border-gray-300 focus:border-hku-blue' 
                    : numeralesResults['cardinal5'] 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                } focus:outline-none`}
                placeholder="Escribe el número en letras"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={checkNumerales}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <CheckCircle size={18} className="mr-2" />
            Comprobar respuestas
          </button>
          <button
            onClick={resetNumerales}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Reiniciar
          </button>
        </div>
      </section>

      {/* 5. LOS INDEFINIDOS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-teal-600 mb-6 font-serif flex items-center">
          <HelpCircle size={24} className="mr-2 text-teal-600" />
          5. Los Indefinidos
        </h2>
        
        {/* A. Cuantitativos */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">A. Completa con el indefinido adecuado (mucho, poco, bastante, demasiado, algún...):</h3>
          
          <div className="space-y-6">
            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-teal-600">1.</span> Hay{' '}
                <PracticeInputField 
                  id="a1" 
                  value={indefinidosAnswers['a1'] || ''} 
                  onChange={(v) => setIndefinidosAnswers({...indefinidosAnswers, 'a1': v})}
                  result={indefinidosResults['a1'] ?? null}
                  width="w-32"
                />
                {' '}tráfico hoy; llegaremos tarde a la reunión.
              </p>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-teal-600">2.</span> He leído{' '}
                <PracticeInputField 
                  id="a2" 
                  value={indefinidosAnswers['a2'] || ''} 
                  onChange={(v) => setIndefinidosAnswers({...indefinidosAnswers, 'a2': v})}
                  result={indefinidosResults['a2'] ?? null}
                  width="w-32"
                />
                {' '}libros este año, casi veinte.
              </p>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-teal-600">3.</span> ¿Tienes{' '}
                <PracticeInputField 
                  id="a3" 
                  value={indefinidosAnswers['a3'] || ''} 
                  onChange={(v) => setIndefinidosAnswers({...indefinidosAnswers, 'a3': v})}
                  result={indefinidosResults['a3'] ?? null}
                  width="w-32"
                />
                {' '}pregunta sobre lo que he explicado?
              </p>
            </div>
          </div>
        </div>

        {/* B. Alguien / Nadie / Algo / Nada */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">B. Alguien / Nadie / Algo / Nada:</h3>
          
          <div className="space-y-6">
            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-teal-600">1.</span> No hay{' '}
                <PracticeInputField 
                  id="b1" 
                  value={indefinidosAnswers['b1'] || ''} 
                  onChange={(v) => setIndefinidosAnswers({...indefinidosAnswers, 'b1': v})}
                  result={indefinidosResults['b1'] ?? null}
                  width="w-32"
                />
                {' '}en el mostrador para atendernos.
              </p>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-teal-600">2.</span> ¿Has escuchado{' '}
                <PracticeInputField 
                  id="b2" 
                  value={indefinidosAnswers['b2'] || ''} 
                  onChange={(v) => setIndefinidosAnswers({...indefinidosAnswers, 'b2': v})}
                  result={indefinidosResults['b2'] ?? null}
                  width="w-32"
                />
                ? He oído un ruido en la cocina.
              </p>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <p className="text-gray-800">
                <span className="font-bold text-teal-600">3.</span> Lo entiendo todo, no tengo{' '}
                <PracticeInputField 
                  id="b3" 
                  value={indefinidosAnswers['b3'] || ''} 
                  onChange={(v) => setIndefinidosAnswers({...indefinidosAnswers, 'b3': v})}
                  result={indefinidosResults['b3'] ?? null}
                  width="w-32"
                />
                {' '}que añadir.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={checkIndefinidos}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
          >
            <CheckCircle size={18} className="mr-2" />
            Comprobar respuestas
          </button>
          <button
            onClick={resetIndefinidos}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Reiniciar
          </button>
        </div>
      </section>

      {/* 6. REPASO GENERAL */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-red-600 mb-6 font-serif flex items-center">
          <Search size={24} className="mr-2 text-red-600" />
          6. Repaso General y Corrección de Errores
        </h2>
        
        <p className="text-gray-700 mb-6">
          <strong>Instrucciones:</strong> Identifica el tipo de determinante subrayado o corrige la frase si es necesario.
        </p>

        <div className="space-y-6">
          {/* Pregunta 1 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">1.</span> "He olvidado <strong>mis</strong> guantes". Tipo:
            </p>
            <PracticeInputField 
              id="1" 
              value={repasoAnswers['1'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '1': v})}
              result={repasoResults['1'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 2 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">2.</span> "<strong>Este</strong> verano ha sido caluroso". Tipo:
            </p>
            <PracticeInputField 
              id="2" 
              value={repasoAnswers['2'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '2': v})}
              result={repasoResults['2'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 3 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-red-600">3.</span> "No he comprado <strong>nada</strong> fruta".
            </p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">¿Correcta o incorrecta?</p>
                <div className="flex gap-3">
                  {['correcta', 'incorrecta'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setRepasoAnswers({...repasoAnswers, '3-correcta': option})}
                      className={`px-6 py-2 rounded border-2 transition-colors ${
                        repasoResults['3-correcta'] === null
                          ? repasoAnswers['3-correcta'] === option
                            ? 'border-hku-blue bg-hku-blue text-white'
                            : 'border-gray-300 hover:border-red-400'
                          : repasoAnswers['3-correcta'] === option
                          ? repasoResults['3-correcta']
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Corrige la frase si es incorrecta:</p>
                <input
                  type="text"
                  value={repasoAnswers['3-correccion'] || ''}
                  onChange={(e) => setRepasoAnswers({...repasoAnswers, '3-correccion': e.target.value})}
                  className={`w-full px-3 py-2 border-2 rounded ${
                    (repasoResults['3-correccion'] ?? null) === null 
                      ? 'border-gray-300 focus:border-hku-blue' 
                      : repasoResults['3-correccion'] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  } focus:outline-none`}
                  placeholder="Escribe la corrección"
                />
              </div>
            </div>
          </div>

          {/* Pregunta 4 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">4.</span> "He visto a <strong>alguien</strong> conocido". Tipo:
            </p>
            <PracticeInputField 
              id="4" 
              value={repasoAnswers['4'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '4': v})}
              result={repasoResults['4'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 5 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-red-600">5.</span> "Es el <strong>tercero</strong> chico de la fila".
            </p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">¿Correcta o incorrecta?</p>
                <div className="flex gap-3">
                  {['correcta', 'incorrecta'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setRepasoAnswers({...repasoAnswers, '5-correcta': option})}
                      className={`px-6 py-2 rounded border-2 transition-colors ${
                        repasoResults['5-correcta'] === null
                          ? repasoAnswers['5-correcta'] === option
                            ? 'border-hku-blue bg-hku-blue text-white'
                            : 'border-gray-300 hover:border-red-400'
                          : repasoAnswers['5-correcta'] === option
                          ? repasoResults['5-correcta']
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Corrige la frase si es incorrecta:</p>
                <input
                  type="text"
                  value={repasoAnswers['5-correccion'] || ''}
                  onChange={(e) => setRepasoAnswers({...repasoAnswers, '5-correccion': e.target.value})}
                  className={`w-full px-3 py-2 border-2 rounded ${
                    (repasoResults['5-correccion'] ?? null) === null 
                      ? 'border-gray-300 focus:border-hku-blue' 
                      : repasoResults['5-correccion'] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  } focus:outline-none`}
                  placeholder="Escribe la corrección"
                />
              </div>
            </div>
          </div>

          {/* Pregunta 6 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">6.</span> "Tengo <strong>pocos</strong> exámenes en junio". Tipo:
            </p>
            <PracticeInputField 
              id="6" 
              value={repasoAnswers['6'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '6': v})}
              result={repasoResults['6'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 7 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">7.</span> "<strong>La</strong> primera impresión es la que cuenta". Tipo:
            </p>
            <PracticeInputField 
              id="7" 
              value={repasoAnswers['7'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '7': v})}
              result={repasoResults['7'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 8 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-red-600">8.</span> "Me duele <strong>mi</strong> mano".
            </p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">¿Correcta o incorrecta?</p>
                <div className="flex gap-3">
                  {['correcta', 'incorrecta'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setRepasoAnswers({...repasoAnswers, '8-correcta': option})}
                      className={`px-6 py-2 rounded border-2 transition-colors ${
                        repasoResults['8-correcta'] === null
                          ? repasoAnswers['8-correcta'] === option
                            ? 'border-hku-blue bg-hku-blue text-white'
                            : 'border-gray-300 hover:border-red-400'
                          : repasoAnswers['8-correcta'] === option
                          ? repasoResults['8-correcta']
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Corrige la frase si es incorrecta:</p>
                <input
                  type="text"
                  value={repasoAnswers['8-correccion'] || ''}
                  onChange={(e) => setRepasoAnswers({...repasoAnswers, '8-correccion': e.target.value})}
                  className={`w-full px-3 py-2 border-2 rounded ${
                    (repasoResults['8-correccion'] ?? null) === null 
                      ? 'border-gray-300 focus:border-hku-blue' 
                      : repasoResults['8-correccion'] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  } focus:outline-none`}
                  placeholder="Escribe la corrección"
                />
              </div>
            </div>
          </div>

          {/* Pregunta 9 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">9.</span> "He comprado <strong>unas</strong> manzanas". Tipo:
            </p>
            <PracticeInputField 
              id="9" 
              value={repasoAnswers['9'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '9': v})}
              result={repasoResults['9'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 10 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">10.</span> "¿Has traído <strong>lo</strong> de ayer?". Tipo:
            </p>
            <PracticeInputField 
              id="10" 
              value={repasoAnswers['10'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '10': v})}
              result={repasoResults['10'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 11 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">11.</span> "He ganado <strong>un</strong> billón de euros". Tipo:
            </p>
            <PracticeInputField 
              id="11" 
              value={repasoAnswers['11'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '11': v})}
              result={repasoResults['11'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 12 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-red-600">12.</span> "Ese reloj es <strong>mi</strong>".
            </p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">¿Correcta o incorrecta?</p>
                <div className="flex gap-3">
                  {['correcta', 'incorrecta'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setRepasoAnswers({...repasoAnswers, '12-correcta': option})}
                      className={`px-6 py-2 rounded border-2 transition-colors ${
                        repasoResults['12-correcta'] === null
                          ? repasoAnswers['12-correcta'] === option
                            ? 'border-hku-blue bg-hku-blue text-white'
                            : 'border-gray-300 hover:border-red-400'
                          : repasoAnswers['12-correcta'] === option
                          ? repasoResults['12-correcta']
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Corrige la frase si es incorrecta:</p>
                <input
                  type="text"
                  value={repasoAnswers['12-correccion'] || ''}
                  onChange={(e) => setRepasoAnswers({...repasoAnswers, '12-correccion': e.target.value})}
                  className={`w-full px-3 py-2 border-2 rounded ${
                    (repasoResults['12-correccion'] ?? null) === null 
                      ? 'border-gray-300 focus:border-hku-blue' 
                      : repasoResults['12-correccion'] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  } focus:outline-none`}
                  placeholder="Escribe la corrección"
                />
              </div>
            </div>
          </div>

          {/* Pregunta 13 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-2">
              <span className="font-bold text-red-600">13.</span> "Hay <strong>demasiadas</strong> personas en el metro". Tipo:
            </p>
            <PracticeInputField 
              id="13" 
              value={repasoAnswers['13'] || ''} 
              onChange={(v) => setRepasoAnswers({...repasoAnswers, '13': v})}
              result={repasoResults['13'] ?? null}
              width="w-64"
            />
          </div>

          {/* Pregunta 14 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-red-600">14.</span> "Me gusta <strong>esta</strong> café".
            </p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">¿Correcta o incorrecta?</p>
                <div className="flex gap-3">
                  {['correcta', 'incorrecta'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setRepasoAnswers({...repasoAnswers, '14-correcta': option})}
                      className={`px-6 py-2 rounded border-2 transition-colors ${
                        repasoResults['14-correcta'] === null
                          ? repasoAnswers['14-correcta'] === option
                            ? 'border-hku-blue bg-hku-blue text-white'
                            : 'border-gray-300 hover:border-red-400'
                          : repasoAnswers['14-correcta'] === option
                          ? repasoResults['14-correcta']
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Corrige la frase si es incorrecta:</p>
                <input
                  type="text"
                  value={repasoAnswers['14-correccion'] || ''}
                  onChange={(e) => setRepasoAnswers({...repasoAnswers, '14-correccion': e.target.value})}
                  className={`w-full px-3 py-2 border-2 rounded ${
                    (repasoResults['14-correccion'] ?? null) === null 
                      ? 'border-gray-300 focus:border-hku-blue' 
                      : repasoResults['14-correccion'] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  } focus:outline-none`}
                  placeholder="Escribe la corrección"
                />
              </div>
            </div>
          </div>

          {/* Pregunta 15 */}
          <div className="bg-red-50 p-5 rounded-lg">
            <p className="text-gray-800 mb-3">
              <span className="font-bold text-red-600">15.</span> "El <strong>primer</strong> día fue muy cansado".
            </p>
            <div className="ml-4 space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">¿Correcta o incorrecta?</p>
                <div className="flex gap-3">
                  {['correcta', 'incorrecta'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setRepasoAnswers({...repasoAnswers, '15-correcta': option})}
                      className={`px-6 py-2 rounded border-2 transition-colors ${
                        repasoResults['15-correcta'] === null
                          ? repasoAnswers['15-correcta'] === option
                            ? 'border-hku-blue bg-hku-blue text-white'
                            : 'border-gray-300 hover:border-red-400'
                          : repasoAnswers['15-correcta'] === option
                          ? repasoResults['15-correcta']
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Corrige la frase si es incorrecta:</p>
                <input
                  type="text"
                  value={repasoAnswers['15-correccion'] || ''}
                  onChange={(e) => setRepasoAnswers({...repasoAnswers, '15-correccion': e.target.value})}
                  className={`w-full px-3 py-2 border-2 rounded ${
                    (repasoResults['15-correccion'] ?? null) === null 
                      ? 'border-gray-300 focus:border-hku-blue' 
                      : repasoResults['15-correccion'] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  } focus:outline-none`}
                  placeholder="Escribe 'correcta' si no hay error"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={checkRepaso}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <CheckCircle size={18} className="mr-2" />
            Comprobar respuestas
          </button>
          <button
            onClick={resetRepaso}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Reiniciar
          </button>
        </div>
      </section>

      {/* Nota final */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
        <p className="text-gray-700 flex items-start">
          <Lightbulb size={20} className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
          <span>
            <strong>Consejo:</strong> Si cometes errores, revisa las secciones teóricas correspondientes antes de volver a intentarlo. 
            Presta atención a las reglas de concordancia y al contexto de cada frase.
          </span>
        </p>
      </section>
    </div>
  );
};

// --- PRACTICE COMPONENT: MORPHOLOGY ---
const MorphologyPractice: React.FC = () => {
    // Estados para las respuestas
    const [ejercicio1Answers, setEjercicio1Answers] = useState<{ [key: string]: string }>({});
    const [ejercicio2Answers, setEjercicio2Answers] = useState<{ [key: string]: string }>({});
    const [ejercicio3Answers, setEjercicio3Answers] = useState<{ [key: string]: string }>({});
    const [ejercicio4Answers, setEjercicio4Answers] = useState<{ [key: string]: string }>({});
    
    // Estados para resultados
    const [ejercicio1Results, setEjercicio1Results] = useState<{ [key: string]: boolean | null }>({});
    const [ejercicio2Results, setEjercicio2Results] = useState<{ [key: string]: boolean | null }>({});
    const [ejercicio3Results, setEjercicio3Results] = useState<{ [key: string]: boolean | null }>({});
    const [ejercicio4Results, setEjercicio4Results] = useState<{ [key: string]: boolean | null }>({});

    // Soluciones
    const ejercicio1Solutions = {
        '1-prefijo': 'anti',
        '1-raiz': 'social',
        '1-significado': 'contra',
        '2-raiz': 'riqu',
        '2-sufijo': 'eza',
        '2-funcion': 'forma sustantivos abstractos',
        '3-prefijo': 'sub',
        '3-raiz': 'terr',
        '3-sufijo': 'áneo',
        '3-significado': 'debajo'
    };

    const ejercicio2Solutions = {
        'el': 'Determinante',
        'blanco': 'Adjetivo',
        'tranquilamente': 'Adverbio',
        'en': 'Preposición',
        'mesa': 'Sustantivo'
    };

    const ejercicio3Solutions = {
        'librero': 'Derivativo',
        'libros': 'Flexivo',
        'cantare': 'Flexivo',
        'cantante': 'Derivativo'
    };

    const ejercicio4Solutions = {
        'situacionA': 'Opción 1',
        'situacionB': 'Opción 2'
    };

    const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
        return userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    };

    const checkEjercicio1 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio1Solutions).forEach(key => {
            results[key] = checkAnswer(ejercicio1Answers[key] || '', ejercicio1Solutions[key as keyof typeof ejercicio1Solutions]);
        });
        setEjercicio1Results(results);
    };

    const checkEjercicio2 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio2Solutions).forEach(key => {
            results[key] = checkAnswer(ejercicio2Answers[key] || '', ejercicio2Solutions[key as keyof typeof ejercicio2Solutions]);
        });
        setEjercicio2Results(results);
    };

    const resetEjercicio1 = () => {
        setEjercicio1Answers({});
        setEjercicio1Results({});
    };

    const resetEjercicio2 = () => {
        setEjercicio2Answers({});
        setEjercicio2Results({});
    };

    const checkEjercicio3 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio3Solutions).forEach(key => {
            results[key] = checkAnswer(ejercicio3Answers[key] || '', ejercicio3Solutions[key as keyof typeof ejercicio3Solutions]);
        });
        setEjercicio3Results(results);
    };

    const resetEjercicio3 = () => {
        setEjercicio3Answers({});
        setEjercicio3Results({});
    };

    const checkEjercicio4 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio4Solutions).forEach(key => {
            results[key] = checkAnswer(ejercicio4Answers[key] || '', ejercicio4Solutions[key as keyof typeof ejercicio4Solutions]);
        });
        setEjercicio4Results(results);
    };

    const resetEjercicio4 = () => {
        setEjercicio4Answers({});
        setEjercicio4Results({});
    };

    return (
        <div className="space-y-8 text-gray-700 font-sans">
            {/* Introducción */}
            <section className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-l-4 border-green-500">
                <h1 className="text-3xl font-bold text-hku-ash mb-4 font-serif flex items-center">
                    <PenTool size={28} className="mr-3 text-green-600" />
                    Ejercicios de Práctica: Morfología
                </h1>
                <p className="text-gray-700 leading-relaxed">
                    Completa los ejercicios y haz clic en "Comprobar" para ver tus resultados. 
                    Los campos correctos se marcarán en verde y los incorrectos en rojo.
                </p>
            </section>

            {/* EJERCICIO 1 */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-hku-blue mb-6 font-serif flex items-center">
                    <Scissors size={24} className="mr-2 text-hku-blue" />
                    Ejercicio 1: El Laboratorio de Palabras (Anatomía)
                </h2>
                
                <p className="text-gray-700 mb-6">
                    <strong>Objetivo:</strong> Identificar las partes de una palabra (Raíz, Prefijos y Sufijos).
                </p>
                
                <p className="text-gray-700 mb-6">
                    <strong>Instrucciones:</strong> Analiza las siguientes palabras y sepáralas en sus piezas. 
                    Indica qué significa el prefijo o sufijo según la tabla de tu tema.
                </p>

                <div className="space-y-6">
                    {/* Palabra 1: Antisocial */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-bold text-hku-blue mb-4">1. Antisocial</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 flex-wrap">
                                <PracticeInputField 
                                    id="1-prefijo"
                                    value={ejercicio1Answers['1-prefijo'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '1-prefijo': v})}
                                    result={ejercicio1Results['1-prefijo'] ?? null}
                                    width="w-32"
                                    placeholder="Prefijo"
                                />
                                <span className="text-gray-600">(Prefijo) +</span>
                                <PracticeInputField 
                                    id="1-raiz"
                                    value={ejercicio1Answers['1-raiz'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '1-raiz': v})}
                                    result={ejercicio1Results['1-raiz'] ?? null}
                                    width="w-32"
                                    placeholder="Raíz"
                                />
                                <span className="text-gray-600">(Raíz)</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-700 mb-2">Significado del prefijo:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {['contra', 'entre', 'sobre'].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setEjercicio1Answers({...ejercicio1Answers, '1-significado': option})}
                                            className={`px-4 py-2 rounded border-2 transition-colors ${
                                                ejercicio1Results['1-significado'] === null
                                                    ? ejercicio1Answers['1-significado'] === option
                                                        ? 'border-hku-blue bg-hku-blue text-white'
                                                        : 'border-gray-300 hover:border-hku-blue'
                                                    : ejercicio1Answers['1-significado'] === option
                                                    ? ejercicio1Results['1-significado']
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-red-500 bg-red-50'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Palabra 2: Riqueza */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-bold text-hku-blue mb-4">2. Riqueza</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 flex-wrap">
                                <PracticeInputField 
                                    id="2-raiz"
                                    value={ejercicio1Answers['2-raiz'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '2-raiz': v})}
                                    result={ejercicio1Results['2-raiz'] ?? null}
                                    width="w-32"
                                    placeholder="Raíz"
                                />
                                <span className="text-gray-600">(Raíz) +</span>
                                <PracticeInputField 
                                    id="2-sufijo"
                                    value={ejercicio1Answers['2-sufijo'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '2-sufijo': v})}
                                    result={ejercicio1Results['2-sufijo'] ?? null}
                                    width="w-32"
                                    placeholder="Sufijo"
                                />
                                <span className="text-gray-600">(Sufijo)</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-700 mb-2">Función del sufijo:</p>
                                <PracticeInputField 
                                    id="2-funcion"
                                    value={ejercicio1Answers['2-funcion'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '2-funcion': v})}
                                    result={ejercicio1Results['2-funcion'] ?? null}
                                    width="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Palabra 3: Subterráneo */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-bold text-hku-blue mb-4">3. Subterráneo</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 flex-wrap">
                                <PracticeInputField 
                                    id="3-prefijo"
                                    value={ejercicio1Answers['3-prefijo'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '3-prefijo': v})}
                                    result={ejercicio1Results['3-prefijo'] ?? null}
                                    width="w-32"
                                    placeholder="Prefijo"
                                />
                                <span className="text-gray-600">(Prefijo) +</span>
                                <PracticeInputField 
                                    id="3-raiz"
                                    value={ejercicio1Answers['3-raiz'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '3-raiz': v})}
                                    result={ejercicio1Results['3-raiz'] ?? null}
                                    width="w-32"
                                    placeholder="Raíz"
                                />
                                <span className="text-gray-600">(Raíz) +</span>
                                <PracticeInputField 
                                    id="3-sufijo"
                                    value={ejercicio1Answers['3-sufijo'] || ''}
                                    onChange={(v) => setEjercicio1Answers({...ejercicio1Answers, '3-sufijo': v})}
                                    result={ejercicio1Results['3-sufijo'] ?? null}
                                    width="w-32"
                                    placeholder="Sufijo"
                                />
                                <span className="text-gray-600">(Sufijo)</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-700 mb-2">Significado del prefijo:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {['debajo', 'sobre', 'alrededor'].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setEjercicio1Answers({...ejercicio1Answers, '3-significado': option})}
                                            className={`px-4 py-2 rounded border-2 transition-colors ${
                                                ejercicio1Results['3-significado'] === null
                                                    ? ejercicio1Answers['3-significado'] === option
                                                        ? 'border-hku-blue bg-hku-blue text-white'
                                                        : 'border-gray-300 hover:border-hku-blue'
                                                    : ejercicio1Answers['3-significado'] === option
                                                    ? ejercicio1Results['3-significado']
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-red-500 bg-red-50'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={checkEjercicio1}
                        className="bg-hku-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar respuestas
                    </button>
                    <button
                        onClick={resetEjercicio1}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                    >
                        <RefreshCw size={18} className="mr-2" />
                        Reiniciar
                    </button>
                </div>
            </section>

            {/* EJERCICIO 2 */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-purple-600 mb-6 font-serif flex items-center">
                    <Layers size={24} className="mr-2 text-purple-600" />
                    Ejercicio 2: Clasificación Rápida (Categorías)
                </h2>
                
                <p className="text-gray-700 mb-6">
                    <strong>Objetivo:</strong> Diferenciar las funciones de las palabras en una oración.
                </p>
                
                <p className="text-gray-700 mb-6">
                    <strong>Instrucciones:</strong> Mira la siguiente frase y asigna a cada palabra en negrita su categoría gramatical 
                    (Sustantivo, Verbo, Adjetivo, Adverbio, Determinante o Preposición).
                </p>

                <div className="bg-purple-50 p-6 rounded-lg mb-6">
                    <p className="text-lg text-gray-800 font-serif italic">
                        "<strong>El</strong> gato <strong>blanco</strong> duerme <strong>tranquilamente</strong> <strong>en</strong> la <strong>mesa</strong>."
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-purple-600 w-40">El:</span>
                            <PracticeInputField 
                                id="el"
                                value={ejercicio2Answers['el'] || ''}
                                onChange={(v) => setEjercicio2Answers({...ejercicio2Answers, 'el': v})}
                                result={ejercicio2Results['el'] ?? null}
                                width="w-64"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-purple-600 w-40">Blanco:</span>
                            <PracticeInputField 
                                id="blanco"
                                value={ejercicio2Answers['blanco'] || ''}
                                onChange={(v) => setEjercicio2Answers({...ejercicio2Answers, 'blanco': v})}
                                result={ejercicio2Results['blanco'] ?? null}
                                width="w-64"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-purple-600 w-40">Tranquilamente:</span>
                            <PracticeInputField 
                                id="tranquilamente"
                                value={ejercicio2Answers['tranquilamente'] || ''}
                                onChange={(v) => setEjercicio2Answers({...ejercicio2Answers, 'tranquilamente': v})}
                                result={ejercicio2Results['tranquilamente'] ?? null}
                                width="w-64"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-purple-600 w-40">En:</span>
                            <PracticeInputField 
                                id="en"
                                value={ejercicio2Answers['en'] || ''}
                                onChange={(v) => setEjercicio2Answers({...ejercicio2Answers, 'en': v})}
                                result={ejercicio2Results['en'] ?? null}
                                width="w-64"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-purple-600 w-40">Mesa:</span>
                            <PracticeInputField 
                                id="mesa"
                                value={ejercicio2Answers['mesa'] || ''}
                                onChange={(v) => setEjercicio2Answers({...ejercicio2Answers, 'mesa': v})}
                                result={ejercicio2Results['mesa'] ?? null}
                                width="w-64"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={checkEjercicio2}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar respuestas
                    </button>
                    <button
                        onClick={resetEjercicio2}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                    >
                        <RefreshCw size={18} className="mr-2" />
                        Reiniciar
                    </button>
                </div>
            </section>

            {/* EJERCICIO 3 */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-green-600 mb-6 font-serif flex items-center">
                    <GitBranch size={24} className="mr-2 text-green-600" />
                    Ejercicio 3: Desafío de Flexión vs. Derivación
                </h2>
                
                <p className="text-gray-700 mb-6">
                    <strong>Objetivo:</strong> Entender si estamos creando una palabra nueva o solo cambiando un matiz.
                </p>
                
                <p className="text-gray-700 mb-6">
                    <strong>Instrucciones:</strong> Indica si el gramema en negrita es Flexivo (género, número, tiempo) o Derivativo (crea una palabra nueva).
                </p>

                <div className="space-y-4">
                    <div className="bg-green-50 p-5 rounded-lg">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="font-bold text-green-600 min-w-[200px]">Libr-<strong>ero</strong> (Mueble para libros):</span>
                            <PracticeInputField 
                                id="librero"
                                value={ejercicio3Answers['librero'] || ''}
                                onChange={(v) => setEjercicio3Answers({...ejercicio3Answers, 'librero': v})}
                                result={ejercicio3Results['librero'] ?? null}
                                width="w-48"
                            />
                        </div>
                    </div>

                    <div className="bg-green-50 p-5 rounded-lg">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="font-bold text-green-600 min-w-[200px]">Libr-<strong>os</strong> (Varios libros):</span>
                            <PracticeInputField 
                                id="libros"
                                value={ejercicio3Answers['libros'] || ''}
                                onChange={(v) => setEjercicio3Answers({...ejercicio3Answers, 'libros': v})}
                                result={ejercicio3Results['libros'] ?? null}
                                width="w-48"
                            />
                        </div>
                    </div>

                    <div className="bg-green-50 p-5 rounded-lg">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="font-bold text-green-600 min-w-[200px]">Cantar-<strong>é</strong> (Tiempo futuro):</span>
                            <PracticeInputField 
                                id="cantare"
                                value={ejercicio3Answers['cantare'] || ''}
                                onChange={(v) => setEjercicio3Answers({...ejercicio3Answers, 'cantare': v})}
                                result={ejercicio3Results['cantare'] ?? null}
                                width="w-48"
                            />
                        </div>
                    </div>

                    <div className="bg-green-50 p-5 rounded-lg">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="font-bold text-green-600 min-w-[200px]">Cant-<strong>ante</strong> (Profesión):</span>
                            <PracticeInputField 
                                id="cantante"
                                value={ejercicio3Answers['cantante'] || ''}
                                onChange={(v) => setEjercicio3Answers({...ejercicio3Answers, 'cantante': v})}
                                result={ejercicio3Results['cantante'] ?? null}
                                width="w-48"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={checkEjercicio3}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar respuestas
                    </button>
                    <button
                        onClick={resetEjercicio3}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                    >
                        <RefreshCw size={18} className="mr-2" />
                        Reiniciar
                    </button>
                </div>
            </section>

            {/* EJERCICIO 4 */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-orange-600 mb-6 font-serif flex items-center">
                    <MessageSquare size={24} className="mr-2 text-orange-600" />
                    Ejercicio 4: Gramática Cognitiva (¿Por qué lo dices?)
                </h2>
                
                <p className="text-gray-700 mb-6">
                    <strong>Objetivo:</strong> Comprender que la gramática depende de la intención del hablante.
                </p>
                
                <p className="text-gray-700 mb-6">
                    <strong>Instrucciones:</strong> Lee las dos situaciones y elige la opción que mejor exprese la intención.
                </p>

                <div className="space-y-6">
                    {/* Situación A */}
                    <div className="bg-orange-50 p-6 rounded-lg">
                        <h3 className="font-bold text-orange-700 mb-4">Situación A:</h3>
                        <p className="text-gray-800 mb-4">
                            Quieres decir que tu amigo es una persona aburrida por naturaleza, que siempre ha sido así.
                        </p>
                        <div className="ml-4 space-y-2 mb-4">
                            <p className="text-sm text-gray-700">• Opción 1: "Mi amigo <strong>es</strong> aburrido".</p>
                            <p className="text-sm text-gray-700">• Opción 2: "Mi amigo <strong>está</strong> aburrido".</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold text-gray-800">Respuesta:</p>
                            <div className="flex gap-3">
                                {['Opción 1', 'Opción 2'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setEjercicio4Answers({...ejercicio4Answers, 'situacionA': option})}
                                        className={`px-6 py-2 rounded border-2 transition-colors ${
                                            ejercicio4Results['situacionA'] === null
                                                ? ejercicio4Answers['situacionA'] === option
                                                    ? 'border-hku-blue bg-hku-blue text-white'
                                                    : 'border-gray-300 hover:border-hku-blue'
                                                : ejercicio4Answers['situacionA'] === option
                                                ? ejercicio4Results['situacionA']
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-red-500 bg-red-50'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Situación B */}
                    <div className="bg-orange-50 p-6 rounded-lg">
                        <h3 className="font-bold text-orange-700 mb-4">Situación B:</h3>
                        <p className="text-gray-800 mb-4">
                            Quieres decir que una película es violenta solo en algunas escenas, o que te lo parece a ti en este momento.
                        </p>
                        <div className="ml-4 space-y-2 mb-4">
                            <p className="text-sm text-gray-700">• Opción 1: "La película <strong>es</strong> violenta".</p>
                            <p className="text-sm text-gray-700">• Opción 2: "La película <strong>está</strong> violenta".</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold text-gray-800">Respuesta:</p>
                            <div className="flex gap-3">
                                {['Opción 1', 'Opción 2'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setEjercicio4Answers({...ejercicio4Answers, 'situacionB': option})}
                                        className={`px-6 py-2 rounded border-2 transition-colors ${
                                            ejercicio4Results['situacionB'] === null
                                                ? ejercicio4Answers['situacionB'] === option
                                                    ? 'border-hku-blue bg-hku-blue text-white'
                                                    : 'border-gray-300 hover:border-hku-blue'
                                                : ejercicio4Answers['situacionB'] === option
                                                ? ejercicio4Results['situacionB']
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-red-500 bg-red-50'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={checkEjercicio4}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar respuestas
                    </button>
                    <button
                        onClick={resetEjercicio4}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                    >
                        <RefreshCw size={18} className="mr-2" />
                        Reiniciar
                    </button>
                </div>
            </section>

            {/* Nota final */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
                <p className="text-gray-700 flex items-start">
                    <Lightbulb size={20} className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>
                        <strong>Consejo:</strong> Si cometes errores, revisa las secciones teóricas de morfología antes de volver a intentarlo. 
                        Presta atención a las definiciones de prefijos, sufijos y categorías gramaticales.
                    </span>
                </p>
            </section>
        </div>
    );
};

// --- NOUNS PRACTICE (Topic 1-3) ---
const NounsPractice: React.FC = () => {
    // Estados para las respuestas
    const [ejercicio1Answers, setEjercicio1Answers] = useState<{ [key: string]: string }>({});
    const [ejercicio2Answers, setEjercicio2Answers] = useState<{ [key: string]: string }>({});
    const [ejercicio3Answers, setEjercicio3Answers] = useState<{ [key: string]: string }>({});
    const [ejercicio4Answers, setEjercicio4Answers] = useState<{ [key: string]: string }>({});
    const [ejercicio5Answers, setEjercicio5Answers] = useState<{ [key: string]: string }>({});
    
    // Estados para resultados
    const [ejercicio1Results, setEjercicio1Results] = useState<{ [key: string]: boolean | null }>({});
    const [ejercicio2Results, setEjercicio2Results] = useState<{ [key: string]: boolean | null }>({});
    const [ejercicio3Results, setEjercicio3Results] = useState<{ [key: string]: boolean | null }>({});
    const [ejercicio4Results, setEjercicio4Results] = useState<{ [key: string]: boolean | null }>({});
    const [ejercicio5Results, setEjercicio5Results] = useState<{ [key: string]: boolean | null }>({});

    // Soluciones
    const ejercicio1Solutions = {
        'intruso1': 'montaña',
        'razon1': 'es un sustantivo común, los demás son propios',
        'intruso2': 'reloj',
        'razon2': 'es un sustantivo concreto, los demás son abstractos',
        'intruso3': 'soldado',
        'razon3': 'es un sustantivo individual, los demás son colectivos',
        'intruso4': 'lápiz',
        'razon4': 'es un sustantivo contable, los demás son incontables'
    };

    const ejercicio2Solutions = {
        'diploma': 'el',
        'realidad': 'la',
        'equipaje': 'el',
        'color': 'el',
        'piramide': 'la',
        'pasion': 'la'
    };

    const ejercicio3Solutions = {
        'juez': 'la jueza',
        'heroe': 'la heroína',
        'yerno': 'la nuera',
        'jabali': 'el jabalí hembra',
        'poeta': 'la poetisa'
    };

    const ejercicio4Solutions = {
        'luz': 'luces',
        'ley': 'leyes',
        'sofa': 'sofás',
        'capitan': 'capitanes',
        'bambu': 'bambúes'
    };

    const ejercicio5Solutions = {
        'frase1': 'alumnado',
        'frase2': 'tijeras',
        'frase3': 'unos pantalones',
        'frase4': 'gente'
    };

    // Funciones de validación
    const checkEjercicio1 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio1Solutions).forEach(key => {
            const answer = ejercicio1Answers[key]?.toLowerCase().trim();
            const solution = ejercicio1Solutions[key as keyof typeof ejercicio1Solutions].toLowerCase();
            results[key] = answer === solution;
        });
        setEjercicio1Results(results);
    };

    const checkEjercicio2 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio2Solutions).forEach(key => {
            const answer = ejercicio2Answers[key]?.toLowerCase().trim();
            const solution = ejercicio2Solutions[key as keyof typeof ejercicio2Solutions];
            results[key] = answer === solution;
        });
        setEjercicio2Results(results);
    };

    const checkEjercicio3 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio3Solutions).forEach(key => {
            const answer = ejercicio3Answers[key]?.toLowerCase().trim();
            const solution = ejercicio3Solutions[key as keyof typeof ejercicio3Solutions];
            results[key] = answer === solution;
        });
        setEjercicio3Results(results);
    };

    const checkEjercicio4 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio4Solutions).forEach(key => {
            const answer = ejercicio4Answers[key]?.toLowerCase().trim();
            const solution = ejercicio4Solutions[key as keyof typeof ejercicio4Solutions];
            // Aceptar bambúes o bambús
            if (key === 'bambu') {
                results[key] = answer === 'bambúes' || answer === 'bambús';
            } else {
                results[key] = answer === solution;
            }
        });
        setEjercicio4Results(results);
    };

    const checkEjercicio5 = () => {
        const results: { [key: string]: boolean | null } = {};
        Object.keys(ejercicio5Solutions).forEach(key => {
            const answer = ejercicio5Answers[key]?.toLowerCase().trim();
            const solution = ejercicio5Solutions[key as keyof typeof ejercicio5Solutions].toLowerCase();
            results[key] = answer === solution;
        });
        setEjercicio5Results(results);
    };

    // Función para reiniciar
    const resetAll = () => {
        setEjercicio1Answers({});
        setEjercicio2Answers({});
        setEjercicio3Answers({});
        setEjercicio4Answers({});
        setEjercicio5Answers({});
        setEjercicio1Results({});
        setEjercicio2Results({});
        setEjercicio3Results({});
        setEjercicio4Results({});
        setEjercicio5Results({});
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="bg-gradient-to-r from-hku-blue to-blue-600 text-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-3 flex items-center">
                    <Pencil className="mr-3" size={32} />
                    Práctica: Sustantivos
                </h2>
                <p className="text-blue-100 text-lg">
                    Pon a prueba tus conocimientos sobre clasificación de sustantivos y el género.
                </p>
            </div>

            {/* Bloque 1: Clasificación de Sustantivos */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-hku-ash mb-2 flex items-center">
                        <Tag className="mr-2 text-hku-green" size={28} />
                        Bloque 1: Clasificación de Sustantivos
                    </h3>
                    <p className="text-gray-600 italic">
                        <strong>Objetivo:</strong> Identificar el tipo de sustantivo según su naturaleza.
                    </p>
                </div>

                {/* Ejercicio 1: El intruso */}
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-400 mb-6">
                    <h4 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
                        <Search className="mr-2" size={22} />
                        Ejercicio 1: El intruso
                    </h4>
                    <p className="text-gray-700 mb-6">
                        En cada fila, hay un sustantivo que no pertenece a la misma categoría. Identifica cuál es y por qué.
                    </p>

                    <div className="space-y-6">
                        {/* Caso 1 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-3">
                                1. <span className="text-orange-600">Categoría:</span> <em>Sustantivos Propios</em>
                            </p>
                            <p className="text-gray-700 mb-4">
                                → Madrid, Mediterráneo, <strong>Montaña</strong>, Marta
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        El intruso es:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['intruso1'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'intruso1': e.target.value})}
                                        placeholder="Escribe el sustantivo"
                                        isCorrect={(ejercicio1Results['intruso1'] ?? null) === null ? null : ejercicio1Results['intruso1']}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Razón:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['razon1'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'razon1': e.target.value})}
                                        placeholder="Explica por qué"
                                        isCorrect={(ejercicio1Results['razon1'] ?? null) === null ? null : ejercicio1Results['razon1']}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Caso 2 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-3">
                                2. <span className="text-orange-600">Categoría:</span> <em>Sustantivos Abstractos</em>
                            </p>
                            <p className="text-gray-700 mb-4">
                                → Inteligencia, Justicia, <strong>Reloj</strong>, Valentía
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        El intruso es:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['intruso2'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'intruso2': e.target.value})}
                                        placeholder="Escribe el sustantivo"
                                        isCorrect={(ejercicio1Results['intruso2'] ?? null) === null ? null : ejercicio1Results['intruso2']}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Razón:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['razon2'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'razon2': e.target.value})}
                                        placeholder="Explica por qué"
                                        isCorrect={(ejercicio1Results['razon2'] ?? null) === null ? null : ejercicio1Results['razon2']}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Caso 3 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-3">
                                3. <span className="text-orange-600">Categoría:</span> <em>Sustantivos Colectivos</em>
                            </p>
                            <p className="text-gray-700 mb-4">
                                → Jauría, <strong>Soldado</strong>, Flota, Enjambre
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        El intruso es:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['intruso3'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'intruso3': e.target.value})}
                                        placeholder="Escribe el sustantivo"
                                        isCorrect={(ejercicio1Results['intruso3'] ?? null) === null ? null : ejercicio1Results['intruso3']}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Razón:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['razon3'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'razon3': e.target.value})}
                                        placeholder="Explica por qué"
                                        isCorrect={(ejercicio1Results['razon3'] ?? null) === null ? null : ejercicio1Results['razon3']}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Caso 4 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-3">
                                4. <span className="text-orange-600">Categoría:</span> <em>Sustantivos Incontables</em>
                            </p>
                            <p className="text-gray-700 mb-4">
                                → Sal, Arena, <strong>Lápiz</strong>, Gasolina
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        El intruso es:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['intruso4'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'intruso4': e.target.value})}
                                        placeholder="Escribe el sustantivo"
                                        isCorrect={(ejercicio1Results['intruso4'] ?? null) === null ? null : ejercicio1Results['intruso4']}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Razón:
                                    </label>
                                    <PracticeInputField
                                        value={ejercicio1Answers['razon4'] || ''}
                                        onChange={(e) => setEjercicio1Answers({...ejercicio1Answers, 'razon4': e.target.value})}
                                        placeholder="Explica por qué"
                                        isCorrect={(ejercicio1Results['razon4'] ?? null) === null ? null : ejercicio1Results['razon4']}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={checkEjercicio1}
                        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center shadow-md"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar Ejercicio 1
                    </button>
                </div>
            </section>

            {/* Bloque 2: El Género y sus Desafíos */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-hku-ash mb-2 flex items-center">
                        <Users className="mr-2 text-hku-blue" size={28} />
                        Bloque 2: El Género y sus Desafíos
                    </h3>
                    <p className="text-gray-600 italic">
                        <strong>Objetivo:</strong> Aplicar las reglas de terminación y excepciones para determinar el género.
                    </p>
                </div>

                {/* Ejercicio 2: El detective de artículos */}
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400 mb-6">
                    <h4 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                        <Search className="mr-2" size={22} />
                        Ejercicio 2: El detective de artículos
                    </h4>
                    <p className="text-gray-700 mb-6">
                        Escribe el artículo correcto (<strong>el / la</strong>) para estos sustantivos que suelen causar confusión por sus terminaciones especiales.
                    </p>

                    <div className="space-y-4">
                        {[
                            { key: 'diploma', word: 'Diploma', hint: 'termina en -ma' },
                            { key: 'realidad', word: 'Realidad', hint: 'termina en -ad' },
                            { key: 'equipaje', word: 'Equipaje', hint: 'termina en -aje' },
                            { key: 'color', word: 'Color', hint: 'termina en -or' },
                            { key: 'piramide', word: 'Pirámide', hint: 'termina en -e' },
                            { key: 'pasion', word: 'Pasión', hint: 'termina en -sión' }
                        ].map((item) => (
                            <div key={item.key} className="bg-white p-4 rounded-lg flex items-center gap-4">
                                <PracticeInputField
                                    value={ejercicio2Answers[item.key] || ''}
                                    onChange={(e) => setEjercicio2Answers({...ejercicio2Answers, [item.key]: e.target.value})}
                                    placeholder="el/la"
                                    isCorrect={(ejercicio2Results[item.key] ?? null) === null ? null : ejercicio2Results[item.key]}
                                    className="w-24"
                                />
                                <span className="text-gray-800 font-medium">{item.word}</span>
                                <span className="text-gray-500 text-sm italic">({item.hint})</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={checkEjercicio2}
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center shadow-md"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar Ejercicio 2
                    </button>
                </div>

                {/* Ejercicio 3: Cambio de sexo en seres vivos */}
                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-400 mb-6">
                    <h4 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                        <RefreshCw className="mr-2" size={22} />
                        Ejercicio 3: Cambio de sexo en seres vivos
                    </h4>
                    <p className="text-gray-700 mb-6">
                        Transforma estas personas o animales al femenino siguiendo las reglas de cambio de terminación.
                    </p>

                    <div className="space-y-4">
                        {[
                            { key: 'juez', prompt: 'El Juez →', hint: 'consonante + -a' },
                            { key: 'heroe', prompt: 'El Héroe →', hint: 'terminación especial' },
                            { key: 'yerno', prompt: 'El Yerno →', hint: 'palabra diferente' },
                            { key: 'jabali', prompt: 'El Jabalí macho →', hint: 'animal de una sola forma' },
                            { key: 'poeta', prompt: 'El Poeta →', hint: 'terminación especial' }
                        ].map((item, index) => (
                            <div key={item.key} className="bg-white p-4 rounded-lg">
                                <div className="flex items-start gap-4 mb-2">
                                    <span className="font-semibold text-gray-700 min-w-[200px]">{index + 1}. {item.prompt}</span>
                                    <PracticeInputField
                                        value={ejercicio3Answers[item.key] || ''}
                                        onChange={(e) => setEjercicio3Answers({...ejercicio3Answers, [item.key]: e.target.value})}
                                        placeholder="Escribe la forma femenina"
                                        isCorrect={(ejercicio3Results[item.key] ?? null) === null ? null : ejercicio3Results[item.key]}
                                        className="flex-1"
                                    />
                                </div>
                                <p className="text-gray-500 text-sm italic ml-4">({item.hint})</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={checkEjercicio3}
                        className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center shadow-md"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar Ejercicio 3
                    </button>
                </div>
            </section>

            {/* Bloque 3: La Formación del Plural */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-hku-ash mb-2 flex items-center">
                        <Copy className="mr-2 text-hku-green" size={28} />
                        Bloque 3: La Formación del Plural
                    </h3>
                    <p className="text-gray-600 italic">
                        <strong>Objetivo:</strong> Aplicar las reglas gramaticales para pasar del singular al plural.
                    </p>
                </div>

                {/* Ejercicio 4: ¡A multiplicar palabras! */}
                <div className="bg-teal-50 p-6 rounded-xl border-l-4 border-teal-400 mb-6">
                    <h4 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
                        <Hash className="mr-2" size={22} />
                        Ejercicio 4: ¡A multiplicar palabras!
                    </h4>
                    <p className="text-gray-700 mb-6">
                        Escribe el plural de los siguientes términos prestando atención a las reglas de ortografía (<em>-z</em> por <em>-ces</em> o palabras con <em>-y</em>).
                    </p>

                    <div className="space-y-4">
                        {[
                            { key: 'luz', word: 'Luz', hint: '-z por -ces' },
                            { key: 'ley', word: 'Ley', hint: 'palabras con -y' },
                            { key: 'sofa', word: 'Sofá', hint: 'vocal acentuada + -s' },
                            { key: 'capitan', word: 'Capitán', hint: 'pierde el acento' },
                            { key: 'bambu', word: 'Bambú', hint: 'dos formas válidas' }
                        ].map((item) => (
                            <div key={item.key} className="bg-white p-4 rounded-lg">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-gray-800 font-medium min-w-[100px]">{item.word} →</span>
                                    <PracticeInputField
                                        value={ejercicio4Answers[item.key] || ''}
                                        onChange={(e) => setEjercicio4Answers({...ejercicio4Answers, [item.key]: e.target.value})}
                                        placeholder="Escribe el plural"
                                        isCorrect={(ejercicio4Results[item.key] ?? null) === null ? null : ejercicio4Results[item.key]}
                                        className="flex-1"
                                    />
                                </div>
                                <p className="text-gray-500 text-sm italic ml-4">({item.hint})</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={checkEjercicio4}
                        className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center shadow-md"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar Ejercicio 4
                    </button>
                </div>
            </section>

            {/* Bloque 4: Casos Especiales y Errores Comunes */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-hku-ash mb-2 flex items-center">
                        <AlertTriangle className="mr-2 text-red-500" size={28} />
                        Bloque 4: Casos Especiales y Errores Comunes
                    </h3>
                    <p className="text-gray-600 italic">
                        <strong>Objetivo:</strong> Reconocer sustantivos colectivos y palabras que siempre van en plural.
                    </p>
                </div>

                {/* Ejercicio 5: ¿Singular o Plural? */}
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400 mb-6">
                    <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                        <HelpCircle className="mr-2" size={22} />
                        Ejercicio 5: ¿Singular o Plural?
                    </h4>
                    <p className="text-gray-700 mb-6">
                        Elige la opción correcta para que la frase tenga sentido gramatical.
                    </p>

                    <div className="space-y-6">
                        {/* Frase 1 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="text-gray-800 mb-4">
                                1. El <strong>_________</strong> de esta escuela estudia mucho.
                            </p>
                            <p className="text-gray-600 text-sm mb-3 italic">(se refiere a un conjunto en singular)</p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase1': 'alumnado'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase1'] === 'alumnado'
                                            ? ejercicio5Results['frase1'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase1'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    alumnado
                                </button>
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase1': 'alumnos'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase1'] === 'alumnos'
                                            ? ejercicio5Results['frase1'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase1'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    alumnos
                                </button>
                            </div>
                        </div>

                        {/* Frase 2 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="text-gray-800 mb-4">
                                2. ¿Dónde están mis <strong>_________</strong>? No puedo cortar el papel.
                            </p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase2': 'paraguas'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase2'] === 'paraguas'
                                            ? ejercicio5Results['frase2'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase2'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    paraguas
                                </button>
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase2': 'tijeras'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase2'] === 'tijeras'
                                            ? ejercicio5Results['frase2'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase2'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    tijeras
                                </button>
                            </div>
                        </div>

                        {/* Frase 3 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="text-gray-800 mb-4">
                                3. Me he comprado <strong>_________</strong> nuevos para la fiesta.
                            </p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase3': 'un pantalón'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase3'] === 'un pantalón'
                                            ? ejercicio5Results['frase3'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase3'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    un pantalón
                                </button>
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase3': 'unos pantalones'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase3'] === 'unos pantalones'
                                            ? ejercicio5Results['frase3'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase3'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    unos pantalones
                                </button>
                            </div>
                        </div>

                        {/* Frase 4 */}
                        <div className="bg-white p-5 rounded-lg">
                            <p className="text-gray-800 mb-4">
                                4. La <strong>_________</strong> es muy amable en este pueblo.
                            </p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase4': 'gente'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase4'] === 'gente'
                                            ? ejercicio5Results['frase4'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase4'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    gente
                                </button>
                                <button
                                    onClick={() => setEjercicio5Answers({...ejercicio5Answers, 'frase4': 'gentes'})}
                                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                        ejercicio5Answers['frase4'] === 'gentes'
                                            ? ejercicio5Results['frase4'] === true
                                                ? 'bg-green-100 border-green-500'
                                                : ejercicio5Results['frase4'] === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'bg-blue-100 border-blue-500'
                                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    gentes
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={checkEjercicio5}
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center shadow-md"
                    >
                        <CheckCircle size={18} className="mr-2" />
                        Comprobar Ejercicio 5
                    </button>
                </div>
            </section>

            {/* Botón de reinicio */}
            <section className="flex justify-center">
                <button
                    onClick={resetAll}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center shadow-md"
                >
                    <RefreshCw size={18} className="mr-2" />
                    Reiniciar
                </button>
            </section>

            {/* Nota final */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
                <p className="text-gray-700 flex items-start">
                    <Lightbulb size={20} className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>
                        <strong>Consejo:</strong> Si cometes errores, revisa las secciones teóricas de sustantivos antes de volver a intentarlo. 
                        Presta especial atención a las reglas de género y a las clasificaciones de los sustantivos.
                    </span>
                </p>
            </section>
        </div>
    );
};