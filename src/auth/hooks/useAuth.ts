import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const useAuth = () => {


  const navigate = useNavigate();
  
  const isAccessTokenAvailable = () => {
    return Boolean(localStorage.getItem("access_token")) == true;
  }
  
  const [isLoggedIn, setIsLoggedIn] = useState(isAccessTokenAvailable());

  const { hash } = useLocation();




  const setAccessToken = () => {

    if (hash && !isLoggedIn) {
      const token = hash.substring(1);
      
      const tokenSearchParam = new URLSearchParams(token);
      
      const access_token = tokenSearchParam.get("access_token");
      // alert("first")
      if (access_token) {
        // alert("second")
        localStorage.setItem("access_token", access_token);
      }  
    }
    
  }
  
  const logIn = () => {  
    

    if (hash && !isLoggedIn) {
      const token = hash.substring(1);
      
      const tokenSearchParam = new URLSearchParams(token);
      
      const access_token = tokenSearchParam.get("access_token");
      // alert("first")
      if (access_token) {
        // alert("second")
        localStorage.setItem("access_token", access_token);
      }  
      setIsLoggedIn(true);
    }
  }

  const logOut = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/");
  }

  return {
    isLoggedIn,
    logIn,
    logOut,
  }
    
}