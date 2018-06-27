import React, { Component } from 'react';
import { auth, database } from '../firebase';
import moment from 'moment';

import Menu from './Menu';
import Footer from './Footer';

class BecomeProvider extends Component {
    constructor() {
        super();
        this.infoRequest = this.infoRequest.bind(this);
        this.state = {
            isCondoManager: undefined,
            isLogged: undefined,
            userEmail: ""
        }
    }
    componentWillMount() {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged(function(user) {
            if(user) {
                const userEmail = user.email;
                this.setState({
                    isLogged: true,
                    userEmail: userEmail
                });
                database.ref('providers').orderByChild('enterpriseOwner').equalTo(userEmail).on('value', snap => {
                    this.setState({
                        isCondoManager: snap.exists()
                    });
                });
            } else {
                this.setState({
                    isLogged: false
                });
            }
        }.bind(this))
    }
    infoRequest(e) {
        e.preventDefault();

        const timestamp = moment().valueOf();
        const name = this.name.value;
        const email = this.email.value;
        const message = this.message.value;
        const startMessage = (this.state.isCondoManager === true) ? "Mensaje de un proveedor registrado" : "Mensaje de un prospecto a proveedor";

        if(name && email) {
            const infoRequest = {
                name: name,
                email: email,
                message: `Enviado desde formulario de ¿Eres o quieres ser proveedor de matenimiento o instalacioens?, ${startMessage} : ${message}`,
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
    createEnterprise(e) {
        e.preventDefault();

        const enterpriseName =  this.enterpriseName.value;
        const taxRegime =  this.taxRegime.value;
        const enterpriseEmail =  this.enterpriseEmail.value;
        const webPage =  this.webPage.value;
        const rfc = this.rfc.value;
        const timestamp = moment().valueOf();
        const enterpriseOwner = this.state.userEmail;
        
        if(enterpriseName && taxRegime && enterpriseEmail && rfc) {
            const providerId = `provider-${timestamp}`;
            const provider = {
                name: enterpriseName,
                taxRegime: taxRegime,
                rfc: rfc,
                email: enterpriseEmail,
                webPage: webPage,
                status: 'pending',
                enterpriseOwner: enterpriseOwner,
                timestamp: timestamp,
                providerId: providerId
            }
            database.ref('providers').child(providerId).set(provider);
            alert('Has iniciado el registro de tu empresa, un asesor revisará la información proporcionada y te contactará para continuar el proceso.')
        } else {
            alert('Completa todos los campos');
        }

    } 
    validator(isLogged,isCondoManager) {
        if(isLogged === true && isCondoManager === true) {
            return (
                <section className="become-manager__actions">
                    <div className="become-manager__actions-middle">
                        <h3>Ya cuentas con una empresa de mantenimiento registrada, si tienes algún problema escríbenos y un asesor se pondrá en contacto contigo</h3>
                        <form onSubmit={(e) => this.infoRequest(e)} ref={(input) => this.infoRequestForm = input}>
                            <div className="become-manager__input-container">
                                <label>Nombre Completo (Obligatorio)</label>
                                <input ref={(input) => this.name = input} placeholder="Nombre Completo (Obligatorio)" type="text"/>
                            </div>
                            <div className="become-manager__input-container">
                                <label>Email</label>
                                <input ref={(input) => this.email = input} placeholder="Email (Obligatorio)" type="email" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Mensaje</label>
                                <textarea ref={(input) => this.message = input} placeholder="Mensaje" />
                            </div>
                            <div className="become-manager__input-container">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </section>
            )
        } else if(isLogged === true && isCondoManager === false) {
            return (
                <section className="become-manager__actions">
                    <div className="become-manager__actions-middle">
                        <h3>Solicita más información</h3>
                        <form onSubmit={(e) => this.infoRequest(e)} ref={(input) => this.infoRequestForm = input}>
                            <div className="become-manager__input-container">
                                <label>Nombre Completo (Obligatorio)</label>
                                <input ref={(input) => this.name = input} placeholder="Nombre Completo (Obligatorio)" type="text" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Email</label>
                                <input ref={(input) => this.email = input} placeholder="Email (Obligatorio)" type="email" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Mensaje</label>
                                <textarea ref={(input) => this.message = input} placeholder="Mensaje" />
                            </div>
                            <div className="become-manager__input-container">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                    <div className="become-manager__actions-middle">
                        <h3>Comienza el registro de tu empresa de mantenimiento</h3>
                        <form onSubmit={(e) => this.createEnterprise(e)}>
                            <div className="become-manager__input-container">
                                <label>Nombre de la empresa</label>
                                <input ref={(input) => this.enterpriseName = input} placeholder="Nombre de la empresa" type="text" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Régimen Fiscal</label>
                                <select ref={(input) => this.taxRegime = input} >
                                    <option value="personal">Persona Física</option>
                                    <option value="enterprise">Persona Moral</option>
                                </select>
                            </div>
                            <div className="become-manager__input-container">
                                <label>RFC</label>
                                <input ref={(input) => this.rfc = input} placeholder="RFC" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Correo Electrónico Corporativo</label>
                                <input ref={(input) => this.enterpriseEmail = input} placeholder="Correo Electrónico Corporativo" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Página Web</label>
                                <input ref={(input) => this.webPage = input} placeholder="Página Web" />
                            </div>
                            <div className="become-manager__input-container">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </section>
            )
        } else {
            return (
                <section className="become-manager__actions">
                    <div className="become-manager__actions-middle">
                        <h3>Solicita más información</h3>
                        <form onSubmit={(e) => this.infoRequest(e)} ref={(input) => this.infoRequestForm = input}>
                            <div className="become-manager__input-container">
                                <label>Nombre Completo (Obligatorio)</label>
                                <input ref={(input) => this.name = input} placeholder="Nombre Completo (Obligatorio)" type="text" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Email</label>
                                <input ref={(input) => this.email = input} placeholder="Email (Obligatorio)" type="email" />
                            </div>
                            <div className="become-manager__input-container">
                                <label>Mensaje</label>
                                <textarea ref={(input) => this.message = input} placeholder="Mensaje" />
                            </div>
                            <div className="become-manager__input-container">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                    <div className="become-manager__actions-middle">
                        <h3>Para comenzar el registro de tu empresa, debes de registrarte e iniciar sesión</h3>
                    </div>
                </section>
            )
        }
    }
    render() {
        return(
            <div>
                <Menu />
                <section className="become-manager__header">
                    <h1>Registra tu empresa de servicios para Inmuebles en  WE MANAGE</h1>
                </section>
                <section className="become-manager__benefits">
                    <h2>¿Cómo funciona?</h2>
                    <ul>
                        <li><i className="material-icons">play_arrow</i>Empresas dedicadas a proveer servicios para inmuebles, principalmente enfocados a mantenimiento o instalaciones, se pueden registrar como proveedores WE MANAGE para participar en licitaciones relacionadas a los servicios que prestan.</li>
                        <li><i className="material-icons">play_arrow</i>Cada para cada servicio se invitan a proveedores a participar hasta contar con 5 contendientes, se les da prioridad a los proveedores con mejor calificación por los clientes y por segmentación geográfica.</li>
                        <li><i className="material-icons">play_arrow</i>Mediante nuestro sistema, llegan a los proveedores las especificaciones de cada trabajo para realizar la cotización, en el sistema podrán solicitar realizar una visita al condominio, en donde especificarán día y hora en la que asistirán, en caso de no asistir puntualmente al recorrido serán dados de baja de la licitación automáticamente.</li>
                        <li><i className="material-icons">play_arrow</i>Presentar las propuestas claras y en tiempo mejora el ranking de los proveedores y la posibilidad de ser seleccionadas por los clientes.</li>
                    </ul>
                </section>
                <section className="become-manager__price">
                    <div className="become-manager__price-middle">
                        <h2>¿Cómo registrar mi empresa de administración en WE MANAGE?</h2>
                        <ol>
                            <li>Registrate en nuestra plataforma</li>
                            <li>Empieza el registro de tu empresa en esta página</li>
                            <li>Envía la documentos solicitados a tu asesor asignado</li>
                            <li>Una vez que tu solicitud haya sido aprobada, asiste a tu entrevista</li>
                            <li>Realiza el pago de tu anualidad</li>
                            <li>Completa el perfil de tu empresa de administración y agrega los servicios que ofreces</li>
                            <li>Asiste con tu equipo de trabajo a los seminarios de capacitación</li>
                            <li>Comienza a participar en las licitaciones WE MANAGE</li>
                        </ol>
                    </div>
                    <div className="become-manager__price-middle">
                        <h2>Resumen de Pagos y Cuotas de Membresía</h2>
                        <span>Costo Anual de Membresía $800.00 (Ochocientos pesos 00/100 MN) + IVA</span>
                        <span>Regalías 8% del costo total por trabajo realizado + IVA</span>
                    </div>
                </section>
                {this.validator(this.state.isLogged,this.state.isCondoManager)}
                <Footer />
            </div>
        )
    }
}

export default BecomeProvider;