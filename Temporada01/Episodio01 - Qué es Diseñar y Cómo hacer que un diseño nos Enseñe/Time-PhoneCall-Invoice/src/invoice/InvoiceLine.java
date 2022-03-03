package invoice;

public class InvoiceLine {

	private String code;
	private String description;
	private double total;
	
	public InvoiceLine(String code, String description, double total) {
		this.code = code;
		this.description = description;
		this.total = total;
		
	}
}
