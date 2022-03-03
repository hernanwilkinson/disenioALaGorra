import {Assertion} from "./Assertion";

export class AssertionsFailed extends Error {
    failedAssertions;

    static fromJson(assertionsFailedAsJson){
        console.log(assertionsFailedAsJson);
        const failedAssertions = assertionsFailedAsJson.failedAssertions.map(
            assertionAsJson => Assertion.fromJson(assertionAsJson));

        return new this(failedAssertions);
    }

    constructor(failedAssertions) {
        super();
        this.failedAssertions = failedAssertions;
    }

    hasOnlyOneAssertionFailedWith(assertionId, assertionDescription) {
        return this.failedAssertions.length === 1
            && this.failedAssertions[0].isIdentifiedAsWith(assertionId, assertionDescription);
    }

    forEachAssertionFailed(closure) {
        return this.failedAssertions.forEach(closure);
    }
}