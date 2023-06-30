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

    // Get today's date
    const today = new Date().toISOString().slice(0, 10)

    // If user isn't logged in, reroute to home page
    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
        }
    }, [])

    // Variable to hold the movie information
    const [movieData, setMovieData] = useState({})

    // Variable to hold the review form data
    const [reviewFormData, setReviewFormData] = useState({
        movieTitle: "",
        movieId: null,
        moviePosterPath: "",
        user: loggedUser ? loggedUser._id : null,
        rating: 1,
        date: today,
        rewatch: false,
        body: ""
    })

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
                // Set movie title, id, poster path
                setReviewFormData({
                    ...reviewFormData,
                    movieTitle: res.data.title,
                    movieId: res.data.id,
                    moviePosterPath: res.data.poster_path
                })
            })
            .catch((err) => {
                // Log error if there is one
                console.log("Error:", err)
            })
    }, [])

    // Review Form Change Function
    const revChange = (e) => {
        setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value })
        console.log(reviewFormData)
    }

    // Rewatch Functions
    // False
    const rewatchFalse = () => {
        setReviewFormData({ ...reviewFormData, rewatch: false })
    }
    // True
    const rewatchTrue = () => {
        setReviewFormData({ ...reviewFormData, rewatch: true })
    }

    // Submit Review Function
    const submitReview = (e) => {
        e.preventDefault()

        axios.post(`http://localhost:8000/api/reviews/new/${loggedUser._id}`, reviewFormData, { withCredentials: true })
            .then((res) => {
                navigate(`/movies/${movieData.id}`)
            })
            .catch((err) => {
                // Set review form errors variable
                console.log(err)
                // setReviewFormErrors(err.response.data.errors)
            })
    }

    // --------------------------------
    // STAR FUNCTIONALITY
    // --------------------------------

    // Star Hashmap
    const [stars, setStars] = useState({
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
    })

    // Star Input Variable
    const [starInput, setStarInput] = useState(1)

    // Star Update Function
    const starUpdate = (starNum) => {
        // Create a temp variable to hold the key values
        let tempStars = {}

        // Loop through all stars and change boolean values
        for (let i = 1; i <= starNum; i++) {
            tempStars = {...tempStars, [i]: true}
        }
        for (let i = 10; i > starNum; i--) {
            tempStars = {...tempStars, [i]: false}
        }

        // Set stars hashmap
        setStars(tempStars)
        // Set star input variable
        setStarInput(starNum)
        // Set form data rating variable
        setReviewFormData({ ...reviewFormData, rating: starNum })
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
                            <form onSubmit={submitReview}>
                                {/* Title Hidden Input */}
                                <input
                                    type="hidden"
                                    name='movieTitle'
                                    value={movieData.movieTitle ? movieData.movieTitle : "n/a"}
                                    onChange={revChange}
                                />
                                {/* Movie ID Hidden Input */}
                                <input
                                    type="hidden"
                                    name='movieId'
                                    value={movieData.id ? movieData.id : 0}
                                    onChange={revChange}
                                />
                                {/* Movie Poster Path Hidden Input */}
                                <input
                                    type="hidden"
                                    name='moviePosterPath'
                                    value={movieData.poster_path ? movieData.poster_path : ""}
                                    onChange={revChange}
                                />
                                {/* User ID Hidden Input */}
                                <input
                                    type="hidden"
                                    name='user'
                                    value={loggedUser ? loggedUser._id : 0}
                                    onChange={revChange}
                                />

                                {/* Rating */}
                                <div className='review-bot-border'>
                                    <label>Rating: </label>
                                    <div id='review-rating'>
                                        <p id='review-rating-number'>{starInput}</p>
                                        <p className='star' onClick={() => starUpdate(1)}>
                                            {stars[1] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(2)}>
                                            {stars[2] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(3)}>
                                            {stars[3] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(4)}>
                                            {stars[4] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(5)}>
                                            {stars[5] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(6)}>
                                            {stars[6] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(7)}>
                                            {stars[7] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(8)}>
                                            {stars[8] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(9)}>
                                            {stars[9] ? "★" : "☆"}
                                        </p>
                                        <p className='star' onClick={() => starUpdate(10)}>
                                            {stars[10] ? "★" : "☆"}
                                        </p>
                                    </div>
                                </div>

                                {/* Date Watched */}
                                <div className='review-margin review-bot-border'>
                                    <label>Date Watched:</label>
                                    <div id='review-date-watched' className='review-margin'>
                                        <input type="date" name='date' onChange={revChange} defaultValue={today} />
                                    </div>
                                </div>

                                {/* Rewatch */}
                                <div className='review-margin review-bot-border'>
                                    <label>Watched Before?</label>
                                    <div id='review-watched-before' className='review-margin'>
                                        {/* False */}
                                        <div className='review-radio'>
                                            <p>No</p>
                                            <input type="radio" name='rewatch' defaultChecked className='radio' onChange={rewatchFalse} />
                                        </div>
                                        {/* True */}
                                        <div className='review-radio'>
                                            <p>Yes</p>
                                            <input type="radio" name='rewatch' className='radio' onChange={rewatchTrue} />
                                        </div>
                                    </div>
                                </div>

                                {/* Review Body */}
                                <div className='review-margin'>
                                    <label>Review:</label>
                                    <div className='flx'>
                                        <textarea
                                            name="body"
                                            id="review-body"
                                            cols="40"
                                            rows="15"
                                            onChange={revChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div id='review-submit'>
                                    <button className='btn'>
                                        Submit
                                    </button>
                                </div>

                                {/* Errors */}
                                <div>

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