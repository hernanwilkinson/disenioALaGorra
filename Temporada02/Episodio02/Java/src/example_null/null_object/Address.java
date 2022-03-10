package example_null.null_object;

public interface Address {
    String streetName();
    int streetNumber();
    String town();

    boolean isAt(String streetName);

}
