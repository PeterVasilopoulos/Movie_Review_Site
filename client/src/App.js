import {Routes, Route, Link} from 'react-router-dom'
import './App.css'

// Route Imports
import Navbar from './components/Navbar'
import DisplaySearch from './components/DisplaySearch';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path='/' element={<DisplaySearch/>}/>
      </Routes>
    </div>
  );
}

export default App;