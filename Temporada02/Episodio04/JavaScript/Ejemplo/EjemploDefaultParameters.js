
function someFunction(unArray=[]) {
    return unArray
}

const unArray = someFunction()
console.log(unArray)

unArray.push(10)
console.log(someFunction())
