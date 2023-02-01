import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './page/Admin';
import AdminMultiple from './page/AdminMultiple';
import MultipleImage from './MultipleImage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/images' element={<MultipleImage />} />
        <Route path='admin' element={<Admin />} />
        <Route path='adminfiles' element={<AdminMultiple />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

