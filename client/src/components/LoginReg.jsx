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
    const {loggedUser, setLoggedUser} = useAppContext()


    // Registration submit handler
    const registerSubmit = (e) => {
        // Prevent page reload
        e.preventDefault()
        // Reset errors
        setRegFormErrors({})
        // Axios post reqeust
        axios.post('http://localhost:8000/api/users/new', regFormData, { withCredentials: true })
            .then(res => {
                // Clear the registration form errors
                setRegFormErrors({})
                // Set logged user context variable
                setLoggedUser(res.data)
                console.log(res.data)
                // Navigate to user's page
                navigate(`/users/${res.data._id}`)
            })
            .catch(err => {
                // Set errors if there are any
                setRegFormErrors(err.response.data.errors)
            })
    }

    // Login submit handler
    const loginSubmit = (e) => {
        // Prevent page reload
        e.preventDefault()
        // Reset errors
        setLoginFormErrors({})
        // Axios post reqeust
        axios.post('http://localhost:8000/api/users/login', loginFormData, { withCredentials: true })
            .then(res => {
                // Clear the login form errors
                setLoginFormErrors({})
                // Set logged user context variable
                setLoggedUser(res.data)
                console.log(res)
                // Navigate to user's page
                navigate(`/`)
            })
            .catch(err => {
                // Set errors if there are any
                setLoginFormErrors(err.response.data.errors)
                console.log(err.response.data.errors)
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

    // Check if user is already logged in, if so reroute to movies page
    if(loggedUser) {
        navigate("/movies")
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
                            <form onSubmit={registerSubmit} className='block-bottom'>
                                <table className='lr-form'>
                                    <tbody>
                                        {/* First Name */}
                                        <tr>
                                            <td><label>First Name:</label></td>
                                            <td><input type='text' name='firstName' onChange={regChange} /></td>
                                        </tr>
                                        {/* Last Name */}
                                        <tr>
                                            <td><label>Last Name:</label></td>
                                            <td><input type='text' name='lastName' onChange={regChange} /></td>
                                        </tr>
                                        {/* Username */}
                                        <tr>
                                            <td><label>Username:</label></td>
                                            <td><input type="text" name='username' onChange={regChange} /></td>
                                        </tr>
                                        {/* Password */}
                                        <tr>
                                            <td><label>Password:</label></td>
                                            <td><input type="password" name='password' onChange={regChange} /></td>
                                        </tr>
                                        {/* Confirm Password */}
                                        <tr>
                                            <td><label>Confirm Password:</label></td>
                                            <td><input type="password" name='confirmPassword' onChange={regChange} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* Submit Button */}
                                <div className='lr-submit'>
                                    <button className='btn'>Register</button>
                                </div>
                            </form>

                            {/* Registration Errors */}
                            {
                                // Checking if registration form errors variable exists
                                regFormErrors ?
                                    <div className='lr-errors'>
                                        {/* First Name */}
                                        {
                                            regFormErrors.firstName ?
                                                <p>{regFormErrors.firstName.message}</p>
                                                : false
                                        }
                                        {/* Last Name */}
                                        {
                                            regFormErrors.lastName ?
                                                <p>{regFormErrors.lastName.message}</p>
                                                : false
                                        }
                                        {/* Username */}
                                        {
                                            regFormErrors.username ?
                                                <p>{regFormErrors.username.message}</p>
                                                : false
                                        }
                                        {/* Password */}
                                        {
                                            regFormErrors.password ?
                                                <p>{regFormErrors.password.message}</p>
                                                : false
                                        }
                                        {/* Confirm Password */}
                                        {
                                            regFormErrors.confirmPassword ?
                                                <p>{regFormErrors.confirmPassword.message}</p>
                                                : false
                                        }
                                    </div>
                                    : false
                            }
                        </div>

                        {/* Login Form */}
                        <div className='block-outline'>
                            <h2 className='block-top'>Login</h2>
                            <form onSubmit={loginSubmit} className='block-bottom'>
                                <table className='lr-form'>
                                    <tbody>
                                        {/* Username */}
                                        <tr>
                                            <td><label>Username:</label></td>
                                            <td><input type='text' name='username' onChange={loginChange} /></td>
                                        </tr>
                                        {/* Password */}
                                        <tr>
                                            <td><label>Password:</label></td>
                                            <td><input type='password' name='password' onChange={loginChange} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* Submit Button */}
                                <div className='lr-submit'>
                                    <button className='btn'>Login</button>
                                </div>
                            </form>

                            {/* Registration Errors */}
                            {
                                // Checking if registration form errors variable exists
                                loginFormErrors ?
                                    <div className='lr-errors'>
                                        {/* Username */}
                                        {
                                            loginFormErrors.username ?
                                                <p>{loginFormErrors.username.message}</p>
                                                : false
                                        }
                                        {/* Password */}
                                        {
                                            loginFormErrors.password ?
                                                <p>{loginFormErrors.password.message}</p>
                                                : false
                                        }
                                    </div>
                                    : false
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginReg