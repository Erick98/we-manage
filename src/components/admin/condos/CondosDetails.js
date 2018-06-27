import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import CondosProperties from './CondosProperties';
import CondosManagement from './CondosManagement';

class CondosDetails extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            condoSelected: {}
        }
    }
    componentDidMount() {
        const loc = this.props.match.params.condoId;
        database.ref('condos').child(loc).on('value', snap => {
            this.setState({
                condoSelected: snap.val()
            });
        });
    }
    handleChange() {
        const name = this.name.value;
        database.ref('condos/' + this.props.match.params.condoId).child('name').set(name);
        const propertiesAmount = this.propertiesAmount.value;
        database.ref('condos/' + this.props.match.params.condoId).child('propertiesAmount').set(propertiesAmount);
        const addressStreet = this.addressStreet.value;
        database.ref('condos/' + this.props.match.params.condoId).child('addressStreet').set(addressStreet);
        const addressNumber = this.addressNumber.value;
        database.ref('condos/' + this.props.match.params.condoId).child('addressNumber').set(addressNumber);
        const addressColony = this.addressColony.value;
        database.ref('condos/' + this.props.match.params.condoId).child('addressColony').set(addressColony);
        const addressTown = this.addressTown.value;
        database.ref('condos/' + this.props.match.params.condoId).child('addressTown').set(addressTown);
        const addressCity = this.addressCity.value;
        database.ref('condos/' + this.props.match.params.condoId).child('addressCity').set(addressCity);
        const addressCountry = this.addressCountry.value;
        database.ref('condos/' + this.props.match.params.condoId).child('addressCountry').set(addressCountry);
        const addressZipCode = this.addressZipCode.value;
        database.ref('condos/' + this.props.match.params.condoId).child('addressZipCode').set(addressZipCode);
    }
    render() {
        const data = this.state.condoSelected;
        return(
            <div className="condos__container-middle">
                <h2>{data.name} {this.props.match.params.condoId}</h2>
                <span>Fecha de Ingreso: {moment(data.timestamp).format('LLL')}</span>
                <div className="condos__details">
                    <div className="condos__input-container">
                        <label>Nombre del Condominio</label>
                        <input onChange={this.handleChange} value={data.name} ref={(input) => this.name = input} type="text" />
                    </div>
                    <div className="condos__input-container">
                        <label>Cantidad de Propiedades</label>
                        <input onChange={this.handleChange} value={data.propertiesAmount} ref={(input) => this.propertiesAmount = input} type="text" disabled />
                    </div>
                    <div className="condos__input-container">
                        <label>Calle</label>
                        <input onChange={this.handleChange} value={data.addressStreet} ref={(input) => this.addressStreet = input} type="text" />
                    </div>
                    <div className="condos__input-container">
                        <label>Número Exterior</label>
                        <input onChange={this.handleChange} value={data.addressNumber} ref={(input) => this.addressNumber = input} type="text" />
                    </div>
                    <div className="condos__input-container">
                        <label>Colonia</label>
                        <input onChange={this.handleChange} value={data.addressColony} ref={(input) => this.addressColony = input} type="text" />
                    </div>
                    <div className="condos__input-container">
                        <label>Delegación</label>
                        <input onChange={this.handleChange} value={data.addressTown} ref={(input) => this.addressTown = input} type="text" />
                    </div>
                    <div className="condos__input-container">
                        <label>Ciudad</label>
                        <input onChange={this.handleChange} value={data.addressCity} ref={(input) => this.addressCity = input} type="text" />
                    </div>
                    <div className="condos__input-container">
                        <label>País</label>
                        <input onChange={this.handleChange} value={data.addressCountry} ref={(input) => this.addressCountry = input} type="text" />
                    </div>
                    <div className="condos__input-container">
                        <label>Código Postal</label>
                        <input onChange={this.handleChange} value={data.addressZipCode} ref={(input) => this.addressZipCode = input} type="text" />
                    </div>
                </div>
                <div className="condo__tabs">
                    <Tabs>
                        <TabList className="condos__menu">
                            <Tab className="condos__menu-item">Propietarios</Tab>
                            <Tab className="condos__menu-item">Gastos Ordinarios</Tab>
                            <Tab className="condos__menu-item">PROSOC</Tab>
                            <Tab className="condos__menu-item">Administración</Tab>
                            <Tab className="condos__menu-item">Reportes de Administración</Tab>
                            <Tab className="condos__menu-item">Publicaciones</Tab>
                            <Tab className="condos__menu-item">Ingresos y Egresos</Tab>
                            <Tab className="condos__menu-item">Información Legal</Tab>
                            <Tab className="condos__menu-item">Levantamientos</Tab>
                            <Tab className="condos__menu-item">Planes de Trabajo</Tab>
                            <Tab className="condos__menu-item">Amenidades</Tab>
                            <Tab className="condos__menu-item">Bitácora</Tab>
                        </TabList>

                        <TabPanel className="condos__menu-content">
                            <h3>Propietarios</h3>
                            <CondosProperties condoId={this.props.match.params.condoId} owners={data.owners} />
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Lista de Gastos Ordinarios</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Detalles de Prosoc</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Administración</h3>
                            <CondosManagement condoId={this.props.match.params.condoId} managerId={data.managementEnterpriseId} />
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Reportes de Administración React-Table</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Publicaciones con React-Table</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Ingresos y Egresos React-Table</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Información Legal, acta constitutiva; minutas y reglamentos en React-Table</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Levantamientos en listas con React-Table</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Planes de Trabajo con React-Table</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Amenidades en lista</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Bitácora con React-Table</h3>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default CondosDetails;