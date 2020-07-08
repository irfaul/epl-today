import api from '../js/api.js';

document.addEventListener("DOMContentLoaded", function() {
    let preload = document.querySelector(".preloader-background");
        setTimeout(function(){
        preload.style.display = 'none';
    },1500);
    api.getTeamsById();
});