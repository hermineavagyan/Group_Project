import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import DisplayOne from './components/DisplayOne';
import Login from './components/Login';
import Registration from './components/Registration';
import CheckoutForm from './components/CheckoutForm'
import Home from './views/Home';
import Profile from './components/Profile';
import MyContext from './components/MyContext'; // global state.

function App() {

  const [ cartCount, setCartCount ] = useState(0);

  return (
    <BrowserRouter>
      <div className="App">
        <MyContext.Provider value={{ cartCount, setCartCount }}>
            <Routes>
              <Route element={<Login />} path='/' />
              <Route element={<Registration />} path='/registration' />
              <Route element={<Home />} path='/home' />
              <Route element={<CheckoutForm />} path="/checkout" />
              <Route element={<DisplayOne />} path='/product/:id' />
              <Route element={<Profile />} path='/users/:id' />
            </Routes>
          </MyContext.Provider>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
