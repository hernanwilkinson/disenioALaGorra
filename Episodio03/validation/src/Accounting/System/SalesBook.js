import {AssertionsRunner} from "../../CreationAssertion/AssertionsRunner";
import {Assertion} from "../../CreationAssertion/Assertion";

export class SalesBook {

    static issueDateAID = "issueDateAID";
    static INVALID_ISSUED_DATE = "New invoice date must be equal or after last registered invoice";
    static numberAID = "numberAID";
    static INVALID_NUMBER = "New invoice number must be the next one to last registered invoice";

    getInvoices(){
        this.shouldBeImplementedBySubclass();
    }

    register(anInvoice) {
        this.shouldBeImplementedBySubclass();
    }

    shouldBeImplementedBySubclass() {
        throw new Error("Should be implemented by subclass");
    }

    lastInvoiceHasPreviousNumberToAssertion(anInvoice) {
        return Assertion.for(
            anInvoice,
            SalesBook.numberAID,
            () => this.hasLastInvoicePreviousNumberTo(anInvoice),
            SalesBook.INVALID_NUMBER);
    }

    hasLastInvoicePreviousNumberTo(anInvoice) {
        this.shouldBeImplementedBySubclass();
    }

    issuedSameDateOrAfterToAssertion(anInvoice) {
        return Assertion.for(
            anInvoice,
            SalesBook.issueDateAID,
            () => this.wasLastInvoiceIssuedSameDateOrAfterTo(anInvoice),
            SalesBook.INVALID_ISSUED_DATE);
    }

    wasLastInvoiceIssuedSameDateOrAfterTo(anInvoice) {
        this.shouldBeImplementedBySubclass();
    }


}