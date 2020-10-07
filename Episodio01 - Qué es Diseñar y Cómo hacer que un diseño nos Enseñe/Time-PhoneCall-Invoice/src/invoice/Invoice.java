package invoice;

import java.time.LocalDate;
import java.util.List;

// Invoice es un objeto complejo, construirlo cuesta y 
// puede llevar tiempo, es por eso que es mejor hacerlo
// por medio de un Builder, en este caso InvoiceForm
public class Invoice {

	private LocalDate issueDate;
	// Nuevamente estoy usando un string para el número de 
	// factura pero debería reificarlo, por lo menos para 
	// Argentina donde los numeros tienen la forma 
	// ppppp-nnnnnnnn donde ppppp es el nro de punto de venta
	// y nnnnnnnn es el número consecutivo que emite ese pto de venta
	private String number;
	private InvoiceType type;
	private List<InvoiceLine> lines;
	// En un diseño real, seguramente encapsularía 
	// todo lo que tiene que ver con el total en un objeto
	// y no tendría estos 4 colaborares separados
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
