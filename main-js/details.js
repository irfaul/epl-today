// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
    navigator.serviceWorker
        .register("./service-worker.js")
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

    let preload = document.querySelector(".preloader-background");
        setTimeout(function(){
        preload.style.display = 'none';
    },1500);

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");

    const addIcon = document.getElementById("addIcon");
    const delIcon = document.getElementById("delIcon");
    const actionBtn = document.querySelector(".actionBtn");

    const backLink = document.getElementById("back-link");

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        addIcon.style.display = 'none';

        //tombol back to watchlist
        backLink.onclick = () => {
            location.href = './index.html#saved';
        }
        
        // ambil artikel lalu tampilkan
        let list = getSavedMatchById();
        actionBtn.onclick = function() {
        console.log("Tombol delete di klik.");
        M.toast({html: 'Match has been deleted from watchlist', 
        completeCallback : () => {
            location.href = './index.html#saved'
            }
        })
        list.then(function (deleteWatchList) {
            deleteWatchLater(deleteWatchList);
        });
    }
    } else {
        delIcon.style.display = 'none';

        //tombol back to home
        backLink.onclick = () => {
            location.href = './index.html';
        }

        let item = getMatchById();
        actionBtn.onclick = function() {
            actionBtn.style.display = 'none';
        console.log("Tombol FAB di klik.");
        M.toast({html: 'Match has been saved to watchlist'})
        item.then(function (addedWatchList) {
            addWatchLater(addedWatchList);
        });
        
    }
    }
});