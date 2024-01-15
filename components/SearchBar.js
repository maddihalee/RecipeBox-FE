import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default function SearchBar({ setResults }) {
  const [input, setInput] = useState([]);

  const fetchData = (value) => {
    fetch('https://localhost:7007')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((name) => value && name.name.toLowerCase().includes(value));
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <input
          style={{ borderBottom: '1px solid black', borderRadius: '0%' }}
          type="text"
          className="search-box"
          placeholder="Search Recipes"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </Form>
  );
}

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
};
