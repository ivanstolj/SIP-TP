import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Activating your account...');

  useEffect(() => {
    let isMounted = true; // Este flag asegura que el componente está montado

    const activateAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/activate/${token}`);
        if (isMounted) {
          setMessage('!Su cuenta ha sido activada¡');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: '!Su cuenta ha sido activada¡',
          }).then(() => navigate('/login'));
        }
      } catch (error) {
        if (isMounted) {
          setMessage('Ocurrió un error al validar su cuenta.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al validar su cuenta.',
          });
        }
      }
    };

    activateAccount();

    return () => {
      isMounted = false; // Limpieza al desmontar el componente
    };
  }, [token, navigate]);

  return <div>{message}</div>;
};

export default ActivateAccount;
