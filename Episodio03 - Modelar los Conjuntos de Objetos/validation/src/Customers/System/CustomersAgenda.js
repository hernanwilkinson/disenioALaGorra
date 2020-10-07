import {Assertion} from "../../CreationAssertion/Assertion";
import {AssertionsRunner} from "../../CreationAssertion/AssertionsRunner";

export class CustomersAgenda {
    static duplicatedDNIAID = "duplicatedDNIAID";
    static DUPLICATED_DNI = "There is another customer with that DNI";
    static notExistingCustomerAID = "notExistingCustomerAID";
    static NOT_EXISTING_CUSTOMER = "Customer does not exist";

    getCustomers(){
        this.shouldBeImplementedBySubclass();
    }

    add(aCustomerToAdd){
        this.shouldBeImplementedBySubclass();
    }

    update(anOriginalCustomer,aNewCustomer){
        this.shouldBeImplementedBySubclass();
    }

    removeCustomerIdentifiedAs(aDNI){
        this.shouldBeImplementedBySubclass();
    }

    notDuplicatedDNIAssertion(aCustomerToAdd) {
        return Assertion.for(aCustomerToAdd, CustomersAgenda.duplicatedDNIAID,
            () => !this.hasCustomerIdentifiedAs(aCustomerToAdd.getDNI()),
            CustomersAgenda.DUPLICATED_DNI);
    }

    customerIsRegisteredAssertion(anOriginalCustomer) {
        return Assertion.for(anOriginalCustomer, CustomersAgenda.notExistingCustomerAID,
            () => this.hasCustomerIdentifiedAs(anOriginalCustomer.getDNI()),
            CustomersAgenda.NOT_EXISTING_CUSTOMER);
    }

    withCustomerIdentifiedAsIfNone(aDNI, foundClosure, noneClosure) {
        this.shouldBeImplementedBySubclass();
    }

    shouldBeImplementedBySubclass() {
        throw new Error("Should be implemented by subclass");
    }
}