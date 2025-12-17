
import React from 'react';
import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote | null;
  loading: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-12 bg-white rounded-2xl shadow-xl border border-stone-100 flex flex-col items-center justify-center min-h-[400px] animate-pulse">
        <div className="h-4 w-3/4 bg-stone-200 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-stone-200 rounded mb-8"></div>
        <div className="h-4 w-1/4 bg-stone-100 rounded"></div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-2xl shadow-2xl border border-stone-100 transition-all duration-500 hover:shadow-stone-200/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-2 h-full bg-stone-800"></div>
      <div className="absolute top-6 right-8 text-6xl text-stone-100 serif select-none">“</div>
      
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 mb-6 text-[10px] uppercase tracking-widest font-bold text-stone-400 border border-stone-200 rounded-full">
          {quote.era} • {quote.category}
        </span>
        
        <h2 className="text-2xl md:text-4xl serif italic leading-relaxed text-stone-800 mb-8">
          „{quote.quote}”
        </h2>
        
        <div className="flex flex-col items-end border-t border-stone-100 pt-6">
          <cite className="not-italic text-xl font-medium text-stone-900 serif">— {quote.author}</cite>
        </div>
        
        <div className="mt-8 p-4 bg-stone-50 rounded-lg border-l-4 border-stone-300">
          <p className="text-sm text-stone-600 leading-relaxed italic">
            <span className="font-bold text-stone-800 not-italic mr-1">Kontekst:</span>
            {quote.context}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
