import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';


const ContratacionesList = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newContratacion, setNewContratacion] = useState({ oferta_trabajo: '', usuario: '' });
  const [editContratacion, setEditContratacion] = useState({ oferta_trabajo: '', usuario: '' });
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
    axios.get('/ofertas/')
      .then(response => {
        setOfertas(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las ofertas:", error);
      });
  };

  const fetchUsuarios = () => {
    axios.get('/users/')
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
        setNewContratacion({ oferta_trabajo: '', usuario: '' });
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
        setEditContratacion({ oferta_trabajo: '', usuario: '' });
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
    return usuario ? `${usuario.first_name} ${usuario.last_name}` : 'Desconocido';
  };

  return (
    <div className="container">
      <h1 className="my-4">Contrataciones</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Oferta</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contrataciones.map(contratacion => (
            <tr key={contratacion.id}>
              {editId === contratacion.id ? (
                <>
                  <td>{contratacion.id}</td>
                  <td>
                    <select
                      value={editContratacion.oferta_trabajo}
                      onChange={(e) => setEditContratacion({ ...editContratacion, oferta_trabajo: e.target.value })}
                    >
                      <option value="">Selecciona una Oferta de Trabajo</option>
                      {ofertas.map(oferta => (
                        <option key={oferta.id} value={oferta.id}>{oferta.titulo}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={editContratacion.usuario}
                      onChange={(e) => setEditContratacion({ ...editContratacion, usuario: e.target.value })}
                    >
                      <option value="">Selecciona un Usuario</option>
                      {usuarios.map(usuario => (
                        <option key={usuario.id} value={usuario.id}>{`${usuario.first_name} ${usuario.last_name}`}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => updateContratacion(contratacion.id)}>Guardar</button>
                    <button className="btn btn-secondary" onClick={() => setEditId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{contratacion.id}</td>
                  <td>{getOfertaTitulo(contratacion.oferta_trabajo)}</td>
                  <td>{getUsuarioName(contratacion.usuario)}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => { setEditId(contratacion.id); setEditContratacion(contratacion); }}>Editar</button>
                    <button className="btn btn-danger" onClick={() => deleteContratacion(contratacion.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-4">
        <h2>Añadir Nueva Contratación</h2>
        <select
          value={newContratacion.oferta_trabajo}
          onChange={(e) => setNewContratacion({ ...newContratacion, oferta_trabajo: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Selecciona una Oferta de Trabajo</option>
          {ofertas.map(oferta => (
            <option key={oferta.id} value={oferta.id}>{oferta.titulo}</option>
          ))}
        </select>
        <select
          value={newContratacion.usuario}
          onChange={(e) => setNewContratacion({ ...newContratacion, usuario: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Selecciona un Usuario</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>{`${usuario.first_name} ${usuario.last_name}`}</option>
          ))}
        </select>
        <button onClick={addContratacion} className="btn btn-primary my-2">Añadir Contratación</button>
      </div>
    </div>
  );
};

export default ContratacionesList;
