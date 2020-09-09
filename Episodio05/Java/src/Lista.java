import java.util.Arrays;
import java.util.Iterator;
import java.util.function.Predicate;

public class Lista implements Iterable<Integer>{

    private Integer[] contents;
    private int numberOfElements;

    public Lista(Integer ...contents) {
        this.contents = contents;
        this.numberOfElements = contents.length;
    }

    @Override
    public Iterator<Integer> iterator() {
        Iterator<Integer> iterator = new Iterator<Integer>() {
            private int currentIndex = 0;

            @Override
            public boolean hasNext() {
                return currentIndex < numberOfElements;
            }

            @Override
            public Integer next() {
                Integer toReturn = contents[currentIndex];
                currentIndex++;
                return toReturn;
            }
        };

        return iterator;
    }

    public void add(Integer elementToAdd) {
        if(contents.length==numberOfElements)
            grow();

        contents[numberOfElements] = elementToAdd;
        numberOfElements++;
    }

    private void grow() {
        int newSize = numberOfElements==0 ? 10:numberOfElements*2;
        Integer[] newContents = Arrays.copyOf(contents, newSize);
        contents = newContents;
    }

    public int size() {
        return numberOfElements;
    }

    public boolean includes(Integer objectToTest) {
        for (Integer element : contents) {
            if(element.equals(objectToTest))
                return true;
        }

        return false;
    }

    Lista filtrar(Predicate<Integer> condition) {
        Lista filtrados = new Lista();

        for (int numero: this) {
            if (condition.test(numero))
                filtrados.add(numero);
        }
        return filtrados;
    }
}
