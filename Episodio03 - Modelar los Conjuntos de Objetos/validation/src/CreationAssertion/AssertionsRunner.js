import {AssertionsFailed} from "./AssertionsFailed";

export class AssertionsRunner {
    assertions;

    static assert(assertion) {
        this.assertAll([assertion]);
    }

    static assertAll(assertions) {
        (new this(assertions)).run();
    }

    constructor(assertions) {
        this.assertions = assertions;
    }

    run() {
        const failedAssertions = this.failedAssertions();

        if (failedAssertions.length !== 0)
            throw new AssertionsFailed(failedAssertions);
    }

    failedAssertions() {
        return this.assertions.filter(
            assertion => assertion.hasFailed());
    }
}