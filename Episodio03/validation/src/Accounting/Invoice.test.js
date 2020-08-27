import {AssertionsFailed} from "../CreationAssertion/AssertionsFailed";
import {Invoice} from "./Invoice";
import {SalesBook} from "./System/SalesBook";
import {TransientSalesBook} from "./System/TransientSalesBook";

expect.extend({
    toFailCreation(closure, assertionId, description) {
        try {
            closure();
            return {
                message: ()=>'Should have throw ' + AssertionsFailed.name,
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

describe("Invoice", ()=> {
    test("Number must be greater than 0", () => {
        expect(() => Invoice.at(Date.UTC(2020, 8, 21), 0, "Pepe Sanchez", 1000))
            .toFailCreation(Invoice.numberAID, Invoice.INVALID_NUMBER);
    });
    test("Number must be integer", () => {
        expect(() => Invoice.at(Date.UTC(2020, 8, 21), 1.1, "Pepe Sanchez", 1000))
            .toFailCreation(Invoice.numberAID, Invoice.INVALID_NUMBER);
    });
    test("Total must be greater than 0", () => {
        expect(() => Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 0))
            .toFailCreation(Invoice.totalAID, Invoice.INVALID_TOTAL);
    });
    test("Knows when it was issued in a date", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.wasIssuedOn(Date.UTC(2020,8,21))).toBeTruthy();
    });
    test("Knows when it was not issued in a date", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.wasIssuedOn(Date.UTC(2020,8,22))).toBeFalsy();
    });
    test("Knows its number", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.isNumbered(1)).toBeTruthy();
    });
    test("Knows when it is not its number", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.isNumbered(2)).toBeFalsy();
    });
    test("Knows its addressee", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.wasAddressTo("Pepe Sanchez")).toBeTruthy();
    });
    test("Knows when it is not addressed to somebody", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.wasAddressTo("Juan Perez")).toBeFalsy();
    });
    test("Knows its total", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.isTotal(100)).toBeTruthy();
    });
    test("Knows when it is not itstotal", () => {
        const invoice = Invoice.at(Date.UTC(2020, 8, 21), 1, "Pepe Sanchez", 100);
        expect(invoice.isTotal(99)).toBeFalsy();
    });

});

describe("Sales book", ()=> {
    test("Keeps registered invoices", () => {
        const salesBook = new TransientSalesBook();
        const invoice = Invoice.at(Date.UTC(2020,8,21),1,"Pepe",10);

        salesBook.register(invoice);
        expect(salesBook.hasRegistered(invoice)).toBeTruthy();
    });
    test("Knows when an invoice was not registered", () => {
        const salesBook = new TransientSalesBook();
        const notRegisteredInvoice = Invoice.at(Date.UTC(2020,8,21),1,"Pepe",10);

        expect(salesBook.hasRegistered(notRegisteredInvoice)).toBeFalsy();
    });
    test("Can not register invoice with date before of last issued invoice date", () => {
        const firstInvoice = Invoice.at(Date.UTC(2020,8,21),1,"Pepe",10);
        const lastInvoice = Invoice.at(Date.UTC(2020,8,20),2,"Pepe",10);
        const salesBook = new TransientSalesBook();

        salesBook.register(firstInvoice);
        expect(()=>salesBook.register(lastInvoice)).toFailCreation(
            SalesBook.issueDateAID,SalesBook.INVALID_ISSUED_DATE
        );
    });
    test("Can register invoice with date equal or after last issued invoice date and following number", () => {
        const firstInvoice = Invoice.at(Date.UTC(2020,8,21),1,"Pepe",10);
        const lastInvoice = Invoice.at(Date.UTC(2020,8,21),2,"Pepe",10);
        const salesBook = new TransientSalesBook();

        salesBook.register(firstInvoice);
        expect(()=>salesBook.register(lastInvoice)).not.toThrow(Error);
        expect(salesBook.hasRegistered(lastInvoice)).toBeTruthy();
    });
    test("Can not register invoice with same number as last invoice", () => {
        const firstInvoice = Invoice.at(Date.UTC(2020,8,21),1,"Pepe",10);
        const lastInvoice = Invoice.at(Date.UTC(2020,8,21),1,"Pepe",10);
        const salesBook = new TransientSalesBook();

        salesBook.register(firstInvoice);
        expect(()=>salesBook.register(lastInvoice)).toFailCreation(
            SalesBook.numberAID,SalesBook.INVALID_NUMBER);
    });

});
