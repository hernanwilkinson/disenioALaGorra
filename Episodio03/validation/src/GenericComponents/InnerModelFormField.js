import {FormField} from "./FormField";

export class InnerModelFormField extends FormField {
    setModel(state, e) {
        state.formCompletionAssistant.setInnerModel(e.target.value);
    }

    getModel() {
        return this.state.formCompletionAssistant.getInnerModel();
    }
}