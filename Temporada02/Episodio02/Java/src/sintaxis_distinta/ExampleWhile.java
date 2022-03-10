package sintaxis_distinta;

import java.util.Arrays;

public class ExampleWhile {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int indice = 0;

        while(indice<numbers.length) {
            System.out.println(numbers[indice]);
            indice += 1;
        }

        Arrays.stream(numbers).forEach( number -> System.out.println(number));
    }
}
