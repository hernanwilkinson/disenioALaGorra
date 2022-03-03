import React from "react";

export class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
        this.formCompletionAssistant = props.formCompletionAssistant;
    }

    errorDescriptions() {
        let counter = 0;
        return this.formCompletionAssistant.failedAssertionsDescriptions().map(description =>
            <li key={counter++}>{description}</li>);
    }

    render() {
        if (this.hasFailedAssertionsToShow())
            return <div className="ui bottom attached negative message">
                <ul>
                    {this.errorDescriptions()}
                </ul>
            </div>
        else
            return null;

    }

    hasFailedAssertionsToShow() {
        return this.formCompletionAssistant.hasFailedAssertions();
    }
}