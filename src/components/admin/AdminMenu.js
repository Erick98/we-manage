import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

class AdminMenu extends Component {
    componentDidMount() {
        if(this.props.loc === 'dashboard') {
            const dashboard = ReactDom.findDOMNode(this.dashboard);
            dashboard.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'condos') {
            const condos = ReactDom.findDOMNode(this.condos);
            condos.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'properties') {
            const properties = ReactDom.findDOMNode(this.properties);
            properties.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'managers') {
            const managers = ReactDom.findDOMNode(this.managers);
            managers.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'providers') {
            const providers = ReactDom.findDOMNode(this.providers);
            providers.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'tenders') {
            const tenders = ReactDom.findDOMNode(this.tenders);
            tenders.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'payments') {
            const payments = ReactDom.findDOMNode(this.payments);
            payments.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'users') {
            const users = ReactDom.findDOMNode(this.users);
            users.classList.toggle('admin-menu__link-active');
        }
        if(this.props.loc === 'contact') {
            const contact = ReactDom.findDOMNode(this.contact);
            contact.classList.toggle('admin-menu__link-active');
        }
    }
    render() {
        return (
            <nav className="admin-menu">
                <ul>
                    <Link ref={(input) => this.dashboard = input} to="/admin" className="admin-menu__item">Dashboard</Link>
                    <Link ref={(input) => this.condos = input} to="/admin/condos" className="admin-menu__item">Condominios</Link>
                    <Link ref={(input) => this.properties = input} to="/admin/properties" className="admin-menu__item">Propiedades</Link>
                    <Link ref={(input) => this.managers = input} to="/admin/managers" className="admin-menu__item">Administradores</Link>
                    <Link ref={(input) => this.providers = input} to="/admin/providers" className="admin-menu__item">Proveedores</Link>
                    <Link ref={(input) => this.tenders = input} to="/admin/tenders" className="admin-menu__item">Licitaciones</Link>
                    <Link ref={(input) => this.payments = input} to="/admin/payments" className="admin-menu__item">Pagos y Cobranza</Link>
                    <Link ref={(input) => this.users = input} to="/admin/users" className="admin-menu__item">Usuarios y Registros</Link>
                    <Link ref={(input) => this.contact = input} to="/admin/contact" className="admin-menu__item">Contacto</Link>
                </ul>
            </nav>
        )
    }
}

export default AdminMenu;