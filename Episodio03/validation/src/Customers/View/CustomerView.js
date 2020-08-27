import React from "react";
import {Customer} from "../Customer";

import {FormFieldCompletionAssistant} from "../../FormCompletionAssistant/FormFieldCompletionAssistant";
import {FormSectionCompletionAssistant} from "../../FormCompletionAssistant/FormSectionCompletionAssistant";
import {IntegerFieldCompletionAssistant} from "../../FormCompletionAssistant/IntegerFieldCompletionAssistant";

import {FormField} from "../../GenericComponents/FormField";
import {InnerModelFormField} from "../../GenericComponents/InnerModelFormField";
import {ErrorMessage} from "../../GenericComponents/ErrorMessage";

import {TimeView} from "../../Time/View/TimeView";

export class CustomerView extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.formCompletionAssistant;
    }

    static createFormAssistant(getterFromContainerModel, assertionsId = []) {
        const firstNameAssistant = this.createFirstNameAssistant();
        const lastNameAssistant = this.createLastNameAssistant();
        const dniAssistant = this.createDNIAssistant();
        const fromWorkingHoursAssistant = this.createFromWorkingHoursAssistant();
        const toWorkingHoursAssistant = this.createToWorkingHoursAssistant();

        const customerAssistant = FormSectionCompletionAssistant.with([
                firstNameAssistant,
                lastNameAssistant,
                dniAssistant,
                fromWorkingHoursAssistant,
                toWorkingHoursAssistant],
            (firstName, lastName, dni, fromWorkingHours, toWorkingHours) =>
                Customer.named(firstName, lastName, dni, fromWorkingHours, toWorkingHours),
            getterFromContainerModel,
            assertionsId);

        customerAssistant.firstNameAssistant = firstNameAssistant;
        customerAssistant.lastNameAssistant = lastNameAssistant;
        customerAssistant.dniAssistant = dniAssistant;
        customerAssistant.fromWorkingHoursAssistant = fromWorkingHoursAssistant;
        customerAssistant.toWorkingHoursAssistant = toWorkingHoursAssistant;

        return customerAssistant;
    }

    static createFromWorkingHoursAssistant() {
        return TimeView.createFormAssistant(
            customer => customer.getFromWorkingHours());
    }

    static createToWorkingHoursAssistant() {
        return TimeView.createFormAssistant(
            customer => customer.getToWorkingHours());
    }

    static createDNIAssistant() {
        return IntegerFieldCompletionAssistant.for(
            Customer.dniAID, customer => customer.getDNI());
    }

    static createLastNameAssistant() {
        return FormFieldCompletionAssistant.handling(
            Customer.lastNameAID, customer => customer.getLastName());
    }

    static createFirstNameAssistant() {
        return FormFieldCompletionAssistant.handling(
            Customer.firstNameAID, customer => customer.getFirstName());
    }

    render() {
        return (
            <div>
                <FormField labelText={"First Name"} inputName={"first-name"}
                           inputPlaceHolder={"First Name"}
                           formCompletionAssistant={this.state.firstNameAssistant}/>
                <FormField labelText={"Last Name"} inputName={"last-name"}
                           inputPlaceHolder={"Last Name"}
                           formCompletionAssistant={this.state.lastNameAssistant}/>
                <InnerModelFormField labelText={"DNI"} inputName={"dni"}
                                     inputPlaceHolder={"DNI"}
                                     formCompletionAssistant={this.state.dniAssistant}/>
                <div className="two fields">
                    <div className="field">
                        <label>WorkingFrom</label>
                        <TimeView formCompletionAssistant={this.state.fromWorkingHoursAssistant}/>
                    </div>
                    <div className="field">
                        <label>To</label>
                        <TimeView formCompletionAssistant={this.state.toWorkingHoursAssistant}/>
                    </div>
                </div>
                <ErrorMessage formCompletionAssistant={this.state}/>
            </div>
        );
    }
}