import React, { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    onSearch(query);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;