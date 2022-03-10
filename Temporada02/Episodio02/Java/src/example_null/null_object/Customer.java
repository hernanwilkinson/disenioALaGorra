package example_null.null_object;

import java.util.function.Function;
import java.util.function.Supplier;

public class Customer {
    private final String name;
    private final Address address;

    public static Customer namedWithAddress(String name, ProvidedAddress address) {
        return new Customer(name,address);
    }

    public static Customer named(String name) {
        return new Customer(name,new NotProvidedAddress());
    }

    private Customer (String name, Address address) {
        this.name = name;
        this.address = address;
    }

    public boolean isAt(String streetName) {
        return address.isAt(streetName);
    }

    public Address address() {
        return address;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", address=" + address +
                '}';
    }

    public static void main(String[] args) {
        Customer withAddress = Customer.namedWithAddress("Pepe", new ProvidedAddress("San Martín",1,"Florida"));
        Customer withoutAddress = Customer.named("Juan");

        System.out.println(withAddress.isAt("San Martín"));
        System.out.println(withAddress.isAt("Maipú"));
        System.out.println(withoutAddress.isAt("San Martín"));
        System.out.println(withAddress);
        System.out.println(withoutAddress);

        //Rompo encapsulamiento solo para mostrar el impacto de interactuar con Address
        String streetName = withAddress.address().streetName();
        int streetNumber = withAddress.address().streetNumber();
        String town = withAddress.address.town();


        Customer withAddressAsNull = Customer.namedWithAddress( "Maria",null);
        System.out.println(withAddressAsNull.ifHasAddressOrElse(
                address -> address.streetName(),
                ()-> "No street"));
        System.out.println(withAddressAsNull.ifHasAddressOrElse(address -> address.streetNumber(), ()-> 0));

    }


    public <T> T ifHasAddressOrElse(
            Function<Address,T> presentBlock, Supplier<T> notPresentBlock) {
        if(address==null)
            return notPresentBlock.get();
        else
            return presentBlock.apply(address);
    }

    public <T> T addressIfNone(Supplier<? extends T> notPresentBlock) {
        if(address==null)
            return notPresentBlock.get();
        else
            return (T) address;
    }

}

