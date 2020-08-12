package time1;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class Example {

	@Test
	void test() {
		Time webinarStartTime = new Time();		
		Time now = new Time();
		
		//1er: No me dice nada sobre como está compuesto time
		webinarStartTime.setHour(19);
		webinarStartTime.setMinute(0);
		webinarStartTime.setSecond(0);
		
		//2do: Propenso a error
		now.setMinute(0);
		now.setSecond(0);
		now.setHour(20); // <-- Aca realmente representa un Time
		
		assertEquals(1, now.differenceInHours(webinarStartTime));
	}

	@Test
	void test2() {
		Time webinarStartTimeCR = new Time();		
		Time nowAR = new Time();
		
		//1er: No me dice nada sobre como está compuesto time
		webinarStartTimeCR.setHour(16);
		webinarStartTimeCR.setMinute(0);
		webinarStartTimeCR.setSecond(0);
		TimeZone crTimeZone = new TimeZone();
		crTimeZone.setOffset(-6);
		webinarStartTimeCR.setTimeZone(crTimeZone);
		
		//2do: Propenso a error
		nowAR.setMinute(0);
		nowAR.setSecond(0);
		nowAR.setHour(20); // <-- Aca realmente representa un Time
		TimeZone arTimeZone = new TimeZone();
		arTimeZone.setOffset(-3);
		nowAR.setTimeZone(arTimeZone);
		
		assertEquals(1, nowAR.differenceInHours(webinarStartTimeCR));
	}

}
