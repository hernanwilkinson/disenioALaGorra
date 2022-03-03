//import('./Ejemplo0.js').then(module => { Provider = module.Provider; Address = module.Address });

class Address {

    constructor(streetName, streetNumber, town) {
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.town = town;
    }

    isAt(streetName) {
        return this.streetName === streetName
    }
}

class Provider {
    constructor(name,address) {
        this.name = name;
        this.address = address;
    }

    addDependant(dependant) {
        this._associated_dependants ||= []
        this._associated_dependants.push(dependant)
    }

    removeDependant(dependant) {
        this._associated_dependants ||= []
        this._associated_dependants = this._associated_dependants.
            filter(includedDependant => includedDependant != dependant)
    }

    includesDependant(dependant) {
        this._associated_dependants ||= []
        return this._associated_dependants.includes(dependant)
    }

    associatedDependants() {
        return new Array(...this._associated_dependants)
    }

    addAllDependants(dependants) {
        this._assocaited_dependents ||= []
        this._assocaited_dependents.push(...dependants)
    }

    isNamed(potentialName){
        return this.name===potentialName
    }

    isAt(streetName) {
        return this.address.isAt(streetName)
    }
}

const juan = new Provider("Juan Perez", new Address("San Martin",2233,"Florida"))
juan.addDependant("dep1")
console.log(juan.includesDependant("dep1"))
juan.addDependant("dep2")
console.log(juan.includesDependant("dep2"))
juan.addAllDependants(["dep3","dep4"])
console.log(juan.includesDependant("dep2"))
console.log(juan.includesDependant("dep3"))
// El error es el nombre de la variable assocaited_dependents, tiene 2 typos



