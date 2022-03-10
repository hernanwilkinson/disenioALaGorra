package closure;

import java.util.ArrayList;
import java.util.List;

public class Filter2<T> {
    private final List<T> toFilter;
    private final Condition<T> condition;

    public Filter2 (List<T> toFilter, Condition<T> condition){
        this.toFilter = toFilter;
        this.condition = condition;
    }

    public List<T> value() {
        ArrayList<T> filtered = new ArrayList<>();
        for (T element:toFilter) {
            if(condition.value(element))
                filtered.add(element);
        }

        return filtered;
    }

    static<T> List<T> value(List<T> toFilter,Condition<T> condition){
        return new Filter2<T>(toFilter,condition).value();
    }
}
