// modules/SearchForm.tsx
import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './SearchForm.css';

interface SearchFormProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchApply: () => void;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onSearchApply,
  placeholder = "Поиск..." 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchApply();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchApply();
    }
  };

  return (
    <Form className="search-form" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <Button 
          variant="outline-secondary" 
          type="submit"
          className="search-button"
        >
          🔍
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;