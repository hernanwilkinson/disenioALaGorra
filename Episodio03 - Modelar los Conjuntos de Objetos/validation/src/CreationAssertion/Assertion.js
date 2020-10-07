import {AssertionsRunner} from "./AssertionsRunner";
import {FormCompletionAssistant} from "../FormCompletionAssistant/FormCompletionAssistant";

export class Assertion {
    values;
    id;
    condition;
    description;

    /*
     * Cuando se serializa un Assertion no habría que mandar values y condition
     * o lo que habría que reificar es AssertionFailed con solo el id y description
     * para no tenes que andar transmitiendo todo
     */
    static fromJson(assertionAsJson){
        console.log(assertionAsJson);
        return new this(
            [],assertionAsJson.id,()=>false,assertionAsJson.description);
    }

    static forAll(values,id,condition,description){
        return new this(values,id,condition,description);
    }

    static for(value,id,condition,description){
        return this.forAll([value],id,condition,description);
    }

    static assertFor(value,id,condition,description){
        return this.assertForAll([value],id,condition,description)
    }

    static assertForAll(values,id,condition,description){
        AssertionsRunner.assertAll([this.forAll(values,id,condition,description)]);
    }

    static checkIsValid(potentialModel){
        return this.for(potentialModel, "", () => true, "");
    }

    constructor(values,id,condition,description) {
        this.values = values;
        this.id = id;
        this.condition = condition;
        this.description = description;
    }

    shouldNotRun(){
        return this.values.some(
            value=>FormCompletionAssistant.isInvalidModel(value));
    }

    doesHold(){
        return this.condition();
    }

    doesNotHold(){
        return !this.doesHold();
    }

    hasFailed(){
        return this.shouldNotRun() || this.doesNotHold();
    }

    isIdentifiedAs(assertionId) {
        return this.id === assertionId;
    }

    isIdentifiedAsWith(assertionId,assertionDescription){
        return this.isIdentifiedAs(assertionId)
            && this.isDescription(assertionDescription);
    }

    getDescription(){
        return this.description;
    }

    isDescription(assertionDescription) {
        return this.description === assertionDescription;
    }
}

