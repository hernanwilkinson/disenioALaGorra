
public class ProvidedAddress implements Address {

	public static final String INVALID_STREET = "Street can not be empty";
	public static final String INVALID_CITY = "City can not be empty";
	
	private String street;
	private String city;
	private String zipCode;

	public static Address at(String street, String city, String zipCode) {
		if(street.isEmpty()) throw new RuntimeException(INVALID_STREET);
		if(city.isEmpty()) throw new RuntimeException(INVALID_CITY);
		
		return new ProvidedAddress(street, city, zipCode);
	}
	
	private ProvidedAddress (String street, String city, String zipCode) {
		this.street = street;
		this.city = city;
		this.zipCode = zipCode;
	}

	@Override
	public String getCity() {
		return city;
	}

	@Override
	public String getZipCode() {
		return zipCode;
	}
}
