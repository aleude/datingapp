//- Elements from header:
let homeBtn = document.getElementById('home-btn');
let logoutBtn = document.getElementById('logout-btn');

//- Elements from body:
let tableForMatches = document.getElementById('match-table');
let deleteMatchInput = document.getElementById('delete-match-input');
let deleteMatchBtn = document.getElementById('delete-match-button');
let deleteMatchMessage = document.getElementById('delete-match-message');


//- Functions
function getInfoOfMatches() {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    //Gets token
    let token = localStorage.getItem('JWT');

    xhr.addEventListener('readystatechange', function(){
        if (this.readyState === 4) {
            const res = this.response;
            if (res !== null) {

                //Return list with information of matches
                //return res;
                console.log(res);

                for (let i=0; i < res.length; i++) {
                    tableForMatches.innerHTML += '<tr><td>'+res[i][0]+'</td><td>'+res[i][1]+'</td><td>'+res[i][2]+'</td></tr>';
                };

            } else {

                //Returns null if nothing was found
                alert('There is no matches to show');
            
            };
            
        };
    });

    xhr.open('GET', 'http://localhost:3800/match/matchlist', true);
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

                    getInfoOfMatches();
                
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

homeBtn.addEventListener('click', ()=> {

    window.location.href = './main.html';
});

logoutBtn.addEventListener('click', ()=> {

    if (localStorage.getItem('JWT')) {
        localStorage.removeItem('JWT');
    }
    location.replace('./index.html');
});

deleteMatchBtn.addEventListener('click', ()=> {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    let token = localStorage.getItem('JWT');

    let deleteMatchUser = {
        matchname: deleteMatchInput.value
    };

    xhr.addEventListener('readystatechange', function(){
        if (this.readyState === 4) {
            let res = this.response;
            if (res === null) {
                alert(`Couldn't delete match. Check if Match ID is correct`);
            } else {
                
                //Reload page if everything went fine
                location.reload();
                deleteMatchMessage.innerHTML = `Your match was ${deleteMatchInput.value} has now been deleted`;

            };
        };
    });

    xhr.open('DELETE', 'http://localhost:3800/match/delete', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(deleteMatchUser));

});
