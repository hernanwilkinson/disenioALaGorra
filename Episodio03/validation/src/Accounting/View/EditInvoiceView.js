import {SystemActionView} from "../../GenericComponents/SystemActionView";
import {CustomerView} from "../../Customers/View/CustomerView";
import {CustomersAgenda} from "../../Customers/System/CustomersAgenda";
import {Link} from "react-router-dom";
import React from "react";
import {Customer} from "../../Customers/Customer";
import {FormCompletionAssistant} from "../../FormCompletionAssistant/FormCompletionAssistant";

export class EditCustomerView extends SystemActionView {
    constructor(props) {
        super(props);

        this.state.redirectTo = "/customers";
        this.state.system = props.system.getCustomersAgenda();
        this.state.formCompletionAssistant = CustomerView.createFormAssistant(
            ()=>null,[]);
        this.state.formCompletionAssistant.dniAssistant.addAssertionId(
            CustomersAgenda.duplicatedDNIAID);
        this.state.customerToEdit = null;
    }

    componentDidMount() {
        const url = new URL(window.location.href);
        const dni = url.searchParams.get("dni");
        this.state.system.withCustomerIdentifiedAsIfNone(
                dni,
                customerToEdit => this.setState((state,props)=> {
                    state.customerToEdit = customerToEdit;
                    state.formCompletionAssistant.setModel(customerToEdit);
                    return state;
                }),
                () => this.setState((state,props)=> {
                    state.formCompletionAssistant.addFailedAssertion(
                        state.system.customerIsRegisteredAssertion(FormCompletionAssistant.INVALID_MODEL)
                    );
                    return state;
                }));
    }

    modifyClicked = (event) => {
        this.setState((state,props)=> {
            state.formCompletionAssistant.withCreatedModelDo(
                customer => this.modifyWith(customer),
                ()=> null);
            return state;
        });
    }

    modifyWith(customer){
        this.executeSystemAction(
            ()=>this.state.system.update(this.state.customerToEdit,customer),
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
                    <Link className="ui button" onClick={this.modifyClicked}>Modify</Link>
                    <Link className="ui button" to={this.state.redirectTo}>Cancel</Link>
                </div>
            </div>
        )
    }

}