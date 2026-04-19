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
      <h1 className="title">Movie Finder</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="movie-grid">
        {movies.map((movie, index) => (
          
          <div
          key={index}
          onClick={() => handleSelectMovie(movie)}>
              <MovieCard movie={movie} />
            </div>

        ))}
        
      </div>
      {movieDetails && (
        <div className="details-panel">
          <button 
            className="close-btn"
            onClick={() => setMovieDetails(null)}>
            X
          </button>

          <h2>{movieDetails.Title}</h2>
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            />
            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            <p><strong>IMDB Rating:</strong> {renderStars(movieDetails.imdbRating)}</p>

            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movieDetails.Title + " trailer")}`}
              title="Trailer"
              />
        </div>
       )}
    </div>
  );
};

export default App
