import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { searchMovies } from "./components/services/api";
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

      <pre className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </pre>
    </div>
  )
}

export default App
