import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Home from './components/Home';
import Account from './components/account/Account';
import Admin from './components/admin/Admin';
import LogIn from './components/LogIn';
import Registry from './components/Registry';
import BecomeManager from './components/BecomeManager';
import BecomeRealtor from './components/BecomeRealtor';
import BecomeProvider from './components/BecomeProvider';
import BecomeSponsor from './components/BecomeSponsor';

const routes = (
    <Router>
        <div>
            <Route path='/' component={ Home } exact={ true } />
            <Route path='/become-manager' component={ BecomeManager } exact={ true } />
            <Route path='/become-realtor' component={ BecomeRealtor } exact={ true } />
            <Route path='/become-provider' component={ BecomeProvider } exact={ true } />
            <Route path='/become-sponsor' component={ BecomeSponsor } exact={ true } />
            <Route path='/log-in' component={ LogIn } exact={ true } />
            <Route path='/sign-up' component={ Registry } exact={ true } />
            <Route path='/account' component={ Account } />
            <Route path='/admin' component={ Admin } />
        </div>
    </Router>
)

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();