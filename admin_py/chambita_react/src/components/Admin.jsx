// src/components/Admin.jsx
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import RolesList from './RolesList';
import UsuariosList from './UsuariosList';
import DatosPostulantesList from './DatosPostulantesList';
import SectoresList from './SectoresList';
import EmpresasList from './EmpresasList';
import OfertasList from './OfertasList';
import PostulacionesList from './PostulacionesList';
import ContratacionesList from './ContratacionesList';

const Admin = () => {
  return (
    <div className="container mt-5">
      <h1>Admin Panel</h1>
      <div className="row mt-4">
        <div className="col-3">
          <ul className="list-group">
            <li className="list-group-item"><Link to="/roles">Roles</Link></li>
            <li className="list-group-item"><Link to="/usuarios">Usuarios</Link></li>
            <li className="list-group-item"><Link to="/datos-postulantes">Datos Postulantes</Link></li>
            <li className="list-group-item"><Link to="/sectores">Sectores</Link></li>
            <li className="list-group-item"><Link to="/empresas">Empresas</Link></li>
            <li className="list-group-item"><Link to="/ofertas">Ofertas</Link></li>
            <li className="list-group-item"><Link to="/postulaciones">Postulaciones</Link></li>
            <li className="list-group-item"><Link to="/contrataciones">Contrataciones</Link></li>
          </ul>
        </div>
        <div className="col-9">
          <Routes>
            <Route path="/roles" element={<RolesList />} />
            <Route path="/usuarios" element={<UsuariosList />} />
            <Route path="/datos-postulantes" element={<DatosPostulantesList />} />
            <Route path="/sectores" element={<SectoresList />} />
            <Route path="/empresas" element={<EmpresasList />} />
            <Route path="/ofertas" element={<OfertasList />} />
            <Route path="/postulaciones" element={<PostulacionesList />} />
            <Route path="/contrataciones" element={<ContratacionesList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
