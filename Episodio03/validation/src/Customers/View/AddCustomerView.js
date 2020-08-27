import React from "react";
import {Link} from 'react-router-dom'

import {CustomersAgenda} from "../System/CustomersAgenda";

import {SystemActionView} from "../../GenericComponents/SystemActionView";
import {CustomerView} from "./CustomerView";

export class AddCustomerView extends SystemActionView {
    constructor(props) {
        super(props);

        this.state.redirectTo = "/customers";
        this.state.system = props.system.getCustomersAgenda();
        this.state.formCompletionAssistant = CustomerView.createFormAssistant(
            ()=>null,[]);
        this.state.formCompletionAssistant.dniAssistant.addAssertionId(
            CustomersAgenda.duplicatedDNIAID);
    }

    addClicked = (event) => {
        this.setState((state,props)=> {
            state.formCompletionAssistant.withCreatedModelDo(
            customer => this.addCustomer(customer),
            ()=> null);
            return state;
        });
    }

    addCustomer(customer){
        this.executeSystemAction(
            ()=>this.state.system.add(customer),
            this.state.formCompletionAssistant);
    }

    render (){
        return (
            <div className="ui container" style={{ marginTop: '10px', width: '500px' }}>
                {this.renderRedirect()}
                <div className="ui segment">
                    <form className="ui form">
                        <CustomerView formCompletionAssistant={this.state.formCompletionAssistant}/>
                    </form>
                    <Link className="ui button" onClick={this.addClicked}>Add</Link>
                    <Link className="ui button" to={this.state.redirectTo}>Cancel</Link>
                </div>
            </div>
        )
    }
}