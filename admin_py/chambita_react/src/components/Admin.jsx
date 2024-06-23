import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import RolesList from './RolesList';
import UsuariosList from './UsuariosList';
import DatosPostulantesList from './DatosPostulantesList';
import SectoresList from './SectoresList';
import EmpresasList from './EmpresasList';
import OfertasList from './OfertasList';
import PostulacionesList from './PostulacionesList';
import ContratacionesList from './ContratacionesList';
import logo from '../assets/Designer.jpeg'; // Asegúrate de que la ruta del logo es correcta
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className="container-fluid">
      <div className="row bg-">
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <img src={logo} alt="Logo" className="img-fluid my-2" style={{ maxWidth: '120px', maxHeight: '150px' }} />
        </div>
        <div className="col-md-8 text-center my-3">
          <h1>Chambita - Tec</h1>
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-end my-3">
          <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
      <div className="row">
        <nav className="col-md-2 bg-light vh-100">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/roles" className="nav-link">Roles</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/usuarios" className="nav-link">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/datospostulantes" className="nav-link">Datos Postulantes</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/sectores" className="nav-link">Sectores</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/empresas" className="nav-link">Empresas</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/ofertas" className="nav-link">Ofertas</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/postulaciones" className="nav-link">Postulaciones</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/contrataciones" className="nav-link">Contrataciones</Link>
            </li>
          </ul>
        </nav>
        <main className="col-md-10 ml-sm-auto px-4">
          <Routes>
            <Route path="roles" element={<RolesList />} />
            <Route path="usuarios" element={<UsuariosList />} />
            <Route path="datospostulantes" element={<DatosPostulantesList />} />
            <Route path="sectores" element={<SectoresList />} />
            <Route path="empresas" element={<EmpresasList />} />
            <Route path="ofertas" element={<OfertasList />} />
            <Route path="postulaciones" element={<PostulacionesList />} />
            <Route path="contrataciones" element={<ContratacionesList />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Admin;
