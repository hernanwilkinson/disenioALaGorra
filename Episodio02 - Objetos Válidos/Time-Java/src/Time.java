
public class Time {
	public static final String INVALID_HOUR = "Hour must be an integer between 0 and 23";
	public static final String INVALID_MINUTE = "Minute must be an integer between 0 and 59";
	public static final String INVALID_SECOND = "Second must be an integer between 0 and 59";
	private int hour;
	private int minute;
	private int second;

	public static Time at(int hour, int minute, int second) {
		assertHourIsValid(hour);
		assertIsValidMinute(minute);
		assertSecondIsValid(second);
	
		// reemplazar Time por this y ver que no se puede
		// ya que this no existe en un método static
		return new Time(hour,minute,second);
	}
	
	private static void assertSecondIsValid(int second) {
		if(!isValidSixty(second)) throw new RuntimeException(INVALID_SECOND);
	}
	private static void assertIsValidMinute(int minute) {
		if(!isValidSixty(minute)) throw new RuntimeException(INVALID_MINUTE);
	}
	private static boolean isValidSixty(int numberToValidate) {
		return numberToValidate>=0 && numberToValidate<=59;
	}
	private static void assertHourIsValid(int hour) {
		if(!(hour>=0 && hour<=23)) throw new RuntimeException(INVALID_HOUR);
	}
	public Time(int hour, int minute, int second) {
		this.hour = hour;
		this.minute = minute;
		this.second = second;
	}

}
