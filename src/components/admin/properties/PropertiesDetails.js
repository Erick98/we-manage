import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import PropertiesManagement from './PropertiesManagement';
import Select from 'react-select';
import _ from 'lodash';

class PropertiesDetails extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.selectPropertieOwner = this.selectPropertieOwner.bind(this);
        this.state = {
            propertieSelected: {},
            users: {}
        }
    }
    componentDidMount() {
        const loc = this.props.match.params.propertieId;
        database.ref('properties').child(loc).on('value', snap => {
            this.setState({
                propertieSelected: snap.val()
            });
        });
        database.ref('users').once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
                this.setState({
                    users: [...this.state.users, {
                        label: childSnap.child('name').val() + ' ' + childSnap.child('lastName').val() + ' - ' + childSnap.child('email').val(),
                        value: childSnap.child('email').val()
                    }]
                })
            }.bind(this));
        }.bind(this));
    }
    selectOption = (selectedOption) => {
        this.setState({ selectedOption });
    }
    handleChange() {
        const addressStreet = this.addressStreet.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('addressStreet').set(addressStreet);
        const addressNumber = this.addressNumber.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('addressNumber').set(addressNumber);
        const addressColony = this.addressColony.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('addressColony').set(addressColony);
        const addressTown = this.addressTown.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('addressTown').set(addressTown);
        const addressCity = this.addressCity.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('addressCity').set(addressCity);
        const addressCountry = this.addressCountry.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('addressCountry').set(addressCountry);
        const addressZipCode = this.addressZipCode.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('addressZipCode').set(addressZipCode);
        const altitude = this.altitude.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('altitude').set(altitude);
        const latitude = this.latitude.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('latitude').set(latitude);
        const type = this.type.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('type').set(type);
        const group = this.group.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('group').set(group);
        const price = this.price.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('price').set(price);
        const groundSurface = this.groundSurface.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('groundSurface').set(groundSurface);
        const buildedSurface = this.buildedSurface.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('buildedSurface').set(buildedSurface);
        const buildLevels = this.buildLevels.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('buildLevels').set(buildLevels);
        const rooms = this.rooms.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('rooms').set(rooms);
        const completeBathrooms = this.completeBathrooms.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('completeBathrooms').set(completeBathrooms);
        const halfBathrooms = this.halfBathrooms.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('halfBathrooms').set(halfBathrooms);
        const parkingLots = this.parkingLots.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('parkingLots').set(parkingLots);
        const age = this.age.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('age').set(age);
        const description = this.description.value;
        database.ref('properties/' + this.props.match.params.propertieId).child('description').set(description);
    }
    selectPropertieOwner(e) {
        e.preventDefault();
        const propertieOwner = this.state.selectedOption.value;
        if(propertieOwner) {
            database.ref('properties/' + this.props.match.params.propertieId).child('propertieOwner').set(propertieOwner);
            alert('Has asignado esta propiedad');
            this.ownerForm.reset();
        } else {
            alert('Selecciona un usuario para asignar propiedad')
        }
    }
    render() {
        const data = this.state.propertieSelected;
        const users = _.orderBy(this.state.users, ['label'], ['asc']);
        const { selectedOption } = this.state;
        const propertieOwner = (data.propertieOwner) ? data.propertieOwner : 'Sin Asignar'
        return(
            <div className="properties__container-middle">
                <h3>{data.addressStreet} {data.addressNumber}, Colonia {data.addressColony}, Delegación {data.addressTown}. {data.addressCity} {data.addressCountry}. CP {data.addressZipCode}.</h3>
                <span><b>Fecha de Alta: </b>{moment(data.timestamp).format('LLL')}</span>
                <p><b>Email de Dueño de Propiedad: </b>{propertieOwner}</p>
                <div className="properties__details">
                    <div className="properties__input-container">
                        <label>Calle (Obligatorio)</label>
                        <input value={data.addressStreet} onChange={this.handleChange} ref={(input) => this.addressStreet = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Número Exterior (Obligatorio)</label>
                        <input value={data.addressNumber} onChange={this.handleChange} ref={(input) => this.addressNumber = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Colonia (Obligatorio)</label>
                        <input value={data.addressColony} onChange={this.handleChange} ref={(input) => this.addressColony = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Delegación (Obligatorio)</label>
                        <input value={data.addressTown} onChange={this.handleChange} ref={(input) => this.addressTown = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Ciudad (Obligatorio)</label>
                        <input value={data.addressCity} onChange={this.handleChange} ref={(input) => this.addressCity = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>País (Obligatorio)</label>
                        <input value={data.addressCountry} onChange={this.handleChange} ref={(input) => this.addressCountry = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Código Postal (Obligatorio)</label>
                        <input value={data.addressZipCode} onChange={this.handleChange} ref={(input) => this.addressZipCode = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Altitud</label>
                        <input value={data.altitude} onChange={this.handleChange} ref={(input) => this.altitude = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Latitud</label>
                        <input value={data.latitude} onChange={this.handleChange} ref={(input) => this.latitude = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Tipo de Propiedad (Obligatorio)</label>
                        <select value={data.type} onChange={this.handleChange} ref={(input) => this.type = input} type="text">
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
                        <select value={data.group} onChange={this.handleChange} ref={(input) => this.group = input} type="text">
                            <option value="onSale">Venta</option>
                            <option value="rent">Renta</option>
                        </select>
                    </div>
                    <div className="properties__input-container">
                        <label>Precio (Obligatorio)</label>
                        <input value={data.price} onChange={this.handleChange} ref={(input) => this.price = input} type="number" />
                    </div>
                    <div className="properties__input-container">
                        <label>Superficie de terreno</label>
                        <input value={data.groundSurface} onChange={this.handleChange} ref={(input) => this.groundSurface = input} type="number" />
                    </div>
                    <div className="properties__input-container">
                        <label>Superficie de construcción</label>
                        <input value={data.buildedSurface} onChange={this.handleChange} ref={(input) => this.buildedSurface = input} type="number" />
                    </div>
                    <div className="properties__input-container">
                        <label>Niveles Construidos</label>
                        <input value={data.buildLevels} onChange={this.handleChange} ref={(input) => this.buildLevels = input} type="number" />
                    </div>
                    <div className="properties__input-container">
                        <label>Recamaras</label>
                        <input value={data.rooms} onChange={this.handleChange} ref={(input) => this.rooms = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Baños Completos</label>
                        <input value={data.completeBathrooms} onChange={this.handleChange} ref={(input) => this.completeBathrooms = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Medios Baños</label>
                        <input value={data.halfBathrooms} onChange={this.handleChange} ref={(input) => this.halfBathrooms = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Estacionamientos</label>
                        <input value={data.parkingLots} onChange={this.handleChange} ref={(input) => this.parkingLots = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Edad del Inmueble (Años)</label>
                        <input value={data.age} onChange={this.handleChange} ref={(input) => this.age = input} type="text" />
                    </div>
                    <div className="properties__input-container">
                        <label>Descripción</label>
                        <textarea value={data.description} onChange={this.handleChange} ref={(input) => this.description = input} />
                    </div>
                </div>
                <div className="properties__owner-form">
                    <h3>Asignar Dueño de Propiedad</h3>
                    <form ref={(input) => this.ownerForm = input} onSubmit={(e) => this.selectPropertieOwner(e)}>
                        <div className="properties__input-container">
                            <label>Seleccionar Dueño</label>
                            <Select
                                name="user-owner-select"
                                value={selectedOption}
                                onChange={this.selectOption}
                                options={users}
                            />
                        </div>
                        <div className="properties__input-container">
                            <button type="submit">Seleccionar</button>
                        </div>
                    </form>
                </div>
                <div className="properties__tabs">
                    <Tabs>
                        <TabList className="condos__menu">
                            <Tab className="condos__menu-item">Detalles</Tab>
                            <Tab className="condos__menu-item">Galería</Tab>
                            <Tab className="condos__menu-item">Administración</Tab>
                        </TabList>

                        <TabPanel className="condos__menu-content">
                            <h4>Detalles</h4>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h4>Galería</h4>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h4>Administración</h4>
                            <PropertiesManagement propId={this.props.match.params.propertieId} managerId={data.managementEnterpriseId} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default PropertiesDetails;