function same_var_assigned_in_closure() {

    let temp1 = 1
    const a_closure = () => {
        let temp1 = 10
        return temp1 + 2
    }

    return [a_closure(), temp1]
}

console.log(same_var_assigned_in_closure())
// Se puede definir temp1 como local al closure?
