

//Eventlistener to redirect users who already are logged in.
document.addEventListener('DOMContentLoaded', ()=> {
    if(localStorage.getItem('JWT') == true) {
        location.replace('./main.html');
    };
});