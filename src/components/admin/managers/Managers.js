import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';
import _ from 'lodash';

import 'react-select/dist/react-select.css';

import AdminMenu from '../AdminMenu';
import ManagersDetails from './ManagersDetails';
import ManagersNoDetails from './ManagersNoDetails';

class Managers extends Component {
    constructor() {
        super();
        this.renderListItem = this.renderListItem.bind(this);
        this.listValidator = this.listValidator.bind(this);
        this.state = {
            managers: {},
            users: {},
            selectedOption: ''
        }
    }
    componentDidMount() {
        database.ref('managementEnterprises').once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
                this.setState({
                    managers: _.orderBy([...this.state.managers, { name: childSnap.child('name').val(), webPage: childSnap.child('webPage').val(), enterpriseOwner: childSnap.child('enterpriseOwner').val(), managementEnterpriseId: childSnap.child('managementEnterpriseId').val(), status: childSnap.child('status').val() }], ['status', 'name'], ['desc', 'asc'])
                })
            }.bind(this));
        }.bind(this));
        database.ref('users').once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
                this.setState({
                    users: [...this.state.users, { label: childSnap.child('name').val() + ' ' + childSnap.child('lastName').val() + ' - ' + childSnap.child('email').val(), value: childSnap.child('email').val() }]
                })
            }.bind(this));
        }.bind(this));
    }
    selectOption = (selectedOption) => {
        this.setState({ selectedOption });
    }
    handleSubmit(e) {
        e.preventDefault();
        const timestamp = moment().valueOf();
        const name = this.name.value;
        const email = this.email.value;
        const rfc = this.rfc.value;
        const webPage = this.webPage.value;
        const taxRegime = this.taxRegime.value;
        const enterpriseOwner = this.state.selectedOption.value;

        if(name && email && rfc && webPage && taxRegime && enterpriseOwner) {
            const managementEnterpriseId = `managementEnterprise-${timestamp}`;
            const enterprise = {
                name: name,
                email: email,
                rfc: rfc,
                webPage: webPage,
                taxRegime: taxRegime,
                enterpriseOwner: enterpriseOwner,
                managementEnterpriseId: managementEnterpriseId,
                status: 'pending',
                timestamp: timestamp
            }
            database.ref('managementEnterprises').child(managementEnterpriseId).set(enterprise);
            alert('Empresa Agregada');
            this.addForm.reset();
        } else {
            alert('Completa todos los campos');
        }
    }
    renderListItem(key) {
        const item = this.state.managers[key];
        const status = (item.status === 'pending') ? "Pendiente de Aprovación" : "Empresa Activa";
        const loc = this.props.location.pathname;
        const locId = loc.split('/').pop();
        
        if(item.managementEnterpriseId === locId) {
            return (
                <Link key={key} to={`${this.props.match.url}/${item.managementEnterpriseId}`} className="managers__list-item item-active">
                    <h5>{item.name}</h5>
                    <span>{status}</span>
                    <span>Fecha de Registro: {moment(item.timestamp).format('LLL')}</span>
                </Link>
            )
        } else {
            return (
                <Link key={key} to={`${this.props.match.url}/${item.managementEnterpriseId}`} className="managers__list-item">
                    <h5>{item.name}</h5>
                    <span>{status}</span>
                    <span>Fecha de Registro: {moment(item.timestamp).format('LLL')}</span>
                </Link>
            )
        }
    }
    listValidator() {
        if(this.state.managers) {
            return (
                <ul className="managers__list">
                    {
                        Object
                            .keys(this.state.managers)
                            .map(this.renderListItem)
                    }
                </ul>
            )
        }
    }
    render() {
        const { match } = this.props;
        const users = _.orderBy(this.state.users, ['label'], ['asc']);
        const { selectedOption } = this.state;
        return (
            <div className="admin__router-container">
                <AdminMenu loc="managers" />
                <div className="admin__container">
                    <div className="managers">
                        <section className="managers__form">
                            <form ref={(input) => this.addForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                                <h2>Crear empresa de administración</h2>
                                <div className="managers__input-container">
                                    <label>Nombre de la Empresa</label>
                                    <input ref={(input) => this.name = input} type="text"/>
                                </div>
                                <div className="managers__input-container">
                                    <label>Usuario Dueño de Empresa</label>
                                    <Select
                                        name="user-owner-select"
                                        value={selectedOption}
                                        onChange={this.selectOption}
                                        options={users}
                                    />
                                </div>
                                <div className="managers__input-container">
                                    <label>Email Corporativo</label>
                                    <input ref={(input) => this.email = input} type="email" />
                                </div>
                                <div className="managers__input-container">
                                    <label>RFC</label>
                                    <input ref={(input) => this.rfc = input} type="text" />
                                </div>
                                <div className="managers__input-container">
                                    <label>Régimen Fiscal</label>
                                    <select ref={(input) => this.taxRegime = input}>
                                        <option value="personal">Persona Física</option>
                                        <option value="enterprise">Persona Moral</option>
                                    </select>
                                </div>
                                <div className="managers__input-container">
                                    <label>Página Web</label>
                                    <input ref={(input) => this.webPage = input} type="text" />
                                </div>
                                <div className="managers__input-container">
                                    <button type="submit">Crear</button>
                                </div>
                            </form>
                        </section>
                        <section className="managers__container">
                            <div className="managers__container-middle">
                                <h2>Lista de Administradores</h2>
                                {this.listValidator()}
                            </div>
                            <Switch>
                                <Route path={`${match.url}/:managerId`} component={props => <ManagersDetails {...props} />} />
                                <Route exact={true} path={match.url} render={() => <ManagersNoDetails />} />
                            </Switch>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Managers;