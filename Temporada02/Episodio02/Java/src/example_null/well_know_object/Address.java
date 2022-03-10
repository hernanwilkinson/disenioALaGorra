package example_null.well_know_object;

public class Address {
    private static  Address noAddress = new Address("",0,"");
    private final String streetName;
    private final int streetNumber;
    private final String town;

    public Address(String streetName, int streetNumber, String town){
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.town = town;
    }

    public static Address noAddress() {
        return noAddress;
    }

    public boolean isAt(String streetName) {
        return this.streetName.equalsIgnoreCase(streetName);
    }

    @Override
    public String toString() {
        return "Address{" +
                "streetName='" + streetName + '\'' +
                ", number=" + streetNumber +
                ", town='" + town + '\'' +
                '}';
    }

    public String streetName() {
        return streetName;
    }

    public int streetNumber(){
        return streetNumber;
    }

    public String town(){
        return town;
    }
}
