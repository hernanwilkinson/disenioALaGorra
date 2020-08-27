import {ServerSystem} from "../../System/ServerSystem";
import {Invoice} from "../Invoice";

export class SalesBookServer extends ServerSystem {
    salesBook;

    constructor(server, salesBook) {
        super();
        this.salesBook = salesBook;
        this.registerOn(server);
    }

    registerOn(server) {
        server.get("/invoices", (request, response) => this.getInvoices(request, response));
        server.post("/invoices/new", (request, response) => this.register(request, response));
    }

    getInvoices(request, response) {
        response.send(this.salesBook.getInvoices());
    }

    register(request, response) {
        const invoiceAsJson = request.body;
        const invoice = Invoice.fromJson(invoiceAsJson);

        this.executeSystemAction(
            ()=>this.salesBook.register(invoice),
            response);
    }
}