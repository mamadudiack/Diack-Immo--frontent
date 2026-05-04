
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./config";

const Authorization = ({children}) => {
    const[status, setStatus] = useState('loading') //loadind authorized , unauthorized

useEffect(() => {

      const checkAuth = async () => {
        const authToken = localStorage.getItem('token')
        if (!authToken) {
            setStatus('unauthorized')
            return;
        }
        try {
           await axios.post(`${API_URL}/auth-token`, {token: authToken}) 
           setStatus('authorized')

        } catch (error) {
            console.error('error de validation',error)
            setStatus('unauthorized')
        }
      }


   checkAuth();

},[])

  if (status === 'unauthorized' ) {
    window.location.href = '/login'; // redriger vers la page de connexion 
    return null;
  }

    return(
        <div>
             
          {children}
         
        </div>
    )
}
export default Authorization ;