import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

export class Menu extends React.Component {
    render(){
        return (
            <div className="ui secondary pointing menu">
                <Link to="/customers" className="item">
                    Customers
                </Link>
                <Link to="/invoices" className="item">
                    Invoices
                </Link>
            </div>
        );
    }
}