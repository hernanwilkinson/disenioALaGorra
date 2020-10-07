import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class ExampleTest {

	@Test
	void canNotCreateAddressWithEmptyStreet() {
		assertThrows(RuntimeException.class, 
				()->Address.at("", "Olivos", olivosZipCode()), 
				Address.INVALID_STREET);
	}
	
	@Test
	void canNotCreateAddressWithEmptyCity() {
		assertThrows(RuntimeException.class, 
				()->Address.at("Maipu 111", "", olivosZipCode()), 
				Address.INVALID_CITY);
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
		return Address.NOT_PROVIDED;
	}

	private Address addressAtOlivos() {
		return Address.at("Maipu 111", olivos(), olivosZipCode());
	}

	private String olivosZipCode() {
		return "1636";
	}

	private String olivos() {
		return "Olivos";
	}
}
