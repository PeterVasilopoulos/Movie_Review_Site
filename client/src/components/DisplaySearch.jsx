import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DisplaySearch = () => {


    return (
        <div className='section'>
            {/* Filters (Left) */}
            <div id='display-filters' className='block-outline'>
                {/* Title */}
                <div className='block-top'>
                    Filters
                </div>

                {/* Filters */}
                <div className='block-bottom'>

                </div>
            </div>

            {/* Search Content (Right) */}
            <div id='display-content' className='block-outline'>
                {/* Title */}
                <div className='block-top'>
                    Results
                </div>

                {/* Search Results */}
                <div className='block-bottom'>
                    
                    {/* Movie Test */}
                    <div className='movie-info'>
                        {/* Poster */}
                        <img className='movie-poster' src="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/dunenew_631x.jpg?v=1646940429" alt="movie poster"/>
                        <div>
                            {/* Title */}
                            <Link className='movie-title'>Dune</Link>
                            {/* <p className='movie-title'>Dune</p> */}
                            {/* Year, Length, Age Rating, Genre */}
                            <p className='movie-details'>
                                2021 <span>| </span> 
                                2h 35m <span>| </span> 
                                PG-13 <span>| </span> 
                                Action, Adventure, Sci-Fi
                            </p>
                            {/* Score Rating, Director, Cast */}
                            <p className='movie-details'>
                                ⭐8.0 <span>| </span>
                                Denis Villeneuve <span>| </span>
                                Timothée Chalamet, Rebecca Ferguson, Zendaya
                            </p>
                            {/* Description */}
                            <p className='movie-details movie-description'>
                                A noble family becomes embroiled in a war for control over 
                                the galaxy's most valuable asset while its heir becomes 
                                troubled by visions of a dark future.
                            </p>
                        </div>
                    </div>

                    {/* Movie Test */}
                    <div className='movie-info'>
                        {/* Poster */}
                        <img className='movie-poster' src="https://m.media-amazon.com/images/I/51kFHEgj59L._AC_.jpg" alt="movie poster"/>
                        <div>
                            {/* Title */}
                            <Link className='movie-title'>Blade Runner 2049</Link>
                            {/* Year, Length, Age Rating, Genre */}
                            <p className='movie-details'>
                                2017 <span>| </span> 
                                2h 44m <span>| </span> 
                                R <span>| </span> 
                                Action, Mystery, Sci-Fi
                            </p>
                            {/* Score Rating, Director, Cast */}
                            <p className='movie-details'>
                                ⭐8.0 <span>| </span>
                                Denis Villeneuve <span>| </span>
                                Ryan Gosling, Harrison Ford, Ana de Armas
                            </p>
                            {/* Description */}
                            <p className='movie-details movie-description'>
                                Young Blade Runner K's discovery of a long-buried secret 
                                leads him to track down former Blade Runner Rick Deckard, 
                                who's been missing for thirty years.
                                who's been missing for thirty years.
                                who's been missing for thirty years.
                            </p>
                        </div>
                    </div>

                    {/* Movie Test */}
                    <div className='movie-info'>
                        {/* Poster */}
                        <img className='movie-poster' src="https://m.media-amazon.com/images/I/51kFHEgj59L._AC_.jpg" alt="movie poster"/>
                        <div>
                            {/* Title */}
                            <Link className='movie-title'>Blade Runner 2049</Link>
                            {/* Year, Length, Age Rating, Genre */}
                            <p className='movie-details'>
                                2017 <span>| </span> 
                                2h 44m <span>| </span> 
                                R <span>| </span> 
                                Action, Mystery, Sci-Fi
                            </p>
                            {/* Score Rating, Director, Cast */}
                            <p className='movie-details'>
                                ⭐8.0 <span>| </span>
                                Denis Villeneuve <span>| </span>
                                Ryan Gosling, Harrison Ford, Ana de Armas
                            </p>
                            {/* Description */}
                            <p className='movie-details movie-description'>
                                Young Blade Runner K's discovery of a long-buried secret 
                                leads him to track down former Blade Runner Rick Deckard, 
                                who's been missing for thirty years.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DisplaySearch