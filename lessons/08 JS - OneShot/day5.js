let array = ["html", "css", "js", "tailwindcss", "GSAP"];

// FOR LOOP
for (let i = 0; i < array.length; i++) {
    const element = array[i];
    console.log(element);
}

// break -> exits from current loop
// continue -> skips to next iteration

console.log();

// WHILE LOOP
let i = 0;
while (i < array.length) {
    console.log(array[i]);
    i++;
}

console.log();

// DO-WHILE LOOP
i = 0;
do {
    console.log(array[i]);
    i++;
} while (i < array.length);

console.log();

// FOR-OF LOOP
for (const element of array) {
    console.log(element);
}

console.log();

// FOR-IN LOOP
let object = {
    name: "John",
    age: "19",
    dob: "23-01-2006",
    mob: ""
}

for (const key in object) {
    if (!Object.hasOwn(object, key)) continue;  //

    const element = object[key];

    console.log(element);
}

// Objects -> FOR-OF returns keys as key
// Arrays -> FOR-IN returns index as keys


// FOR-EACH LOOP
array.forEach(element => {
    console.log(element);
});

console.log();

array.forEach((element, index, arr) => {
    console.log(element, index, arr);       //doesn't have abilities to return data
});





console.log();

// MAP()
// -> it's an object which holds key-value pairs.
const map = new Map();
map.set("IN", "India");  //key-value pairs
map.set("IN", "India");  //repetition not allowed
map.set("IN", "Bharat");  //updation
map.set("USA", "United States Of America");
map.set("JP", "Japan");

console.log(map);

//returns array
for (const element of map) {
    console.log(element);
}

//destructuring array
for (const [key, value] of map) {
    console.log(`Key: ${key}, Value: ${value}`);
}

console.log();

// FILTER()
const myNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const newNum = myNum.filter((num) => num > 4);
// const newNum = myNum.filter( (num) => {
//     return num > 4
// } );

console.log(newNum);

// METHOD CHAINING
const newNewNum = myNum.map((num) => num * 10).filter((num) => num > 15)
// const newNewNum = myNum
//     .map((num) => num * 10)
//     .filter((num) => num > 15)
console.log(newNewNum);

console.log();

// REDUCE()
const initialValue = 0;
let sumWithInitial = myNum.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
)
console.log(sumWithInitial);

console.log();

sumWithInitial = myNum.reduce((accumulator, currentValue) => {
    console.log(`acc: ${accumulator} and current: ${currentValue}`);
    return accumulator + currentValue
}, initialValue);
console.log(sumWithInitial);

// firstly, acumulator = initialValue, then it run till end of the array


