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
    const [filmHeader, setFilmHeader] = useState("Top Box Office Movies")

    // Search Filters Hashmap
    const searchFilters = {
        searchForMovie: true
    }

    // Before Search API Map
    const defaultSearch = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles',
        params: {
            list: 'top_boxoffice_200',
            info: 'base_info'
        },
        headers: {
            'X-RapidAPI-Key': '18ae27c303mshbe6e99c6691e31fp1814f0jsne60650dd7757',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    }


    // ADD IF STATEMENT INSIDE OF USEEFFECT TO CHECK IF USER WANTS TO SEARCH FOR A MOVIE OR A USER
    // Use effect to get movie info
    useEffect(() => {
        if (checkSearch) {
            setFoundMovies([])

            for (let i = 1; i < 4; i++) {

                const options = {
                    method: 'GET',
                    url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieSearch}`,
                    params: {
                        exact: 'false',
                        info: 'base_info',
                        startYear: searchAfterYear,
                        titleType: 'movie',
                        page: `${i}`
                    },
                    headers: {
                        'X-RapidAPI-Key': '18ae27c303mshbe6e99c6691e31fp1814f0jsne60650dd7757',
                        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com' 
                    }
                }

                axios.request(options)
                    .then((res) => {
                        // Set film header variable to results 
                        setFilmHeader("Results")
                        // Log data
                        console.log(`Movie Data (page ${i}):`, res.data.results)
                        // Put data into foundMovies
                        setFoundMovies(foundMovies.concat(res.data.results))
                        console.log("FOUND MOVIES RIGHT HERE", foundMovies)  
                    })
                    .catch((err) => {
                        // Log error if we get one
                        console.log(`Movie API Error (page ${i}):`, err)
                    })
            }
            
        } else {
            // This will run when the page loads
            axios.request(defaultSearch)
                .then((res) => {
                    // Log data
                    console.log("Movie Data:", res.data.results)
                    // Put data into foundMovies
                    setFoundMovies(res.data.results)
                })
                .catch((err) => {
                    // Log error if we get one
                    console.log("Movie API Error:", err)
                })
        }
    }, [searchButton])

    // Swap Search Button
    const swapSearchButton = (e) => {
        e.preventDefault()

        setFoundMovies([])

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

                    {/* MAP THROUGH ALL MOVIES FOUND */}
                    {
                        foundMovies.map((movie, i) => {
                            if (movie.meterRanking && movie.primaryImage) {
                                return (
                                    // Movie Info
                                    <div className='movie-info' key={i}>
                                        {/* Poster */}
                                        <img className='movie-poster'
                                            src={movie.primaryImage.url}
                                            alt="movie poster"
                                        />
                                        <div>
                                            {/* Title */}
                                            <Link className='movie-title'>{movie.titleText.text}</Link>
                                            {/* Year, Length, Age Rating, Genre */}
                                            <p className='movie-details'>
                                                {movie.releaseYear ? movie.releaseYear.year : "Unreleased"} <span>| </span>
                                                {movie.runtime ? movie.runtime.seconds / 60 + "m" : "Uknown Runtime"} <span>| </span>
                                                {movie.genres.genres[0] ? movie.genres.genres[0].id + ", " : false}
                                                {movie.genres.genres[1] ? movie.genres.genres[1].id + ", " : false}
                                                {movie.genres.genres[2] ? movie.genres.genres[2].id : "No Genres Available"}  <span>| </span>
                                                {movie.ratingsSummary.aggregateRating ? "⭐" + movie.ratingsSummary.aggregateRating : "No Ratings"}

                                            </p>
                                            {/* Score Rating, Director, Cast */}
                                            <p className='movie-details'>
                                            </p>
                                            {/* Description */}
                                            <p className='movie-details movie-description'>
                                                {movie.plot ? movie.plot.plotText.plainText : false}
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