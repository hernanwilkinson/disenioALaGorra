package sintaxis_distinta;

import java.util.Arrays;

public class ExampleFor {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        for (int i=0;i<numbers.length;i++) {
            System.out.println(numbers[i]);
        }

        Arrays.stream(numbers).forEach( number -> System.out.println(number));
    }
}
