import React, { useCallback } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'

import './App.css';


function App() {
  const particlesOptions = {
    fullScreen: {
      enable: true,
      zIndex: 0,
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
        value: 30,
        density: {
          enable: false,
          area: 800,
        }
      },
      opacity: {
        value: 0.5,
      },
    },
    detectRetina: true,
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="App">
      <Particles
        className='particles-bg'
        init={particlesInit}
        options={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;

/*
  {
   fullScreen: {
      enable: true,
      zIndex: 0,
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
      collisions: {
        enable: true,
      },
      move: {
        directions: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: false,
          area: 100,
        },
        value: 120
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "triangle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
    
  }
}
  */