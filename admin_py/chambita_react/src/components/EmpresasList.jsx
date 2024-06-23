import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const EmpresasList = () => {
  const [empresas, setEmpresas] = useState([]);
  const [newEmpresa, setNewEmpresa] = useState({
    nombre_comercial: '',
    telefono: '',
    ruc: '',
    distrito: '',
    direccion: '',
    sector: ''
  });
  const [editEmpresa, setEditEmpresa] = useState(null);
  const [sectores, setSectores] = useState([]);

  useEffect(() => {
    fetchEmpresas();
    fetchSectores();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get('/empresas/');
      setEmpresas(response.data);
    } catch (error) {
      console.error("Hubo un error al obtener las empresas:", error);
    }
  };

  const fetchSectores = async () => {
    try {
      const response = await axios.get('/sectores/');
      setSectores(response.data);
    } catch (error) {
      console.error("Hubo un error al obtener los sectores:", error);
    }
  };

  const addEmpresa = async () => {
    try {
      await axios.post('/empresas/', newEmpresa);
      fetchEmpresas();
      setNewEmpresa({
        nombre_comercial: '',
        telefono: '',
        ruc: '',
        distrito: '',
        direccion: '',
        sector: ''
      });
    } catch (error) {
      console.error("Hubo un error al añadir la empresa:", error);
    }
  };

  const updateEmpresa = async (id) => {
    try {
      await axios.put(`/empresas/${id}/`, editEmpresa);
      fetchEmpresas();
      setEditEmpresa(null);
    } catch (error) {
      console.error("Hubo un error al actualizar la empresa:", error);
    }
  };

  const deleteEmpresa = async (id) => {
    try {
      await axios.delete(`/empresas/${id}/`);
      fetchEmpresas();
    } catch (error) {
      console.error("Hubo un error al eliminar la empresa:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Lista de Empresas</h2>
      <ul className="list-group mb-4">
        {empresas.map(empresa => (
          <li key={empresa.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editEmpresa && editEmpresa.id === empresa.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editEmpresa.nombre_comercial}
                  onChange={(e) => setEditEmpresa({ ...editEmpresa, nombre_comercial: e.target.value })}
                  className="form-control my-1"
                  placeholder="Nombre Comercial"
                />
                <input
                  type="text"
                  value={editEmpresa.telefono}
                  onChange={(e) => setEditEmpresa({ ...editEmpresa, telefono: e.target.value })}
                  className="form-control my-1"
                  placeholder="Teléfono"
                />
                <input
                  type="text"
                  value={editEmpresa.ruc}
                  onChange={(e) => setEditEmpresa({ ...editEmpresa, ruc: e.target.value })}
                  className="form-control my-1"
                  placeholder="RUC"
                />
                <input
                  type="text"
                  value={editEmpresa.distrito}
                  onChange={(e) => setEditEmpresa({ ...editEmpresa, distrito: e.target.value })}
                  className="form-control my-1"
                  placeholder="Distrito"
                />
                <input
                  type="text"
                  value={editEmpresa.direccion}
                  onChange={(e) => setEditEmpresa({ ...editEmpresa, direccion: e.target.value })}
                  className="form-control my-1"
                  placeholder="Dirección"
                />
                <select
                  value={editEmpresa.sector}
                  onChange={(e) => setEditEmpresa({ ...editEmpresa, sector: e.target.value })}
                  className="form-control my-1"
                >
                  <option value="">Selecciona un sector</option>
                  {sectores.map(sector => (
                    <option key={sector.id} value={sector.id}>{sector.nombre}</option>
                  ))}
                </select>
                <button className="btn btn-success mt-2" onClick={() => updateEmpresa(empresa.id)}>Guardar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>Nombre Comercial: {empresa.nombre_comercial}</p>
                <p>Teléfono: {empresa.telefono}</p>
                <p>RUC: {empresa.ruc}</p>
                <p>Distrito: {empresa.distrito}</p>
                <p>Dirección: {empresa.direccion}</p>
                <p>Sector: {empresa.sector && empresa.sector.nombre ? empresa.sector.nombre : 'Desconocido'}</p>
              </div>
            )}
            <div>
              {editEmpresa && editEmpresa.id === empresa.id ? (
                <button className="btn btn-danger ml-2" onClick={() => setEditEmpresa(null)}>Cancelar</button>
              ) : (
                <>
                  <button className="btn btn-warning mr-2" onClick={() => setEditEmpresa(empresa)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deleteEmpresa(empresa.id)}>Eliminar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <h2 className="text-center">Añadir Nueva Empresa</h2>
        <input
          type="text"
          value={newEmpresa.nombre_comercial}
          onChange={(e) => setNewEmpresa({ ...newEmpresa, nombre_comercial: e.target.value })}
          placeholder="Nombre Comercial"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newEmpresa.telefono}
          onChange={(e) => setNewEmpresa({ ...newEmpresa, telefono: e.target.value })}
          placeholder="Teléfono"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newEmpresa.ruc}
          onChange={(e) => setNewEmpresa({ ...newEmpresa, ruc: e.target.value })}
          placeholder="RUC"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newEmpresa.distrito}
          onChange={(e) => setNewEmpresa({ ...newEmpresa, distrito: e.target.value })}
          placeholder="Distrito"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newEmpresa.direccion}
          onChange={(e) => setNewEmpresa({ ...newEmpresa, direccion: e.target.value })}
          placeholder="Dirección"
          className="form-control my-1"
        />
        <select
          value={newEmpresa.sector}
          onChange={(e) => setNewEmpresa({ ...newEmpresa, sector: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Selecciona un sector</option>
          {sectores.map(sector => (
            <option key={sector.id} value={sector.id}>{sector.nombre}</option>
          ))}
        </select>
        <button className="btn btn-primary mt-2" onClick={addEmpresa}>Añadir Empresa</button>
      </div>
    </div>
  );
};

export default EmpresasList;
