function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({name: "rahularya", url: "https://dev-rahul-arya.github.io/"})
        }, 3000);
    })
}

async function getUserData() {
    try {
        console.log("Fetching...");
        const userData = await fetchUserData();                //await can only be used when async is used
        console.log("User Data: ", userData);
        console.log("User data fetched successfuly.");
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
}

getUserData();