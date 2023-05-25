import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    // Search movie function
    const searchMovie = (e) => {
        e.preventDefault()
    }

    // Logout button function
    const logout = (e) => {
        e.preventDefault()
    }

    return (
        <div id='navbar-block'>
            {/* Title */}
            <p id='navbar-title'>
                Movie Reviews
            </p>

            {/* Search Bar */}
            <form id='movie-search-form' onSubmit={searchMovie}>
                <input type="text" placeholder='Search for a movie'/>
                <button className='btn'>Search</button>
            </form>

            {/* Logout Button */}
            <div id='navbar-buttons'>
                <button className='btn'>My Reviews</button>
                <button className='btn' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar