// Q1.Declare an array named 'teaFlavours' that contains the strings "green tea", "black tea" and "oolong tea". Access the first element of the array and store it in a variable name 'firstTea'
let teaFlavours = ["green tea", "black tea", "oolong tea"];
const firstTea = teaFlavours[0];
console.log(firstTea);

// Q2. Declare an array named 'cities' containing "London", "Tokyo", "Paris" and "New York". Change the second element of array to "Canada".
let cities = ["London", "Tokyo", "Paris", "New York"];
cities[2] = "Canada";
console.log(cities);

// Q3. Declare an array named 'citiesVisited' containing "Mumbai", and "Sydney". Add "Berlin" to the array using the 'push' method. 
let citiesVisited = ["Mumbai", "Sydney"];
citiesVisited.push("Berlin");
console.log(citiesVisited);

// citiesVisited[citiesVisited.length] = "This is also a way";

// Q4. You have an array named 'teaOrders' with "chai", "iced chai", "matcha", and "earl grey". Remove the last element of the array using the 'pop' method and store it ina variable named 'lastOrder'.
let teaOrders = ["chai", "iced chai", "matcha", "earl grey"];
const lastOrder = teaOrders.pop();
console.log(teaOrders);

// Q6. You have an array named 'popularTeas' containing "green tea", "oolong tea", and "chai". Create a soft and hard copy of this array named 'softCopyTeas' and 'hardCopyTeas' respectively.
let popoularTeas = ["green tea", "oolong tea", "chai"];
let softCopyTeas = popoularTeas;
let hardCopyTeas = [...popoularTeas];
console.log(softCopyTeas); // changes in original array will also be reflected here
console.log(hardCopyTeas); // changes in original array will also be reflected here

// let hardCopyTeas = popoularTeas.slice();    ::::::: Another Way

// Q7. You have two arrays: 'europeanCities' containing "Paris" and "Rome", and 'asianCities' containing "Tokyo" and "Bangkok". Merge these two arrays into a new array named 'worldCities'. 
let europeanCities = ["Paris", "Rome"];
let asianCities = ["Tokyo", "Bangkok"];
// let worldCities = europeanCities + asianCities;  ::::::::: This will make it string
// let worldCities = [europeanCities] + [asianCities];  ::::::::: This will make it string
// let worldCities = [europeanCities, asianCities];  ::::::::: This will make it array in a array
let worldCities = europeanCities.concat(asianCities);
console.log(worldCities);

// Q8. You have an array named 'teaMenu' containing "masala chai", "oolong tea", "green tea", and "earl grey". Find the the length of the array and store it in a variable named 'menuLength'. 
let teaMenu = ["masala chai", "oolong tea", "green tea", "earl grey"];
let menuLength = teaMenu.length;
console.log(menuLength);

// Q9. You have an array named 'cityBuckeList' containing "Kyoto", "London", "Cape Town", and "Vancouver". Chcek if "London" is in a variable named 'isLondonInList'. 
let cityBuckeList = ["kyoto", "London", "Cape Town", "Vancouver"];
const isLondon = cityBuckeList.includes("London");
console.log(isLondon);

