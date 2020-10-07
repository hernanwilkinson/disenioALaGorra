import {CustomersAgendaServer} from "../Customers/System/CustomersAgendaServer";
import {SalesBookServer} from "../Accounting/System/SalesBookServer";

export class ALaGorraServerSystem {

    constructor(server, customersAgenda,salesBook) {
        new CustomersAgendaServer(server, customersAgenda);
        new SalesBookServer(server,salesBook);
    }
}