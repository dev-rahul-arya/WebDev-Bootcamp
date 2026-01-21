function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;

            if (success) {
                resolve("Data fetched successfully");
            } else {
                reject("Error fetching data")
            }
        }, 3000);
    })
}

// console.log(fetchData());

fetchData()
    .then((data) => console.log(data))         //then fetches from resolve  //multiple then can be added (ladder)
    .catch((error) => console.error(error));     //catch fetches from reject


// fetchData()
//     .then((data) => {
//         console.log(data);
//         return data.toLowerCase();
//     })
//     .catch((error) => console.error(error));


