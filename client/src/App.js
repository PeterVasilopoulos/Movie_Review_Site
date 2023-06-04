import {Routes, Route, Link} from 'react-router-dom'
import './App.css'

// Route Imports
import Navbar from './components/Navbar'
import DisplaySearch from './components/DisplaySearch';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path='/' element={<DisplaySearch/>}/>
        
        {/* Movie Details Page */}
        <Route path='/movies/:id' element={<MovieDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;