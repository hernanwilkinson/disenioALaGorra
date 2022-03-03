import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import axios from 'axios';
import {Customer} from "../Customer";
import {Time} from "../../Time/Time";

export class CustomersView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.system = props.system;
        this.state.customers = [];
    }

    async componentDidMount() {
        console.log(this.state.system.getCustomersAgenda());
        const customers = await this.state.system.getCustomersAgenda().getCustomers();

        this.setState((state,props)=>{
                state.customers = customers;
                return state;
            });
    }

    async delete(aDNI) {
        this.state.system.getCustomersAgenda().removeCustomerIdentifiedAs(aDNI);
        await this.componentDidMount();
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px', width: '700px'}}>
                <table className="ui  celled striped table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>DNI</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.customers.map(customer =>
                        <tr key={customer.getDNI()}>
                            <td>{customer.getFirstName()}</td>
                            <td>{customer.getLastName()}</td>
                            <td>{customer.getDNI()}</td>
                            <td>
                                <Link className="ui button"
                                      to={'/customers/edit?dni=' + customer.getDNI()}>
                                    Update
                                </Link>
                                <button className="ui button" onClick={()=>this.delete(customer.getDNI())}>
                                    Delete
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                    <tfoot className="full-width">
                    <tr>
                        <th colSpan="4">
                            <div className="ui right floated small primary">
                                <Link className="ui labeled icon button" to='customers/add'>
                                    <i className="user icon"></i>
                                    Add Customer
                                </Link>
                            </div>
                        </th>
                    </tr>
                    </tfoot>
                </table>
            </div>);
    }
}