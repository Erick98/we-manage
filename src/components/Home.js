import React, { Component } from 'react';
import { auth, database } from '../firebase';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Footer from './Footer';

class Home extends Component {
    constructor() {
        super();
        this.register = this.register.bind(this);
        this.state = {
            error: false,
            logged: undefined
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount() {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged(function(user) {
            if(user) {
                this.setState({
                    logged: true
                });
            } else {
                this.setState({
                    logged: undefined
                });
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
    registryForm(logged) {
        if(logged === undefined) {
            return (
                <form onSubmit={(e) => this.register(e)}>
                    <h2>Registrate y obtén todos los beneficios de We Manage</h2>
                    <p>Sólo tienes que crear una cuenta para comenzar a recibir los mejores servicios inmobiliarios, desde tu perfil podrás controlarlo todo.</p>
                    <div className="home__cover-input-container">
                        <label>Nombre</label>
                        <input placeholder="Nombre" ref={(input) => this.name = input} type="text"/>
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
            )
        }
    }
    render() {
        return(
            <div>
                <Menu />
                <section className="home__cover">
                    <div className="home__cover-container">
                        <h1>WE MANAGE - REAL ESTATE TECHNOLOGY</h1>
                        <div className="home__cover-content">
                            <ul>
                                <li>Administración de Inmuebles</li>
                                <li>Asesoría Inmobiliaria</li>
                                <li>Consultoría en Bienes Raíces</li>
                                <li>Servicios de Mantenimiento</li>
                                <li>Propiedades en Venta o Renta</li>
                                <li>Plataforma de Gestión y Control de Bienes Raíces</li>
                                <li>Servicios para constructoras</li>
                            </ul>
                            {this.registryForm(this.state.logged)}
                        </div>
                    </div>
                </section>
                <section className="home__services">
                    <div className="home__services-container">
                        <h2>¿Qué puedes hacer desde nuestra plataforma?</h2>
                        <div className="home__services-content">
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/1.jpg" alt="Administración de Condominios"/>
                                </picture>
                                <h3>Administración de Condominios</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/3.jpg" alt="Administración de Propiedades" />
                                </picture>
                                <h3>Administración de Propiedades</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/4.jpg" alt="Venta y Renta de Inmuebles" />
                                </picture>
                                <h3>Venta y Renta de Inmuebles</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/5.jpg" alt="Administración de Centros Comerciales" />
                                </picture>
                                <h3>Administración de Centros Comerciales</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/6.jpg" alt="Administración de Hoteles" />
                                </picture>
                                <h3>Administración de Hoteles</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/7.jpg" alt="Servicios de Mantenimiento" />
                                </picture>
                                <h3>Servicios de Mantenimiento</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/8.jpg" alt="Servicios de Outsourcing" />
                                </picture>
                                <h3>Servicios de Outsourcing</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/9.jpg" alt="Servicio Integral para Constructoras" />
                                </picture>
                                <h3>Servicio Integral para Constructoras</h3>
                            </Link>
                            <Link to="/" className="home__services-item">
                                <picture>
                                    <img src="/images/10.jpg" alt="Asesoría Inmobiliaria" />
                                </picture>
                                <h3>Asesoría Inmobiliaria</h3>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="home__partners">
                    <div className="home__partners-container">
                        <h2>Proveedores, Socios y Patrocinadores</h2>
                        <ul>
                            <Link to="/become-manager" className="home__partners-item">¿Eres o quieres ser administrador de inmuebles?</Link>
                            <Link to="/become-realtor" className="home__partners-item">¿Eres o quieres ser corredor de bienes raíces?</Link>
                            <Link to="/become-provider" className="home__partners-item">¿Eres proveedor de servicios de instalación o mantenimiento?</Link>
                            <Link to="/become-sponsor" className="home__partners-item">¿Quieres que tu marca aparezca en nuestra plataforma?</Link>
                        </ul>
                    </div>
                </section>
                <section className="home__filter">
                    <div className="home__filter-container">
                        <h2>Encuentra la propiedad que has estado buscando</h2>
                        <form>
                            <div className="home__filter-input-container">
                                <label>Escribe un estado, ciudad, colonia o nombre de algún lugar</label>
                                <input ref={(input) => this.filter = input} placeholder="Escribe un estado, ciudad, colonia o nombre de algún lugar" type="text"/>
                            </div>
                            <div className="home__filter-input-container">
                                <label>Tipo de Propiedad</label>
                                <select ref={(input) => this.type = input}>
                                    <option value="sale">Venta</option>
                                    <option value="rent">Renta</option>
                                </select>
                            </div>
                            <div className="home__filter-input-container">
                                <label>Rango de Precio</label>
                                <input ref={(input) => this.filter = input} placeholder="Min" type="number" />
                                <input ref={(input) => this.filter = input} placeholder="Max" type="number" />
                            </div>
                            <button type="submit">Buscar</button>
                        </form>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Home;