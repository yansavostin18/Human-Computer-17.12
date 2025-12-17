
import React, { useState, useEffect, useCallback } from 'react';
import { Quote, CATEGORIES, Category } from './types';
import { fetchHistoricalQuote } from './services/geminiService';
import QuoteCard from './components/QuoteCard';
import HistorySidebar from './components/HistorySidebar';

const App: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [history, setHistory] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [error, setError] = useState<string | null>(null);

  const getNewQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryParam = selectedCategory === 'all' ? undefined : selectedCategory;
      const quote = await fetchHistoricalQuote(categoryParam);
      
      if (currentQuote) {
        setHistory(prev => [currentQuote, ...prev].slice(0, 9));
      }
      
      setCurrentQuote(quote);
    } catch (err) {
      console.error("Error fetching quote:", err);
      setError("Nie udało się pobrać cytatu. Spróbuj ponownie za chwilę.");
    } finally {
      setLoading(false);
    }
  }, [currentQuote, selectedCategory]);

  useEffect(() => {
    getNewQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center py-12 px-4">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl serif font-black text-stone-900 mb-2 tracking-tight">
          Mądrość Wieków
        </h1>
        <p className="text-stone-500 text-sm md:text-base tracking-wide max-w-md mx-auto">
          Zaczerpnij inspiracji od najwybitniejszych umysłów w historii ludzkości.
        </p>
      </header>

      {/* Categories / Filters */}
      <nav className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
              : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
          }`}
        >
          Wszystkie
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white border-stone-900 shadow-lg'
                : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="w-full relative">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm text-center">
            {error}
          </div>
        )}

        <QuoteCard quote={currentQuote} loading={loading} />

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={getNewQuote}
            disabled={loading}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-stone-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 hover:bg-stone-800 disabled:opacity-50"
          >
            <span className="mr-3">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              )}
            </span>
            {loading ? 'Przywoływanie mądrości...' : 'Następna inspiracja'}
          </button>
        </div>
      </main>

      {/* History Sidebar/Section */}
      <HistorySidebar history={history} onSelect={(q) => {
        setHistory(prev => [currentQuote!, ...prev.filter(x => x.id !== q.id)].slice(0, 9));
        setCurrentQuote(q);
      }} />

      {/* Footer */}
      <footer className="mt-auto pt-12 text-stone-400 text-[10px] uppercase tracking-widest text-center">
        &copy; {new Date().getFullYear()} Mądrość Wieków • Motywacja Historyczna
      </footer>
    </div>
  );
};

export default App;
