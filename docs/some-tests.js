/* This is an object */

const objectPerson = {
    name: 'Tom',
    age: '30'  
}

console.log(objectPerson);

/* This is an arrow function, which replaces "function" from ES6 */
  
const arrowPerson = (name) => {
    return console.log("Der Name lautet " + name);
}

arrowPerson("Max");

/* This is a spread operator */

const numbers = [1,2,3];
const newNumbers = [...numbers, 4];
console.log(newNumbers);

/* Filter in ES7 */

const filter = (...args) => {
    return args.filter(el => el === 1); // Only an element which contains 1 is outputted
}

console.log(filter(1,2,3)); // Only "1"

/* Array map() Method */

const mapNumbers = [1,2,3];

const mapDoubleNumArray = mapNumbers.map((num) => { // Map returns in a new array, which can be used afterwards
    return num * 2;
});

console.log(mapNumbers);
console.log(mapDoubleNumArray);

// Async: https://academind.com/tutorials/callbacks-vs-promises-vs-rxjs-vs-async-awaits