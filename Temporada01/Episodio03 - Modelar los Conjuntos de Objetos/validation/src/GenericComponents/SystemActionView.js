import React from "react";
import {Redirect} from 'react-router-dom'
import {AssertionsFailed} from "../CreationAssertion/AssertionsFailed";

export class SystemActionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.redirect = false;
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectTo} />
        }
    }

    async executeSystemAction(systemAction, formCompletionAssistant) {
        try {
            await systemAction();
            this.setRedirect();
        }
        catch (error) {
            if (error instanceof AssertionsFailed)
                this.setState((state, props) => {
                    formCompletionAssistant.routeFailedAssertionsOf(error);
                    return state;
                });
            else
                throw error;
        }
    }
}