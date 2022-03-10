package sobrecarga;

import example_null.null_object.Address;
import example_null.null_object.NotProvidedAddress;
import example_null.null_object.ProvidedAddress;

public class AddressVisitor {

    public String visit(Address address) { //visit$Address
        return "Es un Address!";
    }

    public String visit(ProvidedAddress address){ //visit$ProvidedAddress
        return "Es un ProvidedAddress!";
    }

    public String visit(NotProvidedAddress address){//visit$NotProvidedAddress
        return "Es un NotProvidedAddress!";
    }

    public static void main(String[] args) {
        ProvidedAddress providedAddress = new ProvidedAddress("Maipú",12, "Vte Lopez");
        NotProvidedAddress notProvidedAddress = new NotProvidedAddress();

        AddressVisitor visitor = new AddressVisitor();

        System.out.println(visitor.visit(providedAddress));
        System.out.println(visitor.visit(notProvidedAddress));

        Address anotherProvidedAddress = new ProvidedAddress("San Martin",11, "Florida");
        Address anotherNotProvidedAddress = new NotProvidedAddress();

        System.out.println(visitor.visit(anotherProvidedAddress)); // visit$Address
        System.out.println(visitor.visit(anotherNotProvidedAddress));


    }
}
