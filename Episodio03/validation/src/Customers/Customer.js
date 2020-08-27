import {Time} from "../Time/Time";

import {Assertion} from "../CreationAssertion/Assertion";
import {AssertionsRunner} from "../CreationAssertion/AssertionsRunner";


export class Customer {
    static firstNameAID = "firstName";
    static lastNameAID = "lastName";
    static dniAID = "dni";
    static fromWorkingHoursAID = "fromWorkingHours";
    static workingHoursAID = "workingHours";
    static FROM_WORKING_HOURS_MUST_BE_BEFORE_NOON = "From working hours must be before noon";
    static FROM_WORKING_HOURS_MUST_BE_BEFORE_TO_WORKING_HOURS = "From working hours must be less that to working hours";
    static DNI_MUST_BE_POSITIVE_INTEGER = "DNI must be a positive integer";
    static LAST_NAME_CAN_NOT_BE_EMPTY = "Last name can not be empty";
    static FIRST_NAME_CAN_NOT_BE_EMPTY = "First name can not be empty";

    firstName;
    lastName;
    dni;
    fromWorkingHours;
    toWorkingHours;

    static fromJson(customerAsJson) {
        return Customer.named(
            customerAsJson.firstName, customerAsJson.lastName, customerAsJson.dni,
            Time.fromJson(customerAsJson.fromWorkingHours), Time.fromJson(customerAsJson.toWorkingHours));
    };

    static named(firstName,lastName,dni,fromWorkingHours,toWorkingHours) {
        AssertionsRunner.assertAll(
            [
                this.firstNameAssertion(firstName),
                this.lastNameAssertion(lastName),
                this.dniAssertion(dni),
                this.fromWorkingHoursAssertion(fromWorkingHours),
                this.workingHoursAssertion(fromWorkingHours,toWorkingHours)
            ]);

        return new this(firstName,lastName,dni,fromWorkingHours,toWorkingHours);
    }

    static fromWorkingHoursAssertion(fromWorkingHours){
        return Assertion.for(
            fromWorkingHours,
            Customer.fromWorkingHoursAID,
            () => fromWorkingHours<=Time.at(12,0,0),
            this.FROM_WORKING_HOURS_MUST_BE_BEFORE_NOON);
    }

    static workingHoursAssertion(fromWorkingHours,toWorkingHours) {
        return Assertion.forAll(
            [fromWorkingHours, toWorkingHours],
            Customer.workingHoursAID,
            () => fromWorkingHours<toWorkingHours,
            this.FROM_WORKING_HOURS_MUST_BE_BEFORE_TO_WORKING_HOURS);
    }

    static dniAssertion(dni) {
        return Assertion.for(
            dni,
            Customer.dniAID,
            () => this.assertIsValidDNI(dni),
            this.DNI_MUST_BE_POSITIVE_INTEGER);
    }

    static lastNameAssertion(lastName) {
        return Assertion.for(
            lastName,
            Customer.lastNameAID,
            () => !(lastName === ""),
            this.LAST_NAME_CAN_NOT_BE_EMPTY);
    }

    static firstNameAssertion(firstName) {
        return Assertion.for(
            firstName,
            Customer.firstNameAID,
            () => !(firstName === ""),
            this.FIRST_NAME_CAN_NOT_BE_EMPTY);
    }

    static assertIsValidDNI(dni){
        return Number.isInteger(dni) && dni > 0;
    }

    constructor(firstName,lastName,dni,fromWorkingHours,toWorkingHours) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dni = dni;
        this.fromWorkingHours = fromWorkingHours;
        this.toWorkingHours = toWorkingHours;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    getDNI(){
        return this.dni;
    }

    getFromWorkingHours(){
        return this.fromWorkingHours;
    }

    getToWorkingHours(){
        return this.toWorkingHours;
    }

    isIdentifiedAs(aDNI){
        return this.dni===aDNI;
    }

    syncWith(aCustomerToSyncWith){
        this.firstName = aCustomerToSyncWith.getFirstName();
        this.lastName = aCustomerToSyncWith.getLastName();
        this.dni = aCustomerToSyncWith.getDNI();
        this.fromWorkingHours = aCustomerToSyncWith.getFromWorkingHours();
        this.toWorkingHours = aCustomerToSyncWith.getToWorkingHours();
    }
}
