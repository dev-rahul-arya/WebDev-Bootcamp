// Objects

let obj1 = {
    firstName: "John",
    isLoggedin: true,
    "job role": "SDE",
};

const obj2 = {
    firstName: "John",
    isLoggedin: true,
};

// Fun Fact: In both examples inner datatypes can be changed.

console.log(obj2);
console.log(typeof obj2);

obj2.firstName = "Mr. M"; //updating
obj2.lastName = "Doe"; //creating
console.log(obj2);
obj1["job role"] = "SWE"; //better way


let today = new Date();
console.log(today); //not so much understandeable
console.log(today.getDate()); //try all

// Array
// n-D array also available
// first elememts should be string

let anotherUser = ["Alice", true];
console.log(anotherUser);
