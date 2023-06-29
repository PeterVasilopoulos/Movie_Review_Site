import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AllUsers = () => {
    // Variable to hold list of users
    const [foundUsers, setFoundUsers] = useState([])

    // Axios request to get all users
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then((res) => {
                // Set users variable
                setFoundUsers(res.data.results)
                console.log("USERS", res.data.results)
            })
            .catch((err) => {
                // Log error if there is one
                console.log("API Error: ", err)
            })
    }, [])

    return (
        <div className='section'>
            <div id='all-users' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>All Users</p>
                </div>

                {/* Bottom Block */}
                <div id='al-users-block' className='block-bottom'>
                    {/* Map through all found users */}
                    {
                        foundUsers.length >= 1 ?
                            foundUsers.map((user, i) => {
                                return (
                                    <div key={i} className='al-user al-outline'>
                                        {/* Username */}
                                        <div className='block-top al-user-top'>
                                            <Link className='al-username bold' to={`/users/${user._id}`}>
                                                {user.username}
                                            </Link>
                                        </div>

                                        {/* Other User Info */}
                                        <div className='al-user-bottom'>
                                            <div>
                                                {/* Real Name */}
                                                <p className='al-real-name'>
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                {/* Account Creation Date */}
                                                <p>
                                                    <span className='bold'>User Since:</span> {user.createdAt.slice(0, 10)}
                                                </p>
                                                {/* Number of Reviews */}
                                                <p>
                                                    <span className='bold'>Number of Reviews:</span> {user.reviews.length}
                                                </p>
                                            </div>

                                            {/* View User Button */}
                                            <div>
                                                <Link className='al-view' to={`/users/${user._id}`}>
                                                    View User
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <p>No Users</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default AllUsers