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

const initialState = {
  input: '',
  imgUrl: '',
  imgBoxes: [],
  route: 'home',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
};


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    const { isSignedIn, imgUrl, route, imgBoxes } = this.state;
    return (
      <div className="App" >
        <ParticlesBackground />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home' && this.state.isSignedIn ?
            <div>
              <Logo />
              <Rank username={this.state.user.name} entries={this.state.user.entries} isSignedIn={this.state.isSignedIn} />
              <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} />
              <FaceRecognition imgBoxes={this.state.imgBoxes} imgUrl={this.state.imgUrl} />
            </div>
            :
            route === 'signin' ?
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              :
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    );
  }

  onRouteChange = (newRoute) => {
    if (newRoute === 'signout') {
      this.setState(initialState);
    }
    this.setState({ route: newRoute });
  }

  loadUser = (loggedUser) => {
    if (this.state.isSignedIn) {
      return;
    }
    this.setState({
      user: {
        id: loggedUser.id,
        name: loggedUser.name,
        email: loggedUser.email,
        entries: loggedUser.entries,
        joined: loggedUser.created_on
      },
      isSignedIn: true
    });
    this.onRouteChange('home');
  }


  calculateFaceLocation = async (faces) => {
    if (this.state.isSignedIn) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      let boxResult = []
      faces.forEach(box => {
        boxResult.push({
          leftColumn: box.left_col * width,
          topRow: box.top_row * height,
          rightColumn: width - (box.right_col * width),
          bottomRow: height - (box.bottom_row * height),
        });
      });
      await this.setState({ imgBoxes: boxResult });
    }
  }

  onInputChange = async (event) => {
    await this.setState({ input: event.target.value })
  }

  onImageSubmit = async () => {
    await this.setState({ imgUrl: this.state.input })
    fetch('http://localhost:5000/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id,
        img: this.state.imgUrl
      })
    }).then(response => response.json())
      .then(jsonRes => JSON.parse(jsonRes))
      .then(data => {
        this.calculateFaceLocation(data.imgBoxes);
        this.setState({ user: { ...this.state.user, entries: data.entries } });
      })
      .catch(err => console.log('ERROR:', err));
  }
}
export default App;
