import { createContext, useState, useContext, useEffect } from "react";
import { usuarios, registerRequest, loginRequest, verifyTokenRequet, informacionPerfil, actualizarUsuario } from "../api/request.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIAuthenticated] = useState(false);
    const [error, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState([]);
    const [users, setUsers] = useState();

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data.user.token);
            setUser(res.data);
            setIAuthenticated(true);
            // Guardar token en cookies y localStorage
            Cookies.set("token", res?.data?.user?.token, { expires: 1, secure: true, sameSite: 'none' });
            localStorage.setItem("token", res?.data?.user?.token);
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIAuthenticated(true);
            // Guardar token en cookies y localStorage
            Cookies.set("token", res?.data?.user?.token, { expires: 1, secure: true, sameSite: 'none' });
            localStorage.setItem("token", res?.data?.user?.token);
        } catch (error) {
            console.log(error);
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const logout = async () => {
        Cookies.remove("token");
        localStorage.removeItem("token");
        setIAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (error.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        async function checkLogin() {
            const tokenFromCookies = Cookies.get("token");
            const tokenFromLocalStorage = localStorage.getItem("token");

            if (!tokenFromCookies && !tokenFromLocalStorage) {
                setIAuthenticated(false);
                setLoading(false);
                return;
            }

            const token = tokenFromCookies || tokenFromLocalStorage;
            try {
                const res = await verifyTokenRequet(token);
                if (!res.data) {
                    setIAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIAuthenticated(false);
                setUser(null);
                setLoading(false);
                console.log(error);
            }
        }
        checkLogin();
    }, []);

    const getProfile = async (id) => {
        try {
            const res = await informacionPerfil(id);
            setProfile(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarUser = async (id, body) => {
        try {
            await actualizarUsuario(id, body);
        } catch (error) {
            console.log(error);
        }
    }

    const usuarioTodos = async () => {
        try {
            const res = await usuarios();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ users, usuarioTodos, signup, signin, user, isAuthenticated, error, loading, logout, getProfile, profile, actualizarUser }}>
            {children}
        </AuthContext.Provider>
    );
}
