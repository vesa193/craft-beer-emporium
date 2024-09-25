import React from 'react';
import { Outlet } from 'react-router';
import './App.css';

function App() {
    return (
        <>
            <p>Navigation placeholder</p>
            <Outlet />
        </>
    );
}

export default App;
