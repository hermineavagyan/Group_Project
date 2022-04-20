import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './views/Home';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Registration />} path='/registration' />
          <Route element={<Home />} path='/home' />
        </Routes>
      
      </div>

    </BrowserRouter>
    
  );
}

export default App;
