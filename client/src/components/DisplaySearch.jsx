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

    // Default Search Buttons Logic
    const [searchNum, setSearchNum] = useState(0)

    const defaultSearches = [
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=",
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=",
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=",
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page="
    ]

    const selectDefaultPopular = () => {
        // Clear foundMovies variable
        setFoundMovies([])
        // Reset checkSearch variable to non-user selected
        setCheckSearch(false)
        // Update setSearchNum to reflect chosen search
        setSearchNum(0)
        // Change filmHeader
        setFilmHeader("Popular Movies")
        // Swap setSearchButton trigger the useEffect
        setSearchButton(!searchButton)
    }
    const selectDefaultNowPlaying = () => {
        setFoundMovies([])
        setCheckSearch(false)
        setSearchNum(1)
        setFilmHeader("Now Playing")
        setSearchButton(!searchButton)
    }
    const selectDefaultTopRated = () => {
        setFoundMovies([])
        setCheckSearch(false)
        setSearchNum(2)
        setFilmHeader("Top Rated")
        setSearchButton(!searchButton)
    }
    const selectDefaultUpcoming = () => {
        setFoundMovies([])
        setCheckSearch(false)
        setSearchNum(3)
        setFilmHeader("Upcoming Movies")
        setSearchButton(!searchButton)
    }

    // Options variable for api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_AUTH_API_KEY
        }
    }

    // ---------------------------------------------------------------------------------
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
                promises.push(axios.get(defaultSearches[searchNum] + i, options))
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
    console.log(defaultSearches[1] + "1")

    // Swap Search Button
    const swapSearchButton = (e) => {
        e.preventDefault()

        setFoundMovies([])

        setFilmHeader("Search Results")

        setCheckSearch(true)
        setSearchButton(!searchButton)
    }

    // ---------------------------------------------------
    // RETURN
    return (
        <div className='section'>
            {/* Filters (Left) */}
            <div id='display-filters' className='block-outline'>
                {/* Title */}
                <div className='block-top'>
                    Search
                </div>

                {/* Search Block */}
                <div id='display-search' className='block-bottom'>

                    {/* Movie Search Input */}
                    <form>
                        <div id='display-search-movie'>
                            <p className='bold'>Movie Title:</p>
                            <input type="text" id='display-search-input' value={movieSearch} onChange={(e) => setMovieSearch(e.target.value)}
                            />
                        </div>

                        {/* Search Button */}
                        <div className='flx'>
                            <button className='display-search-btn btn' onClick={(e) => swapSearchButton(e)}>Search</button>
                        </div>
                    </form>

                    {/* Default Searches */}
                    <div id='display-defaults'>
                        <p className='bold'>Default Search Options:</p>
                        {/* Popular Search */}
                        <p className='default-search bold' onClick={selectDefaultPopular}>
                            Popular
                        </p>
                        {/* Now Playing */}
                        <p className='default-search bold' onClick={selectDefaultNowPlaying}>
                            Now Playing
                        </p>
                        {/* Top Rated */}
                        <p className='default-search bold' onClick={selectDefaultTopRated}>
                            Top Rated
                        </p>
                        {/* Upcoming */}
                        <p className='default-search bold' onClick={selectDefaultUpcoming}>
                            Upcoming
                        </p>
                    </div>
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
                        foundMovies.length >= 1 ?
                            foundMovies.map((movie, i) => {
                                if (movie.vote_count > 100) {
                                    return (
                                        // Movie Info
                                        <div className='movie-info' key={i}>
                                            {/* Poster */}
                                            <Link to={`/movies/${movie.id}`}>
                                                <img className='movie-poster'
                                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                                                    alt="movie poster"
                                                />
                                            </Link>
                                            <div>
                                                {/* Title */}
                                                <Link className='movie-title' to={`/movies/${movie.id}`}>
                                                    {movie.movieTitle ? movie.movieTitle : false}
                                                </Link>
                                                {/* Year, Length, Age Rating, Genre */}
                                                <p className='movie-details'>
                                                    {movie.release_date ? movie.release_date.slice(0, 4) : "Unreleased"} <span className='br'>| </span>
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
                            }) : <p className='bold'>No results</p>
                    }

                </div>
            </div>
        </div>
    )
}

export default DisplaySearch