import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';

import AdminMenu from '../AdminMenu';
import CondosNoDetails from './CondosNoDetails';
import CondosDetails from './CondosDetails';

class Condos extends Component {
    constructor() {
        super();
        this.listValidator = this.listValidator.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
        this.state = {
            condos: {}
        }
    }
    componentDidMount() {
        database.ref('condos').once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
                this.setState({
                    condos: [...this.state.condos, { name: childSnap.child('name').val(), address: childSnap.child('addressStreet').val() + ' ' + childSnap.child('addressNumber').val() + ', ' + childSnap.child('addressColony').val() + ', ' + childSnap.child('addressTown').val() + ', ' + childSnap.child('addressCity').val() + ' ' + childSnap.child('addressCountry').val() + '. CP ' + childSnap.child('addressZipCode').val(), condoId: childSnap.child('condoId').val(), propertiesAmount: childSnap.child('propertiesAmount').val() }]
                });
            }.bind(this));
        }.bind(this));
    }
    handleSubmit(e) {
        e.preventDefault();
        const timestamp = moment().valueOf();
        const name = this.name.value;
        const propertiesAmount = Number(this.propertiesAmount.value);
        const addressStreet = this.addressStreet.value;
        const addressNumber = this.addressNumber.value;
        const addressColony = this.addressColony.value;
        const addressTown = this.addressTown.value;
        const addressCity = this.addressCity.value;
        const addressCountry = this.addressCountry.value;
        const addressZipCode = this.addressZipCode.value;
        if(name && propertiesAmount && addressStreet && addressNumber && addressColony && addressTown && addressCity && addressCountry && addressZipCode) {
            const condoId = `condo-${timestamp}`;
            var owners = [];
            for(var i = 0; i<propertiesAmount; i++) {
                const owner = {
                    'email': '',
                    'nomenclature': '',
                    'rol': 'condo',
                    'portion': 1
                }
                owners.push(owner);
            }
            const condo = {
                name: name,
                propertiesAmount: propertiesAmount,
                addressStreet: addressStreet,
                addressNumber: addressNumber,
                addressColony: addressColony,
                addressTown: addressTown,
                addressCity: addressCity,
                addressCountry: addressCountry,
                addressZipCode: addressZipCode,
                condoId: condoId,
                timestamp: timestamp,
                owners: owners
            }
            database.ref('condos').child(condoId).set(condo);
            alert('Condominio Agregado');
            this.addForm.reset();
        } else {
            alert('Completa todos los campos');
        }
    }
    renderListItem(key) {
        const item = this.state.condos[key];
        const loc = this.props.location.pathname;
        const locId = loc.split('/').pop();
        if(item.condoId === locId) {
            return(
                <Link key={key} to={`${this.props.match.url}/${item.condoId}`} className="condos__list-item item-active">
                    <h5>{item.name} - Cantidad de Propiedades: {item.propertiesAmount}</h5>
                    <span>{item.address}</span>
                </Link>
            )
        } else {
            return(
                <Link key={key} to={`${this.props.match.url}/${item.condoId}`} className="condos__list-item">
                    <h5>{item.name} - Cantidad de Propiedades: {item.propertiesAmount}</h5>
                    <span>{item.address}</span>
                </Link>
            )
        }
        
    }
    listValidator() {
        if(this.state.condos) {
            return(
                <ul className="condos__list">
                    {
                        Object
                            .keys(this.state.condos)
                            .map(this.renderListItem)
                    }
                </ul>
            )
        }
    }
    render() {
        const { match } = this.props;
        return (
            <div className="admin__router-container">
                <AdminMenu loc="condos" />
                <div className="admin__container">
                    <div className="condos">
                        <section className="condos__form">
                            <form ref={(input) => this.addForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                                <h2>Agregar Condominio</h2>
                                <div className="condos__input-container">
                                    <label>Nombre del Condominio</label>
                                    <input ref={(input) => this.name = input} type="text"/>
                                </div>
                                <div className="condos__input-container">
                                    <label>Cantidad de Propiedades</label>
                                    <input ref={(input) => this.propertiesAmount = input} type="number" />
                                </div>
                                <div className="condos__input-container">
                                    <label>Calle</label>
                                    <input ref={(input) => this.addressStreet = input} type="text" />
                                </div>
                                <div className="condos__input-container">
                                    <label>Número Exterior</label>
                                    <input ref={(input) => this.addressNumber = input} type="text" />
                                </div>
                                <div className="condos__input-container">
                                    <label>Colonia</label>
                                    <input ref={(input) => this.addressColony = input} type="text" />
                                </div>
                                <div className="condos__input-container">
                                    <label>Delegación</label>
                                    <input ref={(input) => this.addressTown = input} type="text" />
                                </div>
                                <div className="condos__input-container">
                                    <label>Ciudad</label>
                                    <input ref={(input) => this.addressCity = input} type="text" />
                                </div>
                                <div className="condos__input-container">
                                    <label>País</label>
                                    <input ref={(input) => this.addressCountry = input} type="text" />
                                </div>
                                <div className="condos__input-container">
                                    <label>Código Postal</label>
                                    <input ref={(input) => this.addressZipCode = input} type="text" />
                                </div>
                                <div className="condos__input-container">
                                    <button type="submit">Crear</button>
                                </div>
                            </form>
                        </section>
                        <section className="condos__container">
                            <div className="condos__container-middle">
                                <h2>Lista de Condominios</h2>
                                {this.listValidator()}
                            </div>
                            <Switch>
                                <Route path={`${match.url}/:condoId`} component={props => <CondosDetails {...props}/>} />
                                <Route exact={true} path={match.url} render={() => <CondosNoDetails />} />
                            </Switch>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Condos;