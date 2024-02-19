import { BrowserRouter } from "react-router-dom";
import Routes from './components/Routes';
import { useEffect, useState } from "react";
import { UidContext } from './components/AppContext'
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

export default function App() {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}jwtid`,
          withCredentials: true
        });
        console.log(response.data);  // Vérifier la réponse du serveur
        setUid(response.data);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
  
    fetchToken();
  
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);  

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UidContext.Provider>
  )
}