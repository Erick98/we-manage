import React, { Component } from 'react';
import { auth, database } from '../firebase';
import moment from 'moment';

import Menu from './Menu';
import Footer from './Footer';

class BecomeManager extends Component {
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
                database.ref('managementEnterprises').orderByChild('enterpriseOwner').equalTo(userEmail).on('value', snap => {
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
        const startMessage = (this.state.isCondoManager === true) ? "Mensaje de un administrador ya registrado" : "Mensaje de un prospecto a administrador";

        if(name && email) {
            const infoRequest = {
                name: name,
                email: email,
                message: `Enviado desde formulario de ¿Eres o quieres ser administrador de inmuebles?, ${startMessage} : ${message}`,
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
            const managementEnterpriseId = `managementEnterprise-${timestamp}`;
            const managementEnterprise = {
                name: enterpriseName,
                taxRegime: taxRegime,
                rfc: rfc,
                email: enterpriseEmail,
                webPage: webPage,
                status: 'pending',
                enterpriseOwner: enterpriseOwner,
                timestamp: timestamp,
                managementEnterpriseId: managementEnterpriseId
            }
            database.ref('managementEnterprises').child(managementEnterpriseId).set(managementEnterprise);
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
                        <h3>Ya cuentas con una empresa de administración registrada, si tienes algún problema escríbenos y un asesor se pondrá en contacto contigo</h3>
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
                        <h3>Comienza el registro de tu empresa de administración</h3>
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
                    <h1>Registra tu empresa de administración de inmuebles en We Manage</h1>
                </section>
                <section className="become-manager__benefits">
                    <h2>Beneficios para socios</h2>
                    <ul>
                        <li><i className="material-icons">play_arrow</i>Acceso completo a nuestro sistema de administración de condominios</li>
                        <li><i className="material-icons">play_arrow</i>Clientes para tu empresa: Nos encargamos de entregarte una determinada cantidad de clientes anuales en base al sector y región en el que se encuentre tu empresa.</li>
                        <li><i className="material-icons">play_arrow</i>Automatización de proceso de pagos y cobranza: Mediante nuestro sistema automatizamos los procesos de vaciado de pagos, cobranza, generación de estados de cuenta generales e individuales y reportes especiales, te facilitamos el proceso contable.</li>
                        <li><i className="material-icons">play_arrow</i>Curso completo de administración inmobiliaria que abarca administración de condominios, administración de centros comerciales, administración de corporativos, administración de hoteles, administración de plantas industriales.</li>
                        <li><i className="material-icons">play_arrow</i>Certificado de administración profecional WE MANAGE con manuales y formatos de procedimientos.</li>
                        <li><i className="material-icons">play_arrow</i>Asesoría y capacitación continua.</li>
                        <li><i className="material-icons">play_arrow</i>Si requieres personal para tu empresa, nosotros te ayudamos consiguiendo personal en base a los requerimientos de tu empresa y capacitación completa.</li>
                        <li><i className="material-icons">play_arrow</i>Capacitación para utilizar sistema administrativo WE MANAGE</li>
                        <li><i className="material-icons">play_arrow</i>Acceso a promociones exclusivas para socios WE MANAGE</li>
                        <li><i className="material-icons">play_arrow</i>Asesoría y gestoría legal</li>
                        <li><i className="material-icons">play_arrow</i>Acceso a panel de licitaciones por condominio</li>
                        <li><i className="material-icons">play_arrow</i>Y MUCHO MÁS...</li>
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
                            <li>Realiza el pago correspondiente a la adquisición de tu membresía</li>
                            <li>Completa el perfil de tu empresa de administración y agrega a tu equipo de trabajo</li>
                            <li>Asiste con tu equipo de trabajo a los seminarios de capacitación</li>
                            <li>Te ayudaremos a integrar progresivamente a tus clientes a nuestra plataforma y comenzaremos a asignar clientes a tu empresa</li>
                            <li>Durante los primeros 3 meses, se elaborará de forma detallada el plan de negocios mensual y anual para los primeros 5 años de operación.</li>
                        </ol>
                    </div>
                    <div className="become-manager__price-middle">
                        <h2>Resumen de Pagos y Cuotas de Membresía</h2>
                        <span>Precio de Membresía $60,000.00 (Sesenta mil pesos 00/100 MN) IVA incluido</span>
                        <span>Regalías 8% mensual de honorarios administrativos + IVA</span>
                        <span>Sin cuotas mensuales fijas.</span>
                        <span>Solicita más información para conocer nuestros planes de financiamiento</span>
                    </div>
                </section>
                {this.validator(this.state.isLogged,this.state.isCondoManager)}
                <Footer />
            </div>
        )
    }
}

export default BecomeManager;