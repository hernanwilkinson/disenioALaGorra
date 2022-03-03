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

	public List<?> customersAt(String city) {
		return Arrays.asList((customers.stream()
			.filter(customer-> customer.addressDoIfNone(
				address-> address.isAt(city),
				()->false)))
			.toArray());
	}	

	public List<?> customersWithZipCode(String zipCode) {
		return Arrays.asList((customers.stream()
				.filter(customer-> customer.addressDoIfNone(
					address-> address.hasZipCode(zipCode),
					()->false)))
				.toArray());
	}
}
