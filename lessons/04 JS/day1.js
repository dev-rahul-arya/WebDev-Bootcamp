// Run File >>node script.js
// Reosurces : MDN, EscemaScript Documentation

console.log("Hello, World!");
console.log("This is Day 1 of the coding challenge.");

const accountId = 111 // immutable
let accountEmail = "johndoes@gmail.com"
var accountPsswd = "12345678" // ***we don't use now*** :::::  ssue in block and functional SCOPE
var accountTemp; // Value is : undefined
accountCity = "Delhi" // Not good way

// accountId = 45  :::::::::: not possible

// console.log(accountId);    :::::::::: normal
// console.table([accountId, accountEmail, accountPsswd, accountCity, accontTemp])  ::::::::::::  table view (like sql)

// alert("Hello") :::: used in browser not in node

/*
:::::::::::::::::DATATYPES::::::::::::::::::::::::

let name = "Rahul"  :::::: String
let age = 19 :::::: int
let isLogin = false  :::::: boolean

console.log(typeof name);  ::::: returns string

:::::: Number, BigInt, String, Boolean, Null, Undefined, Symbol :::::
:::::: Object, 
*/


/*
::::::::::::::::::DATATYPE CONVERSION::::::::::::::::::::::

let num = "100aa";

console.log(num);
console.log(typeof num);

let numTemp = Number(num);     :::: changes string -> number
let tempNum = new Number(102);     :::: changes to objects
console.log(typeof numTemp);
console.log(numTemp);          :::: return NaN


FUN FACT: NaN itself is a Number :)
*/


/*
::::::::::::::OPERATIONS:::::::::::::::
let value = 2;
let negValue = -value;

console.log(2+2) // +,-,*,/,**,%

let str3 = str1 + str2; //String Concatination

console.log("1" + 2);        //"12"
console.log(1 + "2");        //"12"
console.log("1" + 2 + 2);    //"122"
console.log(1 + 2 + "2");    //"32"

value++;  //Increment Operator (POST & PRE also available)
console.log(value);

Comparision : >, <, >=, <=, ==, !=, ===
FUN FACT: 
1. Comparison operators convert 'null' to a number , i.e. 0
2. Same case with 'undefined', but on every comparision it returns false

Conditional : &&, ||, !
Short-hand notations : +=, *=, etc.

*/

