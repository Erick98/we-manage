import React, { Component } from 'react';

import AdminMenu from '../AdminMenu';

class Payments extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="admin__router-container">
                <AdminMenu loc="payments" />
                <div className="admin__container">
                    <h1>Pagos y Cobranza</h1>
                </div>
            </div>
        )
    }
}

export default Payments;