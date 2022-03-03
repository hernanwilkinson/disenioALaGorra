import {AssertionsFailed} from "../CreationAssertion/AssertionsFailed";
import {TransientCustomersAgenda} from "./System/TransientCustomersAgenda";
import {Customer} from "./Customer";
import {Time} from "../Time/Time";

expect.extend({
    toFailAssertion(closure, assertionId, description) {
        try {
            closure();
            return {
                message: ()=>'Should have thrown ' + AssertionsFailed.name,
                pass: false
            };
        } catch (error) {
            if (error instanceof AssertionsFailed) {
                return {
                    pass: error.hasOnlyOneAssertionFailedWith(assertionId, description)
                }
            } else
                throw error;
        }
    }
})

function nineAM() {
    return Time.at(9,0,0);
}
function tenAM() {
    return Time.at(10,0,0);
}

function fivePM() {
    return Time.at(17,0,0);
}

function sixPM() {
    return Time.at(18,0,0);
}

describe("TransientCustomersAgenda", ()=> {
    test("Can not add customers with same DNI", () => {
        const agenda = new TransientCustomersAgenda();
        const customerToAdd = Customer.named("Pepe", "Sanchez", 22444333, nineAM(), fivePM());
        agenda.add(customerToAdd);
        expect(() => agenda.add(customerToAdd))
            .toFailAssertion(TransientCustomersAgenda.duplicatedDNIAID, TransientCustomersAgenda.DUPLICATED_DNI);
    });
    test("Can add customers with different DNI", () => {
        const agenda = new TransientCustomersAgenda();
        const oneCustomer = Customer.named("Pepe", "Sanchez", 22444333, nineAM(), fivePM());
        const anotherCustomer = Customer.named("Juan", "Perez", 22444334, nineAM(), fivePM());

        agenda.add(oneCustomer);
        expect(()=>agenda.add(anotherCustomer)).not.toFailAssertion(TransientCustomersAgenda.duplicatedDNIAID, TransientCustomersAgenda.DUPLICATED_DNI);

        expect(agenda.includes(anotherCustomer)).toBeTruthy();
    });
    test("Can map its customers", () => {
        const agenda = new TransientCustomersAgenda();
        const oneCustomer = Customer.named("Pepe", "Sanchez", 22444333, nineAM(), fivePM());
        const anotherCustomer = Customer.named("Juan", "Perez", 22444334, nineAM(), fivePM());

        agenda.add(oneCustomer);
        agenda.add(anotherCustomer);

        expect(agenda.mapCustomers(customer=>customer.getFirstName())).toStrictEqual(["Pepe","Juan"]);
    });
    test("Can not update a non existing customer", () => {
        const agenda = new TransientCustomersAgenda();
        const customerToUpdate = Customer.named("Pepe", "Sanchez", 22444333, nineAM(), fivePM());

        expect(() => agenda.update(customerToUpdate,customerToUpdate))
            .toFailAssertion(TransientCustomersAgenda.notExistingCustomerAID, TransientCustomersAgenda.NOT_EXISTING_CUSTOMER);
    });
    test("Can not update to a repeated DNI", () => {
        const agenda = new TransientCustomersAgenda();
        const customerToUpdate = Customer.named("Pepe", "Sanchez", 22444333, nineAM(), fivePM());
        const anotherCustomer = Customer.named("Pepe", "Sanchez", 22444334, nineAM(), fivePM());
        const updatedCustomer = Customer.named("Pepe", "Sanchez", 22444334, nineAM(), fivePM());

        agenda.add(customerToUpdate);
        agenda.add(anotherCustomer);

        expect(() => agenda.update(customerToUpdate,updatedCustomer))
            .toFailAssertion(TransientCustomersAgenda.duplicatedDNIAID, TransientCustomersAgenda.DUPLICATED_DNI);
    });
    test("Customer is updated when possible", () => {
        const agenda = new TransientCustomersAgenda();
        const customerToUpdate = Customer.named("Pepe", "Sanchez", 22444333, nineAM(), fivePM());
        const updatedCustomer = Customer.named("Juan", "Perez", 22444334, tenAM(), sixPM());
        agenda.add(customerToUpdate);

        expect(() => agenda.update(customerToUpdate,updatedCustomer)).not.toThrow(Error);

        expect(customerToUpdate.isIdentifiedAs(updatedCustomer.getDNI()));
        expect(customerToUpdate.getFirstName()).toStrictEqual(updatedCustomer.getFirstName());
        expect(customerToUpdate.getLastName()).toStrictEqual(updatedCustomer.getLastName());
        expect(customerToUpdate.getFromWorkingHours()).toStrictEqual(updatedCustomer.getFromWorkingHours());
        expect(customerToUpdate.getToWorkingHours()).toStrictEqual(updatedCustomer.getToWorkingHours());

    });
});


