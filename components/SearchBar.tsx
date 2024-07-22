// components/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  _id: string;
  title: string;
  subcategory: string;
  objectives: string[];
}

const SearchBar = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (query: string) => {
    if (query.length > 2) {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    handleSearch(query);
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(`/${result.subcategory}/${result.objectives[0]}/${result.title}`);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search..."
      />
      {showSuggestions && (
        <ul>
          {results.map((result) => (
            <li key={result._id} onClick={() => handleResultClick(result)}>
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
