const fs = require('fs');
const FreeUser = require('../model/user-model');

//Create empty array in json
//fs.writeFileSync('../stroage/user.json', JSON.stringify([]));

let fileJSON = fs.readFileSync('../stroage/user.json');
let file = JSON.parse(fileJSON);


/*
//Creates new User
let newUser = new FreeUser('alex1999', '1234', 'Alexander', 'Udengaard', '1999-03-04', 'Male');
file.push(newUser);

*/
let i = 0;
let oldUser = new FreeUser(file[i].username,file[i].password,file[i].firstName,file[i].lastName,file[i].birthday,file[i].gender); 

console.log(oldUser);

console.log(oldUser.fullName())
console.log(oldUser.getAge())

//console.log(file);

//fs.writeFileSync('../stroage/user.json', JSON.stringify(file));

