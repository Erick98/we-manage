import React, { Component } from 'react';

import AdminMenu from '../AdminMenu';

class Dashboard extends Component {
    render() {
        return (
            <div className="admin__router-container">
                <AdminMenu loc="dashboard" />
                <div className="admin__container">
                    <h1>Dashboard</h1>
                </div>
            </div>
        )
    }
}

export default Dashboard;