import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import _ from 'lodash';

class PropertiesManagement extends Component {
    constructor() {
        super();
        this.state = {
            managers: {},
            selectedOption: '',
            managementEnterprise: {}
        }
    }
    componentDidMount() {
        database.ref('managementEnterprises').once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
                this.setState({
                    managers: [...this.state.managers, {
                        label: childSnap.child('name').val() + ' - ' + childSnap.child('enterpriseOwner').val(),
                        value: childSnap.child('managementEnterpriseId').val(),
                        status: childSnap.child('status').val(),
                        isPropertieManager: childSnap.child('isPropertieManager').val()
                    }]
                });
            }.bind(this));
        }.bind(this));
        if (this.props.managerId) {
            database.ref('managementEnterprises').child(this.props.managerId).on('value', snap => {
                this.setState({
                    managementEnterprise: snap.val()
                })
            })
        }
    }
    selectOption = (selectedOption) => {
        this.setState({ selectedOption })
    }
    managerValidator(managerId) {
        if(managerId) {
            const data = this.state.managementEnterprise;
            return (
                <div className="condos__management-details">
                    <h4>{data.name}</h4>
                    <span>Email: {data.email}</span>
                    <span>Teléfono: {data.phone}</span>
                    <span>Dirección: {data.addressStreet} {data.addressNumber}, {data.addressColony}, {data.addressTown}. {data.addressCity}, {data.addressCountry}. CP {data.addressZipCode}</span>
                    <Link to={`/admin/managers/${data.managementEnterpriseId}`}>Ver Empresa</Link>
                </div>
            )
        } else {
            return (
                <div className="condos__management-details">
                    <h3>No hay empresa de administración asignada a esta propiedad</h3>
                </div>
            )
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const newManagerId = this.state.selectedOption.value;
        database.ref('properties/' + this.props.propId).child('managementEnterpriseId').set(newManagerId);
        alert('Administrador Asignado');
    }
    render() {
        const { selectedOption } = this.state;
        const data = _.filter(this.state.managers, { 'status': 'active', 'isPropertieManager': 'true' });
        return (
            <div className="condos__management">
                {this.managerValidator(this.props.managerId)}
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="condos__input-container">
                        <label>Seleccionar Empresa</label>
                        <Select
                            name="condo-manager-select"
                            value={selectedOption}
                            onChange={this.selectOption}
                            options={data}
                        />
                    </div>
                    <div className="condos__input-container">
                        <button type="submit">Seleccionar Empresa</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PropertiesManagement;