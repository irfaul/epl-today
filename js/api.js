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

  getUrl(urlScorers)
    .then(status)
    .then(json)
    .then( data => {

      let scorersHTML = "";
      data.scorers.forEach( scorer => {
        scorersHTML += `
            <tr>
                <td>${scorer.player.name}</td>
                <td>${scorer.team.name}</td>
                <td>${scorer.numberOfGoals}</td>
            </tr>
            `;
      });
      document.getElementById("goalScorers").innerHTML = scorersHTML;
    })
    .catch(error);
}
//AMBIL DATA KLASEMEN LIGA INGGRIS
const getStandings = () => {

  const urlStandings = "competitions/2021/standings";

  getUrl(urlStandings)
      .then(status)
      .then(json)
      .then( data => {
        
        let matchdayHTML = "";
        matchdayHTML = `<p>Matchday ke : <b>${data.season.currentMatchday}</b></p>`;
        document.getElementById("matchday").innerHTML = matchdayHTML;

        let standingsHTML = "";
        data.standings[0].table.forEach( tabel => {
          standingsHTML += `
              <tr>
                  <td>${tabel.position}</td>
                  <td>
                    <img src="${tabel.team.crestUrl}" alt="logo" height="30px" width="30px">
                  </td>
                  <td>${tabel.team.name}</td>
                  <td>${tabel.playedGames}</td>
                  <td>${tabel.points}</td>
                  <td>${tabel.won}</td>
                  <td>${tabel.draw}</td>
                  <td>${tabel.lost}</td>
                  <td>${tabel.goalDifference}</td>
              </tr>
              `;
        });
        
        document.getElementById("clubStandings").innerHTML = standingsHTML;
      })
      .catch(error);
}

//AMBIL DATA TIM LIGA INGGRIS
const getTeams = () => {

  const urlTeams = "competitions/2021/teams";

  getUrl(urlTeams)
      .then(status)
      .then(json)
      .then( data => {
        
        let teamsHTML = "";
        data.teams.forEach( team => {
          teamsHTML += `
            <div class="col l2 m4 s6">
                <div class="card">
                    <div class="card-image">
                        <img src="${team.crestUrl}" alt="logo" height="200px" width="200px">
                    </div>
                    <div class="card-content center indigo darken-4 white-text">
                        <p><b>${team.shortName}</b></p>
                        <a class="waves-effect" href="./preview.html?id=${team.id}">Profile</a>
                    </div>  
                </div>
            </div>
              `;
        });
        document.getElementById("teams").innerHTML = teamsHTML;
      })
      .catch(error);
}

//AMBIL DATA PREVIEW TIM BY ID
const getTeamsById = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  const urlTeamsById = `teams/${idParam}`;

  getUrl(urlTeamsById)
    .then(status)
    .then(json)
    .then( data => {
      
      let teamsHTML = `
          <div class="row">
              <div class="col l6 m12 s12">
                  <div class="card">
                      <div class="card-image">
                          <img src="${data.crestUrl}" alt="logo club" height="442px" width="442px">
                      </div>
                  </div>
              </div>
          
              <div class="col l6 m12 s12">
                  <div class="card">
                      <div class="card-content center pink accent-3 white-text">
                          <h5>${data.name}</h5>
                          <p>${data.venue}</p>
                      </div>
                      <div class="card-action indigo darken-4 white-text">
                          <table>
                              <tbody>
                              <tr>
                                  <td><b>Est</b></td>
                                  <td>${data.founded}</td>
                              </tr>
                              <tr>
                                  <td><b>Adrress</b></td>
                                  <td>${data.address}</td>
                              </tr>
                              <tr>
                                  <td><i class="material-icons">phone</i></td>
                                  <td>${data.phone}</td>
                              </tr>
                              <tr>
                                  <td><i class="material-icons">language</i></td>
                                  <td>${data.website}</td>
                              </tr>
                              <tr>
                                  <td><i class="material-icons">mail_outline</i></td>
                                  <td>${data.email}</td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
        `;
          document.getElementById("header").innerHTML = teamsHTML;
      

      let squadsHTML = "";
      data.squad.forEach(function(list) {
          if(list.position==null) list.position = "-";

        squadsHTML += `     
              <tr>
                  <td>${list.name}</td>
                  <td>${list.role}</td>
                  <td>${list.position}</td>
              </tr>
            `;
      });
      document.getElementById("squadList").innerHTML = squadsHTML;
  })
  .catch(error);
}

//AMBIL DATA ALL MATCH LIGA INGGRIS
const getMatch = () => {

  return new Promise(function(resolve,reject){

  const urlMatch = "competitions/2021/matches";

  getUrl(urlMatch)
  .then(status)
  .then(json)
  .then(dataMatchResponse => {

      let allMatchHTML = "";
      dataMatchResponse.matches.forEach(function(match) {
        allMatchHTML += `
          <tr>
              <td class="pink accent-3">${match.homeTeam.name}</td>
              <td>${match.score.fullTime.homeTeam == null ? "-" : match.score.fullTime.homeTeam}</td>
              <td>vs</td>
              <td>${match.score.fullTime.awayTeam == null ? "-" : match.score.fullTime.awayTeam}</td>
              <td class="pink accent-3">${match.awayTeam.name}</td>
              <td>MW ${match.matchday}</td>
              <td><a href="./details.html?id=${match.id}"><i class="small material-icons white-text">call_made</i></a></td>
          </tr>
            `;
      });
      document.getElementById("allMatch").innerHTML = allMatchHTML;
      resolve(dataMatchResponse);
    })
      .catch(error);
  })
}

const getMatchData = () => {

  let curMatch = getMatch();
  curMatch.then( data => {
    //AMBIL DATA CURRENT MATCH
    const getMatchday = data.matches[0].season.currentMatchday;
    const dataFixturesFilter = data.matches.filter(matchData => {
      return matchData.matchday == getMatchday;
    });

    let matchWeekHTML = `<p>Matchweek : <b>${getMatchday}</b></p>`;
    document.getElementById("matchWeek").innerHTML = matchWeekHTML;
            
    let matchHTML = "";
      dataFixturesFilter.forEach(function(match) {
        matchHTML += `
          <tr>
            <td class="pink accent-3">${match.homeTeam.name}</td>
            <td>${match.score.fullTime.homeTeam == null ? "-" : match.score.fullTime.homeTeam}</td>
            <td>vs</td>
            <td>${match.score.fullTime.awayTeam == null ? "-" : match.score.fullTime.awayTeam}</td>
            <td class="pink accent-3">${match.awayTeam.name}</td>
            <td><a href="./details.html?id=${match.id}"><i class="small material-icons white-text">call_made</i></a></td>
          </tr>
          `;
        });
        document.getElementById("currentMatch").innerHTML = matchHTML;
    
    //AMBIL DATA LAST RESULT
    const getLastResult = getMatchday - 1;
    const dataResultFilter = data.matches.filter(matchData => {
      return matchData.matchday == getLastResult;
    });

    let matchResultHTML = `<p>Matchweek : <b>${getLastResult}</b></p>`;
    document.getElementById("matchLastWeek").innerHTML = matchResultHTML;

    let resultHTML = "";
      dataResultFilter.forEach(function(match) {
        resultHTML += `
          <tr>
            <td class="pink accent-3">${match.homeTeam.name}</td>
            <td>${match.score.fullTime.homeTeam == null ? "-" : match.score.fullTime.homeTeam}</td>
            <td>vs</td>
            <td>${match.score.fullTime.awayTeam == null ? "-" : match.score.fullTime.awayTeam}</td>
            <td class="pink accent-3">${match.awayTeam.name}</td>
            <td><a href="./details.html?id=${match.id}"><i class="small material-icons white-text">call_made</i></a></td>
          </tr>
          `;
        });
        document.getElementById("lastMatch").innerHTML = resultHTML;
    })
}

//AMBIL DATA DETAIL MATCH BY ID
const getMatchById = () => {

  return new Promise(function(resolve,reject){

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  const urlMatchById = `matches/${idParam}`;

  if ('caches' in window) {
    caches.match(base_url + urlMatchById)
    .then(status)
    .then(json)
    .then( data => {
          let dateSeasonStart = new Date(data.match.season.startDate).getFullYear();
          let dateSeasonEnd = new Date(data.match.season.endDate).getFullYear();
          let jsonDate = `\"${data.match.utcDate}\"`;
          let dateString = JSON.parse(jsonDate);
          let newDate = new Date(dateString);
          let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          function appendLeadingZeroes(n) {
            if (n <= 9) {
              return "0" + n;
            }
              return n
          }

          let dateMatch= `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()} ${appendLeadingZeroes(newDate.getHours())}:${appendLeadingZeroes(newDate.getMinutes())} WIB`;

          let matchDetailsHTML = `
                  <div class="col l6 m12 s12">
                      <div class="card">
                          <div class="card-content center pink accent-3 white-text">
                              <h5>${data.match.competition.name}</h5>
                              <p>Season ${dateSeasonStart}/${dateSeasonEnd}</p>
                              <p>Matchday ${data.match.matchday}</p>
                          </div>
                          <div class="card-action indigo darken-4 white-text">
                              <table class="centered">
                                  <tbody>
                                    <tr>
                                        <td><i class="material-icons">date_range</i></td>
                                        <td>${dateMatch}</td>
                                    </tr>
                                    <tr>
                                        <td><i class="material-icons">place</i></td>
                                        <td>${data.match.venue}</td>
                                    </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
                  <div class="col l12 m12 s12">
                    <div class="card">
                        <div class="card-content center pink accent-3 white-text">
                            <h5>Match Details</h5>
                        </div> 
                        <div class="card-action indigo darken-4 white-text">
                            <table class="centered">
                              <tbody>
                              <tr>
                                  <td><b>${data.match.homeTeam.name}</b></td>
                                  <td class="indigo darken-3"><b>vs</b></td>
                                  <td><b>${data.match.awayTeam.name}</b></td>
                              </tr>
                              <tr>
                                  <td>${data.match.score.halfTime.homeTeam == null ? "-" : data.match.score.halfTime.homeTeam}</td>
                                  <td class="indigo darken-3">Half Time</td>
                                  <td>${data.match.score.halfTime.awayTeam == null ? "-" : data.match.score.halfTime.awayTeam}</td>
                              </tr>
                              <tr>
                                  <td>${data.match.score.fullTime.homeTeam == null ? "-" : data.match.score.fullTime.homeTeam}</td>
                                  <td class="indigo darken-3">Full Time</td>
                                  <td>${data.match.score.fullTime.awayTeam == null ? "-" : data.match.score.fullTime.awayTeam}</td>
                              </tr>
                              <tr>
                                  <td></td>
                                  <td class="indigo darken-3"><b>Head to Head</b></td>
                                  <td></td>
                              </tr>
                              <tr>
                                  <td></td>
                                  <td class="indigo darken-3">Game Played : ${data.head2head.numberOfMatches}</td>
                                  <td></td>
                              </tr>
                              <tr>
                                  <td>Won : ${data.head2head.homeTeam.wins}</td>
                                  <td class="indigo darken-3">Drawn : ${data.head2head.homeTeam.draws}</td>
                                  <td>Won : ${data.head2head.awayTeam.wins}</td>
                              </tr>
                              <tr>
                                  <td></td>
                                  <td class="indigo darken-3">Total Goals : ${data.head2head.totalGoals}</td>
                                  <td></td>
                              </tr>
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
          document.getElementById("headerDetails").innerHTML = matchDetailsHTML;
          resolve(data);
        });
        
      }

  getUrl(urlMatchById)
    .then(status)
    .then(json)
    .then( data => {

      let dateSeasonStart = new Date(data.match.season.startDate).getFullYear();
      let dateSeasonEnd = new Date(data.match.season.endDate).getFullYear();
      let jsonDate = `\"${data.match.utcDate}\"`;
      let dateString = JSON.parse(jsonDate);
      let newDate = new Date(dateString);
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      function appendLeadingZeroes(n) {
        if (n <= 9) {
          return "0" + n;
        }
          return n
      }

      let dateMatch= `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()} ${appendLeadingZeroes(newDate.getHours())}:${appendLeadingZeroes(newDate.getMinutes())} WIB`;

      let matchDetailsHTML = `
              <div class="col l6 m12 s12">
                  <div class="card">
                      <div class="card-content center pink accent-3 white-text">
                          <h5>${data.match.competition.name}</h5>
                          <p>Season ${dateSeasonStart}/${dateSeasonEnd}</p>
                          <p>Matchday ${data.match.matchday}</p>
                      </div>
                      <div class="card-action indigo darken-4 white-text">
                          <table class="centered">
                              <tbody>
                                <tr>
                                    <td><i class="material-icons">date_range</i></td>
                                    <td>${dateMatch}</td>
                                </tr>
                                <tr>
                                    <td><i class="material-icons">place</i></td>
                                    <td>${data.match.venue}</td>
                                </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div class="col l12 m12 s12">
                <div class="card">
                    <div class="card-content center pink accent-3 white-text">
                        <h5>Match Details</h5>
                    </div> 
                    <div class="card-action indigo darken-4 white-text">
                        <table class="centered">
                          <tbody>
                          <tr>
                              <td><b>${data.match.homeTeam.name}</b></td>
                              <td class="indigo darken-3"><b>vs</b></td>
                              <td><b>${data.match.awayTeam.name}</b></td>
                          </tr>
                          <tr>
                              <td>${data.match.score.halfTime.homeTeam == null ? "-" : data.match.score.halfTime.homeTeam}</td>
                              <td class="indigo darken-3">Half Time</td>
                              <td>${data.match.score.halfTime.awayTeam == null ? "-" : data.match.score.halfTime.awayTeam}</td>
                          </tr>
                          <tr>
                              <td>${data.match.score.fullTime.homeTeam == null ? "-" : data.match.score.fullTime.homeTeam}</td>
                              <td class="indigo darken-3">Full Time</td>
                              <td>${data.match.score.fullTime.awayTeam == null ? "-" : data.match.score.fullTime.awayTeam}</td>
                          </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
          document.getElementById("headerDetails").innerHTML = matchDetailsHTML;
          resolve(data);
    });
  })
  // .catch(error);
}

//AMBIL DATA MATCH DISIMPAN KE WATCHLIST
const getSavedWatchList = () => {
  getAll()
  .then(addedWatchList => {

    let watchListHTML = "";
    

    addedWatchList.forEach( watchlist => {
        watchListHTML += `
        <tr>
          <td class="pink accent-3">${watchlist.homeTeam.name}</td>
          <td>${watchlist.score.fullTime.homeTeam == null ? "-" : watchlist.score.fullTime.homeTeam}</td>
          <td>vs</td>
          <td>${watchlist.score.fullTime.awayTeam == null ? "-" : watchlist.score.fullTime.awayTeam}</td>
          <td class="pink accent-3">${watchlist.awayTeam.name}</td>
          <td><a href="./details.html?id=${watchlist.id}&saved=true"><i class="small material-icons white-text">call_made</i></a></td>
        </tr>
        `;
    })
    const blankData = document.querySelector('.blank');
    if(watchListHTML !== ""){
      blankData.style.display = 'none';
    }
    document.getElementById("saved").innerHTML = watchListHTML;
  });
}

//AMBIL DATA DETAIL MATCH YANG DISIMPAN DI WATCHLIST
const getSavedMatchById = () => {
  return new Promise(function(resolve,reject){

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  
  getById(idParam).then( data => {
    
      let dateSeasonStart = new Date(data.season.startDate).getFullYear();
      let dateSeasonEnd = new Date(data.season.endDate).getFullYear();
      let jsonDate = `\"${data.utcDate}\"`;
      let dateString = JSON.parse(jsonDate);
      let newDate = new Date(dateString);
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      function appendLeadingZeroes(n) {
        if (n <= 9) {
          return "0" + n;
        }
          return n
      }

      let dateMatch= `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()} ${appendLeadingZeroes(newDate.getHours())}:${appendLeadingZeroes(newDate.getMinutes())} WIB`;

      let matchDetailsHTML = `
              <div class="col l6 m12 s12">
                  <div class="card">
                      <div class="card-content center pink accent-3 white-text">
                          <h5>${data.competition.name}</h5>
                          <p>Season ${dateSeasonStart}/${dateSeasonEnd}</p>
                          <p>Matchday ${data.matchday}</p>
                      </div>
                      <div class="card-action indigo darken-4 white-text">
                          <table class="centered">
                              <tbody>
                                <tr>
                                    <td><i class="material-icons">date_range</i></td>
                                    <td>${dateMatch}</td>
                                </tr>
                                <tr>
                                    <td><i class="material-icons">place</i></td>
                                    <td>${data.venue}</td>
                                </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div class="col l12 m12 s12">
                <div class="card">
                    <div class="card-content center pink accent-3 white-text">
                        <h5>Match Details</h5>
                    </div> 
                    <div class="card-action indigo darken-4 white-text">
                        <table class="centered">
                          <tbody>
                          <tr>
                              <td><b>${data.homeTeam.name}</b></td>
                              <td class="indigo darken-3"><b>vs</b></td>
                              <td><b>${data.awayTeam.name}</b></td>
                          </tr>
                          <tr>
                              <td>${data.score.halfTime.homeTeam == null ? "-" : data.score.halfTime.homeTeam}</td>
                              <td class="indigo darken-3">Half Time</td>
                              <td>${data.score.halfTime.awayTeam == null ? "-" : data.score.halfTime.awayTeam}</td>
                          </tr>
                          <tr>
                              <td>${data.score.fullTime.homeTeam == null ? "-" : data.score.fullTime.homeTeam}</td>
                              <td class="indigo darken-3">Full Time</td>
                              <td>${data.score.fullTime.awayTeam == null ? "-" : data.score.fullTime.awayTeam}</td>
                          </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
          document.getElementById("headerDetails").innerHTML = matchDetailsHTML; 
          resolve(data);
    })
  })
}
