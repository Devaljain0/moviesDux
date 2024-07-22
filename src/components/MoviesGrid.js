import React, {useState, useEffect} from 'react'
import '../styles.css';
import MovieCard from './MovieCard';
import userEvent from '@testing-library/user-event';
export default function MoviesGrid({movies, watchlist, toggleWatchlist}){
    
    const [searchTerm, setSearchTerm]=useState("");
    const [genre,setGenre]= useState("All Genres");
    const [rating, setRating]= useState("All");

   
    

    const handleSearchChange=(e)=>{
        setSearchTerm(e.target.value);
    };

    const handleGenre=(e)=>{
        setGenre(e.target.value);
    };

    const handleRating=(e)=>{
        setRating(e.target.value);
    };

    const matchesRating=(movie, rating)=>{
      switch(rating){
        case "All":
          return true;

        case "Good":
          return movie.rating>  8;

        case "ok":
          return movie.rating < 8 && movie.rating >= 5;

        case "Bad" :
         return movie.rating < 5 ;

        default:
          return false;
      }

    }

    const matchGenre=(movie, genre)=>{
      return genre === "All Genres"|| movie.genre.toLowerCase()===genre.toLowerCase();
    };

    const matchesSearchterm=(movie, searchTerm) => {
      return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const filteredMovies = movies.filter((movie)=>
      matchGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchterm(movie, searchTerm)
    );

    return(
          <div>
            <input type='text' 
            className='search-input'
            placeholder='search movie here..'
            value ={searchTerm}
            onChange={handleSearchChange}
            />

            <div className="filter-bar">

              <div className='filter-slot'>
                <label>Genre</label>
                <select className='filter-dropdown' value={genre} onChange={handleGenre}>
                  <option>All Genres</option>
                  <option>Action</option>
                  <option>Drama</option>
                  <option>Fantasy</option>
                  <option>Romance</option>
                </select>

              </div>
              <div className='filter-slot'>
               <label>Rating</label>
                <select className='filter-dropdown' value={rating} onChange={handleRating}>
                  <option>All</option>
                  <option>Good</option>
                  <option>ok</option>
                  <option>Bad</option>   
                </select>

              </div>
            </div>
            <div className='movies-grid'>  
             {
                filteredMovies.map((movie)=>(
                   
                    <MovieCard movie={movie} 
                    key={movie.id} 
                    toggleWatchlist={toggleWatchlist}
                    isWatchlisted={watchlist.includes(movie.id)}></MovieCard>
                ))
             }
            </div>
          </div>
        
    )
}