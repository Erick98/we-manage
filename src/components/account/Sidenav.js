import React, { Component } from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Sidenav extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    logOut(e) {
        e.preventDefault();
        auth.signOut().then((result) => {
            this.context.router.history.push('/')
        })
    }
    enterpriseValidator() {
        if(this.props.enterprise === true) {
            return (
                this.props.loc === 'my-enterprises' ? 
                    (<Link to="/account/my-enterprises" className="sidenav__item active"><i className="material-icons">business_center</i>Empresa(s)</Link>) : 
                    (<Link to="/account/my-enterprises" className="sidenav__item"><i className="material-icons">business_center</i>Empresa(s)</Link>)
            )
        }
    }
    render() {
        return(
            <div className="sidenav">
                <ul>
                    {this.props.loc === 'account' ? 
                        (<Link to="/account" className="sidenav__item active"><i className="material-icons">account_balance</i>Cuenta</Link>) : 
                        (<Link to="/account" className="sidenav__item"><i className="material-icons">account_balance</i>Cuenta</Link>)
                    }
                    {this.props.loc === 'profile' ? 
                        (<Link to="/account/profile" className="sidenav__item active"><i className="material-icons">perm_identity</i>Perfil</Link>) : 
                        (<Link to="/account/profile" className="sidenav__item"><i className="material-icons">perm_identity</i>Perfil</Link>)
                    }
                    {this.props.loc === 'dashboard' ? 
                        (<Link to="/account/dashboard" className="sidenav__item active"><i className="material-icons">dashboard</i>Dashboard</Link>) : 
                        (<Link to="/account/dashboard" className="sidenav__item"><i className="material-icons">dashboard</i>Dashboard</Link>)
                    }
                    {this.props.loc === 'my-condos' ? 
                        (<Link to="/account/my-condos" className="sidenav__item active"><i className="material-icons">location_city</i>Condominio(s)</Link>) : 
                        (<Link to="/account/my-condos" className="sidenav__item"><i className="material-icons">location_city</i>Condominio(s)</Link>)
                    }
                    {this.props.loc === 'my-properties' ? 
                        (<Link to="/account/my-properties" className="sidenav__item active"><i className="material-icons">home</i>Propiedades</Link>) : 
                        (<Link to="/account/my-properties" className="sidenav__item"><i className="material-icons">home</i>Propiedades</Link>)
                    }
                    {this.enterpriseValidator()}
                    {this.props.loc === 'tenders' ? 
                        (<Link to="/account/tenders" className="sidenav__item active"><i className="material-icons">business</i>Licitaciones</Link>) : 
                        (<Link to="/account/tenders" className="sidenav__item"><i className="material-icons">business</i>Licitaciones</Link>)
                    }
                    {this.props.loc === 'promos' ? 
                        (<Link to="/account/promos" className="sidenav__item active"><i className="material-icons">add_shopping_cart</i>Promociones</Link>) : 
                        (<Link to="/account/promos" className="sidenav__item"><i className="material-icons">add_shopping_cart</i>Promociones</Link>)
                    }
                    <span onClick={(e) => this.logOut(e)} className="sidenav__item"><i className="material-icons">cancel</i>Cerrar Sesión</span>
                </ul>
            </div>
        )
    }
}

export default Sidenav;