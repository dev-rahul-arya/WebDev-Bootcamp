// In JavaScript, a functional constructor is a function that acts as a blueprint for creating objects. Here's how it works:
// Definition: A functional constructor is essentially a regular function defined to initialize objects and set properties. These functions are "typically capitalized (e.g., Person)" to differentiate them from regular functions.
// Using the 'new' Keyword: When you create an object using a functional constructor, you typically use the new keyword. This keyword creates a new object, sets the context of 'this' inside the constructor to the new object, and returns the object unless explicitly returning another object.


function Person(name, age) {
    this.name = name;   //variable declaration
    this.age = age;
}

function Car(make, model) {
    this.make = make;
    this.model = model;
}


let myCar = new Car("Toyota", "Camry");  //'new' is necessary otherwise you will get 'undefined'.
console.log(myCar);

let myNewCar = new Car("Tata", "Safari");
console.log(myNewCar);

// Why Works? -> 'this' and 'new' have internal linking.

function Tea(type) {
    this.type = type;
    this.describe = function () {
        return `This is ${this.type} tea`;
    }
}

let lemonTea = new Tea("lemon");
console.log(lemonTea.describe());


// One more way (Prototypal Chain)
function Animal(species) {
    this.species = species;
}

Animal.prototype.sound = function () {
    return `${this.species} makes sound`;
}

let Dog = new Animal("Dog");
console.log(Dog.sound());

let Cat = new Animal("Cat");
console.log(Cat.sound());


// Error Handling
function Anything(anything) {
    if(!new.target) {
        throw new Error("This function must be called with new keyword");
    }
    this.anything = anything;
}

// let a = Anything("Hello");
// console.log(a); 
// now instead of 'throw err' you will see our custom error message

