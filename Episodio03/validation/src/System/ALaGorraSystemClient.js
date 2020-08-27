import {CustomersAgendaClient} from "../Customers/System/CustomersAgendaClient";
import {ALaGorraSystem} from "./ALaGorraSystem";
import {SalesBookClient} from "../Accounting/System/SalesBookClient";

export class ALaGorraSystemClient extends ALaGorraSystem {
    customersAgenda;
    salesBook;

    constructor() {
        super();
        this.customersAgenda = new CustomersAgendaClient();
        this.salesBook = new SalesBookClient();
    }

    getCustomersAgenda() {
        return this.customersAgenda;
    }

    getSalesBook() {
        return this.salesBook;
    }
}