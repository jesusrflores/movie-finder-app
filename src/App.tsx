import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { searchMovies } from "./api";
import './App.css'

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    console.log("Searching for:", query);

    const results = await searchMovies(query);

    console.log("Search results:", results);

    setMovies(results);
  };

  return (
    <div className="App">
      <h1 className="title">Movie Finder</h1>

      <SearchBar onSearch={handleSearch} />

      {/* temporary display of search results */}
      <pre style={{ textAlign: "left"}}>
        {JSON.stringify(movies, null, 2)}
        </pre>
    </div>
  )
}

export default App
