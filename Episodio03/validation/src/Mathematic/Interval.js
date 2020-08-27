import {Assertion} from "../CreationAssertion/Assertion";
import {AssertionsRunner} from "../CreationAssertion/AssertionsRunner";

export class Interval {
    static AID="intervalAID";
    static INVALID_INTERVAL = "From must be less or equal to to";

    from;
    to;

    static fromTo(from,to) {
        AssertionsRunner.assert(this.fromBeforeToAssertion(from, to));

        return new this(from,to);
    }

    static fromBeforeToAssertion(from, to) {
        return Assertion.forAll(
            [from, to],
            Interval.AID,
            () => from <= to,
            Interval.INVALID_INTERVAL);
    }

    constructor(from,to) {
        this.from = from;
        this.to = to;
    }

    getFrom(){
        return this.from;
    }

    getTo(){
        return this.to;
    }
}
