
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchIndex, SearchItem } from '../utils/searchData';
import { useCursor } from '../contexts/CursorContext';
import Magnetic from './Magnetic';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, hash?: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setCursorVariant } = useCursor();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Search Logic
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  // Handle Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleResultClick = (item: SearchItem) => {
    onNavigate(item.page, item.hash);
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-xl"
            variants={backdropVariants}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-3xl bg-[#0F172A] border border-glass-border rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden flex flex-col max-h-[70vh]"
            variants={modalVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Search Header */}
            <div className="flex items-center p-4 border-b border-glass-border bg-white/5">
              <i className="fas fa-search text-gray-400 text-lg ml-2"></i>
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none focus:ring-0 text-white text-lg placeholder-gray-500 px-4 py-2 font-outfit outline-none"
                placeholder="Search services, pages, or topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={onClose}
                className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/10 rounded-md border border-white/5 hover:text-white transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto custom-scrollbar p-2">
              {query === '' && (
                 <div className="p-8 text-center text-gray-500">
                    <p className="text-sm uppercase tracking-widest mb-2">Quick Links</p>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {['Business Advisory', 'Marketing', 'AkoDesk', 'Contact'].map(term => (
                            <button 
                                key={term}
                                onClick={() => setQuery(term)}
                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm hover:bg-white/10 hover:text-secondary transition-colors"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                 </div>
              )}

              {query !== '' && results.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  <i className="fas fa-ghost text-4xl mb-4 text-white/20"></i>
                  <p>No results found for "<span className="text-white">{query}</span>"</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="space-y-1">
                    {/* Group by category logic could go here, but simple list for now */}
                    <div className="px-2 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Results</div>
                    {results.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleResultClick(item)}
                            onMouseEnter={() => setCursorVariant('link')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                                <i className={`fas ${item.icon}`}></i>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-medium group-hover:text-secondary transition-colors">{item.title}</h4>
                                <p className="text-sm text-gray-500 truncate group-hover:text-gray-400">{item.description}</p>
                            </div>
                            <div className="text-gray-600 group-hover:text-white transition-colors">
                                <i className="fas fa-chevron-right text-xs"></i>
                            </div>
                        </div>
                    ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-3 bg-dark-bg border-t border-glass-border flex justify-between items-center text-xs text-gray-500">
                <span><span className="text-secondary">{results.length}</span> results found</span>
                <span className="flex items-center gap-2">
                    Navigate <i className="fas fa-arrows-alt-v"></i>
                    Select <i className="fas fa-level-down-alt rotate-90"></i>
                </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
