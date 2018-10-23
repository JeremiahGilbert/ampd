import React, { Component } from "react";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import "./App.css";
import MusicPlayer from "./components/MusicPlayer";
import axios, { post } from 'axios';

const playlist = [
  {
    url:
      "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
    title: "Despacito",
    artist: ["Luis Fonsi", "Daddy Yankee"]
  },
  {
    url:
      "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg",
    title: "Bedtime Stories",
    artist: ["Jay Chou"]
  },
  {
    url:
      "http://res.cloudinary.com/alick/video/upload/v1502444212/Actor_ud8ccw.mp3",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502444304/actor_umzdur.jpg",
    title: "演员",
    artist: ["薛之谦"]
  },
  {
    url:
      "http://res.cloudinary.com/alick/video/upload/v1502444215/Bridge_of_Fate_aaksg1.mp3",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502444306/Bridge_of_Fate_o36rem.jpg",
    title: "Bridge of Fate",
    artist: ["王力宏", "谭维维"]
  },
  {
    url:
      "http://res.cloudinary.com/alick/video/upload/v1502444222/Goodbye_byaom5.mp3",
    cover:
      "http://res.cloudinary.com/alick/image/upload/v1502444310/Goodbye_hpubmk.jpg",
    title: "Goodbye",
    artist: ["G.E.M."]
  }
];

class App0 extends Component {
  state = {
    signIn: true,
    loggedIn: false,
    error: false
  };

  handleUpload = e => {
    e.preventDefault();
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onLoad = (e) => {
      console.warn("img data ", e.target.result)
    }
    console.log(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("ahahahahahah")
    axios
      .post("/api/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("user-jwt", res.data);
        this.props.history.push("/protected");
      })
      .catch(() => this.setState({ error: true }));
  };

  render() {
    return (
      <Router basename="/ampd/">
        <div className="App">
          <div className="App__Aside" />
          {this.state.signIn && (
            <div className="App__Form">
              <div className="PageSwitcher">
                <NavLink
                  exact
                  to="/"
                  activeClassName="PageSwitcher__Item--Active"
                  className="PageSwitcher__Item"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  activeClassName="PageSwitcher__Item--Active"
                  className="PageSwitcher__Item"
                >
                  Sign Up
                </NavLink>
              </div>

              <div className="FormTitle">
                <NavLink
                  exact
                  to="/"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Sign In
                </NavLink>{" "}
                or{" "}
                <NavLink
                  to="/sign-up"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Sign Up
                </NavLink>
              </div>

              <Route exact path="/" component={SignInForm} />
              <Route path="/sign-up" component={SignUpForm} />
            </div>
          )}
          {this.state.loggedIn && (
            <div className="App__Player">
              <MusicPlayer
                onUpload={this.handleUpload}
                playlist={playlist}
                autoplay
              />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App0;
