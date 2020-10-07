const assert = require('assert');

assert.isTrue = function (aBoolean) {
    return assert.ok(aBoolean);
};

assert.isFalse = function (aBoolean) {
    return assert.isTrue (!aBoolean);
};

class Time {
    hour;
    minute;
    second;

    static at(hour,minute,second) {
        this.assertHourIsValid(hour);
        this.assertMinuteIsValid(minute);
        this.assertSecondIsValid(second);

        return new this(hour,minute,second);
    }

    static assertSecondIsValid(second) {
        if (!this.isValidSixty(second)) throw new Error(Time.INVALID_SECOND);
    }

    static assertMinuteIsValid(minute) {
        if (!this.isValidSixty(minute)) throw new Error(Time.INVALID_MINUTE);
    }

    static assertHourIsValid(hour) {
        /* No confundir Number.isInteger(hour) con un chequeo de tipos!
        * Lo que estoy verificando acá es que hour represente un número entero
        * Se lo puede pensar con esta otra implementación:
        *
        * hour-Math.trunc(hour)===0
        *
        * De esa forma queda más explicito que no se está verificando el
        * tipo del objeto sino qué número representa.
        *
        * Tener en cuenta que Number.isInteger(1.0) devuelve true de la misma
        * manera que 1.0-Math.trunc(1.0)===0 lo cual es el resultado esperado
        * porque se busca que se represente un número entero, no importa si está
        * implementado como integer o float u otra implementación
        */
        if (!(Number.isInteger(hour) && hour >= 0 && hour <= 23)) throw new Error(Time.INVALID_HOUR);
    }

    static isValidSixty(minute) {
        return Number.isInteger(minute) && minute >= 0 && minute <= 59;
    }

    constructor(hour,minute,second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
    isAt(hour,minute,second){
        return this.hour === hour
            && this.minute === minute
            && this.second === second;
    }
}
Time.INVALID_HOUR = "Hour must be an integer between 0 and 23";
Time.INVALID_MINUTE = "Minute must be an integer between 0 and 59";
Time.INVALID_SECOND = "Second must be an integer between 0 and 59";

class TimeSubclass extends Time {

}

suite('Time suite',function() {

    test("time keeps hour, minute and second", function (){
        assert.isTrue(TimeSubclass.at(1,1,1).constructor === TimeSubclass);

        assert.isTrue(Time.at (1.0,2,3).isAt(1,2,3,));
    });
    test("hour must be positive", function () {
        assert.throws(()=> Time.at(-1,0,0), new Error(Time.INVALID_HOUR));
    })
    test("hour must be less than 24", function () {
        assert.throws(()=> Time.at(24,0,0), new Error(Time.INVALID_HOUR));
    })
    test("hour must be integer", function () {
        assert.throws(()=> Time.at(1.1,0,0), new Error(Time.INVALID_HOUR));
    })
    test("hour must be integer", function () {
        assert.throws(()=> Time.at(1.1,0,0), new Error(Time.INVALID_HOUR));
    });
    test("minute must be equal or greather to 0", function () {
        assert.throws(()=> Time.at(1,-1,0), new Error(Time.INVALID_MINUTE));
    });
    test("minute must be less that 60", function () {
        assert.throws(()=> Time.at(1,60,0), new Error(Time.INVALID_MINUTE));
    });
    test("minute must be integer", function () {
        assert.throws(()=> Time.at(1,1.1,0), new Error(Time.INVALID_MINUTE));
    });
    test("second must be equal or greather to 0", function () {
        assert.throws(()=> Time.at(1,1,-1), new Error(Time.INVALID_SECOND));
    });
    test("second must be less than 59", function () {
        assert.throws(()=> Time.at(1,1,60), new Error(Time.INVALID_SECOND));
    });
    test("second must be integer", function () {
        assert.throws(()=> Time.at(1,1,1.1), new Error(Time.INVALID_SECOND));
    });

});
