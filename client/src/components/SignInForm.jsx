import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MusicPlayer from 'react-responsive-music-player';
import axios, { post } from 'axios';

class SignInForm extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

  async handleSubmit (e){
        e.preventDefault();
        console.log('The form was submitted with the following data:');
        console.log(this.state);
          /*axios
            .post("/api/users/login", {
              email: this.state.email,
              password: this.state.password
            })
            .then(res => {
              localStorage.setItem("user-jwt", res.data);
              this.props.history.push("/protected");
            })
            .catch(() => this.setState({ error: true }));*/
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const options = {
              method: 'POST',
              headers,
                 body: JSON.stringify({
                   email: this.state.email,
                   password: this.state.password
                 })
            };

            const request = new Request("/api/users/login", options);
            const response = await fetch(request);
            const status = await response.status;
    }

    render() {
        return (
        <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} required />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} required />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> <Link to="/sign-up" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;
