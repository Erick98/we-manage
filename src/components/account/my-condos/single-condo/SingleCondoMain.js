import React, { Component } from 'react';
import { database } from '../../../../firebase';

class SingleCondoMain extends Component {
    constructor() {
        super();
        this.state = {
            propDetails: {}
        }
    }
    componentWillMount() {
        if (this.props.condoId && this.props.ownerId) {
            database.ref('condos/' + this.props.condoId + '/owners').child(this.props.ownerId).on('value', snap => {
                this.setState({
                    propDetails: snap.val()
                });
            });
        }
    }
    render() {
        const prop = this.state.propDetails;
        const rol = (prop.rol === 'cv') ? 'Comité de Vigilancia' : 'Condómino';
        const beginingBalance = (prop.beginingBalance) ? prop.beginingBalance : 0;
        return(
            <div className="single-condo__main">
                <h1>Detalles Generales de Condómino</h1>
                <div className="single-condo__container">
                    <div className="single-condo__container-middle">
                        <span><b>Propiedad: </b>{prop.nomenclature}</span>
                        <span><b>Indiviso: </b>{prop.portion}</span>
                        <span><b>Rol: </b>{rol}</span>
                        <span><b>Saldo Inicial: </b>{beginingBalance}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleCondoMain;