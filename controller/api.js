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
const { nextTick } = require('process');

//- Setting up server:
const app = express();
const PORT = process.env.PORT || 3800;
const privateKeyJWT = 'This is a private key';
let userId = ''; //To identify the user if verification went well

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
function Verification(req, res, next) {
    if (typeof req.headers.authorization !== undefined) {
        let token = req.headers.authorization;

        //Verify token
        jwt.verify(token, privateKeyJWT, {algorithm: 'HS256'}, (err, decoded) => {

            //If error occured
            if (err) {
                res.send(null);
            } else {
                userId = decoded.userId;

                //Checks if user is stored in file
                let userFile = JSON.parse(fs.readFileSync('../storage/user.json'));
                let userIndexInFile = IndexOfUser(userId, userFile);

                if (userIndexInFile >= 0) {
 
                    return next();  
                } else {
                    userId = '';
                    return next();
                };
            };
        });

    } else {
        //If token wasn't found
        res.send(null);
    };
};

//- API endpoints:

//--- Login & New User related:

//Sub-endpoint to validate if user was found in verificaton
app.get('/checkuser', Verification, (req, res) => {

    if (userId === '') {
        res.send(null);
    } else {
        //Just sending something else than null
        res.send(JSON.stringify({status: 'OK'}));
    };
});

app.post('/login', (req, res) => {

    let foundUser = false;
    let userFile = JSON.parse(fs.readFileSync('../storage/user.json'));

    //Checks if user exists in file;
    let i = IndexOfUser(req.body.username, userFile);

    //Validates if user was found in file or not
    if (i >= 0) {
        foundUser = true;
    };

    //Code if a user was found
    if (foundUser) {

        //Validates password of user
        if (req.body.password === userFile[i].password) {

            //Signs a JWT with username (ID of user) as payload
            let token = jwt.sign({userId: req.body.username}, privateKeyJWT, {algorithm: 'HS256'});
            res.send(JSON.stringify(token));

        } else {
            res.send(null);
        };
    } else {
        res.send(null);
    };

});

app.post('/signup', (req, res) => {

    let foundUser = false;
    let userFile = JSON.parse(fs.readFileSync('../storage/user.json'));
    
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
        let matchmakingFile = JSON.parse(fs.readFileSync('../storage/matchmaking.json'));
        let interestFile = JSON.parse(fs.readFileSync('../storage/interest.json'));

        //Pushes my new users into arrays from file
        userFile.push(newUser);
        matchmakingFile.push(newMatchmaking);
        interestFile.push(newInterest);

        //Updates/Overwrites my files
        fs.writeFileSync('../storage/user.json', JSON.stringify(userFile));
        fs.writeFileSync('../storage/matchmaking.json', JSON.stringify(matchmakingFile));
        fs.writeFileSync('../storage/interest.json', JSON.stringify(interestFile));

        //Signs a JWT with username (ID of user) as payload
        let token = jwt.sign({userId: req.body.username}, privateKeyJWT, {algorithm: 'HS256'});

        res.send(JSON.stringify(token));

    } else {
        //If a user was found, returns null to client
        res.send(null);
    };

});

app.post('/interests/post', Verification, (req, res) => {

    //If something went wrong and no user was found in verification

    if(userId === '') {
        res.send(null)

    } else {

        //Gets file with interests
        let interestFile = JSON.parse(fs.readFileSync('../storage/interest.json'));

        //Finds index of user in array from file
        let i = IndexOfUser(userId, interestFile);

        //Signs the user text with key
        interestFile[i].interestText = req.body.interests;

        //Updates the file
        fs.writeFileSync('../storage/interest.json', JSON.stringify(interestFile));

        //Just responding with something else than null
        res.send(JSON.stringify({status: 'OK'}));
    };

});





//- Opening server:
app.listen(PORT, console.log(`Server has started on ${PORT}`));



//HUSK NU AT FJERNE MATCH ARRAY FRA MATCHMAKING-FILE.