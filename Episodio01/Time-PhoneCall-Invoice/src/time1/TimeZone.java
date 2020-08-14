package time1;

// Al igual que Time, sigue la indea de "clase anémica"
public class TimeZone {

	private int offset;
	private String name;
	
	public int getOffset() {
		return offset;
	}
	public void setOffset(int offset) {
		this.offset = offset;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	int normalized(int hour) {
		return hour-getOffset();
	}	
}
