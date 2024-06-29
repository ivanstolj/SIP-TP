import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ResetPassword.css';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put('http://localhost:4000/users/password', { token, password });
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña restablecida',
                    text: 'Tu contraseña ha sido restablecida exitosamente.',
                });
                navigate('/login');
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo restablecer la contraseña. El enlace puede haber expirado.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Nueva Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
