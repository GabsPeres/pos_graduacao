import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import Header from './components/Header';
import Navigation from './components/Navigation';
import Article from './components/Article';
import Sidebar from './components/Sidebar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Header />
     <Navigation />
     <Article />
     <Sidebar />
  </React.StrictMode>
);

reportWebVitals();
