// Printing 
console.log("Hello World");

// Works like CPP for printing 
process.stdout.write("Hello\n");
process.stdout.write("Hello\n");

console.table({city: "Jaipur"});
console.warn("Just colorifies in browser");

/*

::::: DATATYPES :::::

// Primitive
Strings
Number 
Boolean
Bigint -> used for scientific calculations

undefined -> literally not defined yet
null -> no value (empty) (not zero)

// Non-Primitive
Object

Symbol

*/

var score = 102; //old -> not used now
let newScore = 102; //new -> globally scoped
const username = "kaunrahul" // constant variable, immutable

let name = "Yooo"
let isLoggedin = false

// Objects
let arr = ["First", "Second", "Third"]
let user = {firstname: "John", lastname: "Doe"}


let num = 102;
let tempNum = new Number(102); //conversion of one data type to another

console.log(typeof num);
console.log(typeof tempNum);

// String Interpolation
let myString = 'Hello';
let oldWay = myString + " Name"; //not depreciated but less preferred
let newWay = `${myString} Name`;

// Symbols 
// ->It's a built-in object that guarantees a unique value. Used to add unique property key to an object so it won't collide with another object
// ->It always creates a new value every single time, no matter if the value is same also.
// ->FUN FACT : two unnamed symbols are also different
let sm1 = Symbol("John") //named symbol
let sm2 = Symbol() //unnamed symbol


// Ternary Operator 
function compare(a, b) {
    return (a > b) ? (a - b) : (b - a);      // (condition) ? 'if true' : 'if false' ;
}

// Intresting
console.log(Number(undefined)); //returns NaN
console.log(Number(NaN)); //returns 0

