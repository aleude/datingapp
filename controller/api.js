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
            res.send(JSON.stringify({status: 'OK'}));
        };
    } else {
        res.send(JSON.stringify({status: 'OK'}));
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
        res.send(JSON.stringify({status: 'OK'}));
    };

});

//Matchmaking


app.get('/match/getmatch', Verification, (req, res) => {

    //Validates if user exists
    if (userId === '') {
        res.send(null);
    } else {

        //Get files for matchmaking, users and interest-information
        let matchmakingFile = JSON.parse(fs.readFileSync('../storage/matchmaking.json'));
        let userFile = JSON.parse(fs.readFileSync('../storage/user.json'));
        let interestFile = JSON.parse(fs.readFileSync('../storage/interest.json'));

        //Finds index of user in array from file
        let i = IndexOfUser(userId, matchmakingFile);

        //Creates new object for this user from matchmaking-class
        let newMatchmaking = new Matchmaking(userId, matchmakingFile[i].matches, matchmakingFile[i].likes, matchmakingFile[i].dislikes, matchmakingFile[i].likedBy, matchmakingFile[i].dislikedBy);


        //Find potential match
        let potentialMatch = newMatchmaking.findMatch(matchmakingFile);

        if (potentialMatch === null) {
            res.send(JSON.stringify({status: 'NOMATCHES'}));
        } else {
            //Gets index of potential match from files
            let j = IndexOfUser(potentialMatch, userFile);
            let k = IndexOfUser(potentialMatch, interestFile);

            //Creates new object for potential match user from user-class
            //Password is unneeded
            let newMatchUser = new FreeUser(userFile[j].username, '', userFile[j].firstName, userFile[j].lastName, userFile[j].birthday, userFile[j].gender);

            //Gets age and fullname from potential match
            let ageOfMatch = newMatchUser.getAge();
            let fullNameOfMatch = newMatchUser.fullName(); 

            //Data from potential match
            let potentialMatchData = {
                username: userFile[j].username,
                fullname: fullNameOfMatch,
                age: ageOfMatch,
                gender: userFile[j].gender,
                interests: interestFile[k].interestText
            };
            res.send(JSON.stringify(potentialMatchData));
        };
    };
});

app.post('/match/like', Verification, (req, res) => {

    console.log(userId)
    //Validates if user exists
    if (userId === '') {
        res.send(null);
    } else {

        //Get files for matchmaking, users and interest-information
        let matchmakingFile = JSON.parse(fs.readFileSync('../storage/matchmaking.json'));

        //Finds index of user in array from file
        let i = IndexOfUser(userId, matchmakingFile);

        //Creates new object for this user from matchmaking-class
        let newMatchmaking = new Matchmaking(userId, matchmakingFile[i].matches, matchmakingFile[i].likes, matchmakingFile[i].dislikes, matchmakingFile[i].likedBy, matchmakingFile[i].dislikedBy);

        let likeName = req.body.matchname;

        newMatchmaking.like(likeName, matchmakingFile);
        
        let ifMatch = newMatchmaking.checkForMatch(likeName, matchmakingFile);

        if(ifMatch === 1) {
            let data = {
                match: 'Du har matched!'
            };

            fs.writeFileSync('../storage/matchmaking.json', JSON.stringify(matchmakingFile));

            res.send(JSON.stringify(data));
        } else {
            fs.writeFileSync('../storage/matchmaking.json', JSON.stringify(matchmakingFile));
            res.send(JSON.stringify({status: 'OK'}));
        };
    };
});

app.post('/match/dislike', Verification, (req, res) => {

    //Validates if user exists
    if (userId === '') {
        res.send(null);
    } else {

        //Get files for matchmaking
        let matchmakingFile = JSON.parse(fs.readFileSync('../storage/matchmaking.json'));

        //Finds index of user in array from file
        let i = IndexOfUser(userId, matchmakingFile);

        //Creates new object for this user from matchmaking-class
        let newMatchmaking = new Matchmaking(userId, matchmakingFile[i].matches, matchmakingFile[i].likes, matchmakingFile[i].dislikes, matchmakingFile[i].likedBy, matchmakingFile[i].dislikedBy);

        let dislikeName = req.body.matchname;

        newMatchmaking.dislike(dislikeName, matchmakingFile);
        
        fs.writeFileSync('../storage/matchmaking.json', JSON.stringify(matchmakingFile));

        res.send(JSON.stringify({status: 'OK'}));

    };
});

app.get('/match/matchlist', Verification, (req, res) => {

    //Validates if user exists or not
    if (userId === '') {
        res.send(null);
    } else {

        //Get files for matchmaking and user information
        let matchmakingFile = JSON.parse(fs.readFileSync('../storage/matchmaking.json'));
        let userFile = JSON.parse(fs.readFileSync('../storage/user.json'));

        //Finds index of user in array from file
        let i = IndexOfUser(userId, matchmakingFile);

        //Creates new object for this user from matchmaking-class
        let listOfMatches = matchmakingFile[i].matches;

        //Checks if there is any matches at all
        if (listOfMatches.length >= 1) {

            //Array to be filled with matches and their information
            let arr = [];

            for (let i=0; i<listOfMatches.length; i++) {

                let matchId = listOfMatches[i];

                let matchIndex = IndexOfUser(matchId, userFile);
                
                //Creates new object from matchname. Password aren't needed
                let matchUser = new FreeUser(matchId, '', userFile[matchIndex].firstName, userFile[matchIndex].lastName, userFile[matchIndex].birthday, userFile[matchIndex].gender);

                //Pushes new sub-array with matchUser informaton
                arr.push([matchUser.username, matchUser.fullName(), matchUser.getAge()]);

            };

            //Sends back array with match user information to client.
            res.send(JSON.stringify(arr));
        } else {
            res.send(null);
        }
    };
});

app.delete('/match/delete', Verification, (req, res) => {

    //If something went wrong and no user was found in verification
    if(userId === '') {
        res.send(null)

    } else {

        //Get file of matchmaking
        let mFile = JSON.parse(fs.readFileSync('../storage/matchmaking.json'));

        //Boolean to check if match id is correct
        let matchNameOK = false;
    
        //Finds index of user in array from file
        let i = IndexOfUser(userId, mFile);

        //Create new object from file
        let thisUser = new Matchmaking(userId, mFile[i].matches, mFile[i].likes, mFile[i].dislikes, mFile[i].likedBy, mFile[i].dislikedBy);

        //Get name of match to be removed
        let matchId = req.body.matchname;

        //Check if match name is reliable
        for (let j=0; j<mFile[i].matches.length; i++) {

            if (matchId === mFile[i].matches[j]) {
                matchNameOK = true;
                break;
            };
        };

        if (matchNameOK) {

            //Delete match
            thisUser.deleteMatch(matchId, mFile);

            fs.writeFileSync('../storage/matchmaking.json', JSON.stringify(mFile));

            res.send(JSON.stringify({data: 'OK'}));

        } else {

            res.send(null);
        };

    };

});

app.get('/user/info', Verification, (req, res) => {

    //If something went wrong and no user was found in verification
    if(userId === '') {
        res.send(null)

    } else {

        //Get file of user
        let uFile = JSON.parse(fs.readFileSync('../storage/user.json'));
    
        //Finds index of user in array from file
        let i = IndexOfUser(userId, uFile);

        //Create new object from user
        let thisUser = new FreeUser(userId, uFile[i].password, uFile[i].firstName, uFile[i].lastName, '', '');

        let data = {
            userId: thisUser.username,
            password: thisUser.password,
            firstname: thisUser.firstName,
            lastname: thisUser.lastName
        };

        //Send information back to client
        res.send(JSON.stringify(data));

    };

});

app.put('/user/update', Verification, (req, res) => {

    //If something went wrong and no user was found in verification
    if(userId === '') {
        res.send(null)

    } else {

        //Get file of user
        let uFile = JSON.parse(fs.readFileSync('../storage/user.json'));

        //Finds index of user in array from file
        let i = IndexOfUser(userId, uFile);

        //Updates file with new user information
        uFile[i].firstName = req.body.firstname;
        uFile[i].lastName = req.body.lastname;
        uFile[i].password = req.body.password;


        fs.writeFileSync('../storage/user.json', JSON.stringify(uFile));

        //Send information back to client
        res.send(JSON.stringify({data: 'OK'}));

    };

});

app.delete('/user/delete', Verification, (req, res) => {

    //If something went wrong and no user was found in verification
    if(userId === '') {
        res.send(null)

    } else {

        //Get files for matchmaking, users and interest-information
        let mFile = JSON.parse(fs.readFileSync('../storage/matchmaking.json'));
        let uFile = JSON.parse(fs.readFileSync('../storage/user.json'));
        let iFile = JSON.parse(fs.readFileSync('../storage/interest.json'));

        //Finds index of this user in all files
        let mIndex = IndexOfUser(userId, mFile);
        let uIndex = IndexOfUser(userId, uFile);
        let iIndex = IndexOfUser(userId, iFile);

        //Create new user as object from classes
        let newUser = new FreeUser(userId, uFile[uIndex].password, uFile[uIndex].firstName, uFile[uIndex].lastName, uFile[uIndex].birthday, uFile[uIndex].gender);
        let newMatchmaking = new Matchmaking(userId, mFile[mIndex].matches, mFile[mIndex].likes, mFile[mIndex].dislikes, mFile[mIndex].likedBy, mFile[mIndex].dislikedBy);
        let newInterest  = new Interest(userId, iFile[iIndex].interestText);

        //Delete user from files
        newUser.deleteUser(uFile);
        newMatchmaking.deleteUser(mFile);
        newInterest.deleteUser(iFile);

        //Updates/Overwrites files
        fs.writeFileSync('../storage/user.json', JSON.stringify(uFile));
        fs.writeFileSync('../storage/matchmaking.json', JSON.stringify(mFile));
        fs.writeFileSync('../storage/interest.json', JSON.stringify(iFile));

        res.send(JSON.stringify({data: 'OK'}));

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