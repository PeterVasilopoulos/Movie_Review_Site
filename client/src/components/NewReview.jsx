import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../libs/context'
import axios from 'axios'

const NewReview = () => {
    // Get id from param
    const { id } = useParams()

    // Create navigate variable
    const navigate = useNavigate()

    // Get logged user 
    const { loggedUser } = useAppContext()

    // If user isn't logged in, reroute to home page
    if (!loggedUser) {
        navigate('/')
    }

    // Variable to hold the movie information
    const [movieData, setMovieData] = useState({})

    // Options variable for the api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_AUTH_API_KEY
        }
    }

    // UseEffect to get the movie data
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, options)
            .then((res) => {
                // Set movie data variable
                setMovieData(res.data)
            })
            .catch((err) => {
                // Log error if there is one
                console.log("Error:", err)
            })
    }, [])

    // --------------------------------
    // STAR FUNCTIONALITY
    // --------------------------------

    // Star Hashmap
    const [stars, setStars] = useState({
        star1: true,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
        star6: false,
        star7: false,
        star8: false,
        star9: false,
        star10: false,
    })

    // Star Input Variable
    const [starInput, setStarInput] = useState(1)

    // Star 1 Function
    const star1 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: false,
            star3: false,
            star4: false,
            star5: false,
            star6: false,
            star7: false,
            star8: false,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(1)
    }
    // Star 2 Function
    const star2 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: false,
            star4: false,
            star5: false,
            star6: false,
            star7: false,
            star8: false,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(2)
    }
    // Star 3 Function
    const star3 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: false,
            star5: false,
            star6: false,
            star7: false,
            star8: false,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(3)
    }
    // Star 4 Function
    const star4 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: false,
            star6: false,
            star7: false,
            star8: false,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(4)
    }
    // Star 5 Function
    const star5 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: true,
            star6: false,
            star7: false,
            star8: false,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(5)
    }
    // Star 6 Function
    const star6 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: true,
            star6: true,
            star7: false,
            star8: false,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(6)
    }
    // Star 7 Function
    const star7 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: true,
            star6: true,
            star7: true,
            star8: false,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(7)
    }
    // Star 8 Function
    const star8 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: true,
            star6: true,
            star7: true,
            star8: true,
            star9: false,
            star10: false
        })
        // Set star input
        setStarInput(8)
    }
    // Star 9 Function
    const star9 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: true,
            star6: true,
            star7: true,
            star8: true,
            star9: true,
            star10: false
        })
        // Set star input
        setStarInput(9)
    }
    // Star 10 Function
    const star10 = () => {
        setStars({
            ...stars,
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: true,
            star6: true,
            star7: true,
            star8: true,
            star9: true,
            star10: true
        })
        // Set star input
        setStarInput(10)
    }

    return (
        <div className='section'>
            <div id='review-new' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>New Review</p>
                </div>

                {/* Bottom Block */}
                <div className='block-bottom'>
                    {/* Movie Info */}
                    <div id='review-movie-info'>
                        {/* Movie Poster */}
                        <Link to={`/movies/${id}`}>
                            <img
                                src={movieData.poster_path ? `https://image.tmdb.org/t/p/w1280${movieData.poster_path}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                                alt="Movie poster"
                                className='review-poster'
                            />
                        </Link>
                        {/* Right Side Movie Info */}
                        <div id='review-movie-right'>
                            {/* Movie Title */}
                            <p>
                                <Link id='review-movie-title' to={`/movies/${id}`}>
                                    {movieData.title ? movieData.title : "n/a"}
                                </Link>
                            </p>
                            {/* Movie Release Year and Average Rating */}
                            <p>
                                {/* Release Year */}
                                {movieData.release_date ? movieData.release_date.slice(0, 4) : false}
                                <span className='review-sep'> | </span>
                                {/* Average Rating */}
                                ⭐{movieData.vote_average ? movieData.vote_average.toFixed(1) : "n/a"}
                            </p>
                            {/* Movie Summary */}
                            <p id='review-movie-summary'>
                                {movieData.overview ? movieData.overview : "n/a"}
                            </p>
                            {/* Back to Movie Button */}
                            <Link to={`/movies/${id}`} className='bold default-search'>
                                Back to Movie
                            </Link>
                        </div>
                    </div>

                    {/* Review Form */}
                    <div id='review-form' className='block-outline'>
                        {/* Form Top Block */}
                        <div className='block-top'>
                            <p>Review Form</p>
                        </div>

                        {/* Form Bottom Block */}
                        <div className='block-bottom'>
                            <form>
                                {/* Title Hidden Input */}
                                <input type="hidden" value={movieData.title ? movieData.title : "n/a"} />
                                {/* Movie ID Hidden Input */}
                                <input type="hidden" value={movieData.id ? movieData.id : 0} />
                                {/* Movie Poster Path Hidden Input */}
                                <input type="hidden" value={movieData.poster_path ? movieData.poster_path : ""} />

                                {/* Rating */}
                                <label>Rating: </label>
                                <input type="hidden" value={starInput}/>
                                <div id='review-rating'>
                                    <p id='review-rating-number'>{starInput}</p>
                                    <p className='star' onClick={star1}>
                                        {stars.star1 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star2}>
                                        {stars.star2 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star3}>
                                        {stars.star3 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star4}>
                                        {stars.star4 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star5}>
                                        {stars.star5 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star6}>
                                        {stars.star6 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star7}>
                                        {stars.star7 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star8}>
                                        {stars.star8 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star9}>
                                        {stars.star9 ? "★" : "☆"}
                                    </p>
                                    <p className='star' onClick={star10}>
                                        {stars.star10 ? "★" : "☆"}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewReview