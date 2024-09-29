/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import BeerDetails from '../pages/BeerDetails';
import Home from '../pages/Home';
import Management from '../pages/Management';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Navigate to="/beers" />,
            },
            {
                path: 'beers',
                element: <Home />,
            },
            { path: 'beers/:beerId', element: <BeerDetails /> },
            { path: '/management', element: <Management /> },
            { path: '*', element: <Navigate to="beers" /> },
        ],
    },
]);
