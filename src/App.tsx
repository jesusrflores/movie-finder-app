
import SearchBar from "./components/SearchBar";

import './App.css'

function App() {
  const handleSearch = (query: string) => {
    // Implement your search logic here
    console.log('Searching for:', query)
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Movie Finder</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  )
}

export default App
