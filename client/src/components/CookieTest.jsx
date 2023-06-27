import React, { useEffect } from 'react'
import axios from 'axios'

const CookieTest = () => {
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/cookie', {withCredentials:true})
        .then(res => console.log("success"))
        .catch()
    })

    return (
        <div>

        </div>
    )
}

export default CookieTest