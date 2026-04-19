const API_KEY = "d6427cec"; 
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query: string) => {
    const response = await fetch(
        `${BASE_URL}?s=${query}&apikey=${API_KEY}`
    );

    const data = await response.json();

    //OMDb API returns a property "Search" which contains the array of movies
    if (data.Response === "False") {
        console.error("OMDb Error:", data.Error);
        return [];
    }
    return data.Search || [];
};

export const getMovieDetails = async (imdbID: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.Response === "False") {
            console.error(data.Error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

