import {ServerSystem} from "../../System/ServerSystem";
import {Customer} from "../Customer";

export class CustomersAgendaServer extends ServerSystem {
    customersAgenda;

    constructor(server, customersAgenda) {
        super();
        this.customersAgenda = customersAgenda;
        this.registerOn(server);
    }

    registerOn(server) {
        server.get("/customers", (request, response) => this.getCustomers(request, response));
        server.post("/customers/new", (request, response) => this.add(request, response));
        server.post("/customers/update", (request, response) => this.update(request, response));
        server.get("/customer/:dni", (request, response) => this.getCustomerIdentifiedAs(request, response));
        server.delete("/customer/:dni", (request, response) => this.removeCustomerIdentifiedAs(request, response));
    }

    getCustomers(request, response) {
        response.send(this.customersAgenda.getCustomers());
    }

    add(request, response) {
        const customerAsJson = request.body;
        this.executeSystemAction(
            ()=> {
                const customerToAdd = Customer.fromJson(customerAsJson);
                return this.customersAgenda.add(customerToAdd);
            },
            response);
    }

    update (request, response) {
        const customersAsJson = request.body;

        this.executeSystemAction(
            ()=> {
                const customerToUpdate = Customer.fromJson(customersAsJson[0]);
                const updatedCustomer = Customer.fromJson(customersAsJson[1]);

                this.customersAgenda.update(customerToUpdate,updatedCustomer)
            },
            response);
    }

    getCustomerIdentifiedAs (request,response) {
        response.send (
            this.customersAgenda.withCustomerIdentifiedAsIfNone(
                Number(request.params.dni),
                foundCustomer => foundCustomer,
                () => "not found"));
    }

    removeCustomerIdentifiedAs (request,response) {
        this.executeSystemAction(
        ()=> this.customersAgenda.removeCustomerIdentifiedAs(Number(request.params.dni)),
        response);
    }
}