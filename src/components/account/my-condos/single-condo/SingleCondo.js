import React, { Component } from 'react';
import { database } from '../../../../firebase';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import SingleCondoTools from './SingleCondoTools';
import SingleCondoMain from './SingleCondoMain';

class SingleCondo extends Component {
    constructor() {
        super();
        this.state = {
            rol: {},
            condoId: '',
            nomenclature: '',
            ownerId: ''
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount() {
        const routeState = this.props.location.state;
        if(routeState) {
            database.ref('condos/' + routeState.condoId + '/owners').child(routeState.ownerId).on('value', snap => {
                this.setState({
                    rol: snap.child('rol').val(),
                    condoId: routeState.condoId,
                    nomenclature: routeState.nomenclature,
                    ownerId: routeState.ownerId
                });
            });
        } else {
            this.context.router.history.push('/account/my-condos')
        }
    }
    render() {
        const { match } = this.props;
        const loc = this.props.location.pathname;
        const locPage = loc.split('/').pop();
        const routeState = this.props.location.state;
        const condoId = (routeState)? routeState.condoId : this.state.condoId;
        const nomenclature = (routeState) ? routeState.nomenclature : this.state.nomenclature;
        const ownerId = (routeState) ? routeState.ownerId : this.state.ownerId;
        return (
            <section className="single-condo">
                <SingleCondoTools rol={this.state.rol} loc={locPage} />
                <Switch>
                    <Route exact={true} path={match.url} render={() => <SingleCondoMain
                        condoId={condoId}
                        nomenclature={nomenclature}
                        ownerId={ownerId}
                        />}
                    />
                </Switch>
            </section>
        )
    }
}

export default SingleCondo;