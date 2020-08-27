import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import axios from 'axios';
import {Customer} from "../../Customers/Customer";
import {Time} from "../../Time/Time";

export class InvoicesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.system = props.system;
        this.state.invoices = [];
    }

    async componentDidMount() {
        const invoices = await this.state.system.getSalesBook().getInvoices();
        this.setState((state,props)=>{
                state.invoices = invoices;
                return state;
        });
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px', width: '700px'}}>
                <table className="ui  celled striped table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Number</th>
                        <th>Addressee</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.invoices.map(invoices =>
                        <tr key={invoices.getNumber()}>
                            <td>{invoices.getIssueDate()}</td>
                            <td>{invoices.getNumber()}</td>
                            <td>{invoices.getAddressee()}</td>
                            <td>{invoices.getTotal()}</td>
                        </tr>)}
                    </tbody>
                    <tfoot className="full-width">
                    <tr>
                        <th colSpan="4">
                            <div className="ui right floated small primary">
                                <Link className="ui labeled icon button" to='invoices/add'>
                                    <i className="user icon"></i>
                                    Add Invoice
                                </Link>
                            </div>
                        </th>
                    </tr>
                    </tfoot>
                </table>
            </div>);
    }
}