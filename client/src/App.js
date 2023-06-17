import {Routes, Route, Link} from 'react-router-dom'
import './App.css'

// Route Imports
import Navbar from './components/Navbar'
import DisplaySearch from './components/DisplaySearch';
import MovieDetails from './components/MovieDetails';
import CastAndCrew from './components/CastAndCrew';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path='/'/>

        {/* Movie Search Page */}
        <Route path='/movies' element={<DisplaySearch/>}/>
        
        {/* Movie Details Page */}
        <Route path='/movies/:id' element={<MovieDetails/>}/>

        {/* Cast and Crew Page */}
        <Route path='/movies/cast&crew/:id' element={<CastAndCrew/>}/>
      </Routes>
    </div>
  );
}

export default App;