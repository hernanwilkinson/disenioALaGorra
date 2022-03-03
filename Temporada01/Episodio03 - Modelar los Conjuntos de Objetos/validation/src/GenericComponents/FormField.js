import React from "react";
import {ErrorMessage} from "./ErrorMessage";

export class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.labelText = props.labelText;
        this.state.inputName = props.inputName;
        this.state.inputPlaceHolder = props.inputPlaceHolder;
        this.state.formCompletionAssistant = props.formCompletionAssistant;
        this.state.doNotShowErrorMessage = props.doNotShowErrorMessage;
    }

    render() {
        return (
            <div className="field">
                {this.label()}
                <input
                    type="text"
                    name={this.state.inputName}
                    placeholder={this.state.inputPlaceHolder}
                    value={this.getModel()}
                    onChange={this.onChange}
                />
                {this.errorMessage()}
            </div>);
    }

    onChange = e => {
        e.persist();
        this.setState((state, props) => {
            this.setModel(state, e);
            return state;
        })
    };

    errorMessage() {
        if (this.state.doNotShowErrorMessage)
            return null;
        else
            return <ErrorMessage formCompletionAssistant={this.state.formCompletionAssistant}/>;
    }

    label() {
        if (this.state.labelText === null)
            return null;
        else
            return <label>{this.state.labelText}</label>;
    }

    setModel(state, e) {
        state.formCompletionAssistant.setModel(e.target.value);
    }

    getModel() {
        return this.state.formCompletionAssistant.getModel();
    }
}