import React from "react";
import {Link} from 'react-router-dom'

import {SystemActionView} from "../../GenericComponents/SystemActionView";
import {InvoiceView} from "./InvoiceView";
import {SalesBook} from "../System/SalesBook";

export class AddInvoiceView extends SystemActionView {
    constructor(props) {
        super(props);

        this.state.redirectTo = "/invoices";
        this.state.system = props.system.getSalesBook();
        this.state.formCompletionAssistant = InvoiceView.createFormAssistant(
            ()=>null,[]);
        this.state.formCompletionAssistant.dateAssistant.addAssertionId(
            SalesBook.issueDateAID);
        this.state.formCompletionAssistant.numberAssistant.addAssertionId(
            SalesBook.numberAID);
    }

    addClicked = (event) => {
        this.setState((state,props)=> {
            state.formCompletionAssistant.withCreatedModelDo(
            invoice => this.addInvoice(invoice),
            ()=> null);
            return state;
        });
    }

    addInvoice(invoice){
        this.executeSystemAction(
            ()=>this.state.system.register(invoice),
            this.state.formCompletionAssistant);
    }

    render (){
        return (
            <div className="ui container" style={{ marginTop: '10px', width: '500px' }}>
                {this.renderRedirect()}
                <div className="ui segment">
                    <form className="ui form">
                        <InvoiceView formCompletionAssistant={this.state.formCompletionAssistant}/>
                    </form>
                    <Link className="ui button" onClick={this.addClicked}>Add</Link>
                    <Link className="ui button" to={this.state.redirectTo}>Cancel</Link>
                </div>
            </div>
        )
    }
}