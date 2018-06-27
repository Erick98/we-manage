import React, { Component } from 'react';
import { auth,database } from '../firebase';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            logged: undefined
        }
    }
    componentWillMount() {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                const userEmail = user.email;
                database.ref('users').orderByChild('email').equalTo(userEmail).on('child_added', snap => {
                    this.setState({
                        user: snap.val(),
                        logged: true
                    });
                });
            }
        }.bind(this));
    }
    render() {
        if(this.state.logged === undefined) {
            return (
                <div className="menu">
                    <div className="menu__container">
                        <picture>
                            <img src="/images/logo-icon.png" alt="Logo We Manage" />
                        </picture>
                        <ul>
                            <Link to="/" className="menu__item">Inicio</Link>
                            <Link to="/about-us" className="menu__item">Nosotros</Link>
                            <Link to="/faqs" className="menu__item">FAQ's</Link>
                            <Link to="/contact" className="menu__item">Contacto</Link>
                            <Link to="/log-in" className="menu__item">Iniciar Sesión</Link>
                            <Link to="/sign-up" className="menu__item">Registrarse</Link>
                        </ul>
                    </div>
                </div>
            )
        } else {
            const {user} = this.state;
            return (
                <div className="menu">
                    <div className="menu__container">
                        <picture>
                            <img src="/images/logo-icon.png" alt="Logo We Manage" />
                        </picture>
                        <ul>
                            <Link to="/" className="menu__item">Inicio</Link>
                            <Link to="/about-us" className="menu__item">Nosotros</Link>
                            <Link to="/faqs" className="menu__item">FAQ's</Link>
                            <Link to="/contact" className="menu__item">Contacto</Link>
                            <Link to="/account" className="menu__item"><span>{user.email}</span></Link>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default Menu;