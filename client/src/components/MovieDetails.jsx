import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    // Get movie id from params
    const { id } = useParams()

    // Variable to hold the movie data
    const [movieData, setMovieData] = useState({})
    const [movieCast, setMovieCast] = useState([])
    const [movieCrew, setMovieCrew] = useState({})

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
            console.log("Movie Data: ", res.data.credits.crew)
            setMovieData(res.data)
            setMovieCast(res.data.credits.cast)
            setMovieCrew(res.data.credits.crew)

            const test = movieCrew.filter(person => person.job == "Director")
            console.log(test)
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
                <div className='block-bottom'>
                    {
                        
                        
                        movieCrew.filter(person => person.job === "Director").map((movie, i) => {
                            return (
                                movie.name
                            )
                        })
                        
                        
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDetails