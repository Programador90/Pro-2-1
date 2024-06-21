import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const ContratacionesList = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newContratacion, setNewContratacion] = useState({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
  const [editContratacion, setEditContratacion] = useState({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContrataciones();
    fetchOfertas();
    fetchUsuarios();
  }, []);

  const fetchContrataciones = () => {
    axios.get('/contrataciones/')
      .then(response => {
        setContrataciones(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las contrataciones:", error);
      });
  };

  const fetchOfertas = () => {
    axios.get('/ofertas_trabajo/')
      .then(response => {
        setOfertas(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las ofertas:", error);
      });
  };

  const fetchUsuarios = () => {
    axios.get('/usuarios/')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  };

  const addContratacion = () => {
    axios.post('/contrataciones/', newContratacion)
      .then(response => {
        fetchContrataciones();
        setNewContratacion({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al añadir la contratación:", error);
      });
  };

  const updateContratacion = (id) => {
    axios.put(`/contrataciones/${id}/`, editContratacion)
      .then(response => {
        fetchContrataciones();
        setEditId(null);
        setEditContratacion({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar la contratación:", error);
      });
  };

  const deleteContratacion = (id) => {
    axios.delete(`/contrataciones/${id}/`)
      .then(response => {
        fetchContrataciones();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar la contratación:", error);
      });
  };

  const getOfertaTitulo = (id) => {
    const oferta = ofertas.find(oferta => oferta.id === id);
    return oferta ? oferta.titulo : '';
  };

  const getUsuarioName = (id) => {
    const usuario = usuarios.find(usuario => usuario.id === id);
    return usuario ? usuario.nombre : '';
  };

  return (
    <div className="container">
      <h1 className="my-4">Contrataciones</h1>
      <ul className="list-group">
        {contrataciones.map(contratacion => (
          <li key={contratacion.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === contratacion.id ? (
              <>
                <input
                  type="text"
                  value={editContratacion.fecha_inicio}
                  onChange={(e) => setEditContratacion({ ...editContratacion, fecha_inicio: e.target.value })}
                />
                <select
                  value={editContratacion.oferta_trabajo}
                  onChange={(e) => setEditContratacion({ ...editContratacion, oferta_trabajo: e.target.value })}
                >
                  {ofertas.map(oferta => (
                    <option key={oferta.id} value={oferta.id}>{oferta.titulo}</option>
                  ))}
                </select>
                <select
                  value={editContratacion.usuario}
                  onChange={(e) => setEditContratacion({ ...editContratacion, usuario: e.target.value })}
                >
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                {contratacion.id} - {contratacion.fecha_inicio} - {getOfertaTitulo(contratacion.oferta_trabajo)} - {getUsuarioName(contratacion.usuario)}
              </>
            )}
            <div>
              {editId === contratacion.id ? (
                <button onClick={() => updateContratacion(contratacion.id)}>Save</button>
              ) : (
                <button onClick={() => { setEditId(contratacion.id); setEditContratacion(contratacion); }}>Edit</button>
              )}
              <button onClick={() => deleteContratacion(contratacion.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <h2>Add New Contratacion</h2>
        <input
          type="text"
          value={newContratacion.fecha_inicio}
          onChange={(e) => setNewContratacion({ ...newContratacion, fecha_inicio: e.target.value })}
          placeholder="Fecha de Inicio"
          className="form-control my-1"
        />
        <select
          value={newContratacion.oferta_trabajo}
          onChange={(e) => setNewContratacion({ ...newContratacion, oferta_trabajo: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Select Oferta de Trabajo</option>
          {ofertas.map(oferta => (
            <option key={oferta.id} value={oferta.id}>{oferta.titulo}</option>
          ))}
        </select>
        <select
          value={newContratacion.usuario}
          onChange={(e) => setNewContratacion({ ...newContratacion, usuario: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Select Usuario</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
          ))}
        </select>
        <button onClick={addContratacion} className="btn btn-primary my-2">Add Contratacion</button>
      </div>
    </div>
  );
};

export default ContratacionesList;
