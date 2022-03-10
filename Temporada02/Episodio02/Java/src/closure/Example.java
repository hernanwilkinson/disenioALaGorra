package closure;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

public class Example {
    @Test
    public void ejemploConForBasico() {
        int[] numbers = {1,2,3,4,5};
        List<Integer> evens = new ArrayList<>();

        for (int i=0;i<numbers.length;i++)
            if (numbers[i]%2==0)
                evens.add(numbers[i]);

        System.out.println(evens);
    }

    @Test
    public void ejemploConIterator() {
        List<String> names = Arrays.asList("Maria", "Juan", "Pedro", "Pepe", "Beatriz");
        List<String> withP = new ArrayList<>();

        for (Iterator<String> i = names.iterator(); i.hasNext(); ) {
            String name = i.next();
            if (name.contains("P"))
                withP.add(name);
        }

        System.out.println(withP);
    }

    @Test
    public void ejemploForEachSintactico() {
        List<String> names = Arrays.asList("Maria","Juan","Pedro","Pepe","Beatriz");
        List<String> withP = new ArrayList<>();

        for (String name: names)
            if(name.contains("P"))
                withP.add(name);

        System.out.println(withP);
    }

    @Test
    public void ejemploClaseAnonima() {
        List<Integer> evens = new Filter<Integer>(Arrays.asList(1, 2, 3, 4, 5)) {
            @Override
            public boolean hasToFilter(Integer element) {
                return element%2==0;
            }
        }.value();

        System.out.println(evens);
    }

    @Test
    public void ejemploClaseAnonimaConPseudoClosure() {
        List<Integer> evens = Filter2.value(Arrays.asList(1, 2, 3, 4, 5), new Condition<Integer>() {
            @Override
            public boolean value(Integer object) {
                return object%2==0;
            }
        });

        System.out.println(evens);
    }

    @Test
    public void ejemploConClosure() {
        List<String> names = Arrays.asList("Maria","Juan","Pedro","Pepe","Beatriz");
        List<String> withP = names.stream().filter(name->name.contains("P")).collect(Collectors.toList());
        //List<String> withP = names.filter(name->name.contains("P"));

        System.out.println(withP);
    }

}