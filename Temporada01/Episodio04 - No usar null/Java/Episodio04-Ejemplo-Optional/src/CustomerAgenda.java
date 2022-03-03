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

	// Ahora que sabemos que es un Optional se puede
	// devolver un Stream en vez de List<?>
	// Apropósito rompo el encapsulamiento
	public List<?> customersAt(String city) {
		return Arrays.asList((customers.stream()
			.filter(customer->customer.getAddress()
					.map(address->address.getCity().equals(city))
					.orElse(false)))
			.toArray());
	}	

	// Ver descr. de customersAt
	public List<?> customersWithZipCode(String zipCode) {
		return Arrays.asList((customers.stream()
				.filter(customer->customer.getAddress()
						.map(address->address.getZipCode().equals(zipCode))
						.orElse(false)))
				.toArray());
	}
}
