import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

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
	
	public <T> T addressDoIfNone(
			Function<Address,T> exist, Supplier<T> none) {
		if(address==null)
			return none.get();
		else
			return exist.apply(address);
	}
	
}
