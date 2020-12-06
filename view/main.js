//- Elements from header:
let matchBtn = document.getElementById('my-matches-btn');
let settingsBtn = document.getElementById('settings-btn');
let logoutBtn = document.getElementById('logout-btn');

//- Elements from body:
let mainDiv = document.getElementById('main-div');
let nameOfMatch = document.getElementById('fullname-match');
let ageOfMatch = document.getElementById('age-match');
let genderOfMatch = document.getElementById('gender-match');
let interestsOfMatch = document.getElementById('interests-match');
let interestsHeader = document.getElementById('interests-header');
let profilePic = document.getElementById('profile-picture');
let dislikeBtn = document.getElementById('dislike');
let undecidedBtn = document.getElementById('undecided');
let likeBtn = document.getElementById('like');
let bottomDiv = document.getElementById('div-to-no-matches');

//- Creates new elements:
let noMoreMatchesH1 = document.createElement('h1');


//- Functions and variables:

//Variable used throughout the document of matchUser
let usernameMatch = '';

//Function to get a random but potential match
function matchmaking() {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    //Gets token
    let token = localStorage.getItem('JWT');

    xhr.addEventListener('readystatechange', function(){

        if (this.readyState === 4) {

            const res = this.response;

            //Validates if any potential matches or not was found
            if (res.status === 'empty') {

                //Remove all items and display text to inform user
                usernameMatch = '';
                mainDiv.innerHTML = '';
                noMoreMatchesH1.textContent = 'There is no more potential matches to show. Wait for new users to join';
                mainDiv.append(noMoreMatchesH1);
                noMoreMatchesH1.setAttribute('id', 'no-users-h1');


            } else {

                //Sets name of potential match
                usernameMatch = res.username;

                //Updated page with potential match info
                nameOfMatch.innerHTML = res.fullname;
                ageOfMatch.innerHTML = res.age;
                genderOfMatch.innerHTML = res.gender;
                interestsOfMatch.innerHTML = res.interests;
            };
        };
    });

    xhr.open('GET', 'http://localhost:3800/match/get', true);
    xhr.setRequestHeader('Authorization', token);
    xhr.send();

};




//- Eventlisteners and requests:

//Validates if user exists in database and have correct token
document.addEventListener('DOMContentLoaded', ()=> {

    //If users has a token, validates if the token is accepted
    if(localStorage.getItem('JWT')) {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        
        //Gets token
        let token = localStorage.getItem('JWT');

        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;

                //If user wasn't found, redirect to login
                if (res.status === 404) {

                    location.replace('./index.html');
                } else {
                    
                    //If everything is fine. Do matchmaking.
                    matchmaking();

                };
            };
        });

        xhr.open('GET', 'http://localhost:3800/checkuser', true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send();

    } else {

        //If users don't have any token. Redirect to login
        location.replace('./index.html');
    };

});

//Eventlisteners for buttons in header:
matchBtn.addEventListener('click', ()=> {

    window.location.href = './matches.html';

});

settingsBtn.addEventListener('click', ()=> {

    window.location.href = './settings.html';

});

logoutBtn.addEventListener('click', ()=> {

    if (localStorage.getItem('JWT')) {
        localStorage.removeItem('JWT');
    }
    location.replace('./index.html');
});

//Doing matchmaking again if user cliced undecided
undecidedBtn.addEventListener('click', ()=> {

    matchmaking();

});

//Dislike button:
dislikeBtn.addEventListener('click', ()=> {

    //Validates if potential match username is not empty
    if (usernameMatch !== '') {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        //Gets token
        let token = localStorage.getItem('JWT');

        //Gets username of potential match
        let data = {
            matchname: usernameMatch
        };
        
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {

                const res = this.response;

                if (res.status === 404) {

                    alert('Something went wrong');
                    location.replace('./index.html');

                } else {

                    //If user is disliked, find new match
                    matchmaking();

                };
            };
        });
        
        xhr.open('POST', 'http://localhost:3800/match/dislike', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.send(JSON.stringify(data));

    } else {
    
        //If something went wrong with username of potential match, find new potential match
        matchmaking();

    };
});


//Like button
likeBtn.addEventListener('click', ()=> {
    if (usernameMatch !== '') {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        let token = localStorage.getItem('JWT');

        let data = {
            matchname: usernameMatch,
            action: like
        };
        console.log(usernameMatch);
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {

                const res = this.response;
                

                if (res.status === 404) {

                    alert('Something went wrong');
                    location.replace('./index.html');

                } else if (res.status === 201) { //Ikke 100 på den virker
                    
                    //If a match was created, notify user
                    alert(`NICE!! You've now matched with ${usernameMatch}`);

                    matchmaking();

                } else {

                    //If no match was created, find a new potential match
                    matchmaking();

                };
            };
        });
        
        xhr.open('POST', 'http://localhost:3800/match/like', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.send(JSON.stringify(data));

    } else {

    //If something went wrong with potential match user. Find a new one
    matchmaking();

    };

});

