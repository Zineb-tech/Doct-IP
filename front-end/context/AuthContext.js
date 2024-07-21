import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
//import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

 



 

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
