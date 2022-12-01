// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
let playerId = params.get("id");
let season = params.get("season");
let playerName = params.get("lname");
let flgSearch = false;

const playerContent = document.querySelector("#content");
const searchTableBody = document.querySelector(".search-table__body");
const averagesTableBody = document.querySelector(".averages-table__body");
const gameTableBody = document.querySelector(".game-table__body");
const seasonAverages = document.querySelector(".season-averages");
const careerAverages = document.querySelector(".career-averages");
const searchForm = document.querySelector(".search-form");
const playerSearch = document.querySelector(".player-search");
const searchResults = document.querySelector(".search-results");
const playerSearchForm = document.querySelector(".player-search");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "nba-player-individual-stats.p.rapidapi.com"
	}
};

searchForm.onsubmit = async (e) => {
	e.preventDefault();
	flgSearch = true;
	let playerName = playerSearch.value.trim();
	if (!playerName) return;
	clearForm();
	location = `player.html?lname=${playerName}`;
};

let query = "";
if (playerName) {
	query = `lastname?lastname=${playerName}`;
} else if (playerId) {
	query = playerId;
}

if (!season) season = 2022;

if (playerName) flgSearch = true;

const playerTableBody = document.querySelector(".player-table__body");

const getPlayer = async () => {
	try {
		const res = await fetch(
			`https://nba-player-individual-stats.p.rapidapi.com/players/${query}`,
			options
		);
		if (res.status !== 200) throw new Error("Player not found");
		const player = await res.json();

		if (flgSearch) {
			player.map((p) => {
				seasonAverages.style.display = "none";
				if (p.team !== null && p.headShotUrl !== null) renderSearchResults(p);
			});
		} else {
			searchResults.style.display = "none";
			renderProfile(player);
		}
	} catch (err) {
		console.log(err.message);
	}
};

const getTeam = async (teamName) => {
	try {
		const res = await fetch(`https://nba-player-individual-stats.p.rapidapi.com/teams`, options);
		if (res.status !== 200) throw new Error("Team not found");
		const teams = await res.json();

		for (let t of teams) {
			if (teamName === t.name) {
				teamId = t.id;
				teamLogo = t.teamLogoUrl;
			}
		}
	} catch (err) {
		console.log(err.messge);
	}
};

const renderSearchResults = ({
	jerseyNumber,
	firstName,
	lastName,
	position,
	id,
	team,
	headShotUrl
}) => {
	let searchRow = document.createElement("tr");
	searchRow.innerHTML = `
    
        <td>
            <img src="${headShotUrl}" alt="${firstName} ${lastName}" style="height: 16px; width: 16px;"/>
        </td>
        <td>
            ${jerseyNumber}
        </td>
        <td>
            <a href="player.html?id=${id}">${firstName} ${lastName}</a>
        </td>
        <td>
            ${position}
        </td>
        <td>
            ${team}
        </td>
    `;
	searchTableBody.appendChild(searchRow);
};

const renderProfile = ({
	jerseyNumber,
	firstName,
	lastName,
	position,
	height,
	weight,
	age,
	id,
	team,
	dateOfBirth,
	headShotUrl,
	careerBlocks,
	careerPercentageFieldGoal,
	careerPercentageFreethrow,
	careerPercentageThree,
	careerPoints,
	careerRebounds,
	careerTurnovers,
	carrerAssists
}) => {
	let playerInfo = document.createElement("div");

	playerInfo.className = "player-info";
	playerInfo.innerHTML = `
        <img src="${headShotUrl}" alt="${firstName} ${lastName}">
        <h1 class="heading">${jerseyNumber} ${firstName} ${lastName}</h1>
        <a href="team.html?tname=${team}"><h2 class="subheading">${team}</h2></a>
        <p class="body-text">Position:</b> ${position}</p>
        <p class="body-text">Age:</b> ${age}</p>
        <p class="body-text">Date of Birth:</b> ${dateOfBirth}</p>
        <p class="body-text">Height:</b> ${height}</p>
        <p class="body-text">Weight:</b> ${weight}</p>
    `;
	playerContent.appendChild(playerInfo);

	let careerAverageRow = document.createElement("tr");
	careerAverageRow.innerHTML = `
			    <td class="freeze-col body-text text-bold">
                    Career Averages
			    </td>
			    <td>
			    </td>
			    <td>
			    </td>
                <td>
                </td>
			    <td>
			    </td>
			    <td class="body-text text-bold">
			        ${careerPercentageFieldGoal}
			    </td>
                <td class="body-text text-bold">
                    ${careerPercentageFreethrow}
                </td>
			    <td class="body-text text-bold">
			        ${careerPercentageThree}
			    </td>
			    <td class="body-text text-bold">
			        ${careerTurnovers}
			    </td>
                <td class="body-text text-bold">
                    ${careerBlocks}
                </td>
			    <td class="body-text text-bold">
			        ${careerRebounds}
			    </td>
			    <td class="body-text text-bold">
			        ${carrerAssists}
			    </td>
			    <td class="body-text text-bold">
			        ${careerPoints}
			    </td>
		`;
	careerAverages.appendChild(careerAverageRow);

	getStats();
};

const getStats = async () => {
	try {
		const res = await fetch(
			`https://nba-player-individual-stats.p.rapidapi.com/playerseasons?playerId=${playerId}`,
			options
		);
		if (res.status !== 200) throw new Error("Player stats not found");
		const stats = await res.json();
		stats.map((s) => renderStats(s));
	} catch (err) {
		console.log(err.message);
	}
};

const renderStats = async ({
	assistsPerGame,
	blocksPerGame,
	gamesPlayed,
	gamesStarted,
	id,
	minsPerGame,
	percentageFieldGoal,
	percentageFreeThrow,
	percentageThree,
	pointsPerGame,
	reboundsPerGame,
	season,
	team,
	turnoversPerGame,
	playerId
}) => {
	let averagesRow = document.createElement("tr");
	averagesRow.innerHTML = `
			    <td class="freeze-col body-text">
			        ${season}
			    </td>
			    <td class="body-text">
			        ${team}
			    </td>
			    <td class="body-text">
			        ${gamesPlayed}
			    </td>
                <td class="body-text">
                    ${gamesStarted}
                </td>
			    <td class="body-text">
			        ${minsPerGame}
			    </td>
			    <td class="body-text">
			        ${percentageFieldGoal}
			    </td>
                <td class="body-text">
                    ${percentageFreeThrow}
                </td>
			    <td class="body-text">
			        ${percentageThree}
			    </td>
			    <td class="body-text">
			        ${turnoversPerGame}
			    </td>
                <td class="body-text">
                    ${blocksPerGame}
                </td>
			    <td class="body-text">
			        ${reboundsPerGame}
			    </td>
			    <td class="body-text">
			        ${assistsPerGame}
			    </td>
			    <td class="body-text">
			        ${pointsPerGame}
			    </td>
		`;
	averagesTableBody.appendChild(averagesRow);
};

const clearForm = () => {
	playerSearch.value = "";
};

getPlayer();
