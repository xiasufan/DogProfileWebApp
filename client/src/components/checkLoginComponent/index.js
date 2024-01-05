import Axios from 'axios';
import { useState, useEffect,useContext,createContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    Axios.defaults.withCredentials = true;

    const [loginName, setLoginName] = useState('');
    const [loginRole, setLoginRole] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await Axios.get(process.env.REACT_APP_API_URL+'/login');
                if (response.data.loggedIn) {
                    setLoginName(response.data.user[0].username);
                    setLoginRole(response.data.user[0].role);
                }
            } catch (error) {
                console.error('login check failed:', error);
                // 这里可以处理错误，如设置登录状态为未登录等
            }
        };

        checkLoginStatus();
    }, []); // 空依赖数组意味着效果仅在组件挂载时运行一次

    const value = { loginName, setLoginName, loginRole, setLoginRole };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};