import React, { Component } from 'react';
import { database } from '../../../../firebase';
import moment from 'moment';

class ManagementNotification extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        const isRead = this.isRead.value;
        database.ref('managementEnterprises/' + this.props.enterpriseId + '/notifications/' + this.props.data.id).child('isRead').set(isRead);
    }
    render() {
        const { data } = this.props;
        return(
            <li className="management__notification-item">
                <div className="management__notification-container">
                    <p>{data.description}</p>
                    <span>{moment(data.timestamp).format('DD/MM/YYYY hh:mm a')}</span>
                </div>
                <select value={data.isRead} ref={(input) => this.isRead = input} onChange={this.handleChange}>
                    <option value="true">Leído</option>
                    <option value="false">Pendiente</option>
                </select>
            </li>
        )
    }
}

export default ManagementNotification;