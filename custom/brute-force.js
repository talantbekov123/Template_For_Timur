var ExpressBrute = require('express-brute');
 
store = new ExpressBrute.MemoryStore(); // stores state locally, fix it later 

var bruteforce = new ExpressBrute(store, {
    freeRetries: 15,
    lifetime: 60, //1 min
    minWait: 5*60*60*1000, // 5 minutes 
    maxWait: 24*60*60*1000 // 1 day, 
});

module.exports = bruteforce;