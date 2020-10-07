import {FormCompletionAssistant} from "./FormCompletionAssistant";

export class FormFieldCompletionAssistant extends FormCompletionAssistant {
    model;
    initialModel;

    static handling(assertionId,fromContainerModelGetter,initialModel="") {
        return this.handlingAll([assertionId],fromContainerModelGetter,initialModel);
    }

    static handlingAll(assertionsId,fromContainerModelGetter,initialModel="") {
        return new this(assertionsId,fromContainerModelGetter,initialModel);
    }

    constructor(assertionsId,fromContainerModelGetter,initialModel){
        super(assertionsId,fromContainerModelGetter);
        this.initialModel = initialModel;
        this.setModel(initialModel);
    }

    createModel(){
        this.removeFailedAssertions();
        return this.model;
    }

    getModel(){
        return this.model;
    }

    setModel(newModel){
        this.model = newModel;
    }

    resetModel(){
        this.model = this.initialModel;
    }
}
