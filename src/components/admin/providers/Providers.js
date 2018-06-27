import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Route, Link, Switch } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';
import _ from 'lodash';

import AdminMenu from '../AdminMenu';
import ProvidersDetails from './ProvidersDetails';
import ProvidersNoDetails from './ProvidersNoDetails';

class Providers extends Component {
    constructor() {
        super();
        this.renderListItem = this.renderListItem.bind(this);
        this.listValidator = this.listValidator.bind(this);
        this.state = {
            providers: {},
            users: {},
            selectedOption: ''
        }
    }
    componentDidMount() {
        database.ref('providers').once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
                this.setState({
                    providers: _.orderBy([...this.state.providers, { name: childSnap.child('name').val(), webPage: childSnap.child('webPage').val(), enterpriseOwner: childSnap.child('enterpriseOwner').val(), providerId: childSnap.child('providerId').val(), status: childSnap.child('status').val() }], ['status', 'name'], ['desc', 'asc'])
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
        this.setState({ selectedOption })
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
            const providerId = `provider-${timestamp}`;
            const enterprise = {
                name: name,
                email: email,
                rfc: rfc,
                webPage: webPage,
                taxRegime: taxRegime,
                enterpriseOwner: enterpriseOwner,
                providerId: providerId,
                status: 'pending',
                timestamp: timestamp
            }
            database.ref('providers').child(providerId).set(enterprise);
            alert('Empresa Agregada');
            this.addForm.reset();
        } else {
            alert('Completa todos los campos');
        }
    }
    renderListItem(key) {
        const item = this.state.providers[key];
        const status = (item.status === 'pending') ? "Pendiente de Aprovación" : "Empresa Activa";
        const loc = this.props.location.pathname;
        const locId = loc.split('/').pop();
        
        if(item.providerId === locId) {
            return (
                <Link key={key} to={`${this.props.match.url}/${item.providerId}`} className="providers__list-item item-active">
                    <h5>{item.name}</h5>
                    <span>{status}</span>
                    <span>Fecha de Registro: {moment(item.timestamp).format('LLL')}</span>
                </Link>
            )
        } else {
            return (
                <Link key={key} to={`${this.props.match.url}/${item.providerId}`} className="providers__list-item">
                    <h5>{item.name}</h5>
                    <span>{status}</span>
                    <span>Fecha de Registro: {moment(item.timestamp).format('LLL')}</span>
                </Link>
            )
        }
    }
    listValidator() {
        if(this.state.providers) {
            return (
                <ul className="providers__list">
                    {
                        Object
                            .keys(this.state.providers)
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
                <AdminMenu loc="providers" />
                <div className="admin__container">
                    <div className="providers">
                        <section className="providers__form">
                            <form ref={(input) => this.addForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                                <h2>Crear proveedor</h2>
                                <div className="providers__input-container">
                                    <label>Nombre de Empresa</label>
                                    <input ref={(input) => this.name = input} type="text"/>
                                </div>
                                <div className="providers__input-container">
                                    <label>Usuario Dueño de Empresa</label>
                                    <Select
                                        name="user-owner-select"
                                        value={selectedOption}
                                        onChange={this.selectOption}
                                        options={users}
                                    />
                                </div>
                                <div className="providers__input-container">
                                    <label>Email Corporativo</label>
                                    <input ref={(input) => this.email = input} type="email"/>
                                </div>
                                <div className="providers__input-container">
                                    <label>RFC</label>
                                    <input ref={(input) => this.rfc = input} type="text" />
                                </div>
                                <div className="providers__input-container">
                                    <label>Régimen Fiscal</label>
                                    <select ref={(input) => this.taxRegime = input}>
                                        <option value="personal">Persona Física</option>
                                        <option value="enterprise">Persona Moral</option>
                                    </select>
                                </div>
                                <div className="providers__input-container">
                                    <label>Página Web</label>
                                    <input ref={(input) => this.webPage = input} type="text" />
                                </div>
                                <div className="providers__input-container">
                                    <button type="submit">Crear</button>
                                </div>
                            </form>
                        </section>
                        <section className="providers__container">
                            <div className="providers__container-middle">
                                <h2>Lista de Proveedores</h2>
                                {this.listValidator()}
                            </div>
                            <Switch>
                                <Route path={`${match.url}/:providerId`} component={props => <ProvidersDetails {...props} />} />
                                <Route exact={true} path={match.url} render={() => <ProvidersNoDetails />} />
                            </Switch>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Providers;