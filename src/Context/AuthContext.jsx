import { createContext, useEffect, useState } from "react";

const ContextoAuth = createContext();

export const Auth = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState('');
    const [whitelist, setWhitelist] = useState([]);
    const [isLogged, setStatusLogin] = useState(false);
    const [loading, setLoading] = useState(true); // Nuevo estado de carga

    useEffect(() => {
        const almacenado = JSON.parse(localStorage.getItem("user"));
        if (almacenado) {
            loginUser(almacenado);
        }
        setLoading(false); // Establecer loading en false después de intentar cargar el usuario
    }, []);

    const loginUser = (User) => {
        setUser(User);
        setStatusLogin(true);
    };

    const updateUser = (User) => {
        setUser(User);
        localStorage.setItem('user', JSON.stringify(User));
    };

    const logOffUser = () => {
        setUser('');
        setStatusLogin(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const setNewWhitelist = (newWhitelist) => {
        setWhitelist(newWhitelist);
    };

    return (
        <ContextoAuth.Provider value={{
            user,
            loginUser,
            updateUser,
            isLogged,
            logOffUser,
            whitelist,
            setNewWhitelist,
            loading // Pasar el estado de carga al contexto
        }}>
            {children}
        </ContextoAuth.Provider>
    );
};

export default ContextoAuth;
