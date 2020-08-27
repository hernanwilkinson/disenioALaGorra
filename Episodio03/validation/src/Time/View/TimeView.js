import React from "react";
import {Time} from "../Time";

import {FormSectionCompletionAssistant} from "../../FormCompletionAssistant/FormSectionCompletionAssistant";
import {IntegerFieldCompletionAssistant} from "../../FormCompletionAssistant/IntegerFieldCompletionAssistant";

import {ErrorMessage} from "../../GenericComponents/ErrorMessage";
import {InnerModelFormField} from "../../GenericComponents/InnerModelFormField";

export class TimeView extends React.Component {
    static createFormAssistant(getterFromContainerModel, assertionsId = []) {
        const hourAssistant = IntegerFieldCompletionAssistant.for(
            "", time => time.getHour());
        const minuteAssistant = IntegerFieldCompletionAssistant.for(
            "", time => time.getMinute());
        const secondAssistant = IntegerFieldCompletionAssistant.for(
            "", time => time.getSecond());

        const timeAssistant = FormSectionCompletionAssistant.with(
            [hourAssistant, minuteAssistant, secondAssistant],
            (hour, minute, second) => Time.at(hour, minute, second),
            getterFromContainerModel,
            assertionsId);

        timeAssistant.hour = hourAssistant;
        timeAssistant.minute = minuteAssistant;
        timeAssistant.second = secondAssistant;

        return timeAssistant;
    }

    constructor(props) {
        super(props);
        this.state = props.formCompletionAssistant;
    }

    render() {
        return (
            <div>
                <div className="three fields" style={{width: '250px'}}>
                    <InnerModelFormField inputName={"hour"}
                                         inputPlaceHolder={"00"}
                                         formCompletionAssistant={this.state.hour}
                                         doNotShowErrorMessage={true}/>
                    <label>:</label>
                    <InnerModelFormField inputName={"minute"}
                                         inputPlaceHolder={"00"}
                                         formCompletionAssistant={this.state.minute}
                                         doNotShowErrorMessage={true}/>
                    <label>:</label>
                    <InnerModelFormField inputName={"second"}
                                         inputPlaceHolder={"00"}
                                         formCompletionAssistant={this.state.second}
                                         doNotShowErrorMessage={true}/>
                </div>
                <ErrorMessage formCompletionAssistant={this.state}/>
            </div>
        );
    }
}