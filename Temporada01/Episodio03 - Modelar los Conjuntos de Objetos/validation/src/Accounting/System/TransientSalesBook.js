import {AssertionsRunner} from "../../CreationAssertion/AssertionsRunner";
import {Assertion} from "../../CreationAssertion/Assertion";
import {SalesBook} from "./SalesBook";

export class TransientSalesBook extends SalesBook {

    invoices;

    constructor() {
        super();
        this.invoices = [];
    }

    getInvoices() {
        return this.invoices;
    }

    register(anInvoice) {
        AssertionsRunner.assertAll([
            this.issuedSameDateOrAfterToAssertion(anInvoice),
            this.lastInvoiceHasPreviousNumberToAssertion(anInvoice)]);

        this.invoices.push(anInvoice);
    }

    hasLastInvoicePreviousNumberTo(anInvoice) {
        return this.withLastInvoice(
            lastInvoice=>lastInvoice.isPreviousNumberTo(anInvoice),
            ()=>true);
    }

    wasLastInvoiceIssuedSameDateOrAfterTo(anInvoice) {
        return this.withLastInvoice(
            lastInvoice =>lastInvoice.wasIssuedSameDateOrBefore(anInvoice),
            ()=>true);
    }

    withLastInvoice(aLastInvoiceClosure,noneInvoiceClosure){
        if(this.invoices.length===0)
            return noneInvoiceClosure();
        else
            return aLastInvoiceClosure(this.invoices[this.invoices.length-1]);
    }

    hasRegistered(anInvoice) {
        return this.invoices.includes(anInvoice);
    }
}