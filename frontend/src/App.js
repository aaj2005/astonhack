import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Navtest from './components/Navtest';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <NavigationBar/> */}
      <Navtest/>
      <div className='page'>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
