import {AssertionsRunner} from "../CreationAssertion/AssertionsRunner";
import {Assertion} from "../CreationAssertion/Assertion";

export class Invoice {
    static numberAID = "numberAID";
    static INVALID_NUMBER = "Accounting number must be an integer greater than 0";
    static totalAID = "totalAID";
    static INVALID_TOTAL = "Total must be greater than 0";

    issueDate;
    number;
    addressee;
    total;

    static fromJson(invoiceAsJson){
        return this.at(
            invoiceAsJson.issueDate,
            Number(invoiceAsJson.number),
            invoiceAsJson.addressee,
            Number(invoiceAsJson.total));
    }

    static at(anIssueDate, aNumber, anAddressee, aTotal) {
        AssertionsRunner.assertAll([
            this.numberAssertionFor(aNumber),
            this.totalAssertionFor(aTotal)
        ]);

        return new this(anIssueDate,aNumber,anAddressee,aTotal);
    }

    static totalAssertionFor(aTotal) {
        return Assertion.for(
            aTotal,
            this.totalAID,
            () => aTotal > 0,
            this.INVALID_TOTAL);
    }

    static numberAssertionFor(aNumber) {
        return Assertion.for(
            aNumber,
            this.numberAID,
            () => Number.isInteger(aNumber) && aNumber > 0,
            this.INVALID_NUMBER);
    }

    constructor(anIssuedDate,aNumber,anAddressee,aTotal) {
        this.issueDate = anIssuedDate;
        this.number = aNumber;
        this.addressee = anAddressee;
        this.total = aTotal;
    }

    wasIssuedOn(aPotentialIssueDate){
        return this.issueDate===aPotentialIssueDate;
    }
    wasIssuedSameDateOrBefore(anInvoice){
        return this.issueDate<=anInvoice.getIssueDate();
    }
    getIssueDate(){
        return this.issueDate;
    }
    isNumbered(aPotentialNumber){
        return this.number===aPotentialNumber;
    }
    isPreviousNumberTo(anInvoice){
        return this.number+1 === anInvoice.getNumber();
    }
    getNumber(){
        return this.number;
    }
    wasAddressTo(aPotentialAddressee){
        return this.addressee.
            localeCompare(aPotentialAddressee,undefined,{ sensitivity: 'base' })===0;
    }
    isTotal(aPotentialTotal){
        return this.total===aPotentialTotal;
    }
    getAddressee(){
        return this.addressee;
    }
    getTotal(){
        return this.total;
    }

}