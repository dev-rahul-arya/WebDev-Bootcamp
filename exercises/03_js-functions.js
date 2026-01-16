// Task 1:
// Write a function stringToNumber that takes a string input and tries to convert it to a number. If the conversion fails, return "Not a number".

function stringToNumber(input) {
    if (typeof Number(input) == 'number' && isNaN(Number(input)) === false) return Number(input);
    else return "Not a number";
}


// Task 2:
// Write a function flipBoolean that takes any input and converts it to its boolean equivalent, then flips it. For example, true becomes false, 0 becomes true, etc.

function flipBoolean(input) {
    return !Boolean(input);
}


// Task 3:
// Write a function whatAmI that takes an input and returns a string describing its type after conversion. If it's a number, return "I'm a number!", if it's a string, return "I'm a string!"

function whatAmI(input) {
    return (`I'm a ${typeof input}!`);
}


// Task 4:
// Write a function isItTruthy that takes an input and returns "It's truthy!" if the value is truthy in JavaScript, or "It's falsey!" if it's falsey.

function isItTruthy(input) {
    if (input) return ("It's truthy!");
    else return ("It's falsey!");
}

// Task 5:
// Write a function squareNumbers(arr) using arrow functions

const squareNumbers = (arr) => {
    let tempArray =[];
    for (let element of arr) {
        tempArray.push(element * element);
    }
    arr = [...tempArray];

    return arr;
}


// Task 6:
// Create a function filterEvenNumbers(arr) using arrow functions

const filterEvenNumbers = (arr) => {
    let tempArray = [];
    for (const element of arr) {
        if (element%2 == 0) {
            tempArray.push(element);
        }
    }
    arr = [...tempArray];

    return arr;
}


// Task 7:
// Write a function sumPositiveNumbers(arr) that takes an array of numbers and returns the sum of all positive numbers using arrow functions

const sumPositiveNumbers = (arr) => {
    let result = 0;
    for (const element of arr) {
        if (element >= 0) {
            result += element;
        }
    }

    return result;
}


// Task 8:
// Write a function getNames(arr) that takes an array of objects where each object has a name property, and returns an array of just the names using arrow functions

// arr = [{name:"john"},{}]
const getNames = (arr) => {
    let tempArray = [];
    for (const element of arr) {
        tempArray.push(element.name);
    }

    return tempArray;
}


// Task 9:
// Write a function findLongestWord(arr) that takes an array of strings and returns the longest word using arrow function

const findLongestWord = (arr) => {
    let index;
    let maxCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > maxCount) {
            maxCount = arr[i].length;
            index = i;
        }
    }

    return arr[index];
}


// Task 10:
// Create an object person with a method introduce() that uses this additionally add properties of name & age that will result in Hi, my name is Hitesh and I am 19.5 years old on calling introduce()
const person = {
    name: 'Hitesh',
    age: 19.5,

    introduce() {
        return `Hi, my name is ${this.name} and I am ${this.age} years old`;
    }
};


// Task 11:
// Write a function outer() that contains another function inner() and returns a value of 'Inner function called' on calling outer()
function outer() {
    function inner() {
        return "Inner function called";
    }
    
    return inner();
}