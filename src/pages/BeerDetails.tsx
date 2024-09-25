import React from 'react';
import { useParams } from 'react-router';

const BeerDetails = () => {
    const { beerId } = useParams();
    return <p>BeerId - {beerId}</p>;
};

export default BeerDetails;
