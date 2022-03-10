package example_null.null_object;

public class NotProvidedAddress implements Address {
    @Override
    public String streetName() {
        return "";
    }

    @Override
    public int streetNumber() {
        return 0;
    }

    @Override
    public String town() {
        return "";
    }

    @Override
    public boolean isAt(String streetName) {
        return false;
    }

    @Override
    public String toString() {
        return "Without address";
    }
}
