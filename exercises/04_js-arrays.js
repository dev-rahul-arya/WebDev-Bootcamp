// Task 1: Array Filtering
// Write a function filterNumbers(arr) that returns only numbers from a mixed array

function filterNumbers(arr) {
    let tempArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') tempArray.push(arr[i]);
    }

    arr = tempArray;
    return arr;
}


// Task 2: Array Reversal
// Write a function reverseArray(arr) that reverses the array

function reverseArray(arr) {
    let tempArray = [];
    for (let i = 0; i < arr.length; i++) tempArray[arr.length - i - 1] = arr[i];
    arr = tempArray;
    return arr;
}


// Task 3: Find Maximum in an Array
// Write a function findMax(arr) that returns the largest number in the array

function findMax(arr) {
    let a = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > a) a = arr[i];
    }

    return a;
}


// Task 4: Remove Duplicates from an Array
// Write a function removeDuplicates(arr) that returns a new array with all duplicates removed

function removeDuplicates(arr) {
    let tempArray = [];
    let isDuplicate;

    for (let i = 0; i < arr.length; i++) {
        isDuplicate = false;
        for (let j = 0; j < tempArray.length; j++) {
            if (arr[i] === tempArray[j]) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            tempArray.push(arr[i]);
        }
    }

    arr = tempArray;
    return arr;
}


// Task 5: Flatten a Nested Array
// Write a function flattenArray(arr) that takes a nested array and returns a single flattened array

function flattenArray(arr) {
    return arr.flat(Infinity); 
}





// By Functions:-
function filterNumbers(arr) {
    return arr.filter(item => typeof item === 'number');
}

function reverseArray(arr) {
    return arr.reverse();
}

function findMax(arr) {
    return Math.max(...arr);
}

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

function flattenArray(arr) {
    return arr.flat(Infinity); // Using Infinity to flatten all levels of nesting
}

