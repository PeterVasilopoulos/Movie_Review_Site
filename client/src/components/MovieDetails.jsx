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
    const releaseYear = movieData.release_date.slice(0, 4)

    // Directors Variable
    const directors = movieCrew.filter(person => person.job === "Director").map((director, i) => {
        return (
            director.name
        )
    })

    // Writers Variable
    const writers = movieCrew.filter(person => person.job === "Writer").map((writer, i) => {
        return (
            writer.name
        )
    })

    // Editors Variable
    const editors = movieCrew.filter(person => person.job === "Editor").map((editor, i) => {
        return (
            editor.name
        )
    })

    // Directors of Photography Variable
    const dops = movieCrew.filter(person => person.job === "Director of Photography"). map((dop, i) => {
        return (
            dop.name
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
                setMovieData(res.data)
                setMovieCast(res.data.credits.cast.slice(0, 10))
                setMovieCrew(res.data.credits.crew)
                console.log(movieCast)
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
                <div id='md-details' className='block-bottom'> 
                    {/* Movie Poster */}
                    <img 
                    src={movieData.poster_path ? `https://image.tmdb.org/t/p/w1280${movieData.poster_path}` : "https://movienewsletters.net/photos/000000h1.jpg"}
                    alt="Movie poster" />

                    {/* Movie Details */}
                    <div>
                        {/* Title and Release Year */}
                        <h1 className='md-title'>
                            {movieData.title} <span className='md-span'>({releaseYear})</span>
                        </h1>
                    </div>

                    <p>
                        {/* {
                            writers.map((w, i) => {
                                return (
                                    <p>{w}</p>
                                )
                            })
                        } */}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails