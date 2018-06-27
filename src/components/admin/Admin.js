import React, { Component } from 'react';
import { auth, database } from '../../firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Condos from './condos/Condos';
import Menu from '../Menu';
import Dashboard from './dashboard/Dashboard';
import Properties from './properties/Properties';
import Managers from './managers/Managers';
import Providers from './providers/Providers';
import Payments from './payments/Payments';
import Users from './users/Users';
import Contact from './contact/Contact';

class Admin extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount() {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                const userEmail = user.email;
                database.ref('users').orderByChild('email').equalTo(userEmail).on('child_added', snap => {
                    const rol = snap.child('rol').val();
                    if(rol !== 'admin') {
                        this.context.router.history.push('/account')
                    }
                })
            } else {
                this.context.router.history.push('/log-in')
            }
        }.bind(this));
    }
    render() {
        const { match } = this.props;
        return (
            <div className="admin">
                <Menu />
                <Router>
                    <div>
                        <Route exact={true} path={match.url} render={() => <Dashboard />} />
                        <Route path={`${match.url}/condos`} component={Condos} />
                        <Route path={`${match.url}/properties`} component={Properties} />
                        <Route path={`${match.url}/managers`} component={Managers} />
                        <Route path={`${match.url}/providers`} component={Providers} />
                        <Route path={`${match.url}/payments`} component={Payments} />
                        <Route path={`${match.url}/users`} component={Users} />
                        <Route path={`${match.url}/contact`} component={Contact} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default Admin;