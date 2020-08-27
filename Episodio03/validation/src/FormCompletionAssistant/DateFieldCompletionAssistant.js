import {FormFieldCompletionAssistant} from "./FormFieldCompletionAssistant";
import {FormSectionCompletionAssistant} from "./FormSectionCompletionAssistant";
import {Assertion} from "../CreationAssertion/Assertion";
import {AssertionsRunner} from "../CreationAssertion/AssertionsRunner";

//Esto no está terminado. Lo deje de ejemplo pero no está funcionando
export class DateFieldCompletionAssistant extends FormSectionCompletionAssistant {
    static for(assertionId, fromContainerModelGetter) {
        let assertionsId;

        if (assertionId === "")
            assertionsId = [];
        else
            assertionsId = [assertionId];

        return this.with(
            [this.createDateAssistant()],
            dateAsString => this.createDate(assertionId, dateAsString),
            fromContainerModelGetter,
            assertionsId);
    }

    static createDate(assertionId, dateAsString) {
        AssertionsRunner.assert(
            this.createAssertionFor(assertionId, dateAsString));

        return Date(dateAsString);
    }

    static createDateAssistant() {
        return FormFieldCompletionAssistant.handling(
            "",
            date => date.toLocaleDateString());
    }

    static createAssertionFor(assertionId, dateAsString) {
        return Assertion.for(
            dateAsString,
            assertionId,
            () => dateAsString!=="",
            "Invalid date");
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