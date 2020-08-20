import React from 'react';
import ReactDOM from 'react-dom';

/**** Model creator framework ****
 * Este código es provisto as-is. No ha sido probado en producción y
 * fue desarrollado con el propósito de ejemplificar lo mostrado en el webinar
 * de Diseño a la gorra.
 * Le cambie los nombres a los mostrados en el webinar para utilizar unos más
 * relacionados al dominio de negocio y tanto a la implementación. Para ello utilicé
 * la metáfora de un assistente que ayuda a completar un formulario
 *
 * Está todo en un solo archivo pero habría que separarlo en distintos módulos
 */
class FormCompletionAssistant {
    assertionIds;
    fromContainerModelGetter;
    failedAssertions;

    static isInvalidModel(potentialModel) {
        return potentialModel === FormCompletionAssistant.INVALID_MODEL;
    }

    constructor(assertionsId,fromContainerModelGetter){
        this.assertionIds = assertionsId;
        this.fromContainerModelGetter = fromContainerModelGetter;
        this.removeFailedAssertions();
    }

    shouldBeImplementedBySubclass() {
        throw new Error("Should be implemented by subclass");
    }

    createModel(){
        this.shouldBeImplementedBySubclass();
    }

    withCreatedModelDo(validModelClosure,invalidModelClosure){
        const createdModel = this.createModel();
        if(this.constructor.isInvalidModel(createdModel))
            return invalidModelClosure();
        else
            return validModelClosure(createdModel);
    }

    getModel(){
        this.shouldBeImplementedBySubclass();
    }

    setModel(newModel){
        this.shouldBeImplementedBySubclass();
    }

    setModelFrom(containerModel){
        return this.setModel(this.fromContainerModelGetter(containerModel));
    }

    resetModel(){
        this.shouldBeImplementedBySubclass();
    }

    removeFailedAssertions() {
        this.failedAssertions = [];
    }

    handles(assertion){
        return this.assertionIds.some(
            assertionId => assertion.isIdentifiedAs(assertionId));
    }

    hasOnlyOneAssertionFailedIdentifiedAs(assertionId){
        return this.failedAssertions.length===1
            && this.failedAssertions[0].isIdentifiedAs(assertionId);
    }

    addFailedAssertion(assertionFailed){
        this.failedAssertions.push(assertionFailed);
    }

    doesNotHaveFailedAssertions(){
        return !this.hasFailedAssertions();
    }

    hasFailedAssertions(){
        return !(this.failedAssertions.length===0);
    }

    failedAssertionsDescriptions(){
        return this.failedAssertions.
            map(failedAssertion=>failedAssertion.getDescription()).
            filter(description => description !== "" );
    }
}
// Este objeto es usado como token de modelo inválido y de esta
// manera poder correr todas las validaciones en objetos compuestos
FormCompletionAssistant.INVALID_MODEL = new Object();

class FormFieldCompletionAssistant extends FormCompletionAssistant {
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

class FormSectionCompletionAssistant extends FormCompletionAssistant {
    assistants;
    creationClosure;
    model;

    static with(assistants,creationClosure,fromContainerModelGetter,assertionsId) {
        return new this(assistants,creationClosure,fromContainerModelGetter,assertionsId);
    }

    constructor(assistants,creationClosure,fromContainerModelGetter,assertionsId) {
        super(assertionsId,fromContainerModelGetter);
        this.assistants = assistants;
        this.creationClosure = creationClosure;
    }

    setModel(newModel){
        this.model = newModel;
        this.assistants.forEach(
            assistant => assistant.setModelFrom(newModel));
    }

    resetModel(){
        this.model = FormCompletionAssistant.INVALID_MODEL;
        this.assistants.forEach(
            assistant=>assistant.resetModel());
    }

    getModel(){
        return this.model;
    }

    createModel(){
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
        if (error instanceof CreationError)
            this.routeFailedAssertionsOf(error);
        else
            throw error;
    }

    createComposedModels() {
        return this.assistants.map(
            assistant => assistant.createModel());
    }

    routeFailedAssertionsOf(creationError){
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

class IntegerFieldCompletionAssistant extends FormSectionCompletionAssistant {
    static for(assertionId,fromContainerModelGetter) {
        let assertionsId;

        if(assertionId==="")
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
        CreationAssertionRunner.assert(
            this.createAssertionFor(assertionId, numberAsString));

        return Number(numberAsString);
    }

    static createNumberAssistant() {
        return FormFieldCompletionAssistant.handling(
            "",
            number => number.toString());
    }

    static createAssertionFor(assertionId, numberAsString) {
        return CreationAssertion.for(
            numberAsString,
            assertionId,
            () => /^[-+]?(\d+)$/.test(numberAsString),
            "Invalid integer");
    }

    innerAssistant(){
        return this.assistants[0];
    }

    setInnerModel(newModel){
        this.innerAssistant().setModel(newModel);
    }

    getInnerModel(){
        return this.innerAssistant().getModel();
    }
}

class CreationAssertion {
    values;
    id;
    condition;
    description;

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
        CreationAssertionRunner.assertAll([this.forAll(values,id,condition,description)]);
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

class CreationAssertionRunner {
    assertions;

    static assert(assertion) {
        this.assertAll([assertion]);
    }

    static assertAll(assertions) {
        (new this(assertions)).run();
    }

    constructor(assertions) {
        this.assertions = assertions;
    }

    run(){
        const failedAssertions = this.failedAssertions();

        if(failedAssertions.length!==0)
            throw new CreationError(failedAssertions);
    }

    failedAssertions() {
        return this.assertions.filter(
            assertion => assertion.hasFailed());
    }
}

class CreationError extends Error {
    failedAssertions;

    constructor(failedAssertions){
        super();
        this.failedAssertions = failedAssertions;
    }

    hasOnlyOneAssertionFailedWith(assertionId, assertionDescription) {
        return this.failedAssertions.length === 1
            && this.failedAssertions[0].isIdentifiedAsWith(assertionId,assertionDescription);
    }

    forEachAssertionFailed(closure){
        return this.failedAssertions.forEach(closure);
    }
}

//**** Domain model ****
class Customer {
    firstName;
    lastName;
    years;
    fromWorkingHours;
    toWorkingHours;

    static named(firstName,lastName,years,fromWorkingHours,toWorkingHours) {
        CreationAssertionRunner.assertAll(
            [
                this.firstNameAssertion(firstName),
                this.lastNameAssertion(lastName),
                this.yearsAssertion(years),
                this.fromWorkingHoursAssertion(fromWorkingHours),
                this.workingHoursAssertion(fromWorkingHours,toWorkingHours)
            ]);

        return new this(firstName,lastName,years,fromWorkingHours,toWorkingHours);
    }

    static fromWorkingHoursAssertion(fromWorkingHours){
        return CreationAssertion.for(
            fromWorkingHours,
            Customer.fromWorkingHoursAID,
            () => fromWorkingHours<=Time.at(12,0,0),
            "From working hours must be before noon");
    }

    static workingHoursAssertion(fromWorkingHours,toWorkingHours) {
        return CreationAssertion.forAll(
            [fromWorkingHours, toWorkingHours],
            Customer.workingHoursAID,
            () => fromWorkingHours<toWorkingHours,
            "From working hours must be less that to working hours");
    }

    static yearsAssertion(years) {
        return CreationAssertion.for(
            years,
            Customer.yearsAID,
            () => this.assertIsValidYears(years),
            "Years must be postive integer less than 120");
    }

    static lastNameAssertion(lastName) {
        return CreationAssertion.for(
            lastName,
            Customer.lastNameAID,
            () => !(lastName === ""),
            "Last name can not be empty");
    }

    static firstNameAssertion(firstName) {
        return CreationAssertion.for(
            firstName,
            Customer.firstNameAID,
            () => !(firstName === ""),
            "First name can not be empty");
    }

    static assertIsValidYears(years){
        return Number.isInteger(years) && years > 0 && years < 120;
    }

    constructor(firstName,lastName,years,fromWorkingHours,toWorkingHours) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.years = years;
        this.fromWorkingHours = fromWorkingHours;
        this.toWorkingHours = toWorkingHours;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getYears(){
        return this.years;
    }

    getFromWorkingHours(){
        return this.fromWorkingHours;
    }

    getToWorkingHours(){
        return this.toWorkingHours;
    }
}
Customer.firstNameAID = "firstName";
Customer.lastNameAID = "lastName";
Customer.yearsAID = "years";
Customer.fromWorkingHoursAID = "fromWorkingHours";
Customer.workingHoursAID = "workingHours";

class Time {
    hour;
    minute;
    second;

    static at(hour, minute, second){
        CreationAssertionRunner.assertAll([
                this.hourAssertion(hour),
                this.minuteAssertion(minute),
                this.secondAssertion(second)]);

        return new this(hour,minute,second);
    }

    static secondAssertion(second) {
        return CreationAssertion.for(
            second,
            Time.secondAID,
            () => this.isValidSixty(second),
            Time.INVALID_SECOND);
    }

    static minuteAssertion(minute) {
        return CreationAssertion.for(
            minute,
            Time.minuteAID,
            () => this.isValidSixty(minute),
            Time.INVALID_MINUTE);
    }

    static hourAssertion(hour) {
        return CreationAssertion.for(
            hour,
            Time.hourAID,
            () => this.isValidHour(hour),
            Time.INVALID_HOUR);
    }

    static isValidHour(hour){
        return Number.isInteger(hour) && hour >= 0 && hour <= 23;
    }

    static isValidSixty(numberToCheck){
        return Number.isInteger(numberToCheck) && numberToCheck >= 0 && numberToCheck <= 59;
    }

    constructor(hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    isAt(hour,minute,second) {
        return this.hour===hour && this.minute===minute && this.second===second;
    }

    valueOf(){
        return this.hour*3600+this.minute*60+this.second;
    }

    getHour(){
        return this.hour;
    }

    getMinute(){
        return this.minute;
    }

    getSecond(){
        return this.second;
    }
}
Time.hourAID = "hour";
Time.INVALID_HOUR = "Hour must be an integer between 0 and 23";
Time.minuteAID = "minute";
Time.INVALID_MINUTE = "Minute must be an integer between 0 and 59";
Time.secondAID = "second";
Time.INVALID_SECOND = "Second must be an integer between 0 and 59";

class Interval {
    from;
    to;

    static fromTo(from,to) {
        CreationAssertionRunner.assert(this.fromBeforeToAssertion(from, to));

        return new this(from,to);
    }

    static fromBeforeToAssertion(from, to) {
        return CreationAssertion.forAll(
            [from, to],
            Interval.AID,
            () => from <= to,
            Interval.INVALID_INTERVAL);
    }

    constructor(from,to) {
        this.from = from;
        this.to = to;
    }

    getFrom(){
        return this.from;
    }

    getTo(){
        return this.to;
    }
}
Interval.AID="interval";
Interval.INVALID_INTERVAL = "From must be less or equal to to";

//**** View model ****
class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
        this.formAssistant = props.formAssistant;
    }

    errorDescriptions(){
        let counter = 0;
        return this.formAssistant.failedAssertionsDescriptions().map(description =>
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
        return this.formAssistant.hasFailedAssertions();
    }
}

class FormField extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state.labelText = props.labelText;
        this.state.inputName = props.inputName;
        this.state.inputPlaceHolder = props.inputPlaceHolder;
        this.state.formAssistant = props.formAssistant;
        this.state.doNotShowErrorMessage = props.doNotShowErrorMessage;
    }
    render(){
        return (
            <div className="field">
                {this.label()}
                <input
                    type="text"
                    name={this.state.inputName}
                    placeholder={this.state.inputPlaceHolder}
                    value={this.getModel()}
                    onChange={e => {
                        e.persist();
                        this.setState((state, props) => {
                            this.setModel(state, e);
                            return state;
                        })
                    }}
                />
                {this.errorMessage()}
            </div>);
    }

    errorMessage() {
        if(this.state.doNotShowErrorMessage)
            return null;
        else
            return <ErrorMessage formAssistant={this.state.formAssistant}/>;
    }

    label() {
        if(this.state.labelText===null)
            return null;
        else
            return <label>{this.state.labelText}</label>;
    }

    setModel(state, e) {
        state.formAssistant.setModel(e.target.value);
    }

    getModel() {
        return this.state.formAssistant.getModel();
    }
}

class InnerModelFormField extends FormField {
    setModel(state, e) {
        state.formAssistant.setInnerModel(e.target.value);
    }

    getModel() {
        return this.state.formAssistant.getInnerModel();
    }
}

class TimeView extends React.Component {
    static createFormAssistant(getterFromContainerModel, assertionsId=[]){
        const hourAssistant = IntegerFieldCompletionAssistant.for(
            "",time => time.getHour());
        const minuteAssistant = IntegerFieldCompletionAssistant.for(
            "",time => time.getMinute());
        const secondAssistant = IntegerFieldCompletionAssistant.for(
            "",time => time.getSecond());

        const timeAssistant = FormSectionCompletionAssistant.with(
            [hourAssistant, minuteAssistant, secondAssistant],
            (hour, minute, second) => Time.at(hour,minute,second),
            getterFromContainerModel,
            assertionsId);

        timeAssistant.hour = hourAssistant;
        timeAssistant.minute = minuteAssistant;
        timeAssistant.second = secondAssistant;

        return timeAssistant;
    }

    constructor(props) {
        super(props);
        this.state = props.formAssistant;
    }

    render(){
        return (
            <div>
                <div className="three fields" style={{ width: '250px' }}>
                    <InnerModelFormField inputName={"hour"}
                                         inputPlaceHolder={"00"}
                                         formAssistant={this.state.hour}
                                         doNotShowErrorMessage={true}/>
                    <label>:</label>
                    <InnerModelFormField inputName={"minute"}
                                         inputPlaceHolder={"00"}
                                         formAssistant={this.state.minute}
                                         doNotShowErrorMessage={true}/>
                    <label>:</label>
                    <InnerModelFormField inputName={"second"}
                                         inputPlaceHolder={"00"}
                                         formAssistant={this.state.second}
                                         doNotShowErrorMessage={true}/>
                </div>
                <ErrorMessage formAssistant={this.state} />
            </div>
        );
    }
}

class CustomerView extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.formAssistant;
    }

    static createFormAssistant(getterFromContainerModel, assertionsId=[]){
        const firstNameAssistant = this.createFirstNameAssistant();
        const lastNameAssistant = this.createLastNameAssistant();
        const yearsAssistant = this.createYearsAssistant();
        const fromWorkingHoursAssistant = this.createFromWorkingHoursAssistant();
        const toWorkingHoursAssistant = this.createToWorkingHoursAssistant();

        const customerAssistant = FormSectionCompletionAssistant.with([
                firstNameAssistant,
                lastNameAssistant,
                yearsAssistant,
                fromWorkingHoursAssistant,
                toWorkingHoursAssistant],
            (firstName, lastName, years, fromWorkingHours, toWorkingHours) =>
                Customer.named(firstName,lastName,years, fromWorkingHours, toWorkingHours),
            getterFromContainerModel,
            assertionsId);

        customerAssistant.firstNameAssistant = firstNameAssistant;
        customerAssistant.lastNameAssistant = lastNameAssistant;
        customerAssistant.yearsAssistant = yearsAssistant;
        customerAssistant.fromWorkingHoursAssistant = fromWorkingHoursAssistant;
        customerAssistant.toWorkingHoursAssistant = toWorkingHoursAssistant;

        return customerAssistant;
    }

    static createFromWorkingHoursAssistant() {
        return TimeView.createFormAssistant(
            customer => customer.getFromWorkingHours());
    }

    static createToWorkingHoursAssistant() {
        return TimeView.createFormAssistant(
            customer => customer.getToWorkingHours());
    }

    static createYearsAssistant() {
        return IntegerFieldCompletionAssistant.for(
            Customer.yearsAID, customer => customer.getYears());
    }

    static createLastNameAssistant() {
        return FormFieldCompletionAssistant.handling(
            Customer.lastNameAID, customer => customer.getLastName());
    }

    static createFirstNameAssistant() {
        return FormFieldCompletionAssistant.handling(
            Customer.firstNameAID, customer => customer.getFirstName());
    }

    render() {
        return (
            <div>
                <FormField labelText={"First Name"} inputName={"first-name"}
                           inputPlaceHolder={"First Name"}
                           formAssistant={this.state.firstNameAssistant} />
                <FormField labelText={"Last Name"} inputName={"last-name"}
                           inputPlaceHolder={"Last Name"}
                           formAssistant={this.state.lastNameAssistant} />
                <InnerModelFormField labelText={"Years"} inputName={"years"}
                           inputPlaceHolder={"Years"}
                                     formAssistant={this.state.yearsAssistant} />
                <div className="two fields">
                    <div className="field">
                        <label>WorkingFrom</label>
                        <TimeView formAssistant={this.state.fromWorkingHoursAssistant}/>
                    </div>
                    <div className="field">
                        <label>To</label>
                        <TimeView formAssistant={this.state.toWorkingHoursAssistant}/>
                    </div>
                </div>
                <ErrorMessage formAssistant={this.state} />
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.fromCustomerAssistant = CustomerView.createFormAssistant();
        this.state.toCustomerAssistant = CustomerView.createFormAssistant();
        this.clicked = this.clicked.bind(this);
    }

    clicked(e){
        this.setState((state,props)=> {
            this.state = state;
            this.state.fromCustomerAssistant.withCreatedModelDo(
                customer => this.state.toCustomerAssistant.setModel(customer),
                ()=>this.state.toCustomerAssistant.resetModel()
            );
            return this.state;
        });
    }

    render() {
        return (
            <div>
            <div className="ui container" style={{ marginTop: '10px', width: '500px' }}>
                <div className="ui segment">
                    <form className="ui form">
                       <CustomerView formAssistant={this.state.fromCustomerAssistant}/>
                    </form>
                    <button className="ui button" onClick={this.clicked}>Test</button>
                </div>
            </div>
            <div className="ui container" style={{ marginTop: '10px', width: '500px' }}>
                <div className="ui segment">
                    <form className="ui form">
                        <CustomerView formAssistant={this.state.toCustomerAssistant}/>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

