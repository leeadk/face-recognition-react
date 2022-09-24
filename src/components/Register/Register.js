import React, { Component } from 'react';
import Typewriter from 'typewriter-effect/dist/core';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onRegisterSubmit = async () => {
        if (!this.validateForm()) {
            new Typewriter('#typewriter', {
                strings: 'Fill the entire form',
                autoStart: true,
            });
            return;
        }
        const { onRouteChange } = this.props;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                password: this.state.password.trim(),
            }),
        }
        const response = await fetch('http://localhost:5000/register', requestOptions).catch(err => {
            new Typewriter('#typewriter', {
                strings: 'Server unreachable',
                autoStart: true,
            });
        });
        const json = await response.json();
        if (!response.ok) {
            new Typewriter('#typewriter', {
                strings: json,
                autoStart: true,
            });
            return;
        }
        onRouteChange('signin');
    }

    validateForm = () => {
        const { name, email, password } = this.state;
        if (name.trim().length && email.trim().length && password.trim().length) {
            return true;

        }
        return false;
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form id="registerForm" className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div id='typewriter' />
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" name="name" type="text" id="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onNameChange}
                                    type="text"
                                    name="name"
                                    id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" name="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onEmailChange}
                                    type="email"
                                    name="email-address"
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" name="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onPasswordChange}
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                        </fieldset>
                        <div>
                            <input
                                onClick={this.onRegisterSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Register"
                            />

                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default Register;