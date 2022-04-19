import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PaymentForm from './components/PaymentForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<PaymentForm />} path='/' />
          {/* <Route element={<Login />} path='/' />
          <Route element={<Register />} path='/register' /> */}
          {/* <Route element={<Home />} path='/home' /> */}
          {/* <Route element={<FavoriteDetails />} path='/favorites/:iconid/:symbol/' /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
