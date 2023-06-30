import React from 'react'
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
                    test
                </div>
            </div>
        </div>
    )
}

export default Homepage