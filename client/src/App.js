import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import './App.css';
import MusicPlayer from './components/MusicPlayer';
import App0 from './App0';

class App extends Component {
  render() {
    return (
      <div>
          <App0 />
      </div>
    );
  }
}

export default App;
