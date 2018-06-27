import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class MyConods extends Component {
    constructor() {
        super();
        this.renderListItem = this.renderListItem.bind(this);
        this.state = {
            condos: {}
        }
    }
    componentDidMount() {
        database.ref('condos').once('value').then(function(snap) {
            snap.forEach(function(childSnap) {
                childSnap.child('owners').forEach(function(snapShot) {
                    this.setState({
                        condos: _.filter([...this.state.condos, { condoId: childSnap.key, condoName: childSnap.child('name').val(), ownerId: snapShot.key, nomenclature: snapShot.child('nomenclature').val(), email: snapShot.child('email').val(), address: childSnap.child('addressStreet').val() + ' ' + childSnap.child('addressNumber').val() + ', ' + childSnap.child('addressColony').val() + ', ' + childSnap.child('addressTown').val() + ', ' + childSnap.child('addressCity').val() + ' ' + childSnap.child('addressCountry').val() + '. CP ' + childSnap.child('addressZipCode').val() }], { 'email': this.props.userEmail })
                    })
                }.bind(this));
            }.bind(this));
        }.bind(this));
    }
    renderListItem(key) {
        const item = this.state.condos[key];
        return (
            <Link key={key} to={{
                pathname:'/account/my-condos/single-condo',
                state: { condoId:item.condoId, ownerId:item.ownerId, nomenclature:item.nomenclature }
            }} className="my-condos__list-item">
                <h5>{item.condoName}</h5>
                <span>{item.address}</span>
                <span>Propiedad: {item.nomenclature}</span>
            </Link>
        )
    }
    listValidator(condos) {
        if(condos) {
            return(
                <ul>
                    {
                        Object
                            .keys(condos)
                            .map(this.renderListItem)
                    }
                </ul>
            )
        } else {
            return(
                <span>Aún no tienes condominios registrados</span>
            )
        }
    }
    render() {
        return (
            <section className="my-condos">
                <div className="my-condos__instructions">
                    <h1>Condominios</h1>
                    <h2>Solicita más información sobre nuestro servicio de Administración de Condominios</h2>
                    <p>Recibe más información de nuestro servicio de administración para condominios y las distintas modalidades, dependiendo la cantidad de condóminos, amenidades, intereses de los propietarios, etc. Solicita información y un ejecutivo te contactará, o ingresa a <Link to="/condo-management">este link</Link> para ver todo acerca de nuestro servicio de administración de condominios.</p>
                    <h2>Registra tu condominio</h2>
                    <ul>
                        <li><b>Responder Formulario de Alta:</b> Ingresa al formulario, dando click <Link to="/condo-management/form">aquí</Link></li>
                        <li><b>Seguimiento con Ejectutivo:</b> Un ejecutivo de WE MANAGE, dará seguimiento para lograr el registro del condominio en la plataforma y de cada uno de los habitantes del mismo, se encargará de completar una serie de formatos que ayudarán en la operación del condominio</li>
                        <li><b>Selección de Administración:</b> En base a la información proporcionada, se asignará un administrador profesional, certificado, capacitado y recomendado por WE MANAGE que se encargará de completar el registro y presentarse con los condóminos.</li>
                        <li><b>Firma de Contrato: </b> Se llevará a cabo la firma de contrato con la administración que se encargará de la gestión del condominio.</li>
                        <li><b>Emisión de Comunicados y Cartas: </b> Se enviará por correo y se repartirá con acuse de recibo cartas de bienvenida y comunicados de cómo funcionará la administración de información de nuestro portal.</li>
                        <li><b>Plan de Trabajo: </b> Se creará plan de trabajo para los próximos 3 años de gestión administrativa con fechas para presentar avances, fechas de asambleas, seguimientos con cada problemática que exista en el condominio y resoluciones.</li>
                    </ul>
                    <h2>Soporte</h2>
                    <p>Contáctanos en al correo <a href="mailto:info@wemanage.com.mx">info@wemanage.com.mx</a> y una persona de soporte te ayudará a resolver cualquier problemática que tengas con la plataforma.</p>
                    <h2>Solicita Más Información para Registrar tu Condominio</h2>
                    <p>Da click en el siguiente botón y un ejecutivo se pondrá en contacto contigo para responder todas tus preguntas y ayudarte con el registro de tu condominio.</p>
                    <button>Solicitar Información</button>
                </div>
                <div className="my-condos__list">
                    <h2>Condominios en los que participo</h2>
                    {this.listValidator(this.state.condos)}
                </div>
            </section>
        )
    }
}

export default MyConods;