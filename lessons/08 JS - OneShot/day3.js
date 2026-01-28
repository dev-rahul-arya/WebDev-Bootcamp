// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::: ARRAYS :::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

let myArr = [0, 1, 2, 3 , 4, 5];
myArr.unshift(9);  //adds 9 to first position and removes last element
console.log(myArr);
myArr.shift(); //shift all elements to left, first elemnts removes
console.log(myArr);
console.log(myArr.includes(4));
console.log(myArr.indexOf(3));

console.log(myArr.slice(1, 3));  //returns a section of array
console.log(myArr.splice(1, 3));  //returns a section of array (till the last elemnet included in range) and removes those elemenst from original array

// const newArr = myArr.concat(secondArr);
// const newArr = [...myArr, ...secondArr, ...nthArr];  //spread operator: alternate to concate
// const newArr = myArr.flat(Infinity); // concats all subarray to one

console.log(Array.isArray("John"));
console.log(Array.from("John"));  //converts to array

let score1 = 100;
let score2 = 200;
let score3 = 300;
console.log(Array.of(score1, score2, score3));


console.log();
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::: OBJECTS ::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


let mySum = Symbol("myKey1");

let User = {
    name: "John",
    "full name": "John Doe",
    [mySum]: "myKey1",  //refering to the symbol
    age: 19
}

console.log(User["full name"]);

Object.freeze(User);  //now no more changes will happen

// nested objects
const regularUser = {
    email: "regular@email.com",
    fullname: {
        userfullname: {
            firstname: "John",
            lastname: "Doe"
        }
    }
}


// const obj3 = {obj1, obj2};  //doesn't works (converts to strings)
// const obj3 = Object.assign({}, obj1, obj2);  //(source, target)
// const obj3 = {...obj1, ...obj2}  //easy, working, latest

console.log(Object.keys(User));
console.log(Object.values(User));
console.log(Object.entries(User));  //array of entries in an object


// Object Destructing 
const {age: myAge} = User; //const {entry: Alias} = Object
console.log(myAge); //it works

