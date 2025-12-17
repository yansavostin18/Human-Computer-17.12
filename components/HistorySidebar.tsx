
import React from 'react';
import { Quote } from '../types';

interface HistorySidebarProps {
  history: Quote[];
  onSelect: (quote: Quote) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto px-4 pb-12">
      <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-400 mb-6 text-center">Poprzednie inspiracje</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="text-left p-4 bg-white/60 hover:bg-white border border-stone-200 rounded-xl transition-all group"
          >
            <p className="text-xs text-stone-400 mb-1">{item.author}</p>
            <p className="text-sm text-stone-700 line-clamp-2 group-hover:text-stone-900 italic transition-colors">
              „{item.quote}”
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistorySidebar;
