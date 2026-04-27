import MovieCard from "../components/MovieCard";

type Props = {
  favorites: any[];
  onSelectMovie: (movie: any) => void;
};

const Favorites = ({ favorites, onSelectMovie }: Props) => {
  return (
    <>
      <h2 className="section-title">⭐ Favorites</h2>

      {favorites.length === 0 ? (
        <p className="empty-message">No favorite movies yet.</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <button
              key={movie.imdbID}
              className="movie-card-button"
              onClick={() => onSelectMovie(movie)}
            >
              <MovieCard movie={movie} />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;