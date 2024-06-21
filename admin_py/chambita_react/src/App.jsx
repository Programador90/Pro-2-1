import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DatosPostulantesList from './components/DatosPostulantesList';
import SectoresList from './components/SectoresList';
import EmpresasList from './components/EmpresasList';
import OfertasList from './components/OfertasList';
import PostulacionesList from './components/PostulacionesList';
import ContratacionesList from './components/ContratacionesList';
import RolesList from './components/RolesList';
import UsuariosList from './components/UsuariosList';
import Welcome from './components/Welcome';
import PrivateRoute from './components/PrivateRoute';
import Admin from './components/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/datos-postulantes" element={<DatosPostulantesList />} />
          <Route path="/sectores" element={<SectoresList />} />
          <Route path="/empresas" element={<EmpresasList />} />
          <Route path="/ofertas" element={<OfertasList />} />
          <Route path="/postulaciones" element={<PostulacionesList />} />
          <Route path="/contrataciones" element={<ContratacionesList />} />
          <Route path="/roles" element={<RolesList />} />
          <Route path="/usuarios" element={<UsuariosList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
