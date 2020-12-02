//- Require node-modules:
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

//- Require classes from model:

//- Setting up server:
const app = express();
const PORT = process.env.PORT || 3800;
const JWTkey;

//- Use moduls for server:
app.use(bodyParser.json());
app.use(cors()); 

//- Functions used in API:

//This function is used to find specific user in file (through username)
function IndexOfUser(username, file) {
    let index = 0;
    let foundUser = false;

    //Find username in file
    for (let i=0; i<file.length; i++) {
        if (username === file[i].username) {
            foundUser = true;
            index = i;
        };
    };

    //Validate if user was found
    if (foundUser) {
        return index;
    } else {
        return console.log(`Error: ${username} was not found in file`);
    };
};

//Verify if token is okay.
function Verification() {

};

//- API endpoints:



//- Opening server:
app.listen(PORT, console.log(`Server has started on ${PORT}`));
