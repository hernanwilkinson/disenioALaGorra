import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class ExampleTest {

	@Test
	void canNotCreateAddressWithEmptyStreet() {
		assertThrows(RuntimeException.class, 
				()->Address.at("", "Olivos", belgranoZipCode()), 
				Address.INVALID_STREET);
	}
	
	@Test
	void canNotCreateAddressWithEmptyCity() {
		assertThrows(RuntimeException.class, 
				()->Address.at("Maipu 111", "", belgranoZipCode()), 
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
		Customer customerAtBelgrano = Customer.named("Pepe Sanchez", addressAtBelgrano());
		
		agenda.add(customerAtOlivos);
		agenda.add(customerAtBelgrano);

		List<?> customersAtOlivos = agenda.customersAt(olivos());

		assertEquals(1, customersAtOlivos.size());
		assertEquals(customerAtOlivos,customersAtOlivos.get(0));		
	}

	@Test
	void canLookForCustomersInAZipCode() {
		CustomerAgenda agenda = new CustomerAgenda();
		Customer customerAtOlivos = Customer.named("Juan Perez", addressAtOlivos());
		Customer customerAtBelgrano = Customer.named("Pepe Sanchez", addressAtBelgrano());

		agenda.add(customerAtOlivos);
		agenda.add(customerAtBelgrano);

		List<?> customersAtOlivos = agenda.customersWithZipCode(olivosZipCode());
		
		assertEquals(1, customersAtOlivos.size());
		assertEquals(customerAtOlivos,customersAtOlivos.get(0));		
	}

	private Address addressAtBelgrano() {
		return null; //Address.at("Maipu 111", belgrano(), belgranoZipCode());
	}

	private String belgranoZipCode() {
		return "1010";
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

	private String belgrano() {
		return "Belgrano";
	}
}
