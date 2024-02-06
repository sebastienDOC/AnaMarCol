import { BrowserRouter } from "react-router-dom";
import Routes from './components/Routes';
import { useEffect, useState } from "react";
import { UidContext } from './components/AppContext'
import axios from "axios";
import Header from "./components/Header/Header";

export default function App() {
  const [uid, setUid] = useState(null)

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
      .then((res) => setUid(res.data))
      .catch((err) => console.log('No token'))
    }
    fetchToken()
  }, [uid])

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UidContext.Provider>
  )
}