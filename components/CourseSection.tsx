import React from 'react';
import { Topic } from '../types';
import { Book, Edit3, MessageCircle, Settings, Link as LinkIcon, ChevronRight } from 'lucide-react';

interface CourseSectionProps {
  id: string;
  title: string;
  subtitle: string;
  topics: Topic[];
  isAlternate?: boolean;
  onTopicClick?: (topic: Topic) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'book': return <Book className="w-6 h-6" />;
    case 'edit': return <Edit3 className="w-6 h-6" />;
    case 'message': return <MessageCircle className="w-6 h-6" />;
    case 'settings': return <Settings className="w-6 h-6" />;
    default: return <LinkIcon className="w-6 h-6" />;
  }
};

export const CourseSection: React.FC<CourseSectionProps> = ({ id, title, subtitle, topics, isAlternate = false, onTopicClick }) => {
  return (
    <section id={id} className={`py-20 ${isAlternate ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-hku-green font-bold text-sm tracking-wide uppercase mb-2">{subtitle}</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-hku-ash mb-4">{title}</h3>
          <div className="w-20 h-1 bg-hku-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div 
              key={topic.id} 
              onClick={() => onTopicClick && onTopicClick(topic)}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1 cursor-pointer"
            >
              <div className="p-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  isAlternate ? 'bg-blue-50 text-hku-blue group-hover:bg-hku-blue group-hover:text-white' : 'bg-green-50 text-hku-green group-hover:bg-hku-green group-hover:text-white'
                }`}>
                  {getIcon(topic.icon)}
                </div>
                
                <h4 className="text-xl font-bold text-hku-ash mb-3 group-hover:text-hku-blue transition-colors">
                  {index + 1}. {topic.title}
                </h4>
                <p className="text-gray-500 leading-relaxed mb-6">
                  {topic.description}
                </p>
                
                <div className="flex items-center text-sm font-semibold text-hku-blue opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Acceder al tema <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
              <div className={`h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${isAlternate ? 'bg-hku-blue' : 'bg-hku-green'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};