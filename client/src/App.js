import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AppContext from './libs/context';
import { useState } from 'react';

// Route Imports
import Navbar from './components/Navbar'
import DisplaySearch from './components/DisplaySearch';
import MovieDetails from './components/MovieDetails';
import CastAndCrew from './components/CastAndCrew';

function App() {
  // Logged user context variable
  const [loggedUser, setLoggedUser] = useState()

  return (
    <div className="App">
      <AppContext.Provider value={{ loggedUser, setLoggedUser }}>

        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route path='/' />

          {/* Movie Search Page */}
          <Route path='/movies' element={<DisplaySearch />} />

          {/* Movie Details Page */}
          <Route path='/movies/:id' element={<MovieDetails />} />

          {/* Cast and Crew Page */}
          <Route path='/movies/cast&crew/:id' element={<CastAndCrew />} />

        </Routes>

      </AppContext.Provider>
    </div>
  );
}

export default App;