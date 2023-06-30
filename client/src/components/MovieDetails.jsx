import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../libs/context'

const MovieDetails = () => {
    // Get movie id from params
    const { id } = useParams()

    // Get logged user 
    const { loggedUser } = useAppContext()

    // Create a navigate variable
    const navigate = useNavigate()

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

    // Backdrops Variable
    const [backdrops, setBackdrops] = useState([])

    // Movie Reviews Variable
    const [movieReviews, setMovieReviews] = useState([])

    // Logic for image slideshow
    const [imgShowing, setImgShowing] = useState(0)
    const [defaultBackdrop, setDefaultBackdrop] = useState("")
    const [btnClicked, setBtnClicked] = useState(false)

    const slideNext = () => {
        if (backdrops[imgShowing + 1]) {
            setImgShowing(imgShowing + 1)
        } else {
            setImgShowing(0)
        }
        setBtnClicked(true)
    }

    const slidePrev = () => {
        if (backdrops[imgShowing - 1]) {
            setImgShowing(imgShowing - 1)
        } else {
            setImgShowing(backdrops.length - 1)
        }
        setBtnClicked(true)
    }

    // Directors Variable
    const directors = movieCrew.filter(person => person.job === "Director").map((director, i) => {
        return (
            director
        )
    })

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

    // Full Cast and Crew Button Function
    const fullCrew = () => {
        // Navigate to the cast and crew page for specific movie
        navigate('/movies/cast&crew/' + movieData.id)
    }

    // Options variable for the api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_AUTH_API_KEY
        }
    }

    // Use Effect to get movie data
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Cimages`, options)
            .then((res) => {
                // Log the data
                console.log("Movie Data: ", res.data)
                // Set movie data variable
                setMovieData(res.data)
                // Set movie cast variable (first 10 cast members)
                setMovieCast(res.data.credits.cast[15] ? res.data.credits.cast.slice(0, 16) : res.data.credits.cast)
                // Set movie crew variable
                setMovieCrew(res.data.credits.crew)
                // Set release year variable
                setReleaseYear(res.data.release_date.slice(0, 4))
                // Set genres variable
                setGenres(res.data.genres)
                // Set runtime variable
                setRuntime(Math.floor(res.data.runtime / 60) + "h " + res.data.runtime % 60 + "m")
                // Set rating variable
                setRating(res.data.vote_average.toFixed(1))
                // Set the backdrops variable
                setBackdrops(res.data.images.backdrops)
                setDefaultBackdrop(res.data.images.backdrops[0].file_path)

                // Get the movie reviews
                axios.get(`http://localhost:8000/api/reviews/movie/${res.data.id}`)
                    .then((reviewsRes) => {
                        //Log data
                        console.log("Reviews: ", reviewsRes.data.results)
                        // Set movie reviews variable
                        setMovieReviews(reviewsRes.data.results)
                    })
                    .catch((reviewsErr) => {
                        // Log error if we get one
                        console.log("Get Movie Reviews Error: ", reviewsErr)
                    })

            })
            .catch((err) => {
                // Log the error if we get one
                console.log("Move Data Error: ", err)
            })
    }, [])



    return (
        <div className='section'>
            <div id='movie-details' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>Movie Details</p>
                </div>

                {/* Bottom Block */}
                <div className="block-bottom">
                    <div id='md-details'>
                        <div id="md-left">
                            {/* Movie Poster */}
                            <img
                                className='md-poster'
                                src={movieData.poster_path ? `https://image.tmdb.org/t/p/w1280${movieData.poster_path}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                                alt="Movie poster" />

                            {/* Image Slideshow Test */}
                            <div id='md-slideshow'>
                                <div id='md-slide-buttons'>
                                    <p className='prev' onClick={slidePrev}>◄</p>
                                    <p className='bold'>Images</p>
                                    <p className='next' onClick={slideNext}>►</p>
                                </div>
                                <div className='md-slide'>
                                    <div className='md-slide-num'>{imgShowing + 1}/{backdrops.length}</div>
                                    <img
                                        src={btnClicked ? `https://image.tmdb.org/t/p/w1280${backdrops[imgShowing].file_path}` : `https://image.tmdb.org/t/p/w1280${defaultBackdrop}`}
                                        alt="Image from movie" />
                                </div>
                            </div>
                        </div>

                        {/* Movie Details */}
                        <div id='md-right'>
                            {/* Title and Log Button */}
                            <div id='md-title-log'>
                                {/* Title */}
                                <h1 className='md-title'>
                                    {movieData.title}
                                </h1>
                                {/* Review Movie Button */}
                                {/* only shows up if user is logged in */}
                                {
                                    loggedUser ?
                                        // <button className='btn'>Review</button>
                                        <Link to={`/movies/${id}/review`} className='btn'>
                                            Review
                                        </Link>
                                        : false
                                }

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
                            {/* Genres */}
                            <div className='md-crew'>
                                {
                                    genres.map((genre, i) => {
                                        return (
                                            <div className='md-genre' key={i}>
                                                {genre.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* Directors, Writers, Editors, DoPs */}
                            <div>
                                {/* Directors */}
                                <div className='md-crew'>
                                    <p>
                                        <span className='bold'>{directors.length > 1 ? "Directors: " : "Director: "}</span>
                                        {
                                            directors.length >= 1 ?
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
                                                }) : "n/a"
                                        }
                                    </p>
                                </div>
                                {/* Writers */}
                                <div className='md-crew'>
                                    <p>
                                        <span className='bold'>{writers.length > 1 ? "Writers: " : "Writer: "}</span>
                                        {
                                            writers.length >= 1 ?
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
                                                }) : "n/a"
                                        }
                                    </p>
                                </div>
                                {/* Editors */}
                                <div className='md-crew'>
                                    <p>
                                        <span className='bold'>{editors.length > 1 ? "Editors: " : "Editor: "}</span>
                                        {
                                            editors.length >= 1 ?
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
                                                }) : "n/a"
                                        }
                                    </p>
                                </div>
                                {/* Directors of Photography */}
                                <div className="md-crew">
                                    <p>
                                        <span className='bold'>{dops.length > 1 ? "Cinematographers: " : "Cinematographer: "}</span>
                                        {
                                            dops.length >= 1 ?
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
                                                }) : "n/a"
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
                                <div id='md-cast-title'>
                                    <span className='bold'>Cast: </span>
                                    <div className='bold default-search' onClick={fullCrew}>
                                        <p>View Full</p>
                                        <p>Cast and Crew</p>
                                    </div>
                                </div>
                                <div id="md-cast-list">
                                    {
                                        movieCast.map((actor, i) => {
                                            return (
                                                <div className='md-cast-member' key={i}>
                                                    {/* Actor Photo */}
                                                    <img
                                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w1280${actor.profile_path}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                                                        alt="Actor photo"
                                                        className='md-cast-photo' />
                                                    {/* Character Name and Actor Name */}
                                                    <div>
                                                        {/* Actor Name */}
                                                        <p className='bold'>{actor.name ? actor.name : "n/a"}</p>
                                                        {/* Character Name */}
                                                        <p>{actor.character ? actor.character : "n/a"}</p>
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
                    <div id='md-reviews'>
                        <p id='md-reviews-header'>User Reviews:</p>
                        {
                            movieReviews ?
                                movieReviews.length >= 1 ?
                                    movieReviews.map((review, i) => {
                                        return (
                                            <div className='md-one-review' key={i}>
                                                {/* Review Top */}
                                                <div className='block-top md-review-top'>
                                                    {/* Username */}
                                                    <Link to={"/users/" + review.user._id}>
                                                        <p className='md-review-username'>
                                                            {review.user.username}
                                                        </p>
                                                    </Link>
                                                    <p className='md-watched'>
                                                        {review.rewatch ? "rewatched " : "watched "}
                                                        <Link to={"/movies/" + review.movieId}>
                                                            <span className='bold md-movie-link'>{review.movieTitle}</span>
                                                        </Link>
                                                        <span> on </span>
                                                        <span className='bold'>{review.date.slice(0, 10)}</span>
                                                        <span> and rated it </span>
                                                        <span className='bold'>⭐{review.rating}</span>
                                                    </p>
                                                </div>

                                                {/* Review Bottom */}
                                                <div className='block-bottom md-review-bottom'>
                                                    <div>
                                                        {/* Movie Poster*/}
                                                        <Link to={"/movies/" + review.movieId}>
                                                            <img
                                                                src={review.moviePosterPath ? `https://image.tmdb.org/t/p/w1280${review.moviePosterPath}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                                                                alt="Movie poster"
                                                                className='md-review-poster' />
                                                        </Link>
                                                    </div>

                                                    <div>
                                                        {/* Movie Title */}
                                                        <Link to={"/movies/" + review.movieId}>
                                                            <p className='md-review-title bold md-movie-link'>{review.movieTitle}</p>
                                                        </Link>
                                                        {/* Review Body */}
                                                        <p><span className='bold'>Review: </span>{review.body}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <p>No Reviews Yet</p>
                                : false
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails