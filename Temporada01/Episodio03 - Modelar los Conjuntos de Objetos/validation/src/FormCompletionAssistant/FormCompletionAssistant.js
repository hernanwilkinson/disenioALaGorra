/**** FormCompletionAssistant model ****
 * Este código es provisto as-is. No ha sido probado en producción y
 * fue desarrollado con el propósito de ejemplificar lo mostrado en el webinar
 * de Diseño a la gorra.
 * Le cambie los nombres a los mostrados en el webinar para utilizar unos más
 * relacionados al dominio de negocio y tanto a la implementación. Para ello utilicé
 * la metáfora de un assistente que ayuda a completar un formulario
 */
export class FormCompletionAssistant {
    // Este objeto es usado como token de modelo inválido y de esta
    // manera poder correr todas las validaciones en objetos compuestos
    static INVALID_MODEL = new Object();

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

    addAssertionId(anAssertionId){
        this.assertionIds.push(anAssertionId);
    }
}


