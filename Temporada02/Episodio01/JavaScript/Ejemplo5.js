
var una_variable = 10

function devolver_una_variable(){
    return una_variable
}

function otro_devolver_una_variable(){
    var una_variable = 20
    return devolver_una_variable()
}

console.log(devolver_una_variable())
console.log(otro_devolver_una_variable())
