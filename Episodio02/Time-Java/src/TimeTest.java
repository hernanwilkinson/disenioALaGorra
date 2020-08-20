import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TimeTest {

	@Test
	void hourMustBePositive() {
		assertThrows(
				RuntimeException.class, 
				()->Time.at(-1, 0,0), Time.INVALID_HOUR);
	}
	@Test
	void hourMustBeLessThan24() {
		assertThrows(
				RuntimeException.class, 
				()->Time.at(24, 0,0), Time.INVALID_HOUR);
	}
	@Test
	void minuteMustBePositive() {
		assertThrows(
				RuntimeException.class, 
				()->Time.at(0, -1,0), Time.INVALID_MINUTE);
	}
	@Test
	void minuteMustBeLessThan60() {
		assertThrows(
				RuntimeException.class, 
				()->Time.at(0,60,0), Time.INVALID_MINUTE);
	}
	@Test
	void secondMustBePositive() {
		assertThrows(
				RuntimeException.class, 
				()->Time.at(0, 0,-1), Time.INVALID_SECOND);
	}
	@Test
	void secondMustBeLessThan60() {
		assertThrows(
				RuntimeException.class, 
				()->Time.at(0,0,60), Time.INVALID_SECOND);
	}
	@Test
	void timeSubclassAtDoesNotCreateATimeSubclass() {
		// TimeSubclass.at no devuele un TimeSubclass
		// sino un Time
		assertTrue(
				TimeSubclass.at(1, 1, 1) 
				instanceof TimeSubclass);
	}

}
