import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [newRol, setNewRol] = useState({ tipo: '' });
  const [editRol, setEditRol] = useState({ id: null, tipo: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios.get('/roles/')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los roles:", error);
      });
  };

  const addRol = () => {
    axios.post('/roles/', newRol)
      .then(response => {
        fetchRoles();
        setNewRol({ tipo: '' });
      })
      .catch(error => {
        console.error("Hubo un error al añadir el rol:", error);
      });
  };

  const updateRol = (id) => {
    axios.put(`/roles/${id}/`, editRol)
      .then(response => {
        fetchRoles();
        setEditId(null);
        setEditRol({ id: null, tipo: '' });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar el rol:", error);
      });
  };

  const deleteRol = (id) => {
    axios.delete(`/roles/${id}/`)
      .then(response => {
        fetchRoles();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar el rol:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="my-4">Lista de Roles</h1>
      <ul className="list-group mb-4">
        {roles.map(rol => (
          <li key={rol.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === rol.id ? (
              <input
                type="text"
                value={editRol.tipo}
                onChange={(e) => setEditRol({ ...editRol, tipo: e.target.value })}
                className="form-control"
              />
            ) : (
              <span>{rol.tipo}</span>
            )}
            <div>
              {editId === rol.id ? (
                <>
                  <button className="btn btn-success mr-2" onClick={() => updateRol(rol.id)}>Guardar</button>
                  <button className="btn btn-secondary" onClick={() => setEditId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <button className="btn btn-warning mr-2" onClick={() => { setEditId(rol.id); setEditRol(rol); }}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deleteRol(rol.id)}>Eliminar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <h2>Añadir Nuevo Rol</h2>
        <input
          type="text"
          value={newRol.tipo}
          onChange={(e) => setNewRol({ tipo: e.target.value })}
          placeholder="Tipo de Rol"
          className="form-control my-1"
        />
        <button onClick={addRol} className="btn btn-primary my-2">Añadir Rol</button>
      </div>
    </div>
  );
};

export default RolesList;
