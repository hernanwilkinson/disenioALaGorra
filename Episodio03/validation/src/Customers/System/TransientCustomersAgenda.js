import {AssertionsRunner} from "../../CreationAssertion/AssertionsRunner";
import {CustomersAgenda} from "./CustomersAgenda";

export class TransientCustomersAgenda extends CustomersAgenda {

    customers;

    constructor() {
        super();
        this.customers = [];
    }

    getCustomers() {
        return this.customers;
    }

    add(aCustomerToAdd){
        AssertionsRunner.assert(
            this.notDuplicatedDNIAssertion(aCustomerToAdd));

        this.customers.push(aCustomerToAdd);
    }

    update(anOriginalCustomer,aNewCustomer){
        AssertionsRunner.assertAll([
            this.customerIsRegisteredAssertion(anOriginalCustomer),
            this.notDuplicatedDNIAssertion(aNewCustomer)]);

        this.withCustomerIdentifiedAsIfNone(
            anOriginalCustomer.getDNI(),
            customerToUpdate => customerToUpdate.syncWith(aNewCustomer),
            () => null );
    }

    removeCustomerIdentifiedAs(aDNI){
        this.withCustomerIdentifiedAsIfNone(
            aDNI,
            customerToRemove => this.removeCustomer(customerToRemove),
            () => null );
    }

    hasCustomerIdentifiedAs(aDNI) {
        return this.withCustomerIdentifiedAsIfNone(aDNI,
            foundCustomer => true,
            () => false);
    }

    withCustomerIdentifiedAsIfNone(aDNI, foundClosure, noneClosure) {
        const foundCustomer = this.customers.find(
            customer => customer.isIdentifiedAs(Number(aDNI)));

        if(foundCustomer===undefined)
            return noneClosure();
        else
            return foundClosure(foundCustomer);
    }

    includes(aCustomer){
        return this.customers.includes(aCustomer);
    }

    mapCustomers(aMappingClosure) {
        return this.customers.map(aMappingClosure);
    }

    removeCustomer(customerToRemove) {
        const indexOfCustomerToRemove = this.customers.indexOf(customerToRemove);
        this.customers.splice(indexOfCustomerToRemove,1);
    }
}