// Qué nombre le pondrían?
const _ = { title: 'iPad mini', price: 499, displaySize: 8.3 }























const ipads = [
    { title: 'iPad mini', price: 499, displaySize: 8.3 },
    { title: 'iPad', price: 329, displySize: 10.2 },
    { title: 'iPad air', prce: 599, displaySize: 10.9, color: 'blue' }];

ipads.forEach(ipad => console.log(ipad.title + " " + ipad.price + " " + ipad.displaySize + " " + ipad.color ))
// Qué problemas tiene?























class Product {
    name
    price
    displaySize
    color

    constructor(name,price,displaySize,color='black') {
        this.name = name
        this.price = price
        this.displaySize = displaySize
        this.color = color
    }

    toString(){
        return this.name + " " + this.price + " " + this.displaySize + " " + this.color
    }

}

const ipads2 = [
    new Product ('iPad mini', 499, 8.3),
    new Product ('iPad', 329, 10.2 ),
    new Product ('iPad air', 599, 10.9, 'blue')];

ipads2.forEach(product => console.log(product.toString()))
