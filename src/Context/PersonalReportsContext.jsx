import { createContext, useContext, useEffect, useState } from "react";
import ContextoAuth from "./AuthContext";
import axios from "axios";

const ContextoReports = createContext()

export const AllMyReports = ({ children }) => {
    const { user } = useContext(ContextoAuth)
    const [MyReports, setMyReports] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token').replace(/^"|"$/g, '');
            const response = await axios.post('https://backendseminario.onrender.com/reports/reportsByUser', { user: user._id }, {
                headers: {
                    'x-access-token': token
                }
            });
            setMyReports(response.data.data.docs);
        }
        if (user) {
            fetchData();
        }
    }, [user]);

    const updateReports = (report) => {
        setMyReports([...MyReports, report])
    }

    return (
        <ContextoReports.Provider value={{
            MyReports,
            updateReports,
        }}>
            {children}
        </ContextoReports.Provider>
    )
}

export default ContextoReports