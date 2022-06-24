import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './components/Landing/Landing';
import Transactions from './components/Transactions/Transactions';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="Landing" element={<Landing />} />
        <Route path="Transactions" element={<Transactions />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
