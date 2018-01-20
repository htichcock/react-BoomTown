import React from 'react';
import doge404 from '../../images/doge404.png';
import './styles.css';

const NotFound = () => (
    <div className="not-found-wrapper">
        <img src={doge404} alt="Page not found." />
    </div>
);

export default NotFound;
