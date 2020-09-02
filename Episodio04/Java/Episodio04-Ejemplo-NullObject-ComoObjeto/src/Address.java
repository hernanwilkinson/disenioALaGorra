
public class Address {

	public static final String INVALID_STREET = "Street can not be empty";
	public static final String INVALID_CITY = "City can not be empty";
	public static final Address NOT_PROVIDED = new Address("","","");
	
	private String street;
	private String city;
	private String zipCode;

	public static Address at(String street, String city, String zipCode) {
		if(street.isEmpty()) throw new RuntimeException(INVALID_STREET);
		if(city.isEmpty()) throw new RuntimeException(INVALID_CITY);
		
		return new Address(street, city, zipCode);
	}
	
	private Address (String street, String city, String zipCode) {
		this.street = street;
		this.city = city;
		this.zipCode = zipCode;
	}

	public String getCity() {
		return city;
	}

	public String getZipCode() {
		return zipCode;
	}
}
