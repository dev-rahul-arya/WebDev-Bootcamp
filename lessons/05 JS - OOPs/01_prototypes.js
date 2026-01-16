// JS provides OOPs but is a "Prototype Based Programming Language" under the hood.
// Here Prototype means extra properties and functionality in any given data type. 

// Dunder(two underscore) = __ 
// Example:- __proto__


// Method 1 (Now not used much) :

let computer = {cpu: 12};
let lenovo = {
    screen: "HD",
    __processor__: computer,
}
let tomHardware = {};

console.log(computer);
console.log(lenovo);
console.log(lenovo.__processor__); //'computer' being accessed by 'lenovo'
console.log(lenovo.__processor__.cpu); //'computer' being accessed by 'lenovo'
console.log();


// Method 2 (Now mostly used) :

let genericCar = {tyres: 4};

let tesla = {
    driver: "AI",
}

Object.setPrototypeOf(tesla, genericCar);

console.log(genericCar);
console.log(tesla);
console.log(tesla.tyres);
console.log(Object.getPrototypeOf(tesla));
console.log();

