// Basic Example
function greet(name) {                //parameter
    console.log(`Hello ${name}`);
}

greet("Rahul");                       //argument


// Q1. Write a function named 'makeTea' that takes one parameter, 'typeOfTea', and returns like "Making green tea" when called with "green tea". Store the result in a variable named 'teaOrder'. 
function makeTea(typeOfTea) {
    return `Making ${typeOfTea}`;
}

let teaOrder = makeTea("oolong tea");
console.log(teaOrder);


// Q2. Create a function named 'orderTea' that takes one parameter, 'teaType'. Inside this function, create another function named 'confirmedOrder' that returns  a message like "Order confirmed for chai". Call 'confirmOrder' from within 'orderTea' abd return the result.
function orderTea(teaType) {
    function confirmedOrder() {
        return "Order Confirmed for chai";
    }

    return confirmedOrder();
}

console.log(orderTea("green"));


// Q3. Write an arrow function named 'calculateTotal' that takes two parameters: 'price' and 'quantity'. The function should return the total cost by multiplying the 'price' and 'quantity'. Store the result in a variable named 'totalCost'. 
const calculateTotal = (price, quantity) => {
    return (price * quantity);
}

let totalCost = calculateTotal(200, 5);
console.log(totalCost);

/*

//Unnamed arrow function
() => {

}

*/

// Arrow functions doesn't have much abilities, for example you can't access DOM objects via arrow functions. 


// Q4. Write a function named 'processTeaOrder' that takes another function, 'makeTea', as a parameter and calls it with the argument "earl grey". Return the result of calling 'makeTea'. 
function makeTea(teaType) {
    return teaType;
}

function processTeaOrder(param) {
    return param("earl grey");
}

console.log(processTeaOrder(makeTea));

// FUN FACT : It's "Higher Order Function" / "First-Class Function" -> a function can be passed as an argument to other functions, can be another function and can be assigned as value to a variable.


// Q5. Write a functioned named 'createTeaMaker' that returns another function. The returned function should take one parameter, 'teaType', and return a message link "Making green tea". Store the returned function in a varibale named 'teaMaker' and call it with "greenTea". 
function createTeaMaker() {
    return function (teaType) {
        return `Making ${teaType}`;
    }
}

let teaMaker = createTeaMaker();
console.log(teaMaker("green tea"));

// FUN FACT : All the inner functions have context about the variables and parameter from their parent function(s). 
// The specific name for this concept in JavaScript is "closure". A closure is formed when an inner function retains access to its outer function's variables even after the outer function has completed execution.

