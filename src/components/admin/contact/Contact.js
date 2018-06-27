import React, { Component } from 'react';

import AdminMenu from '../AdminMenu';

class Contact extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="admin__router-container">
                <AdminMenu loc="contact" />
                <div className="admin__container">
                    <h1>Contacto</h1>
                </div>
            </div>
        )
    }
}

export default Contact;