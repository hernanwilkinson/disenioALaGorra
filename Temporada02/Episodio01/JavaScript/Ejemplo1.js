"use strict"

function var_defined_before_closure() {
    temp1 = 1;
    const a_closure = () => { return temp1 + 2 }
    return a_closure()
}

console.log(var_defined_before_closure())
// En qué contexto está definida temp1?
// probar con let
// que pasa con strict mode
