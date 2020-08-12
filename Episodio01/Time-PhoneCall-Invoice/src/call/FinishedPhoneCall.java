package call;

import time2.Time;

public class FinishedPhoneCall {

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
