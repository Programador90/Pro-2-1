import React, { useState, useEffect } from 'react';
import axios from '../services/axiosConfig';

const OfertaList = () => {
  const [ofertas, setOfertas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [newOferta, setNewOferta] = useState({
    titulo: '',
    descripcion: '',
    salario: '',
    requerimientos: '',
    fecha_publicacion: '',
    estado: 'activa',
    empresa: ''
  });
  const [editOferta, setEditOferta] = useState(null);

  useEffect(() => {
    fetchOfertas();
    fetchEmpresas();
  }, []);

  const fetchOfertas = async () => {
    try {
      const response = await axios.get('/ofertas/');
      setOfertas(response.data);
    } catch (error) {
      console.error("Hubo un error al obtener las ofertas de trabajo:", error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get('/empresas/');
      setEmpresas(response.data);
    } catch (error) {
      console.error("Hubo un error al obtener las empresas:", error);
    }
  };

  const addOferta = async () => {
    try {
      await axios.post('/ofertas/', newOferta);
      fetchOfertas();
      setNewOferta({
        titulo: '',
        descripcion: '',
        salario: '',
        requerimientos: '',
        fecha_publicacion: '',
        estado: 'activa',
        empresa: ''
      });
    } catch (error) {
      console.error("Hubo un error al añadir la oferta de trabajo:", error);
    }
  };

  const updateOferta = async (id) => {
    try {
      await axios.put(`/ofertas/${id}/`, editOferta);
      fetchOfertas();
      setEditOferta(null);
    } catch (error) {
      console.error("Hubo un error al actualizar la oferta de trabajo:", error);
    }
  };

  const deleteOferta = async (id) => {
    try {
      await axios.delete(`/ofertas/${id}/`);
      fetchOfertas();
    } catch (error) {
      console.error("Hubo un error al eliminar la oferta de trabajo:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Lista de Ofertas de Trabajo</h2>
      <ul className="list-group mb-4">
        {ofertas.map(oferta => (
          <li key={oferta.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editOferta && editOferta.id === oferta.id ? (
              <div className="flex-grow-1">
                <input
                  type="text"
                  value={editOferta.titulo}
                  onChange={(e) => setEditOferta({ ...editOferta, titulo: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editOferta.descripcion}
                  onChange={(e) => setEditOferta({ ...editOferta, descripcion: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="number"
                  value={editOferta.salario}
                  onChange={(e) => setEditOferta({ ...editOferta, salario: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="text"
                  value={editOferta.requerimientos}
                  onChange={(e) => setEditOferta({ ...editOferta, requerimientos: e.target.value })}
                  className="form-control my-1"
                />
                <input
                  type="date"
                  value={editOferta.fecha_publicacion}
                  onChange={(e) => setEditOferta({ ...editOferta, fecha_publicacion: e.target.value })}
                  className="form-control my-1"
                />
                <select
                  value={editOferta.estado}
                  onChange={(e) => setEditOferta({ ...editOferta, estado: e.target.value })}
                  className="form-control my-1"
                >
                  <option value="activa">Activa</option>
                  <option value="inactiva">Inactiva</option>
                </select>
                <select
                  value={editOferta.empresa}
                  onChange={(e) => setEditOferta({ ...editOferta, empresa: e.target.value })}
                  className="form-control my-1"
                >
                  <option value="">Selecciona una empresa</option>
                  {empresas.map(empresa => (
                    <option key={empresa.id} value={empresa.id}>{empresa.nombre_comercial}</option>
                  ))}
                </select>
                <button className="btn btn-success mt-2" onClick={() => updateOferta(oferta.id)}>Guardar</button>
              </div>
            ) : (
              <div className="flex-grow-1">
                <p>Título: {oferta.titulo}</p>
                <p>Descripción: {oferta.descripcion}</p>
                <p>Salario: {oferta.salario}</p>
                <p>Requerimientos: {oferta.requerimientos}</p>
                <p>Fecha de Publicación: {oferta.fecha_publicacion}</p>
                <p>Estado: {oferta.estado}</p>
                <p>Empresa: {oferta.empresa.nombre_comercial}</p>
              </div>
            )}
            <div>
              {editOferta && editOferta.id === oferta.id ? (
                <button className="btn btn-danger ml-2" onClick={() => setEditOferta(null)}>Cancelar</button>
              ) : (
                <>
                  <button className="btn btn-warning mr-2" onClick={() => setEditOferta(oferta)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deleteOferta(oferta.id)}>Eliminar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <h2 className="text-center">Añadir Nueva Oferta de Trabajo</h2>
        <input
          type="text"
          value={newOferta.titulo}
          onChange={(e) => setNewOferta({ ...newOferta, titulo: e.target.value })}
          placeholder="Título"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newOferta.descripcion}
          onChange={(e) => setNewOferta({ ...newOferta, descripcion: e.target.value })}
          placeholder="Descripción"
          className="form-control my-1"
        />
        <input
          type="number"
          value={newOferta.salario}
          onChange={(e) => setNewOferta({ ...newOferta, salario: e.target.value })}
          placeholder="Salario"
          className="form-control my-1"
        />
        <input
          type="text"
          value={newOferta.requerimientos}
          onChange={(e) => setNewOferta({ ...newOferta, requerimientos: e.target.value })}
          placeholder="Requerimientos"
          className="form-control my-1"
        />
        <input
          type="date"
          value={newOferta.fecha_publicacion}
          onChange={(e) => setNewOferta({ ...newOferta, fecha_publicacion: e.target.value })}
          placeholder="Fecha de Publicación"
          className="form-control my-1"
        />
        <select
          value={newOferta.estado}
          onChange={(e) => setNewOferta({ ...newOferta, estado: e.target.value })}
          className="form-control my-1"
        >
          <option value="activa">Activa</option>
          <option value="inactiva">Inactiva</option>
        </select>
        <select
          value={newOferta.empresa}
          onChange={(e) => setNewOferta({ ...newOferta, empresa: e.target.value })}
          className="form-control my-1"
        >
          <option value="">Selecciona una empresa</option>
          {empresas.map(empresa => (
            <option key={empresa.id} value={empresa.id}>{empresa.nombre_comercial}</option>
          ))}
        </select>
        <button className="btn btn-primary mt-2" onClick={addOferta}>Añadir Oferta de Trabajo</button>
      </div>
    </div>
  );
};

export default OfertaList;
