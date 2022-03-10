package example_null.optional;

import java.util.Optional;

public class Customer {
    private final String name;
    private final Optional<Address> address;

    public static Customer namedWithAddress(String name, Address address) {
        return new Customer(name,Optional.of(address));
    }

    public static Customer named(String name) {
        return new Customer(name,Optional.empty());
    }

    private Customer (String name, Optional<Address> address) {
        this.name = name;
        this.address = address;
    }

    public boolean isAt(String streetName) {
        return address.
                filter(providedAddress -> providedAddress.isAt(streetName)).
                isPresent();
    }

    public Optional<Address> address() {
        return address;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", address=" + addressString() +
                '}';
    }

    public String addressString() {
        return address.
                map(providedAddress -> providedAddress.toString()).
                orElse("Without address");
    }

    public static void main(String[] args) {
        Customer withAddress = Customer.namedWithAddress("Pepe", new Address("San Martín",1,"Florida"));
        Customer withoutAddress = Customer.named("Juan");

        System.out.println(withAddress.isAt("San Martín"));
        System.out.println(withAddress.isAt("Maipú"));
        System.out.println(withoutAddress.isAt("San Martín"));
        System.out.println(withAddress);
        System.out.println(withoutAddress);

        //Rompo encapsulamiento solo para mostrar el impacto de interactuar con Address
        //podría encapsularlo en Customer
        String streetName = withAddress.address().map(address->address.streetName()).orElse("");
        int streetNumber = withAddress.address().map(address->address.streetNumber()).orElse(0);
        String town = withAddress.address().map(address->address.town()).orElse("");

    }
}
