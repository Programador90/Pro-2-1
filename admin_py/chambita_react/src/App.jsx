import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Admin from './components/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
