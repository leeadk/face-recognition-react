import React, { Component } from 'react';

import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';

import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  accessFaceRecognition = () => {
    const USER_ID = 'leeadk';
    const PAT = 'd8a1d92761054a80a514a614fbb3960b';
    const APP_ID = 'clarifai-react';
    const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';

    const requestJson = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.imageUrl
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: requestJson
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(data => this.calculateFaceLocation(JSON.parse(data)))
      .catch(error => console.log('error', error));
  }

  calculateFaceLocation = async (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxResult = {
      leftColumn: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightColumn: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
    this.displayFaceBox(boxResult);
  }

  displayFaceBox = (data) => {
    this.setState({ box: data });
  }
  onInputChange = async (event) => {
    await this.setState({ input: event.target.value })
  }

  onButtonSubmit = async () => {
    await this.setState({ imageUrl: this.state.input })
    this.accessFaceRecognition();
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
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;