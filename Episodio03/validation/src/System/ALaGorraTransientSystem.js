import {ALaGorraSystem} from "./ALaGorraSystem";
import {TransientCustomersAgenda} from "../Customers/System/TransientCustomersAgenda";
import {TransientSalesBook} from "../Accounting/System/TransientSalesBook";

export class ALaGorraTransientSystem extends ALaGorraSystem {
    customersAgenda;
    salesBook;

    constructor() {
        super();
        this.customersAgenda = new TransientCustomersAgenda();
        this.salesBook = new TransientSalesBook();
    }

    getCustomersAgenda() {
        return this.customersAgenda;
    }

    getSalesBook() {
        return this.salesBook;
    }
}