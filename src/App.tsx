import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { searchMovies } from "./components/services/api";
import { getMovieDetails } from "./components/services/api";
import './App.css'

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [movieDetails, setMovieDetails] = useState<any | null>(null);

  const handleSearch = async (query: string) => {
    console.log("Searching for:", query);
    
    const results = await searchMovies(query);
    
    console.log("Search results:", results);
    
    setMovies(results);
  };
  
  const handleSelectMovie = async (movie: any) => {
    const details = await getMovieDetails(movie.imdbID);
    setMovieDetails(details);
  };

  const renderStars = (rating: string) => {
    const num = parseFloat(rating)/2; // Convert to a 5-star scale
    const fullStars = Math.round(num);
    return "★".repeat(fullStars);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="title">Movie Finder</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      

      <div className="movie-grid">
      {movies.map((movie) => (
        <button
          key={movie.imdbID}
          className="movie-card-button"
          onClick={() => handleSelectMovie(movie)}
        >
          <MovieCard movie={movie} />
        </button>
      ))}
        
      </div>
      {movieDetails && (
        <div className="modal-backdrop" onClick={() => setMovieDetails(null)}>
          <div className="details-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setMovieDetails(null)}
            >
              ×
            </button>

            <h2>{movieDetails.Title}</h2>

            <img
              className="details-poster"
              src={movieDetails.Poster}
              alt={movieDetails.Title}
            />

            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            <p><strong>IMDB Rating:</strong>{" "} 
                {movieDetails.imdbRating !== "N/A" 
                ? renderStars(movieDetails.imdbRating) 
                : "No rating available"}
                </p>
            <div className="modal-actions">
              <a 
                className="trailer-button"
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  movieDetails.Title + " " + movieDetails.Year + " official trailer"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App
