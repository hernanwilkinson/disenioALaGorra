package invoice;

import java.time.LocalDate;
import java.util.List;

public class Invoice {

	private LocalDate issueDate;
	private String number;
	private InvoiceType type;
	private List<InvoiceLine> lines;
	private double gross;
	private double tax;
	private double taxPercentage;
	private double netTotal;
	
	public Invoice (LocalDate issueDate, String number, InvoiceType type,
		List<InvoiceLine> lines, double gross, double tax, double taxPercentage,
		double netTotal) {
			this.issueDate = issueDate;
			this.number = number;
			this.type = type;
			this.lines = lines;
			this.gross = gross;
			this.tax = tax;
			this.taxPercentage = taxPercentage;
			this.netTotal = netTotal;	
	}

	
}
