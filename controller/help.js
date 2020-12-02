const { match } = require('assert');
const fs = require('fs');
const User_Matchmaking = require('../model/match-model');

let newUserMatch1 = new User_Matchmaking('alex1999',[],[],[],[]);
//let newUserMatch2 = new User_Matchmaking('joe1998',[],[],[],[]);
let newUserMatch3 = new User_Matchmaking('ida1999',[],[],[],[]);
let newUserMatch4 = new User_Matchmaking('pablo',[],[],[],[]);

let matchFileJSON = fs.readFileSync('../stroage/match.json');
let matchFile = JSON.parse(matchFileJSON);


/*
fs.writeFileSync('../stroage/match.json', JSON.stringify([]));

matchFileJSON = fs.readFileSync('../stroage/match.json');
matchFile = JSON.parse(matchFileJSON);

matchFile.push(newUserMatch1)
matchFile.push(newUserMatch2)
matchFile.push(newUserMatch3)
matchFile.push(newUserMatch4)

newUserMatch1.dislike(newUserMatch2.username, matchFile);
newUserMatch2.dislike(newUserMatch3.username, matchFile);
newUserMatch4.dislike(newUserMatch2.username, matchFile)
newUserMatch4.dislike(newUserMatch3.username, matchFile);
*/

//To push
let k = 1;
let newUser = new User_Matchmaking(matchFile[k].username,matchFile[k].likes,matchFile[k].dislikes,matchFile[k].likedBy,matchFile[k].dislikedBy);

console.log(newUser)

newUser.deleteUser(matchFile)

console.log(matchFile);


//Writes
fs.writeFileSync('../stroage/match.json', JSON.stringify(matchFile));



