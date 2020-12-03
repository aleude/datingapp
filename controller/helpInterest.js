const fs = require('fs');
const Interest = require('../model/interest-model');

//Create empty array in json
//fs.writeFileSync('../stroage/interest.json', JSON.stringify([]));


let fileJSON = fs.readFileSync('../stroage/interest.json');
let file = JSON.parse(fileJSON);

let text = 'Jeg kan godt lide at spise gulerødder og sove i ny og næ. Match med mig, please.';

/*
let newUser = new User_Interest('alex1999', text);

file.push(newUser);
*/
let i = 0;
let oldUser = new Interest(file[i].username, file[i].interestText);

let updatedUser = new User_Interest(file[i].username, text);

oldUser.deleteUser(file);

file.push(updatedUser);


console.log(file);



fs.writeFileSync('../stroage/interest.json', JSON.stringify(file));

