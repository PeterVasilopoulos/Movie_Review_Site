import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../libs/context'
import axios from 'axios'

const Navbar = () => {
    // Logged in user variable
    const { loggedUser } = useAppContext()

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
        axios.delete("http://localhost:8000/api/users/logout", { withCredentials: true })
            .then((res) => {
                navigate('/')
            })
    }

    // Login button function
    const login = (e) => {
        e.preventDefault()

        navigate('/')
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
                        <a href="/movies" className='nb-menu-item'>
                            Movies
                        </a>

                        <span> | </span>

                        {/* Users Search */}
                        <a href="/users" className='nb-menu-item'>
                            Users
                        </a>

                        <span> | </span>

                        {/* My Reviews */}
                        {/* CHANGE LINK TO INCLUDE USER'S ID */}
                        <a href="/users/" className='nb-menu-item'>
                            My Reviews
                        </a>

                        <span> | </span>

                        {/* Watchlist */}
                        {/* CHANGE LINK TO INCLUDE USER'S ID */}
                        <a href="/watchlist/" className='nb-menu-item'>
                            Watchlist
                        </a>
                    </div>

                    {/* Login/Logout */}
                    <div id='navbar-buttons'>
                        {
                            loggedUser ?
                                <div className='navbar-buttons'>
                                    {/* Username (only displays if logged in) */}
                                    <p className='bold navbar-username'>{loggedUser.username}</p>

                                    {/* Logout Button */}
                                    <button className='btn' onClick={logout}>Logout</button>
                                </div>
                                :
                                <div className='navbar-buttons'>
                                    {/* Login Button */}
                                    <button className='btn' onClick={login}>Login</button>
                                </div>
                        }


                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar