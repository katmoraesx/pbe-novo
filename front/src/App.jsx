import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Disciplinas from './components/disciplinas';
import Home from './pages/home';
import Teachers from './pages/teachers';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/disciplinas" element={<Disciplinas />} />
                <Route path="/teachers" element={<Teachers />} />
            </Routes>
        </Router>
    );
};

export default App;
