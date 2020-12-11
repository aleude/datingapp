//Class for all information of users
class User {
    constructor(username, password, firstName, lastName, birthday, gender) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;

    };

    //Calculate age of user
    getAge() {
        let arr = this.birthday.split('-');
        let year = parseInt(arr[0]);
        let month = parseInt(arr[1]);
        let date = parseInt(arr[2]);
        var birth = new Date(year, month, date);
        //Calcs difference between today and birth
        var diff = Date.now() - birth.getTime();
        var ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);

    };

    //Returns a users full name
    fullName() {
        return `${this.firstName} ${this.lastName}`;

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


class FreeUser extends User {
    constructor(username, password, firstName, lastName, birthday, gender) {
        super(username, password, firstName, lastName, birthday, gender);
        
    };
};


//Exports classes
module.exports = FreeUser;
