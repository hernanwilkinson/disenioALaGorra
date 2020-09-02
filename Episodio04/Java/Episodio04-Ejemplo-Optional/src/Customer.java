import java.util.Optional;

public class Customer {

	public static final String INVALID_NAME = "Name can not be empty";
	
	private String name;
	private Optional<Address> address;

	public static Customer named(String name, Address address) {
		if(name.isEmpty()) throw new RuntimeException(INVALID_NAME);
		
		return new Customer(name, Optional.ofNullable(address));
	}

	private Customer(String name, Optional<Address> address) {
		this.name = name;
		this.address = address;
	}

	public Optional<Address> getAddress() {
		return address;
	}
	
}
