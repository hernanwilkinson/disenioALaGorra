import axios from "axios";
import {AssertionsFailed} from "../../CreationAssertion/AssertionsFailed";
import {Customer} from "../Customer";
import {CustomersAgenda} from "./CustomersAgenda";

export class CustomersAgendaClient extends CustomersAgenda {

    async getCustomers(){
        const { data } = await axios.get('http://localhost:3000/customers', {
            params: {
            },
        });

        const customers = data.map(customerAsJson =>
            Customer.fromJson(customerAsJson));

        return customers;
    }

    async add(aCustomer){
        const response = await axios.post(
            "http://localhost:3000/customers/new",
            aCustomer,{type: 'json'});

        if(response.data!=="ok") {
            const error = AssertionsFailed.fromJson(response.data);
            throw error;
        }
    }

    async withCustomerIdentifiedAsIfNone(dni, foundClosure, noneCloure){
        const {data} = await axios.get(
            "http://localhost:3000/customer/"+ dni,
            null,{type: 'json'});

        if(data==="not found")
            return noneCloure();
        else {
            const foundCustomer = Customer.fromJson(data);
            return foundClosure(foundCustomer);
        }
    }

    async update(anOriginalCustomer,aNewCustomer){
        const response = await axios.post(
            "http://localhost:3000/customers/update",
            [anOriginalCustomer,aNewCustomer],{type: 'json'});

        if(response.data!=="ok") {
            const error = AssertionsFailed.fromJson(response.data);
            throw error;
        }
    }

    async removeCustomerIdentifiedAs(aDNI){
        const response = await axios.delete(
            "http://localhost:3000/customer/" + aDNI,
            null,{type: 'json'});
    }


}