import React, { Component } from 'react';
import { database } from '../../../../firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import _ from 'lodash';
import ManagementNotification from './ManagementNotification';

class ManagementEnterprise extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.notificationsValidator = this.notificationsValidator.bind(this);
        this.state = {
            enterprise: {}
        }
    }
    componentWillMount() {
        database.ref('managementEnterprises').child(this.props.enterpriseId).on('value', snap => {
            this.setState({
                enterprise: snap.val()
            });
        });
    }
    handleChange() {
        const description = this.description.value;
        database.ref('managementEnterprises/' + this.props.enterpriseId).child('description').set(description);
    }
    notificationsValidator(list) {
        if(list) {
            return (
                <ul>
                    {
                        Object
                            .keys(list)
                            .map(key => <ManagementNotification
                                key={key}
                                index={key}
                                data={list[key]}
                                enterpriseId={this.props.enterpriseId}
                            />)
                    }
                </ul>
            )
        }
    }
    render() {
        const { enterprise } = this.state;
        const taxRegime = (enterprise.taxRegime === 'enterprise') ? 'Persona Moral' : 'Persona Física';
        const status = (enterprise.status === 'active') ? 'Empresa Funcionando' : 'Empresa Inactiva';
        const noRead = _.size(_.filter(enterprise.notifications, {'isRead':"false"}));
        const noReadLabel = (noRead > 0) ? <span className="label">{noRead}</span> : ' ';
        const notifications = _.orderBy(enterprise.notifications, ['isRead','timestamp'], ['desc','desc']);
        return(
            <div className="management__content">
                <Tabs className="management__tabs">
                    <TabList className="management__tabs-list">
                        <Tab className="management__tabs-title">Datos de Empresa</Tab>
                        <Tab className="management__tabs-title">Notificaciones {noReadLabel}</Tab>
                        <Tab className="management__tabs-title">Pendientes</Tab>
                        <Tab className="management__tabs-title">Empleados</Tab>
                        <Tab className="management__tabs-title">Calendario</Tab>
                    </TabList>
                    <TabPanel className="management__tabs-content">
                        <h1>{enterprise.name}</h1>
                        <h2>Datos de tu empresa</h2>
                        <span>Dirección: {enterprise.addressStreet} {enterprise.addressNumber}, {enterprise.addressColony}, {enterprise.addressTown}, {enterprise.addressCity}. {enterprise.addressCountry}. CP {enterprise.addressZipCode} </span>
                        <span>Fecha de Registro: {moment(enterprise.timestamp).format('LLL')}</span>
                        <span>Régimen Fiscal: {taxRegime}</span>
                        <span>Razón Social: {enterprise.businessName}</span>
                        <span>RFC: {enterprise.rfc}</span>
                        <span>Cuenta CLABE: {enterprise.clabe}</span>
                        <span>Status:  {status}</span>
                        <span>Teléfono: {enterprise.phone}</span>
                        <span>Email: {enterprise.email}</span>
                        <span>Página Web: {enterprise.webPage}</span>
                        <div className="management__input-container">
                            <label><b>Descripción de tu empresa </b><small>Esta descripción será visible para tus clientes y prospectos a clientes, describe las principales ventajas de tu empresa</small></label>
                            <textarea onChange={this.handleChange} ref={(input) => this.description = input} value={enterprise.description} cols="30" rows="10"></textarea>
                        </div>
                    </TabPanel>
                    <TabPanel className="management__tabs-content">
                        <h1>Notificaciones</h1>
                        {this.notificationsValidator(notifications)}
                    </TabPanel>
                    <TabPanel className="management__tabs-content">
                        <h1>Agregar y Ver Pendientes</h1>
                    </TabPanel>
                    <TabPanel className="management__tabs-content">
                        <h1>Agregar y Ver Empleados</h1>
                    </TabPanel>
                    <TabPanel className="management__tabs-content">
                        <h1>Calendario de Actividades, ver actividades y agregar</h1>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default ManagementEnterprise;