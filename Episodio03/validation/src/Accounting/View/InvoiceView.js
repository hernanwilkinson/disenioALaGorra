import React from "react";

import {FormFieldCompletionAssistant} from "../../FormCompletionAssistant/FormFieldCompletionAssistant";
import {FormSectionCompletionAssistant} from "../../FormCompletionAssistant/FormSectionCompletionAssistant";
import {IntegerFieldCompletionAssistant} from "../../FormCompletionAssistant/IntegerFieldCompletionAssistant";

import {FormField} from "../../GenericComponents/FormField";
import {InnerModelFormField} from "../../GenericComponents/InnerModelFormField";
import {ErrorMessage} from "../../GenericComponents/ErrorMessage";

import {Invoice} from "../Invoice";
import {DateFieldCompletionAssistant} from "../../FormCompletionAssistant/DateFieldCompletionAssistant";

export class InvoiceView extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.formCompletionAssistant;
    }

    static createFormAssistant(getterFromContainerModel, assertionsId = []) {
        const dateAssistant = this.createDateAssistant();
        const numberAssistant = this.createNumberAssistant();
        const addresseeAssistant = this.createAddresseeAssistant();
        const totalAssistant = this.createTotalAssistant();

        const invoiceAssistant = FormSectionCompletionAssistant.with([
                dateAssistant,
                numberAssistant,
                addresseeAssistant,
                totalAssistant],
            (issueDate, number, addressee, total) =>
                Invoice.at(issueDate,number,addressee,total),
            getterFromContainerModel,
            assertionsId);

        invoiceAssistant.dateAssistant = dateAssistant;
        invoiceAssistant.numberAssistant = numberAssistant;
        invoiceAssistant.addresseeAssistant = addresseeAssistant;
        invoiceAssistant.totalAssistant = totalAssistant;

        return invoiceAssistant;
    }

    static createTotalAssistant() {
        return IntegerFieldCompletionAssistant.for(
            Invoice.totalAID, invoice => invoice.getTotal());
    }

    static createAddresseeAssistant() {
        return FormFieldCompletionAssistant.handling(
            null, invoice => invoice.getAddressee());
    }

    static createNumberAssistant() {
        return IntegerFieldCompletionAssistant.for(
            Invoice.numberAID, invoice => invoice.getNumber());
    }

    static createDateAssistant() {
        return FormFieldCompletionAssistant.handling(
            null, invoice => invoice.getIssueDate());
    }

    render() {
        return (
            <div>
                <FormField labelText={"Date"} inputName={"date"}
                                     inputPlaceHolder={"AAAA/MM/DD"}
                                     formCompletionAssistant={this.state.dateAssistant}/>
                <InnerModelFormField labelText={"Number"} inputName={"number"}
                                     inputPlaceHolder={"number"}
                                     formCompletionAssistant={this.state.numberAssistant}/>
                <FormField labelText={"Addressee"} inputName={"addessee"}
                           inputPlaceHolder={""}
                           formCompletionAssistant={this.state.addresseeAssistant}/>
                <InnerModelFormField labelText={"Total"} inputName={"total"}
                                     inputPlaceHolder={"Total"}
                                     formCompletionAssistant={this.state.totalAssistant}/>
                <ErrorMessage formCompletionAssistant={this.state}/>
            </div>
        );
    }
}