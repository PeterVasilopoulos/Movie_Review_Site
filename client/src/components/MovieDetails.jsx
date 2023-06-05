import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    // Get movie id from params
    const { id } = useParams()

    // UseState variables to hold all the movie info
    const [rating, setRating] = useState("")
    const [voteCount, setVoteCount] = useState("")
    const [poster, setPoster] = useState("")
    const [title, setTitle] = useState("")
    const [genres, setGenres] = useState([])
    const [releaseDate, setReleaseDate] = useState("")
    const [runtime, setRuntime] = useState("")
    const [plot, setPlot] = useState("")

    const [director, setDirector] = useState("")

    // Variables to hold the "info" options for api call
    const base = "base_info"
    const creators = "creators_directors_writers"
    const cast = "extendedCast"

    // Use Effect to get movie data
    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
            params: { info: 'base_info' },
            headers: {
                'X-RapidAPI-Key': '18ae27c303mshbe6e99c6691e31fp1814f0jsne60650dd7757',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        }

        axios.request()
    })

    return (
        <div className='section'>
            <div id='details-block' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>Film Name</p>
                </div>

                {/* Bottom Block */}
                <div className='block-bottom'>

                </div>
            </div>
        </div>
    )
}

export default MovieDetails