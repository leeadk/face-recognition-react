import React, { Component } from 'react';
import Typewriter from 'typewriter-effect/dist/core';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSignInSubmit = async () => {
        if (!this.validateForm()) {
            new Typewriter('#typewriter', {
                strings: 'Fill the entire form',
                autoStart: true,
            });
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
        }
        const response = await fetch('http://localhost:5000/signin', requestOptions).catch(err => {
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
        this.props.loadUser(json);
    }

    validateForm = () => {
        const { email, password } = this.state;
        if (email.trim().length && password.trim().length) {
            return true;
        }
        return false;
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" >
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div id='typewriter' />
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" name="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" name="pass">Password</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="pass"
                                    name="pass"
                                    id="pass"
                                    onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div>
                            <input
                                onClick={this.onSignInSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}
export default SignIn;