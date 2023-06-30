import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../libs/context'

const Homepage = () => {
    // Get logged user
    const { loggedUser } = useAppContext()

    return (
        <div className='section'>
            <div id='homepage' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>Homepage</p>
                </div>

                {/* Bottom Block */}
                <div className='block-bottom'>
                    {/* Logo */}
                    <div id='home-logo' className='block-outline'>
                        <img src="https://i.imgur.com/2YwsVn2.png" alt="" />
                    </div>

                    {/* Links */}
                    <div id='home-links' className='block-outline'>
                        {/* Top */}
                        <p className='block-top bold'>Links</p>
                        {/* Links Bottom */}
                        <div id='home-links-bottom'>
                            {/* Movies */}
                            <Link to='/movies'>
                                <p className='hl-link link-margin'>
                                    Movies
                                </p>
                            </Link>
                            {/* Users */}
                            <Link to='/users'>
                                <p className='hl-link link-margin'>
                                    Users
                                </p>
                            </Link>

                            {/* Conditional Items */}
                            {
                                !loggedUser ?
                                    // If user is not logged in
                                    <div>
                                        {/* Login */}
                                        < Link to='/login'>
                                            <p className='hl-link'>
                                                Login
                                            </p>
                                        </Link>
                                    </div>
                                    : 
                                    // If user is logged in
                                    <div>
                                    {/* My Reviews */}
                                    < Link to={`/users/${loggedUser._id}`}>
                                        <p className='hl-link link-margin'>
                                            My Reviews
                                        </p>
                                    </Link>
                                    {/* Watchlist */}
                                    < Link to={`/watchlist/`}>
                                        <p className='hl-link'>
                                            Watchlist
                                        </p>
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Homepage