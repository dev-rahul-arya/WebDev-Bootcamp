// Not used much 

function* numberGenerator() {       //generator function
    yield 1;
    yield 2;
    yield 3;
}

let gen = numberGenerator();
console.log(gen.next().value);    //next() is iterator
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);    //undefined because out of bound


