import React, { Component } from 'react';
import { ClarifaiStub, grpc } from 'clarifai-nodejs-grpc';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';

import './App.css';

const clarifaiStub = ClarifaiStub.grpc();
const clarifaiMetadata = new grpc.Metadata();
clarifaiMetadata.set("authorization", "9bb5beb73f224b00bbde7a8a703cf722")

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    /*
    app.models.predict('...', urlAddress)
    function(response) {

    }
    function(err) {

    }
    */
  }


  render() {
    return (
      <div className="App" >
        <ParticlesBackground />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
      </div>
    );
  }
}

export default App;