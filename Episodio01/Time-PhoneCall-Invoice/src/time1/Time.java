package time1;

public class Time {

	private int hour;
	private int minute;
	private int second;
	private TimeZone timeZone;
	
	public TimeZone getTimeZone() {
		return timeZone;
	}
	public void setTimeZone(TimeZone timeZone) {
		this.timeZone = timeZone;
	}
	public int getHour() {
		return hour;
	}
	public void setHour(int hour) {
		this.hour = hour;
	}
	public int getMinute() {
		return minute;
	}
	public void setMinute(int minute) {
		this.minute = minute;
	}
	public int getSecond() {
		return second;
	}
	public void setSecond(int second) {
		this.second = second;
	}
	int differenceInHours(Time timeToCompare) {
		return normailizedHour()-timeToCompare.normailizedHour();
	}
	private int normailizedHour() {
		return timeZone.normalized(hour);
	}
	
	
}
