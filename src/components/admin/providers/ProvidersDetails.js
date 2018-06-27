import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import moment from 'moment';

class ProvidersDetails extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            provider: {}
        }
    }
    componentDidMount() {
        const loc = this.props.match.params.providerId;
        database.ref('providers').child(loc).on('value', snap => {
            this.setState({
                provider: snap.val()
            });
        });
    }
    handleChange() {
        const name = this.name.value;
        database.ref('providers/' + this.props.match.params.providerId).child('name').set(name);
        const email = this.email.value;
        database.ref('providers/' + this.props.match.params.providerId).child('email').set(email);
        const rfc = this.rfc.value;
        database.ref('providers/' + this.props.match.params.providerId).child('rfc').set(rfc);
        const clabe = this.clabe.value;
        database.ref('providers/' + this.props.match.params.providerId).child('clabe').set(clabe);
        const taxRegime = this.taxRegime.value;
        database.ref('providers/' + this.props.match.params.providerId).child('taxRegime').set(taxRegime);
        const webPage = this.webPage.value;
        database.ref('providers/' + this.props.match.params.providerId).child('webPage').set(webPage);
        const businessName = this.businessName.value;
        database.ref('providers/' + this.props.match.params.providerId).child('businessName').set(businessName);
        const status = this.status.value;
        database.ref('providers/' + this.props.match.params.providerId).child('status').set(status);
        const description = this.description.value;
        database.ref('providers/' + this.props.match.params.providerId).child('description').set(description);
        const phone = this.phone.value;
        database.ref('providers/' + this.props.match.params.providerId).child('phone').set(phone);
        const altitude = this.altitude.value;
        database.ref('providers/' + this.props.match.params.providerId).child('altitude').set(altitude);
        const latitude = this.latitude.value;
        database.ref('providers/' + this.props.match.params.providerId).child('latitude').set(latitude);
        const addressStreet = this.addressStreet.value;
        database.ref('providers/' + this.props.match.params.providerId).child('addressStreet').set(addressStreet);
        const addressNumber = this.addressNumber.value;
        database.ref('providers/' + this.props.match.params.providerId).child('addressNumber').set(addressNumber);
        const addressColony = this.addressColony.value;
        database.ref('providers/' + this.props.match.params.providerId).child('addressColony').set(addressColony);
        const addressTown = this.addressTown.value;
        database.ref('providers/' + this.props.match.params.providerId).child('addressTown').set(addressTown);
        const addressCity = this.addressCity.value;
        database.ref('providers/' + this.props.match.params.providerId).child('addressCity').set(addressCity);
        const addressCountry = this.addressCountry.value;
        database.ref('providers/' + this.props.match.params.providerId).child('addressCountry').set(addressCountry);
        const addressZipCode = this.addressZipCode.value;
        database.ref('providers/' + this.props.match.params.providerId).child('addressZipCode').set(addressZipCode);
    }
    render() {
        const data = this.state.provider;
        return (
            <div className="providers__container-middle">
                <h2>{data.name} <small>{this.props.match.params.providerId}</small></h2>
                <span>Fecha de Ingreso: {moment(data.timestamp).format('LLL')}</span>
                <span>Email de Dueño de la empresa: {data.enterpriseOwner}</span>
                <span>Dirección: {data.addressStreet} {data.addressNumber}, {data.addressColony}, {data.addressTown}. {data.addressCity}, {data.addressCountry}. CP {data.addressZipCode}</span>
                <div className="providers__details">
                    <div className="providers__input-container">
                        <label>Nombre de la Empresa</label>
                        <input onChange={this.handleChange} value={data.name} ref={(input) => this.name = input} type="text" />
                    </div>
                    <div className="providers__input-container">
                        <label>Email Corporativo</label>
                        <input onChange={this.handleChange} value={data.email} ref={(input) => this.email = input} type="email" />
                    </div>
                    <div className="providers__input-container">
                        <label>Teléfono</label>
                        <input onChange={this.handleChange} value={data.phone} ref={(input) => this.phone = input} type="text" />
                    </div>
                    <div className="providers__address">
                        <h4>Dirección</h4>
                        <div className="providers__input-container">
                            <label>Altitud (GOOGLE)</label>
                            <input onChange={this.handleChange} value={data.altitude} ref={(input) => this.altitude = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>Latitud (GOOGLE)</label>
                            <input onChange={this.handleChange} value={data.latitude} ref={(input) => this.latitude = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>Calle</label>
                            <input onChange={this.handleChange} value={data.addressStreet} ref={(input) => this.addressStreet = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>Número Exterior</label>
                            <input onChange={this.handleChange} value={data.addressNumber} ref={(input) => this.addressNumber = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>Colonia</label>
                            <input onChange={this.handleChange} value={data.addressColony} ref={(input) => this.addressColony = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>Delegación</label>
                            <input onChange={this.handleChange} value={data.addressTown} ref={(input) => this.addressTown = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>Ciudad</label>
                            <input onChange={this.handleChange} value={data.addressCity} ref={(input) => this.addressCity = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>País</label>
                            <input onChange={this.handleChange} value={data.addressCountry} ref={(input) => this.addressCountry = input} type="text" />
                        </div>
                        <div className="providers__input-container">
                            <label>Código Postal</label>
                            <input onChange={this.handleChange} value={data.addressZipCode} ref={(input) => this.addressZipCode = input} type="text" />
                        </div>
                    </div>
                    <div className="providers__input-container">
                        <label>RFC</label>
                        <input onChange={this.handleChange} value={data.rfc} ref={(input) => this.rfc = input} type="text" />
                    </div>
                    <div className="providers__input-container">
                        <label>Razón Social</label>
                        <input onChange={this.handleChange} value={data.businessName} ref={(input) => this.businessName = input} type="text" />
                    </div>
                    <div className="providers__input-container">
                        <label>Régimen Fiscal</label>
                        <select onChange={this.handleChange} value={data.taxRegime} ref={(input) => this.taxRegime = input}>
                            <option value="personal">Persona Física</option>
                            <option value="enterprise">Persona Moral</option>
                        </select>
                    </div>
                    <div className="providers__input-container">
                        <label>Cuenta CLABE para pago de Productos y Servicios</label>
                        <input disabled onChange={this.handleChange} value={data.clabe} ref={(input) => this.clabe = input} type="text" />
                    </div>
                    <div className="providers__input-container">
                        <label>Página Web</label>
                        <input onChange={this.handleChange} value={data.webPage} ref={(input) => this.webPage = input} type="text" />
                    </div>
                    <div className="providers__input-container">
                        <label>Status</label>
                        <select onChange={this.handleChange} value={data.status} ref={(input) => this.status = input}>
                            <option value="pending">Pendiente</option>
                            <option value="active">Activa</option>
                        </select>
                    </div>
                    <div className="providers__input-container">
                        <label>Descripción de la Empresa</label>
                        <textarea onChange={this.handleChange} value={data.description} ref={(input) => this.description = input} />
                    </div>
                </div>
                <div className="condo__tabs">
                    <Tabs>
                        <TabList className="condos__menu">
                            <Tab className="condos__menu-item">Empleados</Tab>
                            <Tab className="condos__menu-item">Productos y Servicios</Tab>
                            <Tab className="condos__menu-item">Licitaciones</Tab>
                            <Tab className="condos__menu-item">Pagos Realizados</Tab>
                        </TabList>

                        <TabPanel className="condos__menu-content">
                            <h3>Empleados</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Lista de Productos y Servicios</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Lista de Licitaciones participando y finalizadas con link a admin/tenders/biddingId</h3>
                        </TabPanel>
                        <TabPanel className="condos__menu-content">
                            <h3>Pagos Realizados por productos y servicios</h3>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default ProvidersDetails;