package invoice;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class InvoiceForm {

	private LocalDate issueDate;
	private String number;
	private InvoiceType type;
	private List<InvoiceLine> lines = new ArrayList<InvoiceLine>();
	private double gross;
	private double taxPercentage;
	
	public void addLine(InvoiceLine line) {
		lines.add(line);
	}
	public void removeLine(InvoiceLine line) {
		lines.remove(line);
	}
	
	public void fillIssuedDateWith(LocalDate issueDate) {
		this.issueDate = issueDate;
	}
	public void fillNumberWith(String number) {
		this.number = number;
	}
	public void fillInvoiceType(InvoiceType type) {
		this.type = type;
	}
	public void fillGrossWith(double gross) {
		this.gross = gross;
	}
	public void fillTaxPercentageWith(double taxPercentage) {
		this.taxPercentage = taxPercentage;
	}

	public Invoice build () {
		double tax = gross*taxPercentage;
		double netTotal = gross - tax;
		
		return new Invoice(issueDate, number, type, lines, gross, 
				tax, taxPercentage, netTotal);
	}
}
