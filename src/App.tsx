import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { useBeerStore } from './stores/beersStore';
import { SidebarItem } from './components/SidebarItem';
import { countTotal } from './utils/format';

function App() {
    const { soldBeersList } = useBeerStore();

    return (
        <>
            <Navbar />
            <Sidebar>
                <>
                    <>{soldBeersList?.length < 1 && <p>No items</p>}</>
                    {soldBeersList?.length > 0 && (
                        <ul className="sidebar-items">
                            {soldBeersList?.map((soldBeer) => {
                                return (
                                    <SidebarItem
                                        key={soldBeer.id}
                                        {...soldBeer}
                                    />
                                );
                            })}
                        </ul>
                    )}
                    <p className="sidebar-total">
                        Total:{' '}
                        <strong>{`$${countTotal(soldBeersList).toFixed(2)}`}</strong>
                    </p>
                </>
            </Sidebar>

            <Outlet />
        </>
    );
}

export default App;
