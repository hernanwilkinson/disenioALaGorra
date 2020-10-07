import java.util.concurrent.atomic.AtomicInteger;

public class Ejemplo {

    public void noSePuedeModificarVarsDelContextoLocal(){
        int counter = 0;

        // Esto no se puede hacer
        Runnable adder = ()-> counter = counter +1;
    }

    public void solucionAlProblemaAnterior(){
        int[] counter = new int[1];
        counter[0] = 0;

        Runnable adder = ()-> counter[0] = counter[0] +1;
    }
}
