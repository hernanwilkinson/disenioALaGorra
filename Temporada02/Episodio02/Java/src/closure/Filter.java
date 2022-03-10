package closure;

import java.util.ArrayList;
import java.util.List;

public abstract class Filter<T> {

    private final List<T> toFilter;

    public Filter(List<T> toFilter) {
        this.toFilter = toFilter;
    }

    public List<T> value() {
        List<T> filtered = new ArrayList<>();
        for (T element:toFilter) {
            if(hasToFilter(element))
                filtered.add(element);
        }
        return filtered;
    }

    public abstract boolean hasToFilter(T element);
}
