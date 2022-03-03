package call;

import time2.Time;

// Al separar PhoneCall en dos objetos que la representan
// cumplo con la herística de objetos completos
// Esta clase representa llamadas que aún no terminaron
public class PhoneCallInProgress implements PhoneCall2 {

	//Estoy usando String para el número de teléfono pero
	//deberia ser un PhoneNumber
	private String sourceNumber;
	private String targetNumber;
	private Time startTime;
	
	public PhoneCallInProgress(String sourceNumber, String targetNumber, Time startTime) {
		this.sourceNumber = sourceNumber;
		this.targetNumber = targetNumber;
		this.startTime = startTime;
	}

	public int durationInHoursUpTo(Time endTime) {
		return endTime.differenceInHours(startTime);
	}

	// Estos getters están como ejemplo para mostrar
	// cómo una FinishedPhoneCall puede ser polimórfica
	// con migo
	@Override
	public String getSourceNumber() {
		return sourceNumber;
	}

	@Override
	public String getTargetNumber() {
		return targetNumber;
	}

	@Override
	public Time getStartTime() {
		return startTime;
	}
}
