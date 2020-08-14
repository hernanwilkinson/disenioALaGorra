package call;

import time2.Time;

// PhoneCall no se crea de manera completa porque
// no se sabe el endTime de la misma al instanciarse
// Por lo tanto no sigue la heurística de objeto completo
// y eso hace que durationInHours pueda fallar
public class PhoneCall {

	//Estoy usando String para el número de teléfono per
	//deberia ser un PhoneNumber
	private String sourceNumber;
	private String targetNumber;
	private Time startTime;
	private Time endTime;
	
	public PhoneCall(String sourceNumber, String targetNumber, Time startTime) {
		this.sourceNumber = sourceNumber;
		this.targetNumber = targetNumber;
		this.startTime = startTime;
	}
	
	// Este setter permite que el endTime se pueda
	// modificar en cualquier momento, abriendo la puerta
	// a posible errores
	public void setEndTime(Time endTime ) {
		this.endTime = endTime;
	}
	
	public int durationInHours() {
		// endTime puede ser null y esto puede fallar
		// Hay maneras de "rodear" este problema devolviendo
		// un Optional, pero no termina resolviendo el
		// problema real.
		return endTime.differenceInHours(startTime);
	}
}

