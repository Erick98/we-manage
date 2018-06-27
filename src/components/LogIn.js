import React, { Component } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Footer from './Footer';

class LogIn extends Component {
    constructor() {
        super();
        this.logIn = this.logIn.bind(this);
    }
    static contextTypes = {
		router: PropTypes.object
	}
	componentWillMount() {
        window.scrollTo(0, 0);
		auth.onAuthStateChanged(function(user) {
			if (user) {
				this.context.router.history.push('/account')
			}
	    }.bind(this));
	}
    logIn(e) {
        e.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        const logIn = auth.signInWithEmailAndPassword(email, password);
        logIn.then((result) => {
            const loc = this.props.location;
            if(loc.state && loc.state.nextPathname) {
                this.context.router.history.push(loc.state.nextPathname)
            } else {
                this.context.router.history.push('/account')
            }
        });
        logIn.catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Verifica tu contraseña');
            } else {
                alert(errorCode, errorMessage);
            }
        });
    }
    render() {
        return(
            <div>
                <Menu />
                <section className="log-in">
                    <h1>Inicia Sesión</h1>
                    <form onSubmit={(e) => this.logIn(e)}>
                        <div className="log-in__input-container">
                            <label>Email</label>
                            <input ref={(input) => this.email = input} placeholder="Email" type="text"/>
                        </div>
                        <div className="log-in__input-container">
                            <label>Contraseña</label>
                            <input ref={(input) => this.password = input} placeholder="Contraseña" type="password" />
                        </div>
                        <button type="submit">Entrar</button>
                        <div className="log-in__links">
                            <Link to="/registry">Registrarme</Link>
                            <span>Olvidé mi contraseña</span>
                        </div>
                    </form>
                </section>
                <Footer />
            </div>
        )
    }
}

export default LogIn;