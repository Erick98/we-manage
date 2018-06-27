import React, { Component } from 'react';
import { auth, database } from '../firebase';
import moment from 'moment';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Footer from './Footer';

class Registry extends Component {
    constructor() {
        super();
        this.register = this.register.bind(this);
        this.state = {
            error: false
        }
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
    register(e) {
		e.preventDefault();

		const timestamp = moment().valueOf();
		const name =  this.name.value;
		const lastName =  this.lastName.value;
		const email =  this.email.value;
		const password =  this.password.value;

        if(name && lastName && email && password) {
            const createUser = auth.createUserWithEmailAndPassword(email,password);

            createUser.then((user) => {
                if(user) {
                    const userData = {
                        dateTime: timestamp,
                        name: name,
                        lastName: lastName,
                        email: email,
                        phone: '',
                        rol: 'user',
                        bornDate: '',
                        officialIdentification: ''
                    }
                    database.ref('users/' + timestamp).set(userData);
                }
            });

            createUser.catch((error) => {
                this.setState({
                    error: true
                });
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('La contraseña es muy corta. Mínimo 6 caracteres.');
                } else if (errorCode === 'auth/email-already-in-use') {
                    alert('Este correo electrónico ya ha sido utilizado');
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Esta dirección de correo electrónico no es valida');
                } else {
                    alert(errorCode,errorMessage);
                }
            });
        } else {
            alert('Completa todos los campos')
        }
	}
    render() {
        return(
            <div>
                <Menu />
                <section className="registry">
                    <h1>Registro</h1>
                    <ul>
                        <li><i className="material-icons">play_arrow</i>Crear tu cuenta es completamente gratis</li>
                        <li><i className="material-icons">play_arrow</i>Podrás crear licitaciones y encontrar a los mejores proveedores</li>
                        <li><i className="material-icons">play_arrow</i>Encontrar administrador para tu codominio</li>
                        <li><i className="material-icons">play_arrow</i>Buscar un asesor inmobiliario We Manage</li>
                        <li><i className="material-icons">play_arrow</i>Vender o rentar tu propiedad</li>
                        <li><i className="material-icons">play_arrow</i>Acceder a increibles promociones exclusivas para nuestros clientes</li>
                    </ul>
                    <form onSubmit={(e) => this.register(e)}>
                        <div className="home__cover-input-container">
                            <label>Nombre</label>
                            <input placeholder="Nombre" ref={(input) => this.name = input} type="text" />
                        </div>
                        <div className="home__cover-input-container">
                            <label>Apellidos</label>
                            <input placeholder="Apellidos" ref={(input) => this.lastName = input} type="text" />
                        </div>
                        <div className="home__cover-input-container">
                            <label>Correo Electrónico</label>
                            <input placeholder="Correo Electrónico" ref={(input) => this.email = input} type="email" />
                        </div>
                        <div className="home__cover-input-container">
                            <label>Contraseña</label>
                            <input placeholder="Contraseña" ref={(input) => this.password = input} type="password" />
                        </div>
                        <button className="home__cover-button" type="submit">Crear Cuenta</button>
                    </form>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Registry;