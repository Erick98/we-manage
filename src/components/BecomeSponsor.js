import React, { Component } from 'react';
import { database } from '../firebase';
import moment from 'moment';

import Menu from './Menu';
import Footer from './Footer';

class BecomeSponsor extends Component {
    constructor() {
        super();
        this.infoRequest = this.infoRequest.bind(this);
    }
    componentWillMount() {
        window.scrollTo(0, 0);
    }
    infoRequest(e) {
        e.preventDefault();

        const timestamp = moment().valueOf();
        const name = this.name.value;
        const email = this.email.value;
        const enterpriseName = this.enterpriseName.value;
        const businessTurn = this.businessTurn.value;
        const webPage = this.webPage.value;
        const description = this.description.value;
        const message = `Solicitud de registro de anuncio. NOMBRE DE EMPRESA : ${enterpriseName}. GIRO DE EMPRESA : ${businessTurn}. PÁGINA WEB DE EMPRESA: ${webPage}. DESCRIPCIÓN CORTA DE EMPRESA: ${description}`;

        if(name && email) {
            const infoRequest = {
                name: name,
                email: email,
                message: message,
                timestamp: timestamp,
                status: 'pending'
            }
            const messageId = `message-${timestamp}`
            database.ref('messages').child(messageId).set(infoRequest);
            alert('Mensaje enviado, un asesor se pondrá en contacto contigo pronto');
            this.infoRequestForm.reset()
        } else {
            alert('Completa los campos obligatorios')
        }
    }
    render() {
        return(
            <div>
                <Menu />
                <section className="become-manager__header">
                    <h1>Promociona tu marca en la plataforma WE MANAGE</h1>
                </section>
                <section className="become-manager__benefits">
                    <h2>¿Cómo promocionar tu empresa?</h2>
                    <ul>
                        <li><i className="material-icons">play_arrow</i>Todos los anuncios publicados en nuestra plataforma tienen una duración de 1 mes, cambiandose los días 20 de cada mes, serán subidos en la sección de promociones los anuncios aceptados y que hayan cumplido con los criterios de WE MANAGE.</li>
                        <li><i className="material-icons">play_arrow</i>La promoción en nuestro sistema no tienen ningún costo para los anunciantes, sin embargo, WE MANAGE sólo aceptará los anuncios que consideremos darán valor a nuestra plataforma y ofrezcan promociones o beneficios para nuestros clientes.</li>
                    </ul>
                </section>
                <section className="become-manager__price">
                    <div className="become-manager__price-middle">
                        <h2>¿Cómo promocionar mi empresa en WE MANAGE?</h2>
                        <ol>
                            <li>Llena el formulario de solicitud de registro de anuncio que se encuentra en esta página</li>
                            <li>Recibe las especificaciones de diseño del anuncio y envía el anuncio al ejecutivo asignado</li>
                            <li>Envíanos el diseño de tu anuncio basado en las especificaciones proporcionadas</li>
                            <li>Una vez que tu anuncio sea validado te llegará un correo informandote de su fecha de publicación</li>
                        </ol>
                    </div>
                    <div className="become-manager__price-middle">
                        <h2>NO HAY COSTO DE PROMOCIÓN</h2>
                    </div>
                </section>
                <section className="become-manager__actions">
                    <div className="become-manager__actions-middle">
                        <h3>Crea tu solicitud de registro de anuncio</h3>
                        <form onSubmit={(e) => this.infoRequest(e)} ref={(input) => this.infoRequestForm = input}>
                            <div className="become-manager__input-container">
                                <label>Nombre de Contacto (Obligatorio)</label>
                                <input ref={(input) => this.name = input} placeholder="Nombre Completo (Obligatorio)" type="text"/>
                            </div>
                            <div className="become-manager__input-container">
                                <label>Email de Contacto (Obligatorio)</label>
                                <input ref={(input) => this.email = input} placeholder="Email de Contacto (Obligatorio)" type="email" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Nombre de Empresa (Obligatorio)</label>
                                <input ref={(input) => this.enterpriseName = input} placeholder="Nombre de Empresa (Obligatorio)" type="text" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Giro de Empresa (Obligatorio)</label>
                                <input ref={(input) => this.businessTurn = input} placeholder="Giro de Empresa (Obligatorio)" type="text" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Página Web de Empresa (Obligatorio)</label>
                                <input ref={(input) => this.webPage = input} placeholder="Página Web de Empresa (Obligatorio)" type="text" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Descripción Corta de Empresa (Obligatorio)</label>
                                <textarea ref={(input) => this.description = input} placeholder="Descripción Corta de Empresa (Obligatorio)" />
                            </div>
                            <div className="become-manager__input-container">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default BecomeSponsor;