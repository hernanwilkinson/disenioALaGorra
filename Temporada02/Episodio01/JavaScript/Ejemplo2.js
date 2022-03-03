function var_defined_after_closure() {

    const a_closure = () => {
        return temp1 + 2
    }
    let temp1 = 1
    return a_closure()
}

console.log(var_defined_after_closure())
