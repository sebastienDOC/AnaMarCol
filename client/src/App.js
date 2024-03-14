import { BrowserRouter } from "react-router-dom";
import Routes from './components/Routes';
import { useEffect, useState } from "react";
import { UidContext } from './components/AppContext'
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

import { getAllUsers } from './actions/users.actions';
import { getAllItems } from './actions/items.actions';
import { getAllContacts } from './actions/contacts.action';

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
        setUid(response.data);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
  
    fetchToken();
  
    if (uid) {
      dispatch(getUser(uid));
      dispatch(getAllUsers())
      dispatch(getAllItems())
      dispatch(getAllContacts())
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