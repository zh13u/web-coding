'use client';

import { useState, useEffect, useRef } from 'react';
import { debounce } from '@/utils';

interface SearchSuggestionsProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchSuggestions({ 
  onSearch, 
  placeholder = 'Tìm kiếm điện thoại...'
}: SearchSuggestionsProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Mock suggestions data
  const allSuggestions = [
    'iPhone 15 Pro',
    'iPhone 15',
    'Samsung Galaxy S24',
    'Samsung Galaxy A55',
    'Xiaomi 14',
    'Xiaomi Redmi Note 13',
    'OPPO Find X7',
    'Vivo X100',
    'Điện thoại chơi game',
    'Điện thoại chụp ảnh',
    'Điện thoại giá rẻ',
    'Điện thoại cao cấp',
  ];

  // Debounced search function
  const debouncedSearch = debounce((searchQuery: string) => {
    if (searchQuery.trim()) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) handleSuggestionClick(suggestions[selectedIndex]);
        else {
          onSearch(query);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleFocus = () => setShowSuggestions(true);

  const handleBlur = () => {
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className="search-suggestions" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="search-input"
            autoComplete="off"
          />
          <button type="submit" className="search-btn" aria-label="Tìm kiếm">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <i className="fas fa-search"></i>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && query.trim() && suggestions.length === 0 && (
        <div className="suggestions-dropdown">
          <div className="no-suggestions">
            <i className="fas fa-search"></i>
            <span>Không tìm thấy kết quả cho "{query}"</span>
          </div>
        </div>
      )}
    </div>
  );
}

