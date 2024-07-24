import axios from 'axios';

const apiBaseUrl = 'http://localhost:4000';

export const getEntidades = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/companies/`);
    return response.data.data.docs;
  } catch (error) {
    console.error(error);
  }

};

export const createEntidad = async (entidad) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/companies/create`, entidad);
    return response;
  } catch (error) {
    return (error.response);
  }

};

export const deleteEntidad = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/companies/`, {data: {id}});
    console.log(response);
    return response;

  } catch (error) {
    console.error(error);
  }
};
