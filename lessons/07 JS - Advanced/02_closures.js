// Closure -> inner function will have context of defined elements in outer function. 

function outer() {
    let counter = 0;

    return function () {
        counter++;

        return counter;
    }
}

let increment = outer();
console.log(increment());
console.log(increment());
console.log(increment());
console.log(increment());

// You can see it's still in memory. 
