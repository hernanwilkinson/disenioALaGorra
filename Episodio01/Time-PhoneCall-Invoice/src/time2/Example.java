package time2;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class Example {

	@Test
	void test() {
		// Cuando creo la instancia de Time, me "enseña"
		// que debo pasarle para que realmente sea un Time
		// Cuando se agrega el TimeZone, se hace explícito
		// el hecho de que se necesita
		Time now = new Time(20, 0, 0, 
				new TimeZone("Argentina",-3));
		Time webinarBegining = new Time(16,0,0,
				new TimeZone("Costa Rica",-6));
		
		// Al no romper en encapsulamiento, el hecho de
		// agregar el TimeZone hace que todo siga funcionando
		// perfectamente y "un Example", usuario de Time, ni se
		// entera de este cambio
		assertEquals(1, now.differenceInHours(webinarBegining));
	}

}
