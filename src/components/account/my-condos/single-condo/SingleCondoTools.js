import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleCondoTools extends Component {
    rolValidator(rol) {
        if(rol === 'cv') {
            return(
                this.props.loc === 'cv' ? 
                    (<Link to="/account/my-condos/single-condo/cv" className="single-condo__tools-item active">Panel de Comité de Vigilancia</Link>) : 
                    (<Link to="/account/my-condos/single-condo/cv" className="single-condo__tools-item">Panel de Comité de Vigilancia</Link>)
            )
        }
    }
    render() {
        return(
            <ul className="single-condo__tools">
                {this.props.loc === 'single-condo' ? 
                    (<Link to="/account/my-condos/single-condo" className="single-condo__tools-item active">Mi Propiedad</Link>) : 
                    (<Link to="/account/my-condos/single-condo" className="single-condo__tools-item">Mi Propiedad</Link>)
                }
                {this.props.loc === 'balance' ? 
                    (<Link to="/account/my-condos/single-condo/balance" className="single-condo__tools-item active">Estado de Cuenta</Link>) : 
                    (<Link to="/account/my-condos/single-condo/balance" className="single-condo__tools-item">Estado de Cuenta</Link>)
                }
                {this.props.loc === 'forum' ? 
                    (<Link to="/account/my-condos/single-condo/forum" className="single-condo__tools-item active">Foro</Link>) : 
                    (<Link to="/account/my-condos/single-condo/forum" className="single-condo__tools-item">Foro</Link>)
                }
                {this.props.loc === 'help' ? 
                    (<Link to="/account/my-condos/single-condo/help" className="single-condo__tools-item active">Ayuda</Link>) : 
                    (<Link to="/account/my-condos/single-condo/help" className="single-condo__tools-item">Ayuda</Link>)
                }
                {this.props.loc === 'amenities' ? 
                    (<Link to="/account/my-condos/single-condo/amenities" className="single-condo__tools-item active">Amenidades</Link>) : 
                    (<Link to="/account/my-condos/single-condo/amenities" className="single-condo__tools-item">Amenidades</Link>)
                }
                {this.rolValidator(this.props.rol)}
            </ul>
        )
    }
}

export default SingleCondoTools;