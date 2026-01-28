// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::: MEMORIES  :::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Stack(Primitive) and Heap(Non-Primitive)

// Stack
let myName = "John Doe";
let anotherName = myName;

anotherName = "Alice";
console.log(myName);
console.log(anotherName); //original value not changed

// Heap
let userOne = {
    email : "user1@mail.com",
    upi: "hello@provider",
}

let userTwo = userOne;

userTwo["email"] = "user2@email.com";
console.log(userOne);
console.log(userTwo);


// Conclusion: Stack provides copy and Heap provides reference


console.log();
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::: STRINGS :::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


const newName = "John Doe";
// const newName = new String("John");
const repoCount = 50;

console.log(`Hello, I'm ${newName} and have ${repoCount} repos.`);

console.log(newName.length);
console.log(newName.toUpperCase());
console.log(newName.charAt(2));
console.log(newName.indexOf("n"));
console.log(newName.indexOf("N")); // -1 means does not exist
console.log(newName.substring(0, 2)); //string ka hissa karna
console.log(newName.slice(0, 2)); //similar to 'substring' but negative values allowed
console.log(newName.trim()); //removes white space "    hello    " -> "hello"
console.log(newName.replace(' ', '%20')); //used like when in browser URL space is replaced with %20
console.log(newName.includes("hn")); 
console.log(newName.split(" ")); // splitted on basis of " "




console.log();
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::: NUMBERS :::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


const myNum = 100000;
console.log(myNum.toString().length);
console.log(myNum.toFixed(2));  //decimal kei baad kitnei digits dikhnei chaiye
console.log(myNum.toPrecision(6));  //till how many digits to take precision, left to right irrespective of decimal
console.log(myNum.toLocaleString('en-IN'));   //commas added in Indian standrard


console.log();
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::: MATHS ::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


console.log(Math);  //check in browser console for methods
console.log(Math.abs(-44.54));
console.log(Math.round(56.7));  // you also have 'ceil' and 'floor'
// sqrt, pow, min, max, etc.
console.log(Math.random());  //values between 0 to 1
console.log(Math.random() * 10);  //values between 0 to 10
console.log((Math.random() * 10) + 1);  //values between 1 to 10


const min = 10;
const max = 20;
console.log(Math.floor(Math.random() * (max - min + 1) + min));



console.log();
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::: DATE ::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

let myDate = new Date();
console.log(myDate);
console.log(myDate.toString());
console.log(myDate.toDateString());
console.log(myDate.toISOString());
console.log(myDate.toJSON());
console.log(myDate.toLocaleString());
console.log(myDate.toLocaleDateString());
console.log(myDate.toLocaleTimeString());
console.log(myDate.toTimeString());
console.log(myDate.toUTCString());

let myCreatedDate = new Date(2023, 0, 23); //In JS '0 -> January'
let myCreatedDateTwo = new Date(2023, 0, 23, 15, 3, 32); //YYYY MM DD HH MM SS (24HR Clock)
let myCreatedDateThree = new Date('2023-01-23'); //Here '1 -> January'
console.log(`My Created Date: ${myCreatedDate.toDateString()}`);
console.log(`My Created Date: ${myCreatedDateTwo.toLocaleString()}`);
console.log(`My Created Date: ${myCreatedDateThree.toDateString()}`);

// we have methods like getDay(), getTime(), getMonth(), etc.


