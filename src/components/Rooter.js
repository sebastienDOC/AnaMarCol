import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/login';
import Home from '../pages/Home/home';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}