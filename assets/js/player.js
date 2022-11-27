// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
let playerId = params.get("id");
let playerName = params.get("lname");
let playerContent = document.querySelector("#content");
let totalsTableBody = document.querySelector(".totals-table__body");
let averagesTableBody = document.querySelector(".averages-table__body");
let gameTableBody = document.querySelector(".game-table__body");
let tMp = 0;
let tFgm = 0;
let tFga = 0;
let tFgp = 0;
let tTpm = 0;
let tTpa = 0;
let tTpp = 0;
let tFtm = 0;
let tFta = 0;
let tFtp = 0;
let tSteals = 0;
let tBlocks = 0;
let tTurnovers = 0;
let tPFouls = 0;
let tOffReb = 0;
let tDefReb = 0;
let tTotReb = 0;
let tPoints = 0;
let tRebs = 0;
let tAsst = 0;
let aMp = 0;
let aFgm = 0;
let aFga = 0;
let aFgp = 0;
let aTpm = 0;
let aTpa = 0;
let aTpp = 0;
let aFtm = 0;
let aFta = 0;
let aFtp = 0;
let aSteals = 0;
let aBlocks = 0;
let aTurnovers = 0;
let aPFouls = 0;
let aOffReb = 0;
let aDefReb = 0;
let aTotReb = 0;
let aPoints = 0;
let aRebs = 0;
let aAsst = 0;

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
			// console.log(p);
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
		let totalsRow = document.createElement("tr");
		let averagesRow = document.createElement("tr");

		let gameCount = 0;
		stats.response.map((s) => {
			gameCount++;
			// console.log(s);
			tMp += parseInt(s.min);
			tFgm += s.fgm;
			tFga += s.fga;
			tTpm += s.tpm;
			tTpa += s.tpa;
			tFtm += s.ftm;
			tFta += s.fta;
			tSteals += s.steals;
			tBlocks += s.blocks;
			tTurnovers += s.turnovers;
			tPFouls += s.pFouls;
			tOffReb += s.offReb;
			tDefReb += s.defReb;
			tTotReb += s.totReb;
			tAsst += s.assists;
			tPoints += s.points;
			let gameRow = document.createElement("tr");
			let opponent = "";
			let opponentId = "";
			let opponentLogo = "";
			fetch(`https://api-nba-v1.p.rapidapi.com/games/statistics?id=${s.game.id}`, options)
				.then((response) => response.json())
				.then((game) => {
					// console.log(game);
					if (game.response[0].team.id !== s.team.id) {
						opponent = game.response[0].team.code;
						opponentId = game.response[0].team.id;
						opponentLogo = game.response[0].team.logo;
						console.log(opponent);
					} else {
						opponent = game.response[1].team.code;
						opponentId = game.response[1].team.id;
						opponentLogo = game.response[1].team.logo;
						console.log(opponent);
					}
					gameRow.innerHTML = `
                
                <td class="freeze-col">
                    <span><a href="team.html?id=${opponentId}"><img src="${opponentLogo}" alt="${opponent} logo" style="width: 16px; height: 16px;></a></span><a href="team.html?id=${opponentId}">${opponent}</a>
                </td>
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
					gameTableBody.appendChild(gameRow);
				});

			aMp = (tMp / gameCount).toFixed(1);
			aFgm = (tFgm / gameCount).toFixed(1);
			aFga = (tFga / gameCount).toFixed(1);
			aFgp = ((aFgm / aFga) * 100).toFixed(1);
			aTpm = (tTpm / gameCount).toFixed(1);
			aTpa = (tTpa / gameCount).toFixed(1);
			tTpp = ((tTpm / tTpa) * 100).toFixed(1);
			aFtm = (tFtm / gameCount).toFixed(1);
			aFta = (tFta / gameCount).toFixed(1);
			aFtp = ((aFtm / aFta) * 100).toFixed(1);
			aSteals = (tSteals / gameCount).toFixed(1);
			aBlocks = (tBlocks / gameCount).toFixed(1);
			aTurnovers = (tTurnovers / gameCount).toFixed(1);
			aPFouls = (tPFouls / gameCount).toFixed(1);
			aOffReb = (tOffReb / gameCount).toFixed(1);
			aDefReb = (tDefReb / gameCount).toFixed(1);
			aTotReb = (tTotReb / gameCount).toFixed(1);
			aAsst = (tAsst / gameCount).toFixed(1);
			aPoints = (tPoints / gameCount).toFixed(1);

			tFgp = ((tFgm / tFga) * 100).toFixed(1);
			tFtp = ((tFtp / tFta) * 100).toFixed(1);
			tTpp = ((tTpp / tTpa) * 100).toFixed(1);
			totalsRow.innerHTML = `
			    <td>
			        ${tMp}
			    </td>
			    <td>
			        ${tFgm}
			    </td>
			    <td>
			        ${tFga}
			    </td>
                <td>
                    ${tFgp}
                </td>
			    <td>
			        ${tTpm}
			    </td>
			    <td>
			        ${tTpa}
			    </td>
                <td>
                    ${tTpp}
                </td>
			    <td>
			        ${tFtm}
			    </td>
			    <td>
			        ${tFta}
			    </td>
                <td>
                    ${tFtp}
                </td>
			    <td>
			        ${tSteals}
			    </td>
			    <td>
			        ${tBlocks}
			    </td>
			    <td>
			        ${tTurnovers}
			    </td>
			    <td>
			        ${tPFouls}
			    </td>
			    <td>
			        ${tOffReb}
			    </td>
			    <td>
			        ${tDefReb}
			    </td>
			    <td>
			        ${tTotReb}
			    </td>
			    <td>
			        ${tAsst}
			    </td>
			    <td>
			        ${tPoints}
			    </td>
        `;
			totalsTableBody.appendChild(totalsRow);

			averagesRow.innerHTML = `
			    <td>
			        ${aMp}
			    </td>
			    <td>
			        ${aFgm}
			    </td>
			    <td>
			        ${aFga}
			    </td>
                <td>
                    ${aFgp}
                </td>
			    <td>
			        ${aTpm}
			    </td>
			    <td>
			        ${aTpa}
			    </td>
                <td>
                    ${aTpp}
                </td>
			    <td>
			        ${aFtm}
			    </td>
			    <td>
			        ${aFta}
			    </td>
                <td>
                    ${aFtp}
                </td>
			    <td>
			        ${aSteals}
			    </td>
			    <td>
			        ${aBlocks}
			    </td>
			    <td>
			        ${aTurnovers}
			    </td>
			    <td>
			        ${aPFouls}
			    </td>
			    <td>
			        ${aOffReb}
			    </td>
			    <td>
			        ${aDefReb}
			    </td>
			    <td>
			        ${aTotReb}
			    </td>
			    <td>
			        ${aAsst}
			    </td>
			    <td>
			        ${aPoints}
			    </td>
		`;
			averagesTableBody.appendChild(averagesRow);
		});
	})
	.catch((err) => console.error(err));

const getOpponent = ({ id }) => {};
