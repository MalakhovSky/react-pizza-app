import './App.css';
import './scss/app.scss';
import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Link, BrowserRouter } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';

// https://63822c13281f14ffefa1fe72.mockapi.io/items
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
