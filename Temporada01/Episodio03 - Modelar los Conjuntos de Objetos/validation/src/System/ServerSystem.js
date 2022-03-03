import {AssertionsFailed} from "../CreationAssertion/AssertionsFailed";

export class ServerSystem {
    executeSystemAction(systemAction, res) {
        try {
            systemAction();
            res.status(200);
            // Esto es una gran simplificación, hay que pensar un poco más
            // en detalle que devolver
            res.send("ok");
        } catch (error) {
            // Hay que mejorar lo relacionado a informe de erroes
            if (error instanceof AssertionsFailed) {
                // debería ser 400 mejor?
                res.status(200);
                res.send(error);
            } else {
                res.status(500);
                res.send(error);
            }
        }
    }
}