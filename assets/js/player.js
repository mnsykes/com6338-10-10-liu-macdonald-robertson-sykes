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
	console.log(playerName);
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
				renderSearchResults(p);
				// renderProfile(player);
			});
		} else {
			searchResults.style.display = "none";
			renderProfile(player);
		}
	} catch (err) {
		console.log(err.message);
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
	headShotUrl
}) => {
	let playerInfo = document.createElement("div");
	playerInfo.className = "player-info";
	playerInfo.innerHTML = `
    <img src="${headShotUrl}" alt="${firstName} ${lastName}">
        <h1 class="heading">${jerseyNumber} ${firstName} ${lastName}</h1>
        <h2 class="subheading">${team}</h2>
        <p><b>Position:</b> ${position}</p>
        <p><b>Age:</b> ${age}</p>
        <p><b>Date of Birth:</b> ${dateOfBirth}</p>
        <p><b>Height:</b> ${height}</p>
        <p><b>Weight:</b> ${weight}</p>
    `;
	playerContent.appendChild(playerInfo);

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
			    <td class="freeze-col">
			        ${season}
			    </td>
			    <td>
			        ${team}
			    </td>
			    <td>
			        ${gamesPlayed}
			    </td>
                <td>
                    ${gamesStarted}
                </td>
			    <td>
			        ${minsPerGame}
			    </td>
			    <td>
			        ${percentageFieldGoal}
			    </td>
                <td>
                    ${percentageFreeThrow}
                </td>
			    <td>
			        ${percentageThree}
			    </td>
			    <td>
			        ${turnoversPerGame}
			    </td>
                <td>
                    ${blocksPerGame}
                </td>
			    <td>
			        ${reboundsPerGame}
			    </td>
			    <td>
			        ${assistsPerGame}
			    </td>
			    <td>
			        ${pointsPerGame}
			    </td>
		`;
	averagesTableBody.appendChild(averagesRow);
};

const clearForm = () => {
	playerSearch.value = "";
};

getPlayer();
