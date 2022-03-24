
class Animal {
    static hola(){
        return 'Hola! Soy un ' + this.tipoDeAnimal()
    }

    static tipoDeAnimal(){
        throw new Error('Implementar en subclasse')
    }
}

class Perro extends Animal {
    static tipoDeAnimal() {
        return 'Perro'
    }
}

class Gato extends Animal {
    static tipoDeAnimal() {
        return 'Gato'
    }
}

class Veterinaria {
    holaDesde(unTipoDeAnimal) {
        return unTipoDeAnimal.hola()
    }
}


console.log(Perro.tipoDeAnimal())
console.log(Gato.tipoDeAnimal())

const unaVeterinaria = new Veterinaria()
console.log(unaVeterinaria.holaDesde(Perro))
console.log(unaVeterinaria.holaDesde(Gato))

// IMPLEMENTAR hola en Perro
