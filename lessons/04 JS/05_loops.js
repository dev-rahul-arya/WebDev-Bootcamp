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
    countdown[i-1] = i;
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
let tea =  ["green tea", "black tea", "chai", "oolong tea"];
let selectedTeas = [];

for (let i = 0; i < tea.length; i++) {
    if (tea[i] === "chai") {
        break;
    } else {
        selectedTeas[i] = tea[i];
    }
}

console.log(selectedTeas);

// Q7. Write a 'for' loop through the array '["green tea", "black tea", "chai", "oolong tea"]' and ignores the loops when it finds "chai". Store all teas except "chai" in a new array named "selectedNewTeas". 
tea =  ["green tea", "black tea", "chai", "oolong tea"];
let selectedNewTeas = [];

for (let i = 0; i < tea.length; i++) {
    if (tea[i] === "chai") {
        continue;
    } else {
        selectedNewTeas.push(tea[i]);
    }
}

console.log(selectedNewTeas);

