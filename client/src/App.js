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
    const fetchToken = async() => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true
      })
      .then((res) => setUid(res.data))
      .catch((err) => console.log('No token'))
    }
    fetchToken()

    if (uid) dispatch(getUser(uid))
  }, [uid, dispatch])

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UidContext.Provider>
  )
}