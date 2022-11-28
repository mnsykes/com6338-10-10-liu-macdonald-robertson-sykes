const playerTableBody = document.querySelector(".player-table__body");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "nba-player-individual-stats.p.rapidapi.com"
	}
};

fetch("https://nba-player-individual-stats.p.rapidapi.com/players", options)
	.then((response) => response.json())
	.then((response) => {
		response.map((player) => {
			if (player.team !== null) {
				console.log(player);
				renderPlayers(player);
			}
		});
	})
	.catch((err) => console.error(err));

// const options = {
// 	method: "GET",
// 	headers: {
// 		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
// 		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
// 	}
// };

// fetch(`https://api-nba-v1.p.rapidapi.com/teams`, options)
// 	.then((response) => response.json())
// 	.then((teams) => {
// 		console.log(teams);
// 		teams.response.map((t) => {
// 			if (t.nbaFranchise) {
// 				getAllPlayers(t);
// 			}
// 		});
// 	})
// 	.catch((err) => console.error(err));

// const getAllPlayers = async ({ id, code }) => {
// 	try {
// 		const res = await fetch(
// 			`https://api-nba-v1.p.rapidapi.com/players?team=${id}&season=2022`,
// 			options
// 		);
// 		if (res.status !== 200) throw new Error("Error");
// 		const data = await res.json();

// 		// rookies have too many null values in this api
// 		// so we will filter them out if start = 0
// 		// filter out non-active players
// 		data.response.map((player) => {
// 			if (player.nba.start > 0 && player.leagues.standard.active) {
// 				renderPlayers(player, code);
// 			}
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
const renderPlayers = ({
	age,
	careerBlocks,
	careerPercentageFieldGoal,
	careerPercentageFreethrow,
	careerPercentageThree,
	careerPoints,
	careerRebounds,
	careerTurnovers,
	carrerAssists,
	dateOfBirth,
	firstName,
	height,
	id,
	jerseyNumber,
	lastName,
	position,
	team,
	weight
}) => {
	let playerRow = document.createElement("tr");
	playerRow.innerHTML = `
		<td class="freeze-col" data-sort="name">
			<a href="player.html?id=${id}">${firstName} ${lastName}</a>
		<td>
		<td>${jerseyNumber}</td>
		<td>${team}</td>
		<td>${position}</td>
		<td>${height}</td>
		<td>${weight}</td>
		<td>${dateOfBirth}</td>
		<td>${age}</td>
		<td>${careerPoints}</td>
		<td>${careerRebounds}</td>
		<td>${carrerAssists}</td>
		<td>${careerBlocks}</td>
		<td>${careerTurnovers}</td>
		<td>${careerPercentageFieldGoal}</td>
		<td>${careerPercentageFreethrow}</td>
		<td>${careerPercentageThree}</td>
		
	`;
	playerTableBody.appendChild(playerRow);
};
// const renderPlayers = async (
// 	{
// 		college,
// 		firstname,
// 		id,
// 		lastname,
// 		birth: { date, country },
// 		height: { feets, inches },
// 		leagues: {
// 			standard: { jersey, pos }
// 		},
// 		nba: { pro },
// 		weight: { pounds }
// 	},
// 	code
// ) => {
// 	// players who wear #0 have null value for jersey number
// 	if (jersey == null) {
// 		jersey = 0;
// 	}

// 	// api is missing height and weight data for many players
// 	// create dummy data for these instances
// 	switch (pos) {
// 		case "G":
// 			if (feets == null && inches == null) {
// 				feets = 6;
// 				inches = 3;
// 			}

// 			if (pounds == null) {
// 				pounds = 190;
// 			}
// 			break;
// 		case "F":
// 			if (feets == null && inches == null) {
// 				feets = 6;
// 				inches = 7;
// 			}

// 			if (pounds == null) {
// 				pounds = 220;
// 			}
// 			break;
// 		case "C":
// 			if (feets == null && inches == null) {
// 				feets = 6;
// 				inches = 11;
// 			}

// 			if (pounds == null) {
// 				pounds = 250;
// 			}
// 			break;
// 		case "G-F":
// 		case "F-G":
// 			if (feets == null && inches == null) {
// 				feets = 6;
// 				inches = 6;
// 			}

// 			if (pounds == null) {
// 				pounds = 220;
// 			}
// 			break;
// 		case "C-F":
// 		case "F-C":
// 			if (feets == null && inches == null) {
// 				feets = 6;
// 				inches = 10;
// 			}

// 			if (pounds == null) {
// 				pounds = 240;
// 			}
// 			break;
// 	}
// 	let playerRow = document.createElement("tr");
// 	playerRow.innerHTML = `
// 		<td class="freeze-col" data-sort="name">
// 			<a href="player.html?id=${id}">${firstname} ${lastname}</a>
// 		<td>
// 		<td>${jersey}</td>
// 		<td>${code}</td>
// 		<td>${pos}</td>
// 		<td>${feets}'${inches}"</td>
// 		<td>${pounds}lbs</td>
// 		<td>${date}</td>
// 		<td>${country}</td>
// 		<td>${pro}</td>
// 		<td>${college}</td>
// 	`;
// 	playerTableBody.appendChild(playerRow);
// };

//
