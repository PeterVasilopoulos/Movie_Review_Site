import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    // Get movie id from params
    const { id } = useParams()

    // Variable to hold the movie data
    const [movieData, setMovieData] = useState({})
    const [movieCast, setMovieCast] = useState([])
    const [movieCrew, setMovieCrew] = useState([])

    // Release Year Variable
    const [releaseYear, setReleaseYear] = useState(2000)

    // Genres Variable
    const [genres, setGenres] = useState([])

    // Runtime Variable
    const [runtime, setRuntime] = useState("")

    // Rating Variable
    const [rating, setRating] = useState(0)

    // Directors Variable
    const directors = movieCrew.filter(person => person.job === "Director").map((director, i) => {
        return (
            director
        )
    })
    console.log(directors)

    // Writers Variable
    const writers = movieCrew.filter(person => person.job === "Writer" || person.job === "Screenplay").map((writer, i) => {
        return (
            writer
        )
    })

    // Editors Variable
    const editors = movieCrew.filter(person => person.job === "Editor").map((editor, i) => {
        return (
            editor
        )
    })

    // Directors of Photography Variable
    const dops = movieCrew.filter(person => person.job === "Director of Photography").map((dop, i) => {
        return (
            dop
        )
    })

    // Options variable for the api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDM1ZTU0OWJhN2U1YWRkMDk3NmIxZTczNWFjYzI1NCIsInN1YiI6IjY0NDI5ZjgxY2VlMmY2MDRmMzM2MTcyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCl7J57Cmn2rKIqWdB6mWasWruaAUU3EqO4Iphbgr58'
        }
    }

    // Use Effect to get movie data
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`, options)
            .then((res) => {
                // Log the data
                console.log("Movie Data: ", res.data)
                // Set movie data variable
                setMovieData(res.data)
                // Set movie cast variable (first 10 cast members)
                setMovieCast(res.data.credits.cast.slice(0, 10))
                // Set movie crew variable
                setMovieCrew(res.data.credits.crew)
                // Log the cast
                console.log(movieCast)
                // Set release year variable
                setReleaseYear(res.data.release_date.slice(0, 4))
                // Set genres variable
                setGenres(res.data.genres)
                // Set runtime variable
                setRuntime(Math.floor(res.data.runtime / 60) + "h " + res.data.runtime % 60 + "m")
                // Set rating variable
                setRating(res.data.vote_average.toFixed(1))
            })
            .catch((err) => {
                // Log the error if we get one
                console.log("Move Data Error: ", err)
            })
    }, [])



    return (
        <div className='section'>
            <div id='details-block' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>Film Name</p>
                </div>

                {/* Bottom Block */}
                <div className="block-bottom">
                    <div id='md-details'>
                        {/* Movie Poster */}
                        <img
                            className='md-poster'
                            src={movieData.poster_path ? `https://image.tmdb.org/t/p/w1280${movieData.poster_path}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                            alt="Movie poster" />
                        {/* Movie Details */}
                        <div id='md-info'>
                            {/* Title and Log Button */}
                            <div id='md-title-log'>
                                {/* Title */}
                                <h1>
                                    {movieData.title}
                                </h1>
                                {/* Log Movie Button */}
                                <button className='btn'>Review</button>
                            </div>
                            {/* Year, Runtime, Rating */}
                            <div id='md-yrr'>
                                {/* Year */}
                                <p>{releaseYear ? releaseYear : "n/a"}</p>
                                <span className='br'> | </span>
                                {/* Runtime */}
                                <p>{runtime ? runtime : "n/a"}</p>
                                <span className='br'> | </span>
                                {/* Rating */}
                                <p>⭐{rating ? rating : "n/a"}</p>
                            </div>
                            {/* Genres, Directors, Writers, Editors, DoPs */}
                            <div>
                                {/* Genres */}
                                <div id='md-crew'>
                                    <p>
                                        <span className='bold'>{genres.length > 1 ? "Genres: " : "Genre: "}</span>
                                        {
                                            genres.map((genre, i) => {
                                                // Print out each genre, only add a comma if its not the last one
                                                if (i < genres.length - 1) {
                                                    return (
                                                        genre.name + ", "
                                                    )
                                                } else {
                                                    return (
                                                        genre.name
                                                    )
                                                }
                                            })
                                        }
                                    </p>
                                </div>
                                {/* Directors */}
                                <div className='md-crew'>
                                    <p>
                                        <span className='bold'>{directors.length > 1 ? "Directors: " : "Director: "}</span>
                                        {
                                            directors.map((director, i) => {
                                                if (i < directors.length - 1) {
                                                    return (
                                                        director.name + ", "
                                                    )
                                                } else {
                                                    return (
                                                        director.name
                                                    )
                                                }
                                            })
                                        }
                                    </p>
                                </div>
                                {/* Writers */}
                                <div className='md-crew'>
                                    <p>
                                        <span className='bold'>{writers.length > 1 ? "Writers: " : "Writer: "}</span>
                                        {
                                            writers.map((writer, i) => {
                                                if (i < writers.length - 1) {
                                                    return (
                                                        writer.name + ", "
                                                    )
                                                } else {
                                                    return (
                                                        writer.name
                                                    )
                                                }
                                            })
                                        }
                                    </p>
                                </div>
                                {/* Editors */}
                                <div className='md-crew'>
                                    <p>
                                        <span className='bold'>{editors.length > 1 ? "Editors: " : "Editor: "}</span>
                                        {
                                            editors.map((editor, i) => {
                                                if (i < editors.length - 1) {
                                                    return (
                                                        editor.name + ", "
                                                    )
                                                } else {
                                                    return (
                                                        editor.name
                                                    )
                                                }
                                            })
                                        }
                                    </p>
                                </div>
                                {/* Directors of Photography */}
                                <div className="md-crew">
                                    <p>
                                        <span className='bold'>{dops.length > 1 ? "Cinematographers: " : "Cinematographer: "}</span>
                                        {
                                            dops.map((dop, i) => {
                                                if (i < dops.length - 1) {
                                                    return (
                                                        dop.name + ", "
                                                    )
                                                } else {
                                                    return (
                                                        dop.name
                                                    )
                                                }
                                            })
                                        }
                                    </p>
                                </div>
                            </div>
                            {/* Movie Summary */}
                            <div>
                                <span className='bold'>Plot: </span>
                                <p>{movieData.overview ? movieData.overview : "n/a"}</p>
                            </div>
                            {/* Cast */}
                            <div>
                                <span className='bold'>Cast: </span>
                                <div id="md-cast-list">
                                    {
                                        movieCast.map((actor, i) => {
                                            return (
                                                <div className='md-cast-member'>
                                                    {/* Actor Photo */}
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w1280${actor.profile_path}`}
                                                        alt="Actor photo"
                                                        className='md-cast-photo' />
                                                    {/* Character Name and Actor Name */}
                                                    <div>
                                                        {/* Character Name */}
                                                        <p className='bold'>{actor.character ? actor.character : "n/a"}</p>
                                                        {/* Actor Name */}
                                                        <p>{actor.name ? actor.name : "n/a"}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------------------------------------ */}
                    {/* Reviews */}

                </div>
            </div>
        </div>
    )
}

export default MovieDetails