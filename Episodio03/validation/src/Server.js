import express from "express";
import cors from "cors";
import {ALaGorraServerSystem} from "./System/ALaGorraServerSystem";
import {TransientCustomersAgenda} from "./Customers/System/TransientCustomersAgenda";
import {TransientSalesBook} from "./Accounting/System/TransientSalesBook";

//Levantar el server si se está usando como sistema a ALaGorraSystemClient
//eso se configura en index.js
const server = express();
server.use(cors());
server.use(express.json())

const aLaGorraSystem = new ALaGorraServerSystem(
    server,
    new TransientCustomersAgenda(),
    new TransientSalesBook());

server.listen(3000, () => {
    console.log("System running on port 3000");
});