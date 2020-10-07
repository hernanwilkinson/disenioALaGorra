import {Assertion} from "../CreationAssertion/Assertion";
import {AssertionsRunner} from "../CreationAssertion/AssertionsRunner";

export class Time {
    static hourAID = "hour";
    static INVALID_HOUR = "Hour must be an integer between 0 and 23";
    static minuteAID = "minute";
    static INVALID_MINUTE = "Minute must be an integer between 0 and 59";
    static secondAID = "second";
    static INVALID_SECOND = "Second must be an integer between 0 and 59";

    hour;
    minute;
    second;

    static fromJson(timeAsJson){
        return Time.at(timeAsJson.hour, timeAsJson.minute, timeAsJson.second);
    }

    static at(hour, minute, second){
        AssertionsRunner.assertAll([
            this.hourAssertion(hour),
            this.minuteAssertion(minute),
            this.secondAssertion(second)]);

        return new this(hour,minute,second);
    }

    static secondAssertion(second) {
        return Assertion.for(
            second,
            Time.secondAID,
            () => this.isValidSixty(second),
            Time.INVALID_SECOND);
    }

    static minuteAssertion(minute) {
        return Assertion.for(
            minute,
            Time.minuteAID,
            () => this.isValidSixty(minute),
            Time.INVALID_MINUTE);
    }

    static hourAssertion(hour) {
        return Assertion.for(
            hour,
            Time.hourAID,
            () => this.isValidHour(hour),
            Time.INVALID_HOUR);
    }

    static isValidHour(hour){
        //(hour-Math.trunc(hour)) === 0
        return Number.isInteger(hour) && hour >= 0 && hour <= 23;
    }

    static isValidSixty(numberToCheck){
        return Number.isInteger(numberToCheck) && numberToCheck >= 0 && numberToCheck <= 59;
    }

    constructor(hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    isAt(hour,minute,second) {
        return this.hour===hour && this.minute===minute && this.second===second;
    }

    valueOf(){
        return this.hour*3600+this.minute*60+this.second;
    }

    getHour(){
        return this.hour;
    }

    getMinute(){
        return this.minute;
    }

    getSecond(){
        return this.second;
    }
}
