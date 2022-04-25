import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import DisplayOne from './components/DisplayOne';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './views/Home';
import OrderSuccess from './components/OrderSuccess';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Registration />} path='/registration' />
          <Route element={<Home />} path='/home' />
          <Route element={<DisplayOne />} path='/products/:id' />
          <Route element={<OrderSuccess/>} path='/confirmation'/>
        </Routes>
      
      </div>

    </BrowserRouter>
    
  );
}

export default App;
