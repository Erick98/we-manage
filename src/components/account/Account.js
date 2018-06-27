import React, { Component } from 'react';
import { auth, database } from '../../firebase';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Menu from '../Menu';
import Sidenav from './Sidenav';
import AccountMain from './AccountMain';
import Profile from './profile/Profile';
import MyConods from './my-condos/MyCondos';
import SingleCondo from './my-condos/single-condo/SingleCondo';
import MyProperties from './my-properties/MyProperties';
import MyEnterprises from './my-enterprises/MyEnterprises';
import SingleEnterprise from './my-enterprises/single-enterprise/SingleEnterprise';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            enterprise: undefined
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount() {
        auth.onAuthStateChanged(function(user) {
            if(user) {
                const userEmail = user.email;
                database.ref('users').orderByChild('email').equalTo(userEmail).on('child_added', snap => {
                    this.setState({
                        user: snap.val()
                    });
                });
                database.ref('managementEnterprises').orderByChild('enterpriseOwner').equalTo(userEmail).on('value', snap => {
                    const isManager = snap.exists();
                    database.ref('providers').orderByChild('enterpriseOwner').equalTo(userEmail).on('value', snapChild => {
                        const isProvider = snapChild.exists();
                        if(isManager || isProvider) {
                            this.setState({
                                enterprise: true
                            })
                        }
                    })
                })
            } else {
                this.context.router.history.push('/log-in')
            }
        }.bind(this));
    }
    render() {
        const { match } = this.props;
        const { user } = this.state;
        const loc = this.props.location.pathname;
        const locPage = loc.split('/').pop();
        return(
            <div className="account">
                <Menu />
                <div className="container">
                    <Sidenav enterprise={this.state.enterprise} loc={locPage} />
                    <div className="main">
                        <Switch>
                            <Route exact={true} path={match.url} render={() => <AccountMain/>} />
                            <Route path={`${match.url}/profile`} component={() => <Profile userEmail={user.email} />} />
                            <Route exact={true} path={`${match.url}/my-condos`} component={() => <MyConods userEmail={user.email} />} />
                            <Route path={`${match.url}/my-condos/single-condo`} component={SingleCondo} />
                            <Route exact={true} path={`${match.url}/my-properties`} component={() => <MyProperties userEmail={user.email} />} />
                            <Route exact={true} path={`${match.url}/my-enterprises`} component={() => <MyEnterprises userEmail={user.email} />} />
                            <Route path={`${match.url}/my-enterprises/single-enterprise`} component={SingleEnterprise} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;