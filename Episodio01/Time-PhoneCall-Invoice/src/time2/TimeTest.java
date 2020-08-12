package time2;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TimeTest {

	@Test
	void test() {
		Time now = new Time(20, 0, 0, new TimeZone("Argentina",-3));
		Time webinarBegining = new Time(19-3,0,0,new TimeZone("Costa Rica",-6));
		
		assertEquals(1, now.differenceInHours(webinarBegining));
	}

}
