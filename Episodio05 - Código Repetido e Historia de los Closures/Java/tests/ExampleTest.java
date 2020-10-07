import org.junit.jupiter.api.Test;

import java.util.function.Predicate;

import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {
    @Test
    void testNumerosParesConCodigoRepetido() {
        Lista numeros = new Lista(1,2,3,4,5);
        // Para sacar este código repetido hacer:
        // 1) Extract method
        // 2) Move (a Lista)
        // 3) Add Functional Parameter
        // 4) Rename de numerosPares por filtrar
        // 5) Rename de pares por filtrados
        Lista pares = new Lista();

        for (int numero : numeros) {
            if (numero % 2 == 0)
                pares.add(numero);
        }

        assertEquals(2, pares.size());
        assertTrue(pares.includes(2));
        assertTrue(pares.includes(4));
    }

    @Test
    void testMenoresATresConCodigoRepetido() {
        Lista numeros = new Lista(1,2,3,4,5);
        Lista menoresATres = new Lista();

        for (int numero : numeros) {
            if (numero < 3)
                menoresATres.add(numero);
        }

        assertEquals(2, menoresATres.size());
        assertTrue(menoresATres.includes(1));
        assertTrue(menoresATres.includes(2));
    }

    @Test
    void testNumerosPares() {
        Lista numeros = new Lista(1,2,3,4,5);
        Lista pares = numeros.filtrar(numero -> numero % 2 == 0);

        assertEquals(2, pares.size());
        assertTrue(pares.includes(2));
        assertTrue(pares.includes(4));
    }

    @Test
    void testMenoresATres() {
        Lista numeros = new Lista(1,2,3,4,5);
        Lista menoresATres = numeros.filtrar(numero->numero<3);

        assertEquals(2, menoresATres.size());
        assertTrue(menoresATres.includes(1));
        assertTrue(menoresATres.includes(2));
    }
}