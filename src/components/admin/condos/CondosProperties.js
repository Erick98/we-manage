import React, { Component } from 'react';
import { database } from '../../../firebase';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class CondosProperties extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(snap) {
        return(
            <div
                style={{ backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = this.props.owners;
                    if(snap.column.id === 'portion') {
                        data[snap.index][snap.column.id] = Number(e.target.innerHTML)
                    } else {
                        data[snap.index][snap.column.id] = e.target.innerHTML;
                    }
                    database.ref('condos/' + this.props.condoId).child('owners').set(data);
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.owners[snap.index][snap.column.id]
                }}
            />
        )
    }
    render() {
        return(
            <div>
                <ReactTable
                    data={this.props.owners}
                    columns={[
                        {
                            Header: "Nomenclatura",
                            accessor: "nomenclature",
                            Cell: this.handleChange
                        },
                        {
                            Header: "Email",
                            accessor: "email",
                            Cell: this.handleChange
                        },
                        {
                            Header: "Indiviso",
                            accessor: "portion",
                            Cell: this.handleChange
                        },
                        {
                            Header: "Rol",
                            accessor: "rol"
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

export default CondosProperties;