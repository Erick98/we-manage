import React, { Component } from 'react';
import { database, storage } from '../../../firebase';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import AdminMenu from '../AdminMenu';
import PropertiesDetails from './PropertiesDetails';
import PropertiesNoDetails from './PropertiesNoDetails';

class Properties extends Component {
    constructor() {
        super();
        this.listValidator = this.listValidator.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
        this.state = {
            properties: {}
        }
    }
    componentDidMount() {
        database.ref('properties').once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
                this.setState({
                    properties: [...this.state.properties, { address: childSnap.child('addressStreet').val() + ' ' + childSnap.child('addressNumber').val() + ', ' + childSnap.child('addressColony').val() + ', ' + childSnap.child('addressTown').val() + ', ' + childSnap.child('addressCity').val() + ' ' + childSnap.child('addressCountry').val() + '. CP ' + childSnap.child('addressZipCode').val(), propertieId: childSnap.child('propertieId').val(), price: childSnap.child('price').val(), group: childSnap.child('group').val(), type: childSnap.child('type').val() }]
                });
            }.bind(this));
        }.bind(this));
    }
    handleSubmit(e) {
        e.preventDefault();
        const timestamp =  moment().valueOf();
        const addressStreet = this.addressStreet.value;
        const addressNumber = this.addressNumber.value;
        const addressColony = this.addressColony.value;
        const addressTown = this.addressTown.value;
        const addressCity = this.addressCity.value;
        const addressCountry = this.addressCountry.value;
        const addressZipCode = this.addressZipCode.value;
        const altitude = this.altitude.value;
        const latitude = this.latitude.value;
        const dataSheet = this.dataSheet.files[0];
        const type = this.type.value;
        const group = this.group.value;
        const price = Number(this.price.value);
        const groundSurface = this.groundSurface.value;
        const buildedSurface = this.buildedSurface.value;
        const buildLevels = this.buildLevels.value;
        const rooms = this.rooms.value;
        const completeBathrooms = this.completeBathrooms.value;
        const halfBathrooms = this.halfBathrooms.value;
        const parkingLots = this.parkingLots.value;
        const age = this.age.value;
        const description = this.description.value;
        if(addressStreet && addressNumber && addressColony && addressTown && addressCity && addressCountry && addressZipCode && dataSheet && type && group && price) {
            const ext = dataSheet.name.split('.').pop();
            const fileName = `dataSheet.${ext}`;
            const propertieId = `propertie-${timestamp}`;
            storage.ref('data-sheets').child(fileName).put(dataSheet);
            const propertie = {
                addressStreet: addressStreet,
                addressNumber: addressNumber,
                addressColony: addressColony,
                addressTown: addressTown,
                addressCity: addressCity,
                addressCountry: addressCountry,
                addressZipCode: addressZipCode,
                altitude: altitude,
                latitude: latitude,
                dataSheet: `data-sheets/${fileName}`,
                type: type,
                group: group,
                price: price,
                groundSurface: groundSurface,
                buildedSurface: buildedSurface,
                buildLevels: buildLevels,
                rooms: rooms,
                completeBathrooms: completeBathrooms,
                halfBathrooms: halfBathrooms,
                parkingLots: parkingLots,
                age: age,
                description: description,
                timestamp: timestamp,
                propertieId: propertieId
            }
            database.ref('properties').child(propertieId).set(propertie);
            this.addForm.reset();
            alert('Propiedad Agregada');
        } else {
            alert('Completa todos los campos marcados como obligatorios')
        }
    }
    renderType(type) {
        if(type === "house") {
            return ("Casa")
        } else if(type === "apartment") {
            return ("Departamento")
        } else if(type === "ground") {
            return ("Terreno")
        } else if(type === "office") {
            return ("Oficina")
        } else if(type === "local") {
            return ("Local")
        } else if(type === "cellar") {
            return ("Bodega")
        } else if(type === "other") {
            return ("Otro")
        }
    }
    renderListItem(key) {
        const item = this.state.properties[key];
        const group = (item.group === "onSale") ? "Venta":"Renta";
        const loc = this.props.location.pathname;
        const locId = loc.split('/').pop();
        if(item.propertieId === locId) {
            return(
                <Link key={key} to={`${this.props.match.url}/${item.propertieId}`} className="properties__list-item item-active">
                    <h5>{item.address}</h5>
                    <span>{this.renderType(item.type)} - {group} - {numeral(item.price).format('$0,0.00')}</span>
                </Link>
            )
        } else {
            return(
                <Link key={key} to={`${this.props.match.url}/${item.propertieId}`} className="properties__list-item">
                    <h5>{item.address}</h5>
                    <span>{this.renderType(item.type)} - {group} - {numeral(item.price).format('$0,0.00')}</span>
                </Link>
            )
        }
        
    }
    listValidator() {
        if(this.state.properties) {
            return(
                <ul className="properties__list">
                    {
                        Object
                            .keys(this.state.properties)
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
                <AdminMenu loc="properties" />
                <div className="admin__container">
                    <div className="properties">
                        <div className="properties__form">
                            <form onSubmit={(e) => this.handleSubmit(e)} ref={(input) => this.addForm = input}>
                                <h2>Agregar Propiedad para Venta o Renta</h2>
                                <div className="properties__input-container">
                                    <label>Calle (Obligatorio)</label>
                                    <input ref={(input) => this.addressStreet = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Número Exterior (Obligatorio)</label>
                                    <input ref={(input) => this.addressNumber = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Colonia (Obligatorio)</label>
                                    <input ref={(input) => this.addressColony = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Delegación (Obligatorio)</label>
                                    <input ref={(input) => this.addressTown = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Ciudad (Obligatorio)</label>
                                    <input ref={(input) => this.addressCity = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>País (Obligatorio)</label>
                                    <input ref={(input) => this.addressCountry = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Código Postal (Obligatorio)</label>
                                    <input ref={(input) => this.addressZipCode = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Altitud</label>
                                    <input ref={(input) => this.altitude = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Latitud</label>
                                    <input ref={(input) => this.latitude = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Ficha Técnica (Obligatorio)</label>
                                    <input ref={(input) => this.dataSheet = input} type="file" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Tipo de Propiedad (Obligatorio)</label>
                                    <select ref={(input) => this.type = input} type="text">
                                        <option value="house">Casa</option>
                                        <option value="apartment">Departamento</option>
                                        <option value="ground">Terreno</option>
                                        <option value="office">Oficina</option>
                                        <option value="local">Local</option>
                                        <option value="cellar">Bodega</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>
                                <div className="properties__input-container">
                                    <label>Grupo (Obligatorio)</label>
                                    <select ref={(input) => this.group = input} type="text">
                                        <option value="onSale">Venta</option>
                                        <option value="rent">Renta</option>
                                    </select>
                                </div>
                                <div className="properties__input-container">
                                    <label>Precio (Obligatorio)</label>
                                    <input ref={(input) => this.price = input} type="number" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Superficie de terreno</label>
                                    <input ref={(input) => this.groundSurface = input} type="number" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Superficie de construcción</label>
                                    <input ref={(input) => this.buildedSurface = input} type="number" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Niveles Construidos</label>
                                    <input ref={(input) => this.buildLevels = input} type="number" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Recamaras</label>
                                    <input ref={(input) => this.rooms = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Baños Completos</label>
                                    <input ref={(input) => this.completeBathrooms = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Medios Baños</label>
                                    <input ref={(input) => this.halfBathrooms = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Estacionamientos</label>
                                    <input ref={(input) => this.parkingLots = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Edad del Inmueble (Años)</label>
                                    <input ref={(input) => this.age = input} type="text" />
                                </div>
                                <div className="properties__input-container">
                                    <label>Descripción</label>
                                    <textarea ref={(input) => this.description = input} />
                                </div>
                                <div className="properties__input-container">
                                    <button type="submit">Crear</button>
                                </div>
                            </form>
                        </div>
                        <div className="properties__container">
                            <div className="properties__container-middle">
                                <h2>Lista de Propiedades</h2>
                                {this.listValidator()}
                            </div>
                            <Switch>
                                <Route path={`${match.url}/:propertieId`} component={props => <PropertiesDetails {...props} />} />
                                <Route exact={true} path={match.url} render={() => <PropertiesNoDetails />} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Properties;