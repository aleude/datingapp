//TESTING WITH MOCHA AND CHAI
//Requite necessary modules
const expect = require('chai').expect;
const fs = require('fs');
const Matchmaking = require('../../model/matchmaking-model'); 
let file = require('./testArr2.js');
let file2 = require('./testArr1.js');

//Test case to be used throughout testing
let jane = new Matchmaking(file[0].username, file[0].matches, file[0].likes, file[0].dislikes, file[0].likedBy, file[0].dislikedBy);


//Testing

describe('findMatch() function', function(){
    it('should return a string', function(){
        //1. Arrange
        //No need

        //2. Act
        let potentialMatch = jane.findMatch(file);
        console.log(`potential match: ${potentialMatch}`);

        //3. Assert
        expect(potentialMatch).to.be.a('string');
    })

    it('potential match should not be in the match array', function(){
        //1. Arrange, getting Jane's matches
        let arr = jane.matches;

        //2. Act, getting potential match
        let potentialMatch = jane.findMatch(file);
        console.log(`potential match: ${potentialMatch}`);

        //3. Assert
        expect([potentialMatch]).to.not.have.members(arr);
    });

    it('potential match should not already be liked', function(){
        //1. Arrange, getting Jane's likes
        let arr = jane.likes;

        //2. Act, getting potential match
        let potentialMatch = jane.findMatch(file);
        console.log(`potential match: ${potentialMatch}`);

        //3. Assert
        expect([potentialMatch]).to.not.have.members(arr);
    });

    it('potential match should not already be disliked', function(){
        //1. Arrange, getting Jane's dislikes
        let arr = jane.dislikes;

        //2. Act, getting potential match
        let potentialMatch = jane.findMatch(file);
        console.log(`potential match: ${potentialMatch}`);

        //3. Assert
        expect([potentialMatch]).to.not.have.members(arr);
    });

    it('potential match should be in file', function(){
        //1. Arrange
        //Creating an array with all usernames in file
        
        let arr = [];
        for (let i=0; i<file.length; i++) {
        arr.push(file[i].username);
        };


        //2. Act, getting potential match
        let potentialMatch = jane.findMatch(file);
        console.log(`potential match: ${potentialMatch}`);

        //3. Assert
        expect(arr).to.include(potentialMatch);
    });
    
    it('potential match must not be the same as this user', function(){
        //1. Arrange
        let thisUser = jane.username;


        //2. Act, getting potential match
        let potentialMatch = jane.findMatch(file);
        console.log(`potential match: ${potentialMatch}`);

        //3. Assert
        expect(potentialMatch).to.not.equal(thisUser);
    });

    it('null should be returned if there is no potential matches to show', function(){
        //1. Arrange
        //Creates a new object where all users in file already are liked
        let jane2 = new Matchmaking(file2[0].username, file2[0].matches, file2[0].likes, file2[0].dislikes, file2[0].likedBy, file2[0].dislikedBy);


        //2. Act, getting potential match
        let potentialMatch = jane2.findMatch(file2);
        console.log(`potential match: ${potentialMatch}`);

        //3. Assert
        expect(potentialMatch).to.be.equal(null);
    });

});
