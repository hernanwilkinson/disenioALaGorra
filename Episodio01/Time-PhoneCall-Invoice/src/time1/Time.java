package time1;

// Esta implementación muestra como NO hay que implementar
// una clase. O sea, usando la idea de "clase anémica" dónde
// solo tiene getters y setters y se rompe el encapsulamiento
// todo el tiempo.
// Este tipo de clases no te enseñan cómo usarla y no soportan
// el paso del tiempo, ni en el modelo ni en el proceso de 
// aprendizaje que realizamos mientras desarrollamos
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
}
