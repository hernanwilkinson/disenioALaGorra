package time2;

// Esta implementación sigue la heurística de clase
// completa.
// No tiene getters innecesarios ni setters (tema a discutir
// más adelante)
// Apenas se instancia, el objeto está completo
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
