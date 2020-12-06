//- Elements from header:
let matchBtn = document.getElementById('my-matches-btn');
let settingsBtn = document.getElementById('settings-btn');
let logoutBtn = document.getElementById('logout-btn');

//- Elements from body:
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


//-F Functions and variables:

usernameMatch = '';

//Function getting a potential random match
function matchmaking() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    //Gets token
    let token = localStorage.getItem('JWT');

    xhr.addEventListener('readystatechange', function(){
        if (this.readyState === 4) {
            const res = this.response;
            //HVER OPMÆRKSOM PÅ RES.SEND(NULL) I API
            if (res.status === 'NOMATCHES') {

                usernameMatch = '';
                //Removes all elements unused
                
                nameOfMatch.remove();
                ageOfMatch.remove();
                genderOfMatch.remove();
                interestsOfMatch.remove();
                dislikeBtn.remove();
                undecidedBtn.remove();
                likeBtn.remove();
                profilePic.remove();
                interestsHeader.remove();
                //Virker ikke endnu
                /*
                let h1 = document.createElement('h1');
                h1.innerHTML = 'No more matches to show right now';
                h1.id = 'no-matches-h1';
                bottomDiv.appendChild(h1);
                */

                alert('Couldnt find any matches');
                //Her skal der laves node kodeværk, så det kan ses på main-pages.




            } else {

                //Sets variabel to username of potental match
                usernameMatch = res.username;
                //Updated page with potential match
                nameOfMatch.innerHTML = res.fullname;
                ageOfMatch.innerHTML = res.age;
                genderOfMatch.innerHTML = res.gender;
                interestsOfMatch.innerHTML = res.interests;
            };
        };
    });

    xhr.open('GET', 'http://localhost:3800/match/getmatch', true);
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
        
        let token = localStorage.getItem('JWT');
        console.log(token);
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                const res = this.response;
                //If user wasn't found, redirect to login
                if (res === null) {
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

//Eventlisteners for buttons in header
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

undecidedBtn.addEventListener('click', ()=> {

    matchmaking();

});

//MISSING comments from here on:::

dislikeBtn.addEventListener('click', ()=> {
    if (usernameMatch !== '') {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        let token = localStorage.getItem('JWT');

        let data = {
            matchname: usernameMatch,
            action: dislike
        };
        
        xhr.addEventListener('readystatechange', function(){
            if (this.readyState === 4) {
                let res = this.response;
                if (res === null) {
                    alert('Something went wrong');
                    location.replace('./index.html');
                } else {
                    matchmaking();
                };
            };
        });
        
        xhr.open('POST', 'http://localhost:3800/match/dislike', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.send(JSON.stringify(data));

    } else {

    matchmaking();

    };
});

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
                let res = this.response;
                console.log(res);
                if (res === null) {

                    alert('Something went wrong');
                    //location.replace('./index.html');

                } else if (res.match) { //Ikke 100 på den virker
                    alert(`NICE!! You've now matched with ${usernameMatch}`);
                    matchmaking();
                } else {
                    matchmaking();
                }
            };
        });
        
        xhr.open('POST', 'http://localhost:3800/match/like', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', token);
        xhr.send(JSON.stringify(data));

    } else {

    matchmaking();

    };
});

