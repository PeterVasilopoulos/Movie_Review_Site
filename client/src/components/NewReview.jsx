import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../libs/context'

const NewReview = () => {
    // Get id from param
    const { id } = useParams()

    // Get logged user 
    const { loggedUser } = useAppContext()

    // Variable to hold the movie information
    const [movieData, setMovieData] = useState({})

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
                        
                    </div>

                    {/* Review Form */}
                    <div id='review-form'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewReview