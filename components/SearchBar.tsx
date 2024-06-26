import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaTags } from 'react-icons/fa'; 

interface SearchResult {
  _id: string;
  title: string;
  subcategory: string;
  objectives: string[];
}

const getObjectiveColor = (objective: string): string => {
  const colors = [
    'bg-red-200 text-red-800',
    'bg-blue-200 text-blue-800',
    'bg-green-200 text-green-800',
    'bg-yellow-200 text-yellow-800',
    'bg-purple-200 text-purple-800',
  ];
  return colors[objective.length % colors.length];
};

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length >= 3) {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setShowSuggestions(true);
      } else {
        setResults([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={searchRef} className="relative w-64 ml-24">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar tratamientos..."
          className="p-2 border rounded-l w-full text-sm focus:outline-none focus:ring-2 focus:ring-thunderbird-300"
        />
        <button type="submit" className="bg-thunderbird-500 text-white p-3 rounded-r hover:bg-thunderbird-600 focus:outline-none focus:ring-2 focus:ring-thunderbird-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
      {showSuggestions && results.length > 0 && (
        <div className="absolute z-50 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
          {results.map((result) => (
            <Link 
              key={result._id} 
              href={`/${result.subcategory}/${result.objectives[0]}/${result.title}`}
              className="block p-2 hover:bg-gray-100 text-sm text-woodsmoke-700"
            >
              <div className="flex justify-between items-center">
                <span>{result.title}</span>
                <div className="flex items-center">
                  {result.objectives.map((objective, index) => (
                    <span 
                      key={index} 
                      className={`ml-1 px-2 py-1 rounded-full text-xs flex items-center ${getObjectiveColor(objective)}`}
                    >
                      <FaTags className="mr-1" />
                      {objective}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;