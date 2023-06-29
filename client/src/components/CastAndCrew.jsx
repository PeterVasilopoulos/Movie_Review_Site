import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const CastAndCrew = () => {
    // Get movie id from parameter
    const { id } = useParams()

    // Create a navigate variable
    const navigate = useNavigate()

    // Variable to hold the movie info
    const [movieData, setMovieData] = useState([])

    // Variable to hold the crew
    const [crew, setCrew] = useState([])

    // Variable to hold the cast
    const [cast, setCast] = useState([])

    // Back to Movie Function
    const backToMovie = () => {
        // Navigate back to the movie page
        navigate('/movies/' + movieData.id)
    }

    // Options variable for the api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_AUTH_API_KEY
        }
    }

    // useEffect to get movie data
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`, options)
            .then((res) => {
                // Log the movie data
                console.log(res)
                // Set movie data variable
                setMovieData(res.data)
                // Set crew variable
                setCrew(res.data.credits.crew)
                // Set cast variable
                setCast(res.data.credits.cast)
            })
            .catch((err) => {
                // Log the error if we get one
                console.log("Move Data Error: ", err)
            })
    }, [])

    return (
        <div className='section'>
            <div className="block-outline" id='cc-page'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>Cast and Crew</p>
                </div>

                {/* Bottom Block */}
                <div className='block-bottom'>
                    {/* Movie Info */}
                    <div id='cc-movie-info'>
                        {/* Movie Poster */}
                        <img
                            src={movieData.poster_path ? `https://image.tmdb.org/t/p/w1280${movieData.poster_path}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                            alt="Movie poster"
                            className='cc-poster' />
                        <div>
                            {/* Movie Title */}
                            <p id='cc-movie-title' className='bold '>{movieData.title}</p>
                            {/* Movie description */}
                            <p id='cc-movie-description'>{movieData.overview}</p>

                            {/* Back to Movie Button */}
                            <p className='bold default-search' id='cc-back' onClick={backToMovie}>Back to Movie</p>
                        </div>
                    </div>

                    <div id='cc-lists'>
                        {/* Crew */}
                        <div id='cc-crew'>
                            <p className='cc-list-type bold'>Crew:</p>
                            {
                                crew.map((crewMember, i) => {
                                    return (
                                        <div key={i} className='cc-member'>
                                            <img
                                                src={crewMember.profile_path ? `https://image.tmdb.org/t/p/w1280${crewMember.profile_path}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                                                alt="Crew member"
                                                className='cc-photo' />
                                            <div>
                                                <p className='bold'>{crewMember.name}</p>
                                                <p>{crewMember.job}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* Cast */}
                        <div id='cc-cast'>
                            <p className='cc-list-type bold'>Cast:</p>
                            {
                                cast.map((castMember, i) => {
                                    return (
                                        <div key={i} className='cc-member'>
                                            <img
                                                src={castMember.profile_path ? `https://image.tmdb.org/t/p/w1280${castMember.profile_path}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                                                alt="Cast member"
                                                className='cc-photo' />
                                            <div>
                                                <p className='bold'>{castMember.name}</p>
                                                <p>{castMember.character}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CastAndCrew