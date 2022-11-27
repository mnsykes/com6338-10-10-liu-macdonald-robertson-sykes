const playerTableBody = document.querySelector(".player-table__body");
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};
const teamIdArr = [];
fetch(`https://api-nba-v1.p.rapidapi.com/teams`, options)
	.then((response) => response.json())
	.then((teams) => {
		// console.log(teams);
		teams.response.map((t) => {
			if (t.nbaFranchise) {
				getAllPlayers(t);
			}
		});
	})
	.catch((err) => console.error(err));

const getAllPlayers = async ({ id }) => {
	try {
		const res = await fetch(
			`https://api-nba-v1.p.rapidapi.com/players?team=${id}&season=2022`,
			options
		);
		if (res.status !== 200) throw new Error("Error");
		const data = await res.json();
		// console.log(data);
		data.response.map((player) => {
			if (player.nba.start > 0) {
				// console.log(player);
				renderPlayers(player);
			}
		});
	} catch (err) {
		console.log(err);
	}
};

const renderPlayers = async ({ id }) => {
	try {
		const res = await fetch(
			`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${id}&season=2022`,
			options
		);
		if (res.response !== 200) return;
		const indPlayer = await res.json();
		indPlayer.map((p) => {
			if (p.id == 279) {
				console.log(p);
			}
		});
	} catch (err) {
		console.log(err.message);
	}
	// let playerRow = document.createElement("tr");
	// playerRow.innerHTML = `
	// <td>
	// <a href="player.html?id=${id}">${firstname} ${lastname}</a>
	// <td>
	// `;
	// playerTableBody.appendChild(playerRow);
};

const getPlayer = async ({ id }) => {
	try {
		const res = await fetch(
			`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${id}&season=2022`,
			options
		);
		if (res.response !== 200) return;
		const indPlayer = await res.json();
		console.log(indPlayer);
	} catch (err) {
		console.log(err.message);
	}
};

const getTotals = ({
	assists,
	blocks,
	defReb,
	fga,
	fgm,
	fgp,
	fta,
	ftm,
	ftp,
	min,
	offReb,
	pFouls,
	plusMinus,
	points,
	steals,
	totReb,
	tpa,
	tpm,
	tpp,
	turnovers
}) => {};

// fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?team=2&season=2022`, options)
// 	.then((res) => res.json())
// 	.then((stats) => {
// 		stats.response.map((s, key) => {
// 			let tableRow = document.createElement("tr");
// 			tableRow.innerHTML = `
//                 <td>
//                     <a href="team.html?id=opponentId"></a>
//                 <td>
//                 <td>
//                     ${s.min}
//                 </td>
//                 <td>
//                     ${s.fgm}
//                 </td>
//                 <td>
//                     ${s.fga}
//                 </td>
//                 <td>
//                     ${s.fgp}
//                 </td>
//                 <td>
//                     ${s.tpm}
//                 </td>
//                 <td>
//                     ${s.tpa}
//                 </td>
//                 <td>
//                     ${s.tpp}
//                 </td>
//                 <td>
//                     ${s.ftm}
//                 </td>
//                 <td>
//                     ${s.fta}
//                 </td>
//                 <td>
//                     ${s.ftp}
//                 </td>
//                 <td>
//                     ${s.fgm}
//                 </td>
//                 <td>
//                     ${s.steals}
//                 </td>
//                 <td>
//                     ${s.blocks}
//                 </td>
//                 <td>
//                     ${s.turnovers}
//                 </td>
//                 <td>
//                     ${s.pFouls}
//                 </td>
//                 <td>
//                     ${s.plusMinus}
//                 </td>
//                 <td>
//                     ${s.offReb}
//                 </td>
//                 <td>
//                     ${s.defReb}
//                 </td>
//                 <td>
//                     ${s.totReb}
//                 </td>
//                 <td>
//                     ${s.assists}
//                 </td>
//                 <td>
//                     ${s.points}
//                 </td>
//             `;
// 			gameTableBody.appendChild(tableRow);
// 		});
// 	})
// 	.catch((err) => console.error(err));
