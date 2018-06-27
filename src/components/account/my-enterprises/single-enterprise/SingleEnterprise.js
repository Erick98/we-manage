import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Management from './Management';

class SingleEnterprise extends Component {
    constructor() {
        super();
        this.state = {
            enterpriseId: '',
            enterpriseType: ''
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount() {
        const routeState = this.props.location.state;
        if(routeState) {
            this.setState({
                enterpriseId: routeState.enterpriseId,
                enterpriseType: routeState.enterpriseType
            });
        } else {
            this.context.router.history.push('/account/my-enterprises')
        }
    }
    render() {
        const routeState = this.props.location.state;
        const enterpriseId = (routeState)? routeState.enterpriseId : this.state.enterpriseId;
        const enterpriseType = (routeState) ? routeState.enterpriseType : this.state.enterpriseType;
        const loc = this.props.location.pathname;
        const locPage = loc.split('/').pop();

        if(enterpriseType === 'Administración') {
            return(<Management loc={locPage} enterpriseId={enterpriseId} />)
        } else if(enterpriseType === 'Proveedor') {
            return(
                <h1>Proveedor WeManage {enterpriseId}</h1>
            )
        } else {
            return(
                <h1>Ha ocurrido un error</h1>
            )
        }
    }
}

export default SingleEnterprise;