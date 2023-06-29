import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const OneUser = () => {
    // Get user id from use params
    const {id} = useParams()

    // Variable to hold user information
    const [oneUser, setOneUser] = useState({})

    // UseEffect to get the user info
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then((res) => {
                // Set one user variable
                setOneUser(res)
                console.log(res)
            })
            .catch((err) => {
                // Log error if there is one
                console.log("Error: ", err)
            })
    }, [])

    return (
        <div>
            {
                
            }
        </div>
    )
}

export default OneUser