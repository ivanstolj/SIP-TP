import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getUsuarios = async (entidad) => {
  console.log(entidad)
  try {
    const response = await axios.post(`${API_URL}/users/usersByCompany`, {entidad:entidad._id});
    return response.data.data.docs;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

export const addUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/users/registration`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al añadir el usuario:', error);
    throw error;
  }
};

export const deleteUsuario = async (entidad, usuarioId) => {
  try {
    const response = await axios.delete(`${API_URL}/entidades/${entidad}/usuarios/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

export const updateUsuarioRole = async (id, rol) => {
  try {
    const response = await axios.put(`${API_URL}/users/rol`, {rol, id});
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error);
    throw error;
  }
};


export const getReportesByCompany = async (entidad) => {
  const response = await axios.post(`${API_URL}/reports/reportsByCompany/`, {company:entidad._id});
  return response.data.data.docs;
};