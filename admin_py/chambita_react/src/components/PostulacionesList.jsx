import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const PostulacionesList = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newPostulacion, setNewPostulacion] = useState({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
  const [editPostulacion, setEditPostulacion] = useState({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPostulaciones();
    fetchOfertas();
    fetchUsuarios();
  }, []);

  const fetchPostulaciones = () => {
    axios.get('/postulaciones/')
      .then(response => {
        setPostulaciones(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las postulaciones:", error);
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

  const addPostulacion = () => {
    axios.post('/postulaciones/', newPostulacion)
      .then(response => {
        fetchPostulaciones();
        setNewPostulacion({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al añadir la postulación:", error);
      });
  };

  const updatePostulacion = (id) => {
    axios.put(`/postulaciones/${id}/`, editPostulacion)
      .then(response => {
        fetchPostulaciones();
        setEditId(null);
        setEditPostulacion({ fecha_inicio: '', oferta_trabajo: 1, usuario: 1 });
      })
      .catch(error => {
        console.error("Hubo un error al actualizar la postulación:", error);
      });
  };

  const deletePostulacion = (id) => {
    axios.delete(`/postulaciones/${id}/`)
      .then(response => {
        fetchPostulaciones();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar la postulación:", error);
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
      <h1 className="my-4">Postulaciones</h1>
      <ul className="list-group">
        {postulaciones.map(postulacion => (
          <li key={postulacion.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === postulacion.id ? (
              <>
                <input
                  type="text"
                  value={editPostulacion.fecha_inicio}
                  onChange={(e) => setEditPostulacion({ ...editPostulacion, fecha_inicio: e.target.value })}
                />
                <select
                  value={editPostulacion.oferta_trabajo}
                  onChange={(e) => setEditPostulacion({ ...editPostulacion, oferta_trabajo: e.target.value })}
                >
                  {ofertas.map(oferta => (
                    <option key={oferta.id} value={oferta.id}>{oferta.titulo}</option>
                  ))}
                </select>
                <select
                  value={editPostulacion.usuario}
                  onChange={(e) => setEditPostulacion({ ...editPostulacion, usuario: e.target.value })}
                >
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                {postulacion.id} - {postulacion.fecha_inicio} - {getOfertaTitulo(postulacion.oferta_trabajo)} - {getUsuarioName(postulacion.usuario)}
              </>
            )}
            <div>
              {editId === postulacion.id ? (
                <button onClick={() => updatePostulacion(postulacion.id)}>Save</button>
              ) : (
                <button onClick={() => { setEditId(postulacion.id); setEditPostulacion(postulacion); }}>Edit</button>
              )}
              <button onClick={() => deletePostulacion(postulacion.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <h2>Add New Postulacion</h2>
        <input
          type="text"
          value={newPostulacion.fecha_inicio}
          onChange={(e) => setNewPostulacion({ ...newPostulacion, fecha_inicio: e.target.value })}
          placeholder="Fecha de Inicio"
          className="form-control my-1"
        />
        <select
          value={newPostulacion.oferta_trabajo}
          onChange={(e) => setNewPostulacion({ ...newPostulacion, oferta_trabajo: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Select Oferta de Trabajo</option>
          {ofertas.map(oferta => (
            <option key={oferta.id} value={oferta.id}>{oferta.titulo}</option>
          ))}
        </select>
        <select
          value={newPostulacion.usuario}
          onChange={(e) => setNewPostulacion({ ...newPostulacion, usuario: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Select Usuario</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
          ))}
        </select>
        <button onClick={addPostulacion} className="btn btn-primary my-2">Add Postulacion</button>
      </div>
    </div>
  );
};

export default PostulacionesList;
