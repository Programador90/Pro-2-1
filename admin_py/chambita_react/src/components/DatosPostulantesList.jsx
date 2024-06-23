import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const DatosPostulantesList = () => {
  const [postulantes, setPostulantes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newPostulante, setNewPostulante] = useState({
    descripcion_profesional: '',
    usuario: '',
    foto_perfil: null,
    cv: null
  });
  const [editPostulante, setEditPostulante] = useState(null);

  useEffect(() => {
    fetchPostulantes();
    fetchUsuarios();
  }, []);

  const fetchPostulantes = async () => {
    try {
      const response = await axios.get('/datospostulantes/');
      setPostulantes(response.data);
    } catch (error) {
      console.error("Hubo un error al obtener los datos de los postulantes:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('/users/');
      setUsuarios(response.data);
    } catch (error) {
      console.error("Hubo un error al obtener los usuarios:", error);
    }
  };

  const getUsuarioNombre = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    return usuario ? `${usuario.first_name} ${usuario.last_name}` : 'Desconocido';
  };

  const addPostulante = async () => {
    if (!newPostulante.descripcion_profesional || !newPostulante.usuario) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const formData = new FormData();
    formData.append('descripcion_profesional', newPostulante.descripcion_profesional);
    formData.append('usuario', newPostulante.usuario);
    formData.append('foto_perfil', newPostulante.foto_perfil);
    formData.append('cv', newPostulante.cv);

    try {
      await axios.post('/datospostulantes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchPostulantes();
      setNewPostulante({
        descripcion_profesional: '',
        usuario: '',
        foto_perfil: null,
        cv: null
      });
    } catch (error) {
      console.error("Hubo un error al añadir los datos del postulante:", error);
    }
  };

  const updatePostulante = async (id) => {
    const formData = new FormData();
    formData.append('descripcion_profesional', editPostulante.descripcion_profesional);
    formData.append('usuario', editPostulante.usuario);
    if (editPostulante.foto_perfil) {
      formData.append('foto_perfil', editPostulante.foto_perfil);
    }
    if (editPostulante.cv) {
      formData.append('cv', editPostulante.cv);
    }

    try {
      await axios.put(`/datospostulantes/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchPostulantes();
      setEditPostulante(null);
    } catch (error) {
      console.error("Hubo un error al actualizar los datos del postulante:", error);
    }
  };

  const deletePostulante = async (id) => {
    try {
      await axios.delete(`/datospostulantes/${id}/`);
      fetchPostulantes();
    } catch (error) {
      console.error("Hubo un error al eliminar los datos del postulante:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Lista de Datos Postulantes</h2>
      <ul className="list-group mb-4">
        {postulantes.map(postulante => (
          <li key={postulante.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editPostulante && editPostulante.id === postulante.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editPostulante.descripcion_profesional}
                  onChange={(e) => setEditPostulante({ ...editPostulante, descripcion_profesional: e.target.value })}
                  className="form-control my-1"
                  placeholder="Descripción Profesional"
                />
                <select
                  value={editPostulante.usuario}
                  onChange={(e) => setEditPostulante({ ...editPostulante, usuario: e.target.value })}
                  className="form-control my-1"
                >
                  <option value="">Selecciona un usuario</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{`${usuario.first_name} ${usuario.last_name}`}</option>
                  ))}
                </select>
                <input
                  type="file"
                  onChange={(e) => setEditPostulante({ ...editPostulante, foto_perfil: e.target.files[0] })}
                  className="form-control my-1"
                />
                <input
                  type="file"
                  onChange={(e) => setEditPostulante({ ...editPostulante, cv: e.target.files[0] })}
                  className="form-control my-1"
                />
                <button className="btn btn-success mt-2" onClick={() => updatePostulante(postulante.id)}>Guardar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>Descripción Profesional: {postulante.descripcion_profesional}</p>
                <p>Usuario: {getUsuarioNombre(postulante.usuario)}</p>
                <p>
                  Foto de Perfil: {postulante.foto_perfil ? (
                    <a href={postulante.foto_perfil} target="_blank" rel="noopener noreferrer">Ver Foto</a>
                  ) : 'No disponible'}
                </p>
                <p>
                  CV: {postulante.cv ? (
                    <a href={postulante.cv} target="_blank" rel="noopener noreferrer">Ver CV</a>
                  ) : 'No disponible'}
                </p>
              </div>
            )}
            <div>
              {editPostulante && editPostulante.id === postulante.id ? (
                <button className="btn btn-danger ml-2" onClick={() => setEditPostulante(null)}>Cancelar</button>
              ) : (
                <>
                  <button className="btn btn-warning mr-2" onClick={() => setEditPostulante(postulante)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deletePostulante(postulante.id)}>Eliminar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <h2 className="text-center">Añadir Nuevo Dato de Postulante</h2>
        <input
          type="text"
          value={newPostulante.descripcion_profesional}
          onChange={(e) => setNewPostulante({ ...newPostulante, descripcion_profesional: e.target.value })}
          placeholder="Descripción Profesional"
          className="form-control my-1"
        />
        <select
          value={newPostulante.usuario}
          onChange={(e) => setNewPostulante({ ...newPostulante, usuario: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>{`${usuario.first_name} ${usuario.last_name}`}</option>
          ))}
        </select>
        <label htmlFor="foto_perfil">Ingrese su Foto de Perfil:</label>
        <input
          type="file"
          onChange={(e) => setNewPostulante({ ...newPostulante, foto_perfil: e.target.files[0] })}
          className="form-control my-1"
          id="foto_perfil"
        />
        <label htmlFor="cv">Ingrese su CV:</label>
        <input
          type="file"
          onChange={(e) => setNewPostulante({ ...newPostulante, cv: e.target.files[0] })}
          className="form-control my-1"
          id="cv"
        />
        <button className="btn btn-primary mt-2" onClick={addPostulante}>Añadir Dato de Postulante</button>
      </div>
    </div>
  );
};

export default DatosPostulantesList;
