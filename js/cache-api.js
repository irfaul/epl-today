//BASE URL API
const base_url = "https://api.football-data.org/v2/";

const cacheGetScorers = () => {

    const urlScorers = "competitions/2021/scorers";
  
    if ('caches' in window) {
      caches.match(base_url + urlScorers)
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
}

const cacheGetStandings = () => {

    const urlStandings = "competitions/2021/standings";
  
    if ('caches' in window) {
      caches.match(base_url + urlStandings)
      .then(status)
      .then(json)
      .then(data => {
            let matchdayHTML = "";
            matchdayHTML = `<p>Matchday ke : <b>${data.season.currentMatchday}</b></p>`;
            document.getElementById("matchday").innerHTML = matchdayHTML;
  
            let standingsHTML = "";
            data.standings[0].table.forEach(tabel => {
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
    }

const cacheGetTeams = () => {

  const urlTeams = "competitions/2021/teams";

  if ('caches' in window) {
    caches.match(base_url + urlTeams)
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
}

const cacheGetTeamsById = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const urlTeamsById = `teams/${idParam}`;
  
    if ('caches' in window) {
      caches.match(base_url + urlTeamsById)
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
            data.squad.forEach( list => {
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
}

const cacheGetMatch = () => {

    return new Promise(function(resolve,reject){
  
    const urlMatch = "competitions/2021/matches";
  
    if ('caches' in window) {
      caches.match(base_url + urlMatch)
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
        }
    })
}

const cacheGetMatchData = () => {

    let curMatch = cacheGetMatch();
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

