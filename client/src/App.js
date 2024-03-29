import { Routes, Route } from 'react-router-dom'
import AppContext from './libs/context';
import { useState } from 'react';
import './App.css'

// Route Imports
import Navbar from './components/Navbar'
import DisplaySearch from './components/DisplaySearch';
import MovieDetails from './components/MovieDetails';
import CastAndCrew from './components/CastAndCrew';
import LoginReg from './components/LoginReg';
import AllUsers from './components/AllUsers';
import OneUser from './components/OneUser';
import NewReview from './components/NewReview';
import Homepage from './components/Homepage';

function App() {
  // Logged user context variable
  const [loggedUser, setLoggedUser] = useState()

  return (
    <div className="App">
      <AppContext.Provider value={{ loggedUser, setLoggedUser }}>

        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route path='/' element={<Homepage />} />

          {/* Login Page */}
          <Route path='/login' element={<LoginReg />} />

          {/* Movie Search Page */}
          <Route path='/movies' element={<DisplaySearch />} />

          {/* Movie Details Page */}
          <Route path='/movies/:id' element={<MovieDetails />} />

          {/* Cast and Crew Page */}
          <Route path='/movies/cast&crew/:id' element={<CastAndCrew />} />

          {/* New Review Page */}
          <Route path='/movies/:id/review' element={<NewReview />} />

          {/* All Users Page */}
          <Route path='/users' element={<AllUsers />} />

          {/* One User Page */}
          <Route path='/users/:id' element={<OneUser />} />
        </Routes>

      </AppContext.Provider>
    </div>
  );
}

export default App;