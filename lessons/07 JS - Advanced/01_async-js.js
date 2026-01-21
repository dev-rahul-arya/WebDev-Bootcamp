console.log("This loads instantly");

setTimeout(() => {
    console.log("This takes 2s pause.");
    
}, 2000); //2000 = 2s

console.log("Hey anything strange noticed?"); //shouldn't it be executed at 2nd line?
//Because of async nature of JS the set Timeout will execute only after defined interval no matter where placed.

