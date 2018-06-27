import React, { Component } from 'react';

import AdminMenu from '../AdminMenu';

class Users extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="admin__router-container">
                <AdminMenu loc="users" />
                <div className="admin__container">
                    <h1>Usuarios y Registros</h1>
                </div>
            </div>
        )
    }
}

export default Users;