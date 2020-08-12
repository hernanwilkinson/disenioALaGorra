package call;

import time2.Time;

public class PhoneCallInProgress {

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

	public String getSourceNumber() {
		return sourceNumber;
	}

	public String getTargetNumber() {
		return targetNumber;
	}

	public Time getStartTime() {
		return startTime;
	}

}
