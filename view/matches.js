//- Elements from header:
let homeBtn = document.getElementById('home-btn');
let logoutBtn = document.getElementById('logout-btn');

//- Elements from body:
let mainDiv = document.getElementById('main-div');
let tableForMatches = document.getElementById('match-table');
let deleteMatchInput = document.getElementById('delete-match-input');
let deleteMatchBtn = document.getElementById('delete-match-button');
let deleteMatchMessage = document.getElementById('delete-match-message');

//- Creates new elements:
let noMatchesToShow = document.createElement('h1');

//- Functions

//Gets a list of matches
function getInfoOfMatches() {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    //Gets token
    let token = localStorage.getItem('JWT');

    xhr.addEventListener('readystatechange', function(){
        if (this.readyState === 4) {

            const res = this.response;

            if (res.status !== 'NO-MATCHES') {

                //Return list with information of matches
                for (let i=0; i < res.length; i++) {

                    tableForMatches.innerHTML += '<tr><td>'+res[i][0]+'</td><td>'+res[i][1]+'</td><td>'+res[i][2]+'</td></tr>';
                };

            } else {
                console.log('And also here')
                //If no matches was found, informs user
                mainDiv.innerHTML = '';
                noMatchesToShow.textContent = `You haven't matched with anyone yet. Keep looking!`; 
                mainDiv.append(noMatchesToShow);
                noMatchesToShow.setAttribute('id', 'no-matches-h1');
            
            };
            
        };
    });

    xhr.open('GET', 'http://localhost:3800/match/list', true);
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

                    //If everything is ok, get info of matches
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

//Directs to main page
homeBtn.addEventListener('click', ()=> {

    window.location.href = './main.html';

});

//Logging user out
logoutBtn.addEventListener('click', ()=> {

    if (localStorage.getItem('JWT')) {
        localStorage.removeItem('JWT');
    }
    location.replace('./index.html');

});

//Deletes a match
deleteMatchBtn.addEventListener('click', ()=> {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    //Gets token
    let token = localStorage.getItem('JWT');

    //Gets the delete match name from input
    let deleteMatchUser = {
        matchname: deleteMatchInput.value
    };

    xhr.addEventListener('readystatechange', function(){
        if (this.readyState === 4) {

            let res = this.response;

            if (res.status === 404) {

                //If something went wrong
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
