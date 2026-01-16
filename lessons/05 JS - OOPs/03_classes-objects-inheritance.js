// Encapsulation: You just box them around so that they stay together and nobody outside knows what happens here.
// Inheritance: Whatever you get from other guys.
// Polymorphism: The ability of something to have or to be displayed in more thanone form.
// Abstraction: 


// 'Classes' are like 'Structures' in 'C Language', yes you can define variabls inside it but generally we use then to define functions inside them.
// FUN FACT: All the functions, when they are declared inside the class, we quickly snap and change the terminology and start calling them 'methods'.

class Vehicle {                                //CLASS
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    start() {
        return `${this.model} is a car from ${this.make}`;
    }
}

class Car extends Vehicle {                //INHERITANCE
    drive() {
        return `${this.make}: This was was inherited!!!`;
    }
}

let myCar = new Car("Toyota", "Corolla");
console.log(myCar);
console.log(myCar.start());
console.log(myCar.drive());
console.log();


class BankAccount {
    #balance = 0;                       //ENCAPSULATED
    //in real world balance could be retrieved from database.

    deposit(amount) {
        this.#balance = this.#balance + amount;        //can be accesssed within the class only
        return this.#balance;
    }

    getBalance() {
        return `$ ${this.#balance}`;           //salting can be done here
    }
}

let accountOne = new BankAccount;
console.log(accountOne);
console.log(accountOne.getBalance());
console.log(accountOne.deposit(900));
console.log(accountOne.getBalance());
console.log();



class Bird {
    fly() {
        return "Flying...";
    }
}

class Penguin extends Bird {
    fly() {
        return "Heyyy, Penguins can't fly!";     //POLYMORPHISM
    }
}

let bird = new Bird();
let penguin = new Penguin();
console.log(bird.fly());
console.log(penguin.fly());
console.log();

// see the methods are same but results are same for different specific cases.


class Calculator {
    static add(a, b) {      //STATIC -> this method can be called only by this class
        return a + b;
    }
}

let miniCalc = new Calculator();     //will throw error that this function is not defined.
// console.log(miniCalc.add(2, 3));
console.log(Calculator.add(2, 3));   //this works
console.log();


class Employee {
    #salary;

    constructor(name, salary) {
        if (salary < 0) {
            throw new Error("Salary can't be negative.");
        }
        this.name = name;
        this.#salary = salary;
    }

    get salary() {                //GETTERS
        return this.#salary;
    }

    set salary(value) {           //GETTERS
        if (value < 0) {
            console.error("Invalid Salary");
        } else {
            this.#salary = value;
        }
    }
}

let emp = new Employee("Alice", 50000);
console.log(emp.salary); // Outputs: 50000

emp.salary = 60000; // Updating salary using setter
console.log(emp.salary); // Outputs: 60000

emp.salary = -1000; // Logs: "Invalid Salary"
console.log(emp.salary); // Outputs: 60000 (remains unchanged)

// getters and setters both need to be set together to work. 

