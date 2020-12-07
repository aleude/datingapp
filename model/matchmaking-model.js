//NOTE TIL MiG SELV: UDELUKKENDE MATCH RELATERET MED FUNKTIONER OG KLASSER

class Matchmaking {
    constructor(username, matches, likes, dislikes, likedBy, dislikedBy) {
        this.username = username;
        this.matches = matches;
        this.likes = likes;
        this.dislikes = dislikes;
        this.likedBy = likedBy; 
        this.dislikedBy = dislikedBy;

    };

    //Sub-function to find this user in file
    findThisUserByIndex(file) {
    
        let index = undefined;
        let error = true;

        for (let i = 0; i<file.length; i++) {

            if (this.username === file[i].username) {
                error = false;
                index = i;
                break;

            };
        };

        //Error
        if(error) {
            return console.log(`Error: ${this.username} wasn't found in file of name: ${file}`);

        } else {
            return index;

        };
    };

    //Sub-function to find counter-user in file
    findOtherUserByIndex(otherUser, file) {

        let index = undefined;
        let error = true;

        for (let i = 0; i<file.length; i++) {
            if (otherUser === file[i].username) {
                error = false;
                index = i;
                break;

            };
        };

        //Error
        if (error) {
            return console.log(`Error: ${otherUser} wasn't found in file of name: ${file}`);

        } else {
            return index;

        };
    };

    //Sub-function to find random index in file
    RandomUser(file) {
        return Math.floor(Math.random() * file.length);

    };

    //Sub-function for recursion
    findMatchHelper(file, thisUserIndex, arr) {

        //Finds user at random index
        let i = this.RandomUser(file);
        let maybeThisUser = file[i].username;

        //Checks if it is not the same user
        if (this.username != maybeThisUser) {
            let notLikedOrDisliked = true;

            //This block checks for matchUser in dislikes array
            for (let i=0; i<file[thisUserIndex].dislikes.length; i++) {
                    
                //Checks if the user is has not been disliked
                if (maybeThisUser === file[thisUserIndex].dislikes[i]) {
                    //If user was found in array
                    notLikedOrDisliked = false;
                    break;

                };
            };

            //This block checks for matchUser in likes array
            for (let i=0; i<file[thisUserIndex].likes.length; i++) {
                    
                //Checks if the user has already been liked
                if (maybeThisUser === file[thisUserIndex].likes[i]) {
                    //If user was found in array
                    notLikedOrDisliked = false;
                    break;

                };
            };

            if(notLikedOrDisliked) {
                return arr.push(maybeThisUser);

            } else {
                //If users criteria didn't match, do recursion
                this.findMatchHelper(file, thisUserIndex, arr);

            };

        } else {
            this.findMatchHelper(file, thisUserIndex, arr);

        };
    };
    

    //Potential match user algorithm
    findMatch(file) {
        let thisUserIndex = this.findThisUserByIndex(file);
        let arr = [];

        let lengthOfDislikeArr = file[thisUserIndex].dislikes.length;
        let lengthOfLikesArr = file[thisUserIndex].likes.length;
        let numOfUsers = file.length-1;
        let totalLikedAndDisliked = (lengthOfLikesArr+lengthOfDislikeArr);

        if (totalLikedAndDisliked<numOfUsers) {
            this.findMatchHelper(file, thisUserIndex, arr);

        } else {
            //If there is no more users to show
            arr.push(null);

        };

        //Returns first user matching the criteria
        return arr[0];

    };


    //Matchmaking function
    //NOTE TIL MIG SELV: Husk at først køres en user.like, og bagefter user.checkForMatch
    checkForMatch(usernameOfMatch, file) {

        let x = this.findThisUserByIndex(file);
        //index of other user
        let j = this.findOtherUserByIndex(usernameOfMatch, file);

        //If match is true
        let matchTrue = false;

        //New find match
        for (let i=0; i<file[x].likedBy.length; i++) {

            if (usernameOfMatch === file[x].likedBy[i]) {
                matchTrue = true;
                break;

            }

        }
        
        if (matchTrue) {
            //Pushes match username to this user match array
            file[x].matches.push(usernameOfMatch);
            file[j].matches.push(this.username);
            //Returns 1 for true
            return 1;

        } else {
            //Returns 0 for false
            return 0;

        };  
    };

    //Delete a single match
    deleteMatch(usernameOfMatch, file) {

        //Index of this user
        let a = this.findThisUserByIndex(file);
        //index of other user
        let b = this.findOtherUserByIndex(usernameOfMatch, file);
        let removeMatch = false;

        //1 -- Delete from match arrays

        //Delete match in other user array
        for (let i=0; i<file[b].matches.length; i++) {
            if (this.username === file[b].matches[i]) {
                file[b].matches.splice(i, 1);
                removeMatch = true;
                break;

            };
        };

        //Delete match in this user array
        for (let i=0; i<file[a].matches.length; i++) {
            if (usernameOfMatch === file[a].matches[i]) {
                file[a].matches.splice(i, 1);
                removeMatch = true;
                break;

            };
        };

        //2 -- Delete match from this user likes arrays

        for (let i=0; i<file[a].likes.length; i++) {
            if (usernameOfMatch === file[a].likes[i]) {
                file[a].likes.splice(i, 1);
                removeMatch = true;
                break;

            };
        };

        for (let i=0; i<file[a].likedBy.length; i++) {
            if (usernameOfMatch === file[a].likedBy[i]) {
                file[a].likedBy.splice(i, 1);
                removeMatch = true;
                break;

            };
        };

        //3 -- Delete this user from match user likes arrays

        for (let i=0; i<file[b].likes.length; i++) {
            if (this.username === file[b].likes[i]) {
                file[b].likes.splice(i, 1);
                removeMatch = true;
                break;

            };
        };

        for (let i=0; i<file[b].likedBy.length; i++) {
            if (this.username === file[b].likedBy[i]) {
                file[b].likedBy.splice(i, 1);
                removeMatch = true;
                break;

            };
        };

        // Message
        if (removeMatch) {
            console.log(`Succes: ${this.username} has succesfull removed ${usernameOfMatch} from match`);
        } else {
            console.log(`Error: ${this.username} couldn't remove ${dislikename} from match`);
        };
    
    };

    dislike(dislikename, file) {

        //Index of this user
        let i = this.findThisUserByIndex(file);
        //index of other user
        let j = this.findOtherUserByIndex(dislikename, file);

        //If i is undefined or not
        if ((i === undefined) || (j === undefined)) {
            return;

        } else {
            file[i].dislikes.push(dislikename);
            file[j].dislikedBy.push(this.username);
            console.log(`Succes: ${this.username} has succesfull disliked ${dislikename}`);

        };
    };

    like(likename, file) {
        
        //Index of this user
        let i = this.findThisUserByIndex(file);
        //Index of other user
        let j = this.findOtherUserByIndex(likename, file)

        //If i is undefined or not
        if ((i === undefined) || (j === undefined)) {
            return;

        } else {
            file[i].likes.push(likename);
            file[j].likedBy.push(this.username);
            console.log(`Succes: ${this.username} has succesfull liked ${likename}`);

        };

    };
 
    //NOTE TIL MIG SELV. Tænk på køretid, ift. hvor meget man spare i stedet for at tjekke 2·2 array.
    //Få testet den evt. for fejl, forkert fejlnavne.
    deleteUser(file) {

        //Find the index of user to delete
        let i = this.findThisUserByIndex(file);
        let likedByArr  = this.likedBy;
        let dislikedByArr = this.dislikedBy;
        let likesArr = this.likes;
        let dislikesArr = this.dislikes;

        //Delete this user from all users who have liked this user
        if (likedByArr.length > 0) {
            for (let i=0; i<likedByArr.length; i++) {

                //Finds index of users, who liked this user, in file
                let j = this.findOtherUserByIndex(likedByArr[i], file);
                //Variable for the other users' like-array
                let otherUserLikesArr = file[j].likes;

                //Itereate over other users' likes array
                for (let k=0; k<otherUserLikesArr.length; k++) {
                    //Remove this user from other users' like array if true
                    if (this.username == otherUserLikesArr[k]) {
                        otherUserLikesArr.splice(k,1);
                        break;

                    };
                };

            };
        };

        //Deletes in liked by from other user (HUSk kommentarer)
        if (likesArr.length > 0) {

            for (let i=0; i<likesArr.length; i++) {
                let j = this.findOtherUserByIndex(likesArr[i], file);
                let otherUserLikedByArr = file[j].likedBy;

                for (let k=0; k<otherUserLikedByArr.length; k++) {

                    if(this.username == otherUserLikedByArr[k]) {
                        otherUserLikedByArr.splice(k,1);
                        break;

                    };
                };
            };
        };



        //Delete this user from all users who have disliked this user
        if(dislikedByArr.length > 0) {

            for (let i=0; i<dislikedByArr.length; i++) {
                //Find index of users, who disliked this user, in file
                let j = this.findOtherUserByIndex(dislikedByArr[i], file);
                //Variable for the other users' dislike-array
                let otherUserDislikesArr = file[j].dislikes;

                //Itereate over other users' dislikes array
                for (let k=0; k<otherUserDislikesArr.length; k++) {
                    //Removes this user from other users' dislikes array if true
                    if (this.username == otherUserDislikesArr[k]) {
                        otherUserDislikesArr.splice(k,1);
                        break;

                    };

                };

            };
        };

          //Deletes in liked by from other user (HUSk kommentarer)
          if (dislikesArr.length > 0) {
            for (let i=0; i<dislikesArr.length; i++) {
                let j = this.findOtherUserByIndex(dislikesArr[i], file);
                let otherUserDislikedByArr = file[j].dislikedBy;

                for (let k=0; k<otherUserDislikedByArr.length; k++) {
                    if(this.username == otherUserDislikedByArr[k]) {
                        otherUserDislikedByArr.splice(k,1);
                        break;

                    };
                };
            };
        };

        //Delete this users matches
        for (let i=0; i<this.matches.length; i++) {
            this.deleteMatch(this.matches[i], file);

        };

        //Delete this user from file
        file.splice(i,1);
        console.log(`Success: ${this.username} was removed from the file: ${file}`);

    };
};

//Export class
module.exports = Matchmaking;