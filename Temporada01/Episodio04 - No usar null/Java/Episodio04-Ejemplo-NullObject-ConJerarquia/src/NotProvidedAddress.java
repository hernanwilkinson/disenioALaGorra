
public class NotProvidedAddress implements Address {

	@Override
	public String getCity() {
		return "";
	}

	@Override
	public String getZipCode() {
		return "";
	}

}
