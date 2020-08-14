package call;

import time2.Time;

// Esta interface está para que PhoneCallInProgress y
// FinishedPhoneCall sean polimorficas
// Se llama PhoneCall2 dado que PhoneCall ya existe en este
// package, sino debería ser simplemente PhoneCall
public interface PhoneCall2 {

	String getSourceNumber();
	String getTargetNumber();
	Time getStartTime();
}