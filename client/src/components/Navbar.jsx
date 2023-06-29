import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../libs/context'
import axios from 'axios'

const Navbar = () => {
    // Logged in user variable
    const {loggedUser, setLoggedUser} = useAppContext()

    // Setup navigate variable
    const navigate = useNavigate()

    // Logout check variable
    const [loggedOut, setLoggedOut] = useState(false)

    // Check if user is logged in
    useEffect(() => {
        if(!loggedUser) {
            axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
                .then((res) => {
                    // User is logged in, set logged user variable
                    setLoggedUser(res.data)
                })
                .catch(() => {
                    // User is not logged in, clear logged user variable
                    setLoggedUser()
                })
        }
    }, [loggedOut])

    // Logout button function
    const logout = (e) => {
        e.preventDefault()

        // Swap logged out variable
        setLoggedOut(!loggedOut)

        axios.delete("http://localhost:8000/api/users/logout", {withCredentials: true})
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
                        <Link to="/movies" className='nb-menu-item'>
                            Movies
                        </Link>

                        <span> | </span>

                        {/* Users Search */}
                        <Link to="/users" className='nb-menu-item'>
                            Users
                        </Link>

                        <span> | </span>

                        {/* My Reviews */}
                        {/* CHANGE LINK TO INCLUDE USER'S ID */}
                        <Link to="/users/" className='nb-menu-item'>
                            My Reviews
                        </Link>

                        <span> | </span>

                        {/* Watchlist */}
                        {/* CHANGE LINK TO INCLUDE USER'S ID */}
                        <Link to="/watchlist/" className='nb-menu-item'>
                            Watchlist
                        </Link>
                    </div>

                    {/* Login/Logout */}
                    <div id='navbar-buttons'>
                        {
                            loggedUser ?
                                <div className='navbar-buttons'>
                                    {/* Username (only displays if logged in) */}
                                    <Link to={`/users/${loggedUser._id}`} className='nb-menu-item bold navbar-username'>
                                        {loggedUser.username}
                                    </Link>

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