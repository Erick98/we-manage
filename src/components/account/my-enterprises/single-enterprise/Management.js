import React, { Component } from 'react';
import { database } from '../../../../firebase';
import { Link, Switch, Route } from 'react-router-dom';
import ManagementEnterprise from './ManagementEnterprise';

class Management extends Component {
    constructor() {
        super();
        this.state = {
            isCondominiumManager: undefined,
            isPropertieManager: undefined
        }
    }
    componentWillMount() {
        database.ref('managementEnterprises').child(this.props.enterpriseId).on('value', snap => {
            this.setState({
                isCondominiumManager: snap.child('isCondominiumManager').val(),
                isPropertieManager: snap.child('isPropertieManager').val()
            })
        })
    }
    condoValidator(data) {
        if(data === 'true') {
            const loc = this.props.loc;
            return(
                loc === 'condos' ?
                    (<Link to="/account/my-enterprises/single-enterprise/condos" className="management__item active">Condominios Administrando</Link>) :
                    (<Link to="/account/my-enterprises/single-enterprise/condos" className="management__item">Condominios Administrando</Link>)
            )
        }
    }
    propValidator(data) {
        if(data === 'true') {
            const loc = this.props.loc;
            return(
                loc === 'properties' ?
                    (<Link to="/account/my-enterprises/single-enterprise/properties" className="management__item active">Propiedades Administrando</Link>) :
                    (<Link to="/account/my-enterprises/single-enterprise/properties" className="management__item">Propiedades Administrando</Link>)
            )
        }
    }
    render() {
        const { match } = this.props;
        const loc = this.props.loc;
        return(
            <section className="management">
                <ul className="management__nav">
                    {loc === 'single-enterprise' ? 
                        (<Link to="/account/my-enterprises/single-enterprise" className="management__item active">Empresa</Link>) : 
                        (<Link to="/account/my-enterprises/single-enterprise" className="management__item">Empresa</Link>)
                    }
                    {this.condoValidator(this.state.isCondominiumManager)}
                    {this.propValidator(this.state.isPropertieManager)}
                    {loc === 'finance' ?
                        (<Link to="/account/my-enterprises/single-enterprise/finance" className="management__item active">Finanzas</Link>) :
                        (<Link to="/account/my-enterprises/single-enterprise/finance" className="management__item">Finanzas</Link>)
                    }
                </ul>
                <Switch>
                    <Route exact={true} path='/account/my-enterprises/single-enterprise' render={() => <ManagementEnterprise
                        enterpriseId={this.props.enterpriseId}
                    />} />
                </Switch>
            </section>
        )
    }
}

export default Management;