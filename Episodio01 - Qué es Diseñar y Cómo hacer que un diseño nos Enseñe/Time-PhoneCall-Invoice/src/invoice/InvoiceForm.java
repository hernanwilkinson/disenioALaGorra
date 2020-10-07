package invoice;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// InvoiceForm representa un formulario que se completa para
// luego generar una factura. Al ser un formulario, el mismo
// puede estar "vacio", sin completar, por lo que es válido
// crear sus instancias sin que se conozca ninguno de sus 
// colaboradores.
// Esta clase implementa el patrón Builder, pero fijense que no
// tiene la palabra Builder en su nombre sino que se llama de 
// acuerdo a lo que representa en el domino de problema
public class InvoiceForm {

	private LocalDate issueDate;
	private String number;
	private InvoiceType type;
	private List<InvoiceLine> lines = new ArrayList<InvoiceLine>();
	private double gross;
	private double taxPercentage;
	
	// Ofrezco mensajes para manejar las lineas y no
	// rompo el encapsulamiento con un getter para lines
	public void addLine(InvoiceLine line) {
		lines.add(line);
	}
	public void removeLine(InvoiceLine line) {
		lines.remove(line);
	}
	
	// A propósito llame fillIssueDateWith a este mensaje y
	// no setIssueDate para seguir la metáfora del formulario
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

	// Será Invoice quien asegurará que realmente lo que 
	// se completo en el formulario es válido... pero eso
	// en el proximo webinar :-)
	public Invoice build () {
		double tax = gross*taxPercentage;
		double netTotal = gross - tax;
		
		return new Invoice(issueDate, number, type, lines, gross, 
				tax, taxPercentage, netTotal);
	}
}
