import api from './api.js';

function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status !== 200) return;
            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
            });
           
            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
            elm.addEventListener("click", function(event) {
                // Tutup sidenav
                const sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();
           
                // Muat konten halaman yang dipanggil
                const page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    
function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");

            if (page === "home") {
                api.getMatch();
                api.getMatchData();
            } else if (page === "standings") {
                api.getStandings();
            } else if (page === "scorer") {
                api.getScorers();
            } else if (page === "teams") {
                api.getTeams();
            } else if (page === "saved") {
                api.getSavedWatchList();
            }

            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;

                const elems = document.querySelectorAll('.slider');
                M.Slider.init(elems);
        
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
}

export default {loadNav, loadPage};