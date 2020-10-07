import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class CustomerAgenda {

	private List<Customer> customers;
	
	public CustomerAgenda() {
		customers = new ArrayList<Customer>();
	}
	
	public void add(Customer customerToAdd) {
		customers.add(customerToAdd);
	}

	// A propósito hago .toArray y es de List<?>
	// para no introducir Optional aún
	// Apropósito rompo el encapsulamiento
	public List<?> customersAt(String city) {
		return Arrays.asList((customers.stream()
			.filter( customer->
				customer.getAddress().getCity().equals(city)))
			.toArray());
	}	

	// Ver descr. de customersAt
	public List<?> customersWithZipCode(String zipCode) {
		return Arrays.asList((customers.stream()
				.filter( customer->
					customer.getAddress().getZipCode().equals(zipCode)))
				.toArray());
	}
}
