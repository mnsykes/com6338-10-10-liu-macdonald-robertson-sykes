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
		let t = teams.response;
		t.map((team) => {
			if (team.nbaFranchise) {
				teamIdArr.push(team.id);
			}
		});
	})
	.catch((err) => console.error(err));
// const getTotals = ({
// 	assists,
// 	blocks,
// 	defReb,
// 	fga,
// 	fgm,
// 	fgp,
// 	fta,
// 	ftm,
// 	ftp,
// 	min,
// 	offReb,
// 	pFouls,
// 	plusMinus,
// 	points,
// 	steals,
// 	totReb,
// 	tpa,
// 	tpm,
// 	tpp,
// 	turnovers
// }) => {};
const getPlayer = (id) => {};

const getAllPlayers = async () => {
	try {
		const res = await fetch(
			`https://api-nba-v1.p.rapidapi.com/players/statistics/?id=236&season=2022`,
			options
		);
		if (res.status !== 200) throw new Error("Error");
		const data = await res.json();
		data.response.map((player) => {
			console.log(player);

			// renderPlayers(player);
		});
	} catch (err) {
		console.log(err);
	}
};
// const renderPlayers = ({ player: { firstname, lastname } }) => {
// 	console.log(firstname, lastname);
// };
getAllPlayers();

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
