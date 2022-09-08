import React, { Component } from 'react';

import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';

import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }
  /*
    componentDidMount() {
      this.callBackendAPI()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  
    callBackendAPI = async () => {
      const response = await fetch('/');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
    */
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App" >
        {/*<ParticlesBackground />*/}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home' ?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            :
            route === 'signin' ?
              <SignIn onRouteChange={this.onRouteChange} />
              :
              <Register onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }

  onRouteChange = (newRoute) => {
    if (newRoute === 'signout') {
      this.setState({ isSignedIn: false });
    }
    else if (newRoute === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: newRoute });
  }

  accessFaceRecognition = () => {
    const USER_ID = 'leeadk';
    const PAT = 'd8a1d92761054a80a514a614fbb3960b';
    const APP_ID = 'clarifai-react';
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


}

export default App;