/*

Loops Covered:-
    1. while
    2. do-while
    3. for
    4. for-of            //good for arrays
    5. for-in            //good for objects
    6. for-each          //something with functions

*/

// Q1. Write a 'while' loop that calculates the sum of all numbers from 1 to 5 and stores the result in a variable named 'sum'. 
let sum = 0;
let i = 1;

while (i <= 5) {
    sum = sum + i;
    i++;
}

console.log(sum);

// Q2. Write a 'while' loop that counts down from 5 to 1 and stores the numbers in an array named 'countdown'. 
sum = 0;
i = 5;
let countdown = [];

while (i > 0) {
    countdown[i - 1] = i;
    i--;
}

console.log(countdown);

// Q3. Write a 'do while' loop that prompts a user to enter their favorite tea type until they enter "stop". Store each tea type in an array named 'teaCollection'. 
i = 0;
let item = "chai";
let teaCollection = [];

/*

do {
    item = prompt("Enter tea name('stop' to stop): ");
    if (item != "stop") {                //added this condition because of do-while loop
        teaCollection[i] = item;
    }
        
    i++;
} while (item != "stop");

*/

// Node JS doesn't support 'prompt()' -> test it on a browser.


// Q4. Write a 'do-while' loop that adds numbers from 1 to 3 and stores the result in avariable named 'total'. 
let total = 0;
i = 0;

do {
    total = total + i + 1;
    i++;
} while (i < 3);

console.log(total);

// Q5. Write a 'for loop' that multiplies each element in the array '[2,4,6]' by 2 and stores the results in a new array named 'multipliedNumbers'. 
let Numbers = [2, 4, 6];
let multipliedNumbers = [];

for (let i = 0; i < Numbers.length; i++) {
    multipliedNumbers[i] = Numbers[i] * 2;
}

console.log(multipliedNumbers);

// Q6. Write a 'for' loop that lists all the cities in the array '["Paris", "New York", "Tokyo", "London"]' and stores each city in a new array named 'cityList'. 
let cities = ["Paris", "New York", "Tokyo", "London"];
let cityList = [];

for (let i = 0; i < cities.length; i++) {
    cityList[i] = cities[i];
}

console.log(cityList);

// Q7. Write a 'for' loop through the array '["green tea", "black tea", "chai", "oolong tea"]' and stops the loops when it finds "chai". Store all teas before "chai" in a new array named "selectedTeas". 
let tea = ["green tea", "black tea", "chai", "oolong tea"];
let selectedTeas = [];

for (let i = 0; i < tea.length; i++) {
    if (tea[i] === "chai") {
        break;
    } else {
        selectedTeas[i] = tea[i];
    }
}

console.log(selectedTeas);

// Q8. Write a 'for' loop through the array '["green tea", "black tea", "chai", "oolong tea"]' and ignores the loops when it finds "chai". Store all teas except "chai" in a new array named "selectedNewTeas". 
tea = ["green tea", "black tea", "chai", "oolong tea"];
let selectedNewTeas = [];

for (let i = 0; i < tea.length; i++) {
    if (tea[i] === "chai") {
        continue;
    } else {
        selectedNewTeas.push(tea[i]);
    }
}

console.log(selectedNewTeas);

// Q9. Use a 'for-of' loop to  iterate through the array "[1, 2, 3, 4, 5]" and stop when the number '4' is found. Store the numbers before '4' in an array named 'smallNumbers. 
let arr = [1, 2, 3, 4, 5];
let smallNumbers = [];

for (const num of arr) {
    if (num === 4) {
        break;
    }
    smallNumbers.push(num);
}

console.log(smallNumbers);

// Q10. Use a 'for-of' loop to  iterate through the array "[1, 2, 3, 4, 5]" and ignore when the number '4' is found. Store the numbers before '4' in an array named 'smallNumbers. 
arr = [1, 2, 3, 4, 5];
smallNumbers = [];

for (const num of arr) {
    if (num === 4) {
        continue;
    }
    smallNumbers.push(num);
}

console.log(smallNumbers);

// Q11. Use a 'for-in' loop to loop through an object containing city populations. Stop the loop when the popuplation of "Berlin" is found andd store all the previous cities population in a new object named 'cityPoplulations'. 
//     let citiesPopulation = {
//         "London": 8900000,
//         "New York": 8400000,
//         "Paris": 2200000,
//         "Berlin": 3500000
//     }

let citiesPopulation = {
    "London": 8900000,
    "New York": 8400000,
    "Paris": 2200000,
    "Berlin": 3500000
}
let cityPoplulations = {};

for (const key in citiesPopulation) {
    if (key === "Berlin") break;
    
    cityPoplulations[key] = citiesPopulation[key];
}

console.log(cityPoplulations);

// console.log(Object.keys(citiesPopulation));
// console.log(Object.values(citiesPopulation));


// Q12. Write a 'forEach' loop that iterates through the array ["earl grey", "green tea", "chai", "oolong tea"]. Stop the loop when "chai" is found, and store all previous tea types in an array named 'availableTeas'. 
arr = ["earl grey", "green tea", "chai", "oolong tea"];
let availableTeas = [];

// This is a DISPOSABLE FUNCTION -> will not consume memory throughout the code execution
// break & continue not allowed here 
arr.forEach(element => {
    if (element === "chai") return;

    availableTeas.push(element);
});

console.log(availableTeas);

// FUN FACT : Why return didn't stoped whole code block? -> because take a closer look you will see in reality that 4 functions (i.e., no. of elements in the array) are called, and only one out of 4 function terminated with that return statement. 


// Q13. Write a 'forEach' loop that iterates through the array ["earl grey", "green tea", "chai", "oolong tea"]. Ignore the loop when "chai" is found, and store all previous tea types in an array named 'availableTeas'. 
arr = ["earl grey", "green tea", "chai", "oolong tea"];
availableTeas = [];

arr.forEach(element => {
    if (element === "chai") return 1;
    
    availableTeas.push(element);
});

console.log(availableTeas);

// Q14. Write a 'for' loop that iterates through the array [2, 5, 7, 9]. Skip the value '7' and multiply the rest by 2. Store the results in a new array named 'doubledNumbers'. 
arr = [2, 5, 7, 9];
let doubledNumbers = [];

for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 7) doubledNumbers.push(arr[i]);
    else doubledNumbers.push(arr[i] * 2)
}

console.log(doubledNumbers);

// Q15. Use a 'for-of' loop to iterate through the array ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"] and stop when the length of the current tea name is greater than 10. Store the teas iterated over in an array named 'shortTeas'. 
let chaiType = ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"];
let shortTeas = [];

for (const chai of chaiType) {
    if (chai.length > 10) break;

    shortTeas.push(chai);
}

console.log(shortTeas);

