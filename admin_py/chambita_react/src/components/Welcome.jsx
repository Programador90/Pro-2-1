import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Welcome = () => {
  return (
    <div className="container text-center">
      <h1 className="my-4">Bienvenido Tecsup!</h1>
      <div className="d-grid gap-2 d-md-block">
        <Link to="/admin" className="btn btn-primary mx-2">Admin</Link>
        <a href="https://www.google.com" className="btn btn-secondary mx-2">Google</a>
      </div>
    </div>
  );
};

export default Welcome;
