<<<<<<< Updated upstream
// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
let playerId = params.get("id");
let playerName = params.get("lname");
let playerContent = document.querySelector("#content");
let gameTableBody = document.querySelector(".game-table__body");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};

let query = "";
if (playerName) {
	query = `search=${playerName}`;
} else if (playerId) {
	query = `id=${playerId}`;
}

const playerTableBody = document.querySelector(".player-table__body");
fetch(`https://api-nba-v1.p.rapidapi.com/players?${query}`, options)
	.then((response) => response.json())
	.then((player) => {
		player.response.map((p) => {
			console.log(p);
			let playerInfo = document.createElement("div");
			playerInfo.className = "player-info";
			playerInfo.innerHTML = `
                <h2>#${p.leagues.standard.jersey} <a href="player.html?id=${p.id}">${p.firstname} ${p.lastname}</a></h2>
                <p><b>Position:</b> ${p.leagues.standard.pos}</p>
                <p><b>College:</b> ${p.college}</p>
                <p><b>Height:</b> ${p.height.feets}'${p.height.inches}"</p>
                <p><b>Weight:</b> ${p.weight.pounds} lbs</p>
                <p><b>Years pro:</b> ${p.nba.pro}</p>
            `;
			playerContent.appendChild(playerInfo);
		});
	})
	.catch((err) => console.error(err));

fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${playerId}&season=2022`, options)
	.then((res) => res.json())
	.then((stats) => {
		stats.response.map((s, key) => {
			let tableRow = document.createElement("tr");
			tableRow.innerHTML = `
                <td>
                    <a href="team.html?id=opponentId"></a>
                <td>
                <td>
                    ${s.min}
                </td>
                <td>
                    ${s.fgm}
                </td>
                <td>
                    ${s.fga}
                </td>
                <td>
                    ${s.fgp}
                </td>
                <td>
                    ${s.tpm}
                </td>
                <td>
                    ${s.tpa}
                </td>
                <td>
                    ${s.tpp}
                </td>
                <td>
                    ${s.ftm}
                </td>
                <td>
                    ${s.fta}
                </td>
                <td>
                    ${s.ftp}
                </td>
                <td>
                    ${s.fgm}
                </td>
                <td>
                    ${s.steals}
                </td>
                <td>
                    ${s.blocks}
                </td>
                <td>
                    ${s.turnovers}
                </td>
                <td>
                    ${s.pFouls}
                </td>
                <td>
                    ${s.plusMinus}
                </td>
                <td>
                    ${s.offReb}
                </td>
                <td>
                    ${s.defReb}
                </td>
                <td>
                    ${s.totReb}
                </td>
                <td>
                    ${s.assists}
                </td>
                <td>
                    ${s.points}
                </td>
            `;
			gameTableBody.appendChild(tableRow);
		});
	})
	.catch((err) => console.error(err));
=======
const form = document.querySelector("form");
const indvPlayerTblBody = document.getElementById("indv-player-table");

form.onsubmit = function (e) {
	e.preventDefault()
	var searchTerm = this.indvPlayerName.value
	if (!searchTerm) return
	form.indvPlayerName.value = " "
	fetch("https://api-nba-v1.p.rapidapi.com/players?id=265", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
			"x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx"
		}
	})
		.then(response => {
			console.log(response);
		})
		.then((players) => {
			//console.log(players.response)
			players.response.map((players, key) => {
				let indvPlayerId = player.id;
				let indvPlayerName = `${players.firstname} ${players.lastname}`;
				if (player.leagues.standard.active) {
					let tbleRow = document.createElement("tr");
					tblRow.innerHTML = `
			<tr>
			${players.firstname} ${players.lastname}
			</tr>
			<tr> 
			${players.birth.date}
			</tr> 
			<tr> 
			${players.height}
			</tr> 
			<tr> 
			${players.weight.pounds}
			</tr> 
			<tr> 
			${players.college}
			</tr> 
			<tr> 
			${players.nba.start}
			</tr> 
			<tr> 
			${players.nba.pro}
			</tr> 
			`
					indvPlayerTblBody.appendChild(tbleRow);
				}
			})
		})
		.catch(err => {
			console.log(err);
		});
}

const statsMostCurrentGameTable = document.getElementById("stats-most-current-game")

form.onsubmit = function (e) {
	e.preventDefault()
	var searchTerm = this.indvPlayerName.value
	if (!searchTerm) return
	form.indvPlayerName.value = " "
	fetch("https://api-nba-v1.p.rapidapi.com/players/statistics?season=2020&id=734", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
			"x-rapidapi-key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c"
		}
	})
		.then(response => {
			console.log(response);
		})
		.then((players) => {
			//console.log(players.response)
			players.response.map((players, key) => {
				if (indvPlayerId === player.id) {
					let tbleRow = document.createElement("tr");
					tblRow.innerHTML = `
			<tr>
			${players.statistics.points} 
			</tr>
			<tr> 
			${players.statistics.pos}
			</tr> 
			<tr> 
			${players.statistics.totReb}
			</tr> 
			<tr> 
			${players.statistics.offReb}
			</tr> 
			<tr> 
			${players.statistics.defReb}
			</tr> 
			<tr> 
			${players.statistics.assists}
			</tr> 
			<tr> 
			${players.statistics.steals}
			</tr> 
			<tr> 
			${players.statistics.turnovers}
			</tr> 
			<tr> 
			${players.statistics.blocks}
			</tr> 
			`;
					statsMostCurrentGameTable.appendChild(tbleRow);
				}
			})
		})
		.catch(err => {
			console.log(err);
		});
}

>>>>>>> Stashed changes
