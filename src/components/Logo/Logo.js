import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import Brain from './brain.png';

const Logo = () => {
    return (
        <Tilt className='Tilt-Element' glareMaxOpacity={0.45} scale={1.02}>
            <div className='pa2'>
                <img style={{ paddingTop: '5px' }} alt='logo' src={Brain} />
            </div>
        </Tilt>
    )
}

export default Logo;