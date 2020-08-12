package call;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import time2.Time;
import time2.TimeZone;

class PhoneCallExample {

	@Test
	void incompletenessError() {
		PhoneCall callToMom = new PhoneCall("342-2233", "555-3322", 
				new Time(10, 20, 15, new TimeZone("AR", -3)));
		
		//Ver como da NullPointerException
		callToMom.durationInHours();
	}
	
	@Test
	void compleatingTheIncomplete() {
		PhoneCall callToMom = new PhoneCall("342-2233", "555-3322", 
				new Time(10, 20, 15, new TimeZone("AR", -3)));

		//
		// ... paso el tiempo
		//
		
		callToMom.setEndTime(new Time(11, 25, 15, new TimeZone("AR", -3)));
		
		assertEquals(1,callToMom.durationInHours());
	}
	
	@Test
	void completePhoneCallExample() {
		PhoneCallInProgress startCallToMom = new PhoneCallInProgress(
				"342-2233", "555-3322", 
				new Time(10, 20, 15, new TimeZone("AR", -3)));
		FinishedPhoneCall callToMom = new FinishedPhoneCall(
				startCallToMom,
				new Time(11, 25, 15, new TimeZone("AR", -3)));
		
		//Descomentar para ver error de compilación
		//startCallToMom.durationInHours();
		assertEquals(1,callToMom.durationInHours());
	}
}
