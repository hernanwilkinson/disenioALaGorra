function conditionally_defined_var(should_define_var) {

    if (should_define_var) {
        var temp1 = 1
    }

    const a_closure = () => {
        return temp1 + 2
    }
    return a_closure()
}

console.log(conditionally_defined_var(false))
// Cómo podemos hacer para que temp1 sea accecible desde el closure?
// Hoisting
