import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../libs/context'
import axios from 'axios'

const LoginReg = () => {
    // Navigate variable
    const navigate = useNavigate()

    // Register form data variable
    const [regFormData, setRegFormData] = useState({})

    // Login form data variable
    const [loginFormData, setLoginFormData] = useState({})

    // Register form errors variable
    const [regFormErrors, setRegFormErrors] = useState({})

    // Login form errors variable
    const [loginFormErrors, setLoginFormErrors] = useState({})

    // Logged in user variable
    const { setLoggedUser } = useAppContext()


    // Registration submit handler
    const registerSubmit = (e) => {
        // Prevent page reload
        e.preventDefault()
        // Reset errors
        setRegFormErrors()
        // Axios post reqeust
        axios.post('http://localhost:8000/api/users/new', regFormData, { withCredentials: true })
            .then(res => {
                // Set logged user context variable
                setLoggedUser(res.data)
                // Navigate to user's page
                navigate(`/users/${res.data._id}`)
            })
            .catch(err => {
                // Set errors if there are any
                setRegFormErrors(err.response.data.errors)
                console.log(err)
            })
    }

    // Login submit handler
    const loginSubmit = (e) => {
        // Prevent page reload
        e.preventDefault()
        // Reset errors
        setLoginFormErrors()
        // Axios post reqeust
        axios.post('http://localhost:8000/api/users/login', loginFormData, { withCredentials: true })
            .then(res => {
                // Set logged user context variable
                setLoggedUser(res.data)
                // Navigate to user's page
                navigate(`/movies`)
            })
            .catch(err => {
                // Set errors if there are any
                setLoginFormErrors(err.response.data.errors)
            })
    }

    // Handle registration change
    const regChange = (e) => {
        setRegFormData({ ...regFormData, [e.target.name]: e.target.value })
    }

    // Handle login change
    const loginChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
    }

    return (
        <div className='section'>
            <div id='login-reg-page' className='block-outline'>
                {/* Top Block */}
                <div className='block-top'>
                    <p>Login and Registration</p>
                </div>

                {/* Bottom Block */}
                <div className='block-bottom' id='lr-bottom'>
                    <div id='lr-forms'>
                        {/* Registration Form */}
                        <div className='block-outline'>
                            <h2 className='block-top'>Register</h2>
                            <form action={registerSubmit} className='block-bottom'>
                                <table className='lr-form'>
                                    <tbody>
                                        {/* First Name */}
                                        <tr>
                                            <td><label>First Name:</label></td>
                                            <td><input type='text' name='firstName' onChange={regChange}/></td>
                                        </tr>
                                        {/* Last Name */}
                                        <tr>
                                            <td><label>Last Name:</label></td>
                                            <td><input type='text' name='lastName' onChange={regChange}/></td>
                                        </tr>
                                        {/* Username */}
                                        <tr>
                                            <td><label>Username:</label></td>
                                            <td><input type="text" name='username' onChange={regChange}/></td>
                                        </tr>
                                        {/* Password */}
                                        <tr>
                                            <td><label>Password:</label></td>
                                            <td><input type="password" name='password' onChange={regChange}/></td>
                                        </tr>
                                        {/* Confirm Password */}
                                        <tr>
                                            <td><label>Confirm Password:</label></td>
                                            <td><input type="password" name='confirmPassword' onChange={regChange}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* Submit Button */}
                                <div className='lr-submit'>
                                    <button className='btn'>Register</button>
                                </div>
                            </form>

                            {/* Errors */}
                            {regFormErrors.message}
                        </div>

                        {/* Login Form */}
                        <div className='block-outline'>
                            <h2 className='block-top'>Login</h2>
                            <form action="" className='block-bottom'>
                                <table className='lr-form'>
                                    <tbody>
                                        {/* Username */}
                                        <tr>
                                            <td><label>Username:</label></td>
                                            <td><input type='text' name='username' onChange={loginChange}/></td>
                                        </tr>
                                        {/* Password */}
                                        <tr>
                                            <td><label>Password:</label></td>
                                            <td><input type='password' name='password' onChange={loginChange}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* Submit Button */}
                                <div className='lr-submit'>
                                    <button className='btn'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginReg