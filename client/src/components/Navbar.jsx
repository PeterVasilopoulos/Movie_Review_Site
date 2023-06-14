import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    // Setup navigate variable
    const navigate = useNavigate()

    // Movie Search Button
    const movieSearch = (e) => {
        e.preventDefault()

        // Navigate to movie search page
        navigate('/movies')
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
                        The Film Repository
                    </Link>
                </div>

                {/* Bottom Section */}
                <div id='navbar-bottom'>
                    {/* Movie Search Button */}
                    <div id='navbar-menu'>
                        {/* Movies Search */}
                        <a href="/movies">
                            Movies
                        </a>

                        <span> | </span>

                        {/* Users Search */}
                        <a href="/users">
                            Users
                        </a>

                        <span> | </span>

                        {/* My Reviews */}
                        {/* CHANGE LINK TO INCLUDE USER'S ID */}
                        <a href="/users/">
                            My Reviews
                        </a>
                    </div>

                    {/* Login/Logout */}
                    <div id='navbar-buttons'>
                        <button className='btn' onClick={logout}>Logout</button>
                    </div>                </div>

            </div>
        </div>
    )
}

export default Navbar