//NOTE TIL MiG SELV: UDELUKKENDE MATCH RELATERET MED FUNKTIONER OG KLASSER

class User_Matchmaking {
    constructor(username, likes, dislikes, likedBy, dislikedBy) {
        this.username = username;
        this.likes = likes;
        this.dislikes = dislikes;

        //When user deletes itself, I needs to delete it likes and dislikes from others:
        this.likedBy = likedBy; 
        this.dislikedBy = dislikedBy;
    };

    //Help-function to find object-user in file
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

    //Help-function to find counter-user in file
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

    dislike(dislikename, file) {

        //Index of this user
        let i = this.findThisUserByIndex(file);
        //index of counter user
        let j = this.findOtherUserByIndex(dislikename, file);

        //If i === null error message the rest shouldn't be executed
        if ((i === undefined) || (j === undefined)) {
            return;
        } else {

            file[i].dislikes.push(dislikename);
            file[j].dislikedBy.push(this.username);

            console.log(`Succes: ${this.username} has succesfull disliked ${dislikename}`)
        };
    };

    like(likename, file) {
        //Do the same. Change wrong message.

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

        //Delete this user from file
        file.splice(i,1);
        console.log(`Success: ${this.username} was removed from the file: ${file}`);
    };


};

//Export class
module.exports = User_Matchmaking;