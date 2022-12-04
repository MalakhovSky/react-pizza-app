import './App.css';
import './scss/app.scss';
import React, { useState, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Route, Link, BrowserRouter } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';

export const SearchContext = createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
