import Axios from 'axios';
import { useState, useEffect } from 'react';

const useAuth = () => {
    Axios.defaults.withCredentials = true;

    const [loginName, setLoginName] = useState('');
    const [loginRole, setLoginRole] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await Axios.get(`${process.env.REACT_APP_API_URL}/login`);
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

    return { loginName, loginRole };
};

export default useAuth