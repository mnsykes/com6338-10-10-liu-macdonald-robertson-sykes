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
