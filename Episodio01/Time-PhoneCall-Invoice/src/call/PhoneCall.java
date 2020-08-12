package call;

import java.util.Optional;
import java.util.function.Supplier;

import time2.Time;

public class PhoneCall {

	//Estoy usando String para el número de teléfono per
	//deberia ser un PhoneNumber
	private String sourceNumber;
	private String targetNumber;
	private Time startTime;
	private Time endTime;
	
	public PhoneCall(String sourceNumber, String targetNumber, Time startTime) {
		this.sourceNumber = sourceNumber;
		this.targetNumber = targetNumber;
		this.startTime = startTime;
	}
	
	public void setEndTime(Time endTime ) {
		this.endTime = endTime;
	}
	
	public int durationInHours() {
		return endTime.differenceInHours(startTime);
	}
	
	
	
	
//	public Optional<Integer> durationInHours2(){
//		if(endTime==null) 
//			return Optional.empty();
//		else
//			return Optional.of(durationInHours());
//	}

//	public int durationInHoursIfNone(Supplier<Integer> noneClosure) {
//		if(endTime==null) 
//			return noneClosure.get();
//		else
//			return durationInHours();
//	}
}

