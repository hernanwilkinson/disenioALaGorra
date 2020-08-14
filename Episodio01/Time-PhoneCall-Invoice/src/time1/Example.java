package time1;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

// Estos son ejemplos, no son test en sentido estricto de
// test ni tampoco lo que uno haría haciendo TDD
class Example {

	@Test
	void test() {
		// El constructor no me "enseña" qué se necesita
		// para representar una hora realmente
		Time webinarStartTime = new Time();		
		Time now = new Time();
		
		// En este instante de tiempo webinarStartTime
		// no es realmente una hora, es cualquier cosa menos eso
		webinarStartTime.setHour(19);
		webinarStartTime.setMinute(0);
		webinarStartTime.setSecond(0); // <-- Recien en este instante de tiempo para a ser una hora
		
		// Esta forma de trabajar es totalmente propensa a error
		// (error prone). Nadie me dice explicitamente en el
		// modelo que se necesita "setear" la hora, minuto y
		// segundo. Es más puedo olvidarme fácilmente de hacerlo
		now.setMinute(0);
		now.setSecond(0);
		now.setHour(20); 
		
		// Rompo el encapsulamiento por no pedirle a Time
		// que haga la diferencia. Eso hace que cuando se
		// agrege el time zone, esto pueda fallar
		assertEquals(1, now.getHour()-webinarStartTime.getHour());
	}

	@Test
	void test2() {
		// No me "enseña" el hecho de que ahora
		// se necesita un TimeZone
		Time webinarStartTimeCR = new Time();		
		Time nowAR = new Time();
		
		webinarStartTimeCR.setHour(16);
		webinarStartTimeCR.setMinute(0);
		webinarStartTimeCR.setSecond(0);
		TimeZone crTimeZone = new TimeZone();
		crTimeZone.setOffset(-6);
		webinarStartTimeCR.setTimeZone(crTimeZone);
		// Recien en la colaboración anterior paso a tener
		// una hora completa
		
		nowAR.setMinute(0);
		nowAR.setSecond(0);
		nowAR.setHour(20); 
		TimeZone arTimeZone = new TimeZone();
		arTimeZone.setOffset(-3);
		nowAR.setTimeZone(arTimeZone);
		
		// Sigo rompiendo el encapsulamiento
		assertEquals(1, 
			nowAR.getHour()-nowAR.getTimeZone().getOffset()-
			(webinarStartTimeCR.getHour()-webinarStartTimeCR.getTimeZone().getOffset()));
	}

}
