//- Require node-modules:
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');  
const cors = require('cors');

//- Require classes from model:
const FreeUser = require('../model/user-model');
const Matchmaking = require('../model/matchmaking-model');
const Interest = require('../model/interest-model');

//- Setting up server:
const app = express();
const PORT = process.env.PORT || 3800;
const privateKeyJWT = 'This is a private key';

//- Use moduls for server:
app.use(bodyParser.json());
app.use(cors()); 

//- Functions used in API:

//This function is used to find specific user in file (through username)
function IndexOfUser(username, file) {
    let index = 0;
    foundUser = false;

    //Find username in file
    for (let i=0; i<file.length; i++) {
        if (username === file[i].username) {
            foundUser = true;
            index = i;
            break;
        };
    };

    //Validate if user was found or not
    if (foundUser) {
        return index;
    } else {
        //-1 will never occur in an array and therefore means a user don't exists
        return -1;
    };
};

//Verify if token is okay.
function Verification() {

};

//- API endpoints:
app.post('/signup', (req, res) => {

    let foundUser = false;
    let userFile = JSON.parse(fs.readFileSync('../stroage/user.json'));
    
    //Checks if user exists in file;
    let i = IndexOfUser(req.body.username, userFile);

    //Validates if a user was found or not in file
    if (i>=0) {
        foundUser = true;
    };

    //Code for if a user was found
    if (!foundUser) {
        //Create new user as object from classes
        let newUser = new FreeUser(req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.birthday, req.body.gender);
        let newMatchmaking = new Matchmaking(req.body.username, [], [], [], [], []);
        let newInterest = new Interest(req.body.username, '');

        //Gets the rest of the files
        let matchmakingFile = JSON.parse(fs.readFileSync('../stroage/matchmaking.json'));
        let interestFile = JSON.parse(fs.readFileSync('../stroage/interest.json'));

        //Pushes my new users into arrays from file
        userFile.push(newUser);
        matchmakingFile.push(newMatchmaking);
        interestFile.push(newInterest);

        //Updates/Overwrites my files
        fs.writeFileSync('../stroage/user.json', JSON.stringify(userFile));
        fs.writeFileSync('../stroage/matchmaking.json', JSON.stringify(matchmakingFile));
        fs.writeFileSync('../stroage/interest.json', JSON.stringify(interestFile));

        //Signs a JWT with username (ID of user) as payload
        let token = jwt.sign({userId: req.body.username}, privateKeyJWT, {algorithm: 'HS256'});
        res.send(JSON.stringify(token));

    } else {
        //If a user was found, returns null to client
        res.send(null);
    };

});



//- Opening server:
app.listen(PORT, console.log(`Server has started on ${PORT}`));



//HUSK NU AT FJERNE MATCH ARRAY FRA MATCHMAKING-FILE.