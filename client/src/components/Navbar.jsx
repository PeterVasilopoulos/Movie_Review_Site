import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    // Setup navigate variable
    const navigate = useNavigate()

    // Search movie function
    const searchMovie = (e) => {
        e.preventDefault()
    }

    // My reviews button
    const myReviews = (e) => {
        e.preventDefault()

        // Navigate to my reviews page
        navigate('/')
    }

    // Logout button function
    const logout = (e) => {
        e.preventDefault()
    }

    return (
        <div className='section'>
            {/* New Navbar */}
            <div id="navbar" className='block-outline'>

                {/* Title */}
                <div id='navbar-title' className='block-top'>
                    <Link id='nt-text' to={'/'}>
                        Movie Reviews
                    </Link>
                </div>

                {/* Bottom Section */}
                <div id='navbar-bottom'>
                    {/* Search */}
                    <form id='movie-search-form' onSubmit={searchMovie}>
                        <input type="text" placeholder='Search for a movie or user' />
                        <button className='btn'>Search</button>
                    </form>

                    {/* Login/Logout */}
                    <div id='navbar-buttons'>
                        <button className='btn' onClick={myReviews}>My Reviews</button>
                        <button className='btn' onClick={logout}>Logout</button>
                    </div>                </div>

            </div>
        </div>
    )
}

export default Navbar