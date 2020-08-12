package time2;

public class TimeZone {

	private String name;
	private int offset;
	
	public TimeZone(String name, int offset) {
		this.offset = offset;
		this.name = name;
		
	}

	public int normalize(int hour) {
		return hour - offset;
	}
}
