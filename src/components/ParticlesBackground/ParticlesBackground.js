import React, { useCallback } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particlesOptions = {
    fullScreen: {
        enable: true,
        zIndex: -1,
    },
    fpsLimit: 120,
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            directions: "none",
            enable: true,
        },
        number: {
            value: 120,
            density: {
                enable: false,
                area: 800,
            }
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'none',
        }
    },
    detectRetina: true,
};

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions} />
    );
};

export default ParticlesBackground;