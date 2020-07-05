const dbPromised = idb.open("epl-today", 1, function(upgradeDb) {
    const watchesObjectStore = upgradeDb.createObjectStore("matches", {
      keyPath: "id"
    });
    watchesObjectStore.createIndex("utcDate", "utcDate", { unique: false });
});

const addWatchLater = addedWatchList => {
    dbPromised
      .then(db => {
        var tx = db.transaction("matches", "readwrite");
        var store = tx.objectStore("matches");
        store.put(addedWatchList.match);
        return tx.complete;
      })
      .then( () => {
        console.log("watchlist berhasil di simpan.");
      });
}

const getAll = () => {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(db => {
          var tx = db.transaction("matches", "readonly");
          var store = tx.objectStore("matches");
          return store.getAll();
        })
        .then(addedWatchList => {
          resolve(addedWatchList);
        });
    });
}

const getById = id => {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then( db => {
          var tx = db.transaction("matches", "readonly");
          var store = tx.objectStore("matches");
          console.log(typeof(id));
          let parseId = parseInt(id);
          return store.get(parseId);
        })
        .then( addMatchById => {
          resolve(addMatchById);
        });
    });
  }

const deleteWatchLater = deleteWatchList => {
    dbPromised
      .then(db => {
        var tx = db.transaction("matches", "readwrite");
        var store = tx.objectStore("matches");
        store.delete(deleteWatchList.id);
        return tx.complete;
      })
      .then(() => {
        console.log("Item deleted");
      });
}