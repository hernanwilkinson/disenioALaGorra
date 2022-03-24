import java.sql.Connection;

public class Ejemplo {

    public void algo(){
        Connection connection = DatabaseConnection.getInstance().connection();

        connection.commit();
    }
}

// @Controller
// o por medio de configuracion
/*
<controller>
    <controller-class>
      CustomerController
    </controller-class>
</controller>
 */
// Problema: No se puede configurar al momento de instanciarlo
public class CustomerController {
    public void post() {

    }
}
