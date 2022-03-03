"use strict"

function outer() {
    function inner() {
        console.log(this);
    }
    console.log(this);
    inner();
}

outer()
outer.call("something")

class Ejemplo {
    constructor() {
        this.prefix = "Some prefix"
    }

    outer() {
        function inner() {
            console.log(this);
        }
        console.log(this);
        inner();
    }

    prefixNames(names) {
        return names.map(function (name) {
            return this.prefix + ': ' + name;
        })
    }

}

let ejemplo = new Ejemplo()
ejemplo.outer()
console.log(ejemplo.prefixNames(['a','b']))
//pasar una arrow function al map
