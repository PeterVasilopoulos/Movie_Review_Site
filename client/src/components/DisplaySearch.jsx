import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DisplaySearch = () => {
    // Movie Info From API
    const [foundMovies, setFoundMovies] = useState([])

    // Movie Search Variable
    const [movieSearch, setMovieSearch] = useState("")

    // Search Button
    const [searchButton, setSearchButton] = useState(true)

    // Search After Year Variable
    const [searchAfterYear, setSearchAfterYear] = useState("1900")

    // Variable to check search has been clicked
    const [checkSearch, setCheckSearch] = useState(false)
    const [filmHeader, setFilmHeader] = useState("Popular Movies")

    // Search Filters Hashmap
    const searchFilters = {
        searchForMovie: true
    }

    // Options variable for api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDM1ZTU0OWJhN2U1YWRkMDk3NmIxZTczNWFjYzI1NCIsInN1YiI6IjY0NDI5ZjgxY2VlMmY2MDRmMzM2MTcyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCl7J57Cmn2rKIqWdB6mWasWruaAUU3EqO4Iphbgr58'
        }
    }

    const optionsDefault = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDM1ZTU0OWJhN2U1YWRkMDk3NmIxZTczNWFjYzI1NCIsInN1YiI6IjY0NDI5ZjgxY2VlMmY2MDRmMzM2MTcyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCl7J57Cmn2rKIqWdB6mWasWruaAUU3EqO4Iphbgr58'
        }
    }


    // ---------------------------------------------------------------------------------
    // ADD IF STATEMENT INSIDE OF USEEFFECT TO CHECK IF USER WANTS TO SEARCH FOR A MOVIE OR A USER
    // Use effect to get movie info
    useEffect(() => {
        if (checkSearch) {
            // Gets movies based on user's search
            let promises = []
            for (let i = 1; i < 4; i++) {
                promises.push(axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieSearch}&include_adult=false&language=en-US&page=${i}`, options))
            }
            Promise.all(promises)
                .then((res) => {
                    // Put the found movies in the the correct variable
                    setFoundMovies([...res[0].data.results, ...res[1].data.results, ...res[2].data.results])
                })
                .catch((err) => {
                    // Log error if we get one
                    console.log("Failure!", err)
                })
        } else {
            // Gets popular movies on page load
            let promises = []
            for (let i = 1; i < 4; i++) {
                promises.push(axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`, optionsDefault))
            }
            Promise.all(promises)
                .then((res) => {
                    // Put the found movies in the the correct variable
                    setFoundMovies([...res[0].data.results, ...res[1].data.results, ...res[2].data.results])
                })
                .catch((err) => {
                    // Log error if we get one
                    console.log("Failure!", err)
                })
        }

    }, [searchButton])
    // ---------------------------------------------------------------------------------

    console.log(foundMovies)

    // Swap Search Button
    const swapSearchButton = (e) => {
        e.preventDefault()

        setFoundMovies([])

        setFilmHeader("Search Results")

        setCheckSearch(true)
        setSearchButton(!searchButton)
    }

    // Change search to movie
    const searchForMovie = () => {
        searchFilters.searchForMovie = true
    }
    // Change search to 
    const searchForUser = () => {
        searchFilters.searchForMovie = false
        console.log(foundMovies)
    }

    // ---------------------------------------------------
    // RETURN
    return (
        <div className='section'>
            {/* Filters (Left) */}
            <div id='display-filters' className='block-outline'>
                {/* Title */}
                <div className='block-top'>
                    Filters
                </div>

                {/* Filters */}
                <div className='block-bottom'>
                    {/* Movie/User Radio Input */}
                    <div id='search-for-block' className='filter'>
                        <p className='filter-name'>Search For:</p>
                        {/* Movie Input */}
                        <div className="filter-input">
                            <input id='search-for-movie'
                                type="radio"
                                onSelect={searchForMovie}
                                name='search-for'
                                defaultChecked
                            />
                            <label htmlFor='search-for-movie'> Movie</label>
                        </div>
                        {/* User Input */}
                        <div className="filter-input">
                            <input id='search-for-user'
                                type="radio"
                                onSelect={searchForUser}
                                name='search-for'
                            />
                            <label htmlFor='search-for-user'> User</label>
                        </div>
                    </div>

                    {/* Movie Search Input */}
                    <div>
                        <p className='filter-name'>Movie  Title:</p>
                        <input type="text"
                            className='filter-input'
                            value={movieSearch}
                            // onChange={(e) => swapSearchButton(e)}
                            onChange={(e) => setMovieSearch(e.target.value)}
                        />
                    </div>

                    {/* Release Year Filter */}
                    <div id='release-year-block' className='filter'>
                        <p className='filter-name'>Released By:</p>
                        <input type="Number"
                            className='filter-input'
                            value={searchAfterYear}
                            onChange={(e) => setSearchAfterYear(e.target.value)}
                        />
                    </div>

                    {/* Search Button */}
                    <button className='btn filter-btn' onClick={(e) => swapSearchButton(e)}>Search</button>
                </div>
            </div>

            {/* Search Content (Right) */}
            <div id='display-content' className='block-outline'>
                {/* Title */}
                <div className='block-top'>
                    {filmHeader}
                </div>

                {/* Search Results */}
                <div className='block-bottom'>

                    {/* ------------------------------------------------------------ */}
                    {/* MAP THROUGH ALL FOUND MOVIES */}
                    {
                        foundMovies.map((movie, i) => {
                            if (movie.vote_count > 100) {
                                return (
                                    // Movie Info
                                    <div className='movie-info' key={i}>
                                        {/* Poster */}
                                        <img className='movie-poster'
                                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                                            alt="movie poster"
                                        />
                                        <div>
                                            {/* Title */}
                                            <Link className='movie-title' to={`/movies/${movie.id}`}>
                                                {movie.title ? movie.title : false}
                                            </Link>
                                            {/* Year, Length, Age Rating, Genre */}
                                            <p className='movie-details'>
                                                {movie.release_date ? movie.release_date.slice(0, 4) : "Unreleased"} <span className='br'>| </span>

                                                {/* {movie.runtime ? movie.runtime.seconds / 60 + "m" : "Uknown Runtime"} <span>| </span>
                                                {movie.genres.genres[0] ? movie.genres.genres[0].id + ", " : false}
                                                {movie.genres.genres[1] ? movie.genres.genres[1].id + ", " : false}
                                                {movie.genres.genres[2] ? movie.genres.genres[2].id : "No Genres Available"}  <span>| </span> */}
                                                {movie.vote_average ? "⭐" + movie.vote_average.toFixed(1) : "No Ratings"}

                                            </p>
                                            {/* Score Rating, Director, Cast */}
                                            <p className='movie-details'>
                                            </p>
                                            {/* Description */}
                                            <p className='movie-details movie-description'>
                                                {movie.overview ? movie.overview : false}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default DisplaySearch