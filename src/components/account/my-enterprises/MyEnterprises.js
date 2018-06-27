import React, { Component } from 'react';
import { database } from '../../../firebase';
import { Link } from 'react-router-dom';

class MyEnterprises extends Component {
    constructor() {
        super();
        this.renderListItem = this.renderListItem.bind(this);
        this.state = {
            enterprises: {}
        }
    }
    componentDidMount() {
        if(this.props.userEmail) {
            database.ref('managementEnterprises').orderByChild('enterpriseOwner').equalTo(this.props.userEmail).once('value').then(function(snap) {
                snap.forEach(function(childSnap) {
                    this.setState({
                        enterprises: [...this.state.enterprises, { type: 'Administración', name: childSnap.child('name').val(), email: childSnap.child('email').val(), webPage: childSnap.child('webPage').val(), status: childSnap.child('status').val(), phone: childSnap.child('phone').val(), enterpriseId: childSnap.key }]
                    })
                }.bind(this));
            }.bind(this));
            database.ref('providers').orderByChild('enterpriseOwner').equalTo(this.props.userEmail).once('value').then(function(snap) {
                snap.forEach(function (childSnap) {
                    this.setState({
                        enterprises: [...this.state.enterprises, { type: 'Proveedor', name: childSnap.child('name').val(), email: childSnap.child('email').val(), webPage: childSnap.child('webPage').val(), status: childSnap.child('status').val(), phone: childSnap.child('phone').val(), enterpriseId: childSnap.key }]
                    })
                }.bind(this));
            }.bind(this));
        }
    }
    renderListItem(key) {
        const item = this.state.enterprises[key];
        return(
            <Link key={key} className="my-enterprises__item" to={{
                pathname:'/account/my-enterprises/single-enterprise',
                state: { enterpriseId:item.enterpriseId, enterpriseType:item.type }
            }}>
                <h5>{item.name}</h5>
                <span>Tipo de Empresa: {item.type}</span>
                <span>Email: {item.email}</span>
                <span>Teléfono: {item.phone}</span>
                <span>Página Web: {item.webPage}</span>
            </Link>
        )
    }
    listValidator(enterprises) {
        if(enterprises) {
            return(
                <ul>
                    {
                        Object
                            .keys(enterprises)
                            .map(this.renderListItem)
                    }
                </ul>
            )
        } else {
            return(
                <h3>Ha ocurrido un error al mostrar tus empresas, favor de intentarlo más tarde o contactar a soporte <a href="mailto:info@wemanage.com.mx">info@wemanage.com.mx</a></h3>
            )
        }
    }
    render() {
        return(
            <section className="my-enterprises">
                <h1>Mis Empresas</h1>
                {this.listValidator(this.state.enterprises)}
            </section>
        )
    }
}

export default MyEnterprises;