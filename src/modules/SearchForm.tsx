// modules/SearchForm.tsx
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './SearchForm.css';

interface SearchFormProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Поиск..." 
}) => {
  return (
    <Form className="search-form">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <InputGroup.Text className="search-icon">
          🔍
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;