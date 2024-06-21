import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const DatosPostulantesList = () => {
  const [datosPostulantes, setDatosPostulantes] = useState([]);
  const [newDatoPostulante, setNewDatoPostulante] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    experiencia: '',
    educacion: ''
  });
  const [editDatoPostulante, setEditDatoPostulante] = useState(null);

  useEffect(() => {
    fetchDatosPostulantes();
  }, []);

  const fetchDatosPostulantes = () => {
    axios.get('/datos_postulantes/')
      .then(response => {
        setDatosPostulantes(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos de los postulantes:", error);
      });
  };

  const addDatoPostulante = () => {
    axios.post('/datos_postulantes/', newDatoPostulante)
      .then(response => {
        fetchDatosPostulantes();
        setNewDatoPostulante({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          direccion: '',
          fecha_nacimiento: '',
          experiencia: '',
          educacion: ''
        });
      })
      .catch(error => {
        console.error("Hubo un error al añadir los datos del postulante:", error);
      });
  };

  const updateDatoPostulante = (id) => {
    axios.put(`/datos_postulantes/${id}/`, editDatoPostulante)
      .then(response => {
        fetchDatosPostulantes();
        setEditDatoPostulante(null);
      })
      .catch(error => {
        console.error("Hubo un error al actualizar los datos del postulante:", error);
      });
  };

  const deleteDatoPostulante = (id) => {
    axios.delete(`/datos_postulantes/${id}/`)
      .then(response => {
        fetchDatosPostulantes();
      })
      .catch(error => {
        console.error("Hubo un error al eliminar los datos del postulante:", error);
      });
  };

  return (
    <div>
      <h2>Lista de Datos Postulantes</h2>
      <ul className="list-group">
        {datosPostulantes.map(datoPostulante => (
          <li key={datoPostulante.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editDatoPostulante && editDatoPostulante.id === datoPostulante.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editDatoPostulante.nombre}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, nombre: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editDatoPostulante.apellido}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, apellido: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="email"
                  value={editDatoPostulante.email}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, email: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editDatoPostulante.telefono}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, telefono: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editDatoPostulante.direccion}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, direccion: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="date"
                  value={editDatoPostulante.fecha_nacimiento}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, fecha_nacimiento: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editDatoPostulante.experiencia}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, experiencia: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editDatoPostulante.educacion}
                  onChange={(e) => setEditDatoPostulante({ ...editDatoPostulante, educacion: e.target.value })}
                  className="form-control my-1"
                />
                <button className="btn btn-success mt-2" onClick={() => updateDatoPostulante(datoPostulante.id)}>Guardar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>Nombre: {datoPostulante.nombre}</p>
                <p>Apellido: {datoPostulante.apellido}</p>
                <p>Email: {datoPostulante.email}</p>
                <p>Teléfono: {datoPostulante.telefono}</p>
                <p>Dirección: {datoPostulante.direccion}</p>
                <p>Fecha de Nacimiento: {datoPostulante.fecha_nacimiento}</p>
                <p>Experiencia: {datoPostulante.experiencia}</p>
                <p>Educación: {datoPostulante.educacion}</p>
              </div>
            )}
            <div>
              {editDatoPostulante && editDatoPostulante.id === datoPostulante.id ? (
                <button className="btn btn-danger ml-2" onClick={() => setEditDatoPostulante(null)}>Cancelar</button>
              ) : (
                <>
                  <button className="btn btn-warning mr-2" onClick={() => setEditDatoPostulante(datoPostulante)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deleteDatoPostulante(datoPostulante.id)}>Eliminar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <h2>Añadir Nuevo Dato de Postulante</h2>
        <input
          type="text"
          value={newDatoPostulante.nombre}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, nombre: e.target.value })}
          placeholder="Nombre"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newDatoPostulante.apellido}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, apellido: e.target.value })}
          placeholder="Apellido"
          className="form-control my-1"
        />
        <input
          type="email"
          value={newDatoPostulante.email}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, email: e.target.value })}
          placeholder="Email"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newDatoPostulante.telefono}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, telefono: e.target.value })}
          placeholder="Teléfono"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newDatoPostulante.direccion}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, direccion: e.target.value })}
          placeholder="Dirección"
          className="form-control my-1"
        />
        <input
          type="date"
          value={newDatoPostulante.fecha_nacimiento}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, fecha_nacimiento: e.target.value })}
          placeholder="Fecha de Nacimiento"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newDatoPostulante.experiencia}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, experiencia: e.target.value })}
          placeholder="Experiencia"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newDatoPostulante.educacion}
          onChange={(e) => setNewDatoPostulante({ ...newDatoPostulante, educacion: e.target.value })}
          placeholder="Educación"
          className="form-control my-1"
        />
        <button onClick={addDatoPostulante} className="btn btn-primary my-2">Añadir Dato de Postulante</button>
      </div>
    </div>
  );
};

export default DatosPostulantesList;
