import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class ExampleTest {

	@Test
	void canNotCreateAddressWithEmptyStreet() {
		assertThrows(RuntimeException.class, 
				()->ProvidedAddress.at("", "Olivos", olivosZipCode()), 
				ProvidedAddress.INVALID_STREET);
	}
	
	@Test
	void canNotCreateAddressWithEmptyCity() {
		assertThrows(RuntimeException.class, 
				()->ProvidedAddress.at("Maipu 111", "", olivosZipCode()), 
				ProvidedAddress.INVALID_CITY);
	}
	
	@Test
	void canNotCreateCustomerWithEmptyName() {
		assertThrows(RuntimeException.class, 
				()->Customer.named("", addressAtOlivos()), 
				Customer.INVALID_NAME);
	}
	
	@Test
	void canLookForCustomersInACity() {
		CustomerAgenda agenda = new CustomerAgenda();
		Customer customerAtOlivos = Customer.named("Juan Perez", addressAtOlivos());
		Customer customerWithoutAddress = Customer.named("Pepe Sanchez", notProvidedAddress());
		
		agenda.add(customerAtOlivos);
		agenda.add(customerWithoutAddress);

		List<?> customersAtOlivos = agenda.customersAt(olivos());

		assertEquals(1, customersAtOlivos.size());
		assertEquals(customerAtOlivos,customersAtOlivos.get(0));		
	}

	@Test
	void canLookForCustomersInAZipCode() {
		CustomerAgenda agenda = new CustomerAgenda();
		Customer customerAtOlivos = Customer.named("Juan Perez", addressAtOlivos());
		Customer customerWithoutAddress = Customer.named("Pepe Sanchez", notProvidedAddress());

		agenda.add(customerAtOlivos);
		agenda.add(customerWithoutAddress);

		List<?> customersAtOlivos = agenda.customersWithZipCode(olivosZipCode());
		
		assertEquals(1, customersAtOlivos.size());
		assertEquals(customerAtOlivos,customersAtOlivos.get(0));		
	}

	private Address notProvidedAddress() {
		return new NotProvidedAddress();
	}

	private Address addressAtOlivos() {
		return ProvidedAddress.at("Maipu 111", olivos(), olivosZipCode());
	}

	private String olivosZipCode() {
		return "1636";
	}

	private String olivos() {
		return "Olivos";
	}
}
