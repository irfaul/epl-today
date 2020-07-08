import dataApi from './data.js';
import db from './db.js';

//BASE URL API
const base_url = "https://api.football-data.org/v2/";

//CALL FETCH API
const getUrl = id => {
  return fetch(`${base_url}${id}`, {
    headers: {
      "X-Auth-Token": "3369b0202ce844c9a5b55a77e638006e"
    },
    dataType: 'json',
    type: 'GET'
  });
}

const status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = response => {
  return response.json();
}

const error = error => {
  console.log("Error : " + error);
}

//AMBIL DATA TOP SKOR LIGA INGGRIS
const getScorers = () => {

  const urlScorers = "competitions/2021/scorers";

  if ('caches' in window) {
    caches.match(base_url + urlScorers)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.scorers(data)
    });
  }

  getUrl(urlScorers)
    .then(status)
    .then(json)
    .then( data => {
      dataApi.scorers(data)
    })
    .catch(error);
}
//AMBIL DATA KLASEMEN LIGA INGGRIS
const getStandings = () => {

  const urlStandings = "competitions/2021/standings";

  if ('caches' in window) {
    caches.match(base_url + urlStandings)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.standings(data)
    });
  }

  getUrl(urlStandings)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.standings(data)
      })
      .catch(error);
}

//AMBIL DATA TIM LIGA INGGRIS
const getTeams = () => {

  const urlTeams = "competitions/2021/teams";

  if ('caches' in window) {
    caches.match(base_url + urlTeams)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.teams(data)
    });
  }

  getUrl(urlTeams)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.teams(data)
      })
      .catch(error);
}

//AMBIL DATA PREVIEW TIM BY ID
const getTeamsById = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  const urlTeamsById = `teams/${idParam}`;

  if ('caches' in window) {
    caches.match(base_url + urlTeamsById)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.teamsById(data)
    });
  }

  getUrl(urlTeamsById)
    .then(status)
    .then(json)
    .then( data => {
      dataApi.teamsById(data)
  })
  .catch(error);
}

//AMBIL DATA ALL MATCH LIGA INGGRIS
const getMatch = () => {

  return new Promise(function(resolve) {
  const urlMatch = "competitions/2021/matches";

  if ('caches' in window) {
    caches.match(base_url + urlMatch)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.match(data)
        resolve(data);
    });
  }

  getUrl(urlMatch)
  .then(status)
  .then(json)
  .then(data => {
    dataApi.match(data)
      resolve(data);
    })
      .catch(error);
  })
}

const getMatchData = () => {

  let curMatch = getMatch();
  curMatch.then( data => {
    dataApi.matchData(data)
    })
}

//AMBIL DATA DETAIL MATCH BY ID
const getMatchById = () => {

  return new Promise(function(resolve){

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  const urlMatchById = `matches/${idParam}`;

  if ('caches' in window) {
    caches.match(base_url + urlMatchById)
      .then(status)
      .then(json)
      .then( data => {
        dataApi.matchById(data)
        resolve(data);
    });
  }

  getUrl(urlMatchById)
    .then(status)
    .then(json)
    .then( data => {
      dataApi.matchById(data)      
      resolve(data);
    });
  })
  // .catch(error);
}

//AMBIL DATA MATCH DISIMPAN KE WATCHLIST
const getSavedWatchList = () => {
  db.getAll()
  .then(data => {
    dataApi.savedWatchList(data)
  });
}

//AMBIL DATA DETAIL MATCH YANG DISIMPAN DI WATCHLIST
const getSavedMatchById = () => {
  return new Promise(function(resolve){

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  
  db.getById(idParam).then( data => {
    dataApi.savedMatchById(data)
    resolve(data);
    })
  })
}

export default {
  getScorers,
  getStandings,
  getTeams,
  getTeamsById,
  getMatch,
  getMatchData,
  getMatchById,
  getSavedWatchList,
  getSavedMatchById
};