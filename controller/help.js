const { match } = require('assert');
const fs = require('fs');
const Matchmaking = require('../model/matchmaking-model');

let newUserMatch1 = new Matchmaking('alex1999',[],[],[],[],[]);
let newUserMatch2 = new Matchmaking('joe1998',[],[],[],[],[]);
let newUserMatch3 = new Matchmaking('ida1999',[],[],[],[],[]);
let newUserMatch4 = new Matchmaking('pablo',[],[],[],[],[]);

let matchFileJSON = fs.readFileSync('../stroage/matchmaking.json');
let matchFile = JSON.parse(matchFileJSON);

/*

fs.writeFileSync('../stroage/matchmaking.json', JSON.stringify([]));


matchFileJSON = fs.readFileSync('../stroage/match.json');
matchFile = JSON.parse(matchFileJSON);

matchFile.push(newUserMatch1)
matchFile.push(newUserMatch2)
matchFile.push(newUserMatch3)
matchFile.push(newUserMatch4)

newUserMatch1.like(newUserMatch2.username, matchFile);
newUserMatch2.like(newUserMatch3.username, matchFile);
newUserMatch4.like(newUserMatch2.username, matchFile);
newUserMatch4.like(newUserMatch3.username, matchFile);
newUserMatch2.like(newUserMatch4.username, matchFile);


*/

/*


//To push
let k = 0;

let newUser = new User_Matchmaking(matchFile[k].username,matchFile[k].matches,matchFile[k].likes,matchFile[k].dislikes,matchFile[k].likedBy,matchFile[k].dislikedBy);
let counterUser = 'pablo'

//newUser.deleteUser(matchFile)


//newUser.like(counterUser, matchFile)


newUser.deleteUser(matchFile);

//console.log(newUser)
*/

console.log(matchFile);


//Writes
fs.writeFileSync('../stroage/matchmaking.json', JSON.stringify(matchFile));



