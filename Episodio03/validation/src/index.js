import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import {Menu} from "./Menu";
import {CustomersView} from "./Customers/View/CustomersView";
import {AddCustomerView} from "./Customers/View/AddCustomerView";
import {ALaGorraSystemClient} from "./System/ALaGorraSystemClient";
import {EditCustomerView} from "./Customers/View/EditCustomerView";
import {AddInvoiceView} from "./Accounting/View/AddInvoiceView";
import {InvoicesView} from "./Accounting/View/InvoicesView";
import {ALaGorraTransientSystem} from "./System/ALaGorraTransientSystem";

// Descomentar de acuerdo al tipo de sistema con el que se desea trabajar
// Si se usa el ALaGorraSystemClient, recodar de levantar el server
// usando Server.js

const aLaGorraSystem = new ALaGorraTransientSystem();
//const aLaGorraSystem = new ALaGorraSystemClient();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = aLaGorraSystem;
    }

    render() {
        return (
            <BrowserRouter>
            <div>
                <Menu />
                <Route path="/" component={null} />
                <Route path="/customers" exact
                       render={ props => <CustomersView system={this.state}/>}
                />
                <Route path="/customers/add" exact
                       render={ props => <AddCustomerView system={this.state}/>}
                />
                <Route path="/customers/edit"
                       render={ props => <EditCustomerView system={this.state}/>}
                />
                <Route path="/invoices" exact
                       render={ props => <InvoicesView system={this.state}/>}
                />
                <Route path="/invoices/add" exact
                       render={ props => <AddInvoiceView system={this.state}/>}
                />
            </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);