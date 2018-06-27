import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return(
            <footer>
                <div className="footer__container">
                    <div className="footer__first">
                        <picture>
                            <img src="/images/logo-white-text.png" alt="Logo We Manage"/>
                        </picture>
                        <div className="footer__first-content">
                            <p>Suscríbete a nuestro boletín de noticias, te informaremos de novedades y promociones.</p>
                            <form>
                                <input placeholder="Email" ref={(input) => this.email = input} type="text"/>
                                <button type="submit"><i className="material-icons">send</i></button>
                            </form>
                        </div>
                    </div>
                    <ul>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Inicio</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Nosotros</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>FAQ's</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Contacto</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Sistema</Link>
                        <Link to="/admin" className="footer__link"><i className="material-icons">play_arrow</i>Acceso a Empleados</Link>
                    </ul>
                    <ul>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Administradores de Condominio</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Buscar Propiedades</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Registrar mi Inmueble</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Asesoría Inmobiliaria</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Servicios para Constructoras</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Proveedores de Mantenimiento</Link>
                        <Link to="/" className="footer__link"><i className="material-icons">play_arrow</i>Proveedores de Outsourcing</Link>
                    </ul>
                    <ul>
                        <li className="footer__item">
                            <i className="material-icons">mail</i>
                            <a href="mailto:contacto@wemanage.com.mx">contacto@wemanage.com.mx</a>
                        </li>
                        <li className="footer__item">
                            <i className="material-icons">place</i>
                            Circuito Interior no. 160, El Prado. 09480.
                        </li>
                    </ul>
                </div>
            </footer>
        )
    }
}

export default Footer;