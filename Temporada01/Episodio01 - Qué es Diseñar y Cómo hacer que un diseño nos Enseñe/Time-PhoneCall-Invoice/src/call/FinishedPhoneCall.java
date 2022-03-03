package call;

import time2.Time;

// Esta clase representa las llamadas finalizadas
// A esos objetos sí les puedo pedir la duración
// Decidí implementarlo conociendo a la llamada origen 
// pero podría haber hecho otra implementación donde
// conoce el número de origen, destino e inicio directamente
// y sin pasar por la llamada origen
public class FinishedPhoneCall implements PhoneCall2 {

	private PhoneCallInProgress origin;
	private Time endTime;
	
	public FinishedPhoneCall(PhoneCallInProgress origin, Time endTime) {
		this.origin = origin;
		this.endTime = endTime;
	}
	
	public int durationInHours() {
		return origin.durationInHoursUpTo(endTime);
	}
	
	public String getSourceNumber() {
		return origin.getSourceNumber();
	}

	public String getTargetNumber() {
		return origin.getTargetNumber();
	}

	public Time getStartTime() {
		return origin.getStartTime();
	}

	public Time getEndTime() {
		return endTime;
	}
}
