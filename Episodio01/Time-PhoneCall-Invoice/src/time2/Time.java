package time2;

public class Time {

	private int hour;
	private int minute;
	private int second;
	private TimeZone timeZone;
	
	public Time(int hour, int minute, int second, TimeZone timeZone) {
		this.hour = hour;
		this.minute = minute;
		this.second = second;
		this.timeZone = timeZone;	
	}
	
	public int differenceInHours(Time timeToCompare) {
		return normalizedHour() - timeToCompare.normalizedHour();
	}

	private int normalizedHour() {
		return timeZone.normalize(hour);
	}
}
