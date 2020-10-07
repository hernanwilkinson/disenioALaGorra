public class Customer {

	public static final String INVALID_NAME = "Name can not be empty";
	
	private String name;
	private Address address;

	public static Customer named(String name, Address address) {
		if(name.isEmpty()) throw new RuntimeException(INVALID_NAME);
		
		return new Customer(name, address);
	}

	private Customer(String name, Address address) {
		this.name = name;
		this.address = address;
	}

	public Address getAddress() {
		return address;
	}
	
}
