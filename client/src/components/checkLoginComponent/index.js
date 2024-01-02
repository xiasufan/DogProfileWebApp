import Axios from 'axios';
import { useState, useEffect } from 'react';

const useAuth = () => {
    Axios.defaults.withCredentials = true;

    const [loginName, setLoginName] = useState('');
    const [loginRole, setLoginRole] = useState('');

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_URL}/login`).then((response) => {
          if (response.data.loggedIn == true) {
            setLoginName(response.data.user[0].username)
            setLoginRole (response.data.user[0].role)
          }
        });}, []);

        return { loginName, loginRole}


    

};

export default useAuth