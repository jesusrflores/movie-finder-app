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
