const person = {
    name: "john",

    greet() {
        console.log(`Hey, I'm ${this.name}`);
    },
};

//works fine
person.greet();


//context lost as soon as memory location changed
const greetFunction = person.greet;
greetFunction();

//binding; giving context
const boundGreet = person.greet.bind({name: "john doe"});   //bind, call, apply
boundGreet();

