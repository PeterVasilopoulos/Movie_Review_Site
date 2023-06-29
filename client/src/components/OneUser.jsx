import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const OneUser = () => {
    // Get user id from use params
    const { id } = useParams()

    // Variable to hold user information
    const [oneUser, setOneUser] = useState()

    // UseEffect to get the user info
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}/view`)
            .then((res) => {
                // Set one user variable
                setOneUser(res.data.results)
                console.log(res.data.results)
            })
            .catch((err) => {
                // Log error if there is one
                console.log("Error: ", err)
            })
    }, [])

    return (
        <div className='section'>
            <div id='one-user' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>
                        {oneUser ? oneUser.username : false}
                    </p>
                </div>

                {/* Bottom Block */}
                <div id='ou-bottom' className='block-bottom'>
                    {/* Left Side */}
                    <div id='ou-left-side'>
                        {/* Username */}
                        <p id='ou-username'>
                            {oneUser ? oneUser.username : false}
                        </p>
                        {/* User Information */}
                        <div id="ou-info">
                            {/* Information Tag */}
                            <p id='ou-info-tag'>User Information</p>
                            {/* Name */}
                            <p className='ou-one-info'>
                                <span className='bold'>Name: </span>
                                {oneUser ? oneUser.firstName + " " + oneUser.lastName : false}
                            </p>
                            {/* Account Creation Date */}
                            <p className='ou-one-info'>
                                <span className='bold'>User Since: </span>
                                {oneUser ? oneUser.createdAt.slice(0, 10) : false}
                            </p>
                            {/* Number of Reviews */}
                            <p className='ou-one-info'>
                                <span className='bold'>Number of Reviews: </span>
                                {oneUser ? oneUser.reviews.length : false}
                            </p>
                            {/* Watchlist */}
                            <p id='ou-wl'>Watchlist</p>
                            <ul id='ou-watchlist'>
                                {
                                    oneUser ?
                                        oneUser.watchlist ?
                                            // If user does have a watchlist
                                            <div>

                                            </div>
                                            :
                                            // If user has no watchlist
                                            <li>Watchlist is empty</li>

                                        : false
                                }
                            </ul>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div id='ou-reviews' className='block-outline'>
                        <div className='block-top'>
                            <p>
                                {oneUser ? oneUser.username + "'s " : false}
                                Reviews
                            </p>
                        </div>
                        <div className="block-bottom">
                            {/* Review List */}
                            {
                                oneUser ?
                                    oneUser.reviews.length >= 1 ?
                                        oneUser.reviews.map((review, i) => {
                                            return (
                                                // If user has reviews
                                                <div key={i} className='ou-one-review'>
                                                    {/* Review Top */}
                                                    <p className='ou-review-top'>
                                                        {/* Username */}
                                                        <span className='bold ou-review-username'>{oneUser.username}</span>
                                                        {/* Watch or Rewatch */}
                                                        <span> {review.rewatch ? " rewatched " : " watched "} </span>
                                                        {/* Movie Title */}
                                                        <Link to={`/movies/${review.movieId}`}>
                                                            <span className='bold ou-review-link'>{review.movieTitle}</span>
                                                        </Link>
                                                        <span> on </span>
                                                        {/* Date Watched */}
                                                        <span className='bold'>{review.date.slice(0, 10)}</span>
                                                        {/* Rating */}
                                                        <span> and rated it </span>
                                                        <span className='bold'>⭐{review.rating}</span>
                                                    </p>
                                                    {/* Review Bottom */}
                                                    <div className='ou-review-bottom'>
                                                        {/* Poster */}
                                                        <Link to={`/movies/${review.movieId}`}>
                                                            <img
                                                                src={review.moviePosterPath ? `https://image.tmdb.org/t/p/w1280${review.moviePosterPath}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                                                                alt="Movie poster"
                                                                className='ou-review-poster'
                                                            />
                                                        </Link>
                                                        <div>
                                                            {/* Movie Title */}
                                                            <Link to={`/movies/${review.movieId}`} className='ou-review-title'>
                                                                {review.movieTitle}
                                                            </Link>
                                                            {/* Review */}
                                                            <p>
                                                                <span className='bold'>Review: </span>
                                                                {review.body}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        // If user does not have any reviews
                                        <p>No reviews</p>
                                    : false
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneUser