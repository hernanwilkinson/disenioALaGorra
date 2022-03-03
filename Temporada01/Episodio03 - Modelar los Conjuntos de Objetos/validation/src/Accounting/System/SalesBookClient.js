import axios from "axios";
import {AssertionsFailed} from "../../CreationAssertion/AssertionsFailed";
import {SalesBook} from "./SalesBook";
import {Invoice} from "../Invoice";

export class SalesBookClient extends SalesBook {

    async getInvoices(){
        const { data } = await axios.get('http://localhost:3000/invoices', {
            params: {
            },
        });

        const invoices = data.map(invoiceAsJson =>
            Invoice.fromJson(invoiceAsJson));

        return invoices;
    }

    async register(anInvoice){
        const response = await axios.post(
            "http://localhost:3000/invoices/new",
            anInvoice,{type: 'json'});

        if(response.data!=="ok") {
            const error = AssertionsFailed.fromJson(response.data);
            throw error;
        }
    }
}