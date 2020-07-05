import * as api from './api.js';
import * as dbIndex from './db.js';
import './materialize.min.js';

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
    navigator.serviceWorker
        .register("../service-worker.js")
        .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function() {

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");

    const btnSave = document.getElementById("saveBtn");
    const btnDel = document.getElementById("deleteBtn");

    const backLink = document.getElementById("back-link");

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';

        //tombol back to watchlist
        backLink.onclick = () => {
            location.href = './index.html#saved';
        }
        
        // ambil artikel lalu tampilkan
        let list = api.getSavedMatchById();
        btnDel.onclick = function() {
        console.log("Tombol delete di klik.");
        M.toast({html: 'Match has been deleted from watchlist', 
        completeCallback : () => {
            location.href = './index.html#saved'
            }
        })
        list.then(function (deleteWatchList) {
            dbIndex.deleteWatchLater(deleteWatchList);
        });
    }
    } else {
        btnDel.style.display = 'none';

        //tombol back to home
        backLink.onclick = () => {
            location.href = './index.html';
        }

        let item = api.getMatchById();
        btnSave.onclick = function() {
        console.log("Tombol FAB di klik.");
        M.toast({html: 'Match has been saved to watchlist'})
        item.then(function (addedWatchList) {
            dbIndex.addWatchLater(addedWatchList);
        });
    }
    }
});