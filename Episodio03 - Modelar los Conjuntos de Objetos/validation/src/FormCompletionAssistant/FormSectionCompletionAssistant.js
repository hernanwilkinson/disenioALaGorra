import {FormCompletionAssistant} from "./FormCompletionAssistant";
import {AssertionsFailed} from "../CreationAssertion/AssertionsFailed";

export class FormSectionCompletionAssistant extends FormCompletionAssistant {
    assistants;
    creationClosure;
    model;

    static with(assistants, creationClosure, fromContainerModelGetter, assertionsId) {
        return new this(assistants, creationClosure, fromContainerModelGetter, assertionsId);
    }

    constructor(assistants, creationClosure, fromContainerModelGetter, assertionsId) {
        super(assertionsId, fromContainerModelGetter);
        this.assistants = assistants;
        this.creationClosure = creationClosure;
    }

    setModel(newModel) {
        this.model = newModel;
        this.assistants.forEach(
            assistant => assistant.setModelFrom(newModel));
    }

    resetModel() {
        this.model = FormCompletionAssistant.INVALID_MODEL;
        this.assistants.forEach(
            assistant => assistant.resetModel());
    }

    getModel() {
        return this.model;
    }

    createModel() {
        this.removeFailedAssertions();
        const models = this.createComposedModels();
        try {
            this.model = this.creationClosure(...models);
        } catch (error) {
            this.model = FormCompletionAssistant.INVALID_MODEL;
            this.handleCreateModelError(error);
        }

        return this.model;
    }

    handleCreateModelError(error) {
        if (error instanceof AssertionsFailed)
            this.routeFailedAssertionsOf(error);
        else
            throw error;
    }

    createComposedModels() {
        return this.assistants.map(
            assistant => assistant.createModel());
    }

    routeFailedAssertionsOf(creationError) {
        creationError.forEachAssertionFailed(
            failedAssertion => this.routeFailedAssertion(failedAssertion));
    }

    routeFailedAssertion(failedAssertion) {
        if (this.handles(failedAssertion))
            this.addFailedAssertion(failedAssertion);
        else
            this.routeNotHandledByThisFailedAssertion(failedAssertion);
    }

    routeNotHandledByThisFailedAssertion(failedAssertion) {
        const assistantsHandlingAssertion =
            this.assistantsHandling(failedAssertion);

        if (assistantsHandlingAssertion.length === 0)
            this.addFailedAssertion(failedAssertion);
        else
            this.addFailedAssertionToAll(assistantsHandlingAssertion, failedAssertion);
    }

    addFailedAssertionToAll(assistantsHandlingAssertion, failedAssertion) {
        assistantsHandlingAssertion.forEach(
            assistant => assistant.addFailedAssertion(failedAssertion));
    }

    assistantsHandling(assertion) {
        return this.assistants.filter(
            assistant => assistant.handles(assertion));
    }
}