function calculateCartPrice(...items) {  //rest operator: can pass as as many values
    return items;
}

console.log(calculateCartPrice(100, 323, 7585, 328382));


// Closure
function one() {
    const username = "john"

    function two() {
        const website = "youtube"
        console.log(username);  //can access outer variables
    }

    // console.log(website);  //can't access inner variables

    two();
}

one();


// Expressions
const addTwo = function (num) {
    return num + 2;
}

console.log(addTwo(5));  //Problem : "HOISTING";
// -> in this way of defining functions, if i place the function call above the function definition then it will throw an error.


// 'this' keyword
const user = {
    username: "John",
    price: 999,

    welcomeMessage: function () {
        console.log(`${this.username}, Welcome to the website.`);
        console.log(this);  //return the context (in object)
    }
}

user.welcomeMessage();
// 'this' keyword doesn't works in arrow functions


// Arrow Functions
const chai = () => {
    let username = "hello"

    console.log(this.username);
}

chai();

// Arrow Functions: Implicit Return
const addTwoNum = (num1, num2) => (num1 + num2);  //since we used "()" so return not required
const returnObject = () => ({ username: 'John', age: "67" });
console.log(returnObject());


// Immediately Invoked Function Expressions (IIFE)
(function connection() {
    console.log("DB Connected");
})();

//      (function connection(num1, num2) {
//          console.log("DB Connected");
//      })(num1, num2);


// If else
if (true) {
    
} else if (true) {
    
} else {
    
}

//variables defined in above curly braces have scope within those curly braces only (doesn't apply if 'var' is used).

if (1) console.log("process 1"), console.log("process 2"); //bad way


// Switch-Case
let key = 0;
switch (key) {
    case 1:
        // code
        break;             //will stop uneccesary excution of below code(except default) if case matches
    case 2:
        // code
        break;
    case 3:
        // code
        break;
    case 4:
        // code
        break;
    default:             //will execute if none of the case matches(break not required)
        //code
}


// Falsy Values: false, 0, -0, bigInt 0n, "", null, undefined, NaN
// Truthy Values: Rest all are truthy values even [], "0", "false", " ", {}, function(){}

// Fun Fact:-
//     1. false == 0
//     2. false == ''
//     3. 0 == ''
// -> all these return true


// Nullish Coalescing Operator (??): null undefined
let val1;
val1 = 5 ?? 10 ?? 15;  //if first response good then take it else take second one
val1 = null ?? 10;  //value => 10
val1 = undefined ?? 10;  //value => 10
// more clear when you relate with database


// Ternary Operator
(5 > 10) ? console.log("If true") : console.log("If false");

