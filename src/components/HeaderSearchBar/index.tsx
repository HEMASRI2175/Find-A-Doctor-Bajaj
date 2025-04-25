
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Doctor } from '@/types/doctor';
import { cn } from '@/lib/utils';

interface HeaderSearchBarProps {
  doctors: Doctor[];
  value: string;
  onChange: (search: string) => void;
}

const HeaderSearchBar = ({ doctors, value, onChange }: HeaderSearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) && 
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter suggestions based on input
  const filterSuggestions = (input: string) => {
    if (!input.trim()) {
      return [];
    }

    const filteredDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 3); // Limit to 3 suggestions

    return filteredDoctors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSuggestions(filterSuggestions(value));
  };

  const handleSuggestionClick = (doctorName: string) => {
    setInputValue(doctorName);
    onChange(doctorName);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      onChange(inputValue);
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  const handleSubmit = () => {
    if (inputValue) {
      onChange(inputValue);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          data-testid="autocomplete-input"
          ref={inputRef}
          type="text"
          placeholder="Search doctors by name..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-medical-500 focus:ring-1 focus:ring-medical-500"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setSuggestions(filterSuggestions(inputValue));
          }}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleSubmit}
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 hover:text-gray-700"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className={cn(
            "absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200",
            "animate-fadeIn"
          )}
        >
          <ul className="py-1">
            {suggestions.map((doctor) => (
              <li 
                key={doctor.id} 
                data-testid="suggestion-item"
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(doctor.name)}
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
