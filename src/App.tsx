import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { useBeerStore } from './stores/beersStore';

function App() {
    const { soldBeersList } = useBeerStore();
    return (
        <>
            <Navbar />
            <Sidebar>
                <>{soldBeersList?.length < 1 && <p>No items</p>}</>
            </Sidebar>

            <Outlet />
        </>
    );
}

export default App;
