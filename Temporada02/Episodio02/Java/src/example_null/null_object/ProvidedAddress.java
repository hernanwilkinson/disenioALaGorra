package example_null.null_object;

public class ProvidedAddress implements Address {
    static ProvidedAddress nullAddress = new ProvidedAddress("",0,"");

    private final String streetName;
    private final int streetNumber;
    private final String town;

    public ProvidedAddress (String streetName, int streetNumber, String town){
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.town = town;
    }


    public String streetName() {
        return streetName;
    }


    public int streetNumber() {
        return streetNumber;
    }


    public String town() {
        return town;
    }


    public boolean isAt(String streetName) {
        return this.streetName.equalsIgnoreCase(streetName);
    }

    @Override
    public String toString() {
        return "ProvidedAddress{" +
                "streetName='" + streetName + '\'' +
                ", number=" + streetNumber +
                ", town='" + town + '\'' +
                '}';
    }
}
