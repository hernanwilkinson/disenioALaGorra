import {Assertion} from "../CreationAssertion/Assertion";
import {AssertionsRunner} from "../CreationAssertion/AssertionsRunner";

import {FormFieldCompletionAssistant} from "./FormFieldCompletionAssistant";
import {FormSectionCompletionAssistant} from "./FormSectionCompletionAssistant";

export class IntegerFieldCompletionAssistant extends FormSectionCompletionAssistant {
    static for(assertionId, fromContainerModelGetter) {
        let assertionsId;

        if (assertionId === "")
            assertionsId = [];
        else
            assertionsId = [assertionId];

        return this.with(
            [this.createNumberAssistant()],
            numberAsString => this.createInteger(assertionId, numberAsString),
            fromContainerModelGetter,
            assertionsId);
    }

    static createInteger(assertionId, numberAsString) {
        AssertionsRunner.assert(
            this.createAssertionFor(assertionId, numberAsString));

        return Number(numberAsString);
    }

    static createNumberAssistant() {
        return FormFieldCompletionAssistant.handling(
            "",
            number => number.toString());
    }

    static createAssertionFor(assertionId, numberAsString) {
        return Assertion.for(
            numberAsString,
            assertionId,
            () => /^[-+]?(\d+)$/.test(numberAsString),
            "Invalid integer");
    }

    innerAssistant() {
        return this.assistants[0];
    }

    setInnerModel(newModel) {
        this.innerAssistant().setModel(newModel);
    }

    getInnerModel() {
        return this.innerAssistant().getModel();
    }
}