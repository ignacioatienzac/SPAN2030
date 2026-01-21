export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: 'book' | 'edit' | 'message' | 'settings' | 'link';
}

export interface CourseSection {
  id: string;
  title: string;
  subtitle: string;
  topics: Topic[];
}

export const COURSE_TOPICS_PART_1: Topic[] = [
  { id: '1-1', title: 'Morfología', description: 'Estructura interna de las palabras y procesos de formación.', icon: 'settings' },
  { id: '1-2', title: 'Determinantes', description: 'Artículos, posesivos, demostrativos y cuantificadores.', icon: 'link' },
  { id: '1-3', title: 'Sustantivos', description: 'El género, el número y la clasificación semántica.', icon: 'book' },
  { id: '1-4', title: 'Adjetivos', description: 'Posición, concordancia y grados del adjetivo.', icon: 'edit' },
  { id: '1-5', title: 'Los tiempos verbales', description: 'Usos del indicativo, subjuntivo y contrastes aspectuales.', icon: 'message' },
];

export const COURSE_TOPICS_PART_2: Topic[] = [
  { id: '2-1', title: 'Ser, estar y haber', description: 'Usos copulativos y existenciales. Contrastes fundamentales.', icon: 'link' },
  { id: '2-2', title: 'Usos del lo', description: 'Lo neutro, lo como pronombre y frases idiomáticas.', icon: 'message' },
  { id: '2-3', title: 'Usos del se', description: 'Valores reflexivos, recíprocos, pasiva refleja e impersonal.', icon: 'settings' },
  { id: '2-4', title: 'La estructura de la oración', description: 'Orden de palabras, sujeto, predicado y complementos.', icon: 'edit' },
];