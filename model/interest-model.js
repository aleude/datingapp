
class User_Interest {
    constructor(username, interestText) {
        this.username = username;
        this.interestText = interestText;
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

    //Function to delete user from file
    deleteUser(file) {
        
        let i = this.findThisUserByIndex(file);

        if (i != undefined) {
            //Removes user from file index of i
            file.splice(i, 1);
            return console.log(`Success: ${this.username} was removed from ${file}`);
        } else {
            return console.log(`Error: ${this.username} couldn't be removed from ${file}`);
        };
    };

};

module.exports = User_Interest;