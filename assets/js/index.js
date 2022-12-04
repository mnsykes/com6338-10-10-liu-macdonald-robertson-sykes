// variables for search bar
const searchForm = document.querySelector(".search-form");
const playerSearch = document.querySelector(".player-search");

// date variables
const localDate = new Date();
const year = localDate.getFullYear();
const yesterday = new Date(localDate);
yesterday.setDate(yesterday.getDate() - 1);
const month = String(yesterday.getMonth() + 1).padStart(2, "0");
const day = String(yesterday.getDate()).padStart(2, "0");

// variables for standings
const standsE = document.querySelector(".standE-table__body");
const standsW = document.querySelector(".standW-table__body");

// variables for box scores
const scoresTableBody = document.querySelector(".scores-table__body");
const scoresTableFooter = document.querySelector(".scores-table__footer");
const gameDiv = document.querySelector(".game-div");
let boxScoreMsg = document.querySelector(".box-score__msg");
let headlinesMsg = document.querySelector(".headlines-msg");

// variables for news stories
const headlines = document.querySelector(".headlines");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};

const newsOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "nba-news-today.p.rapidapi.com"
	}
};

searchForm.onsubmit = async (e) => {
	e.preventDefault();
	let playerName = playerSearch.value.trim();
	if (!playerName) return;
	clearForm();
	location = `player.html?lname=${playerName}`;
};

const getStandings = async () => {
	try {
		const res = await fetch(
			`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${year}`,
			options
		);
		if (res.status !== 200) throw new Error("Error");
		const data = await res.json();

		data.response.sort((a, b) => a.conference.rank - b.conference.rank);
		data.response.map((team) => {
			renderStandings(team);
		});
	} catch (err) {
		console.log(err);
	}
};

const getScores = async () => {
	try {
		const res = await fetch(
			`https://api-nba-v1.p.rapidapi.com/games?date=${year}-${month}-${day}`,
			options
		);
		if (res.status !== 200) throw new Error("Error");
		const data = await res.json();

		if (data.response.length === 0) throw new Error(`No games played on ${month}/${day}/${year}`);
		data.response.map((score) => {
			renderScores(score);
		});
	} catch (err) {
		boxScoreMsg.innerHTML = err.message;
	}
};

const renderStandings = async ({
	streak,
	conference,
	win,
	loss,
	team: { id, name, logo, winStreak, code }
}) => {
	let standsRow = document.createElement("tr");
	let winLoss = "";

	if (winStreak) {
		winLoss = "W";
	} else {
		winLoss = "L";
	}
	standsRow.innerHTML = `
		<td class="freeze-col "><a href="team.html?tname=${name}">
			<img src=${logo} style="height: 16px; width: 16px;">
		</a><a href="team.html?tname=${name}&nickname=">${name}</a>
		</td>
		<td>${win.total}</td>
		<td>${loss.total}</td>
		<td>${win.percentage}%</td>
		<td>${conference.win}-${conference.loss}</td>
		<td>${win.home}-${loss.home}</td>
		<td>${win.away}-${loss.away}</td>
		<td>${win.lastTen}-${loss.lastTen}</td>
		<td>${winLoss}${streak}</td>
	`;

	if (conference.name == "east") {
		standsE.appendChild(standsRow);
	} else if (conference.name == "west") {
		standsW.appendChild(standsRow);
	}
};

const renderScores = async ({ teams: { visitors, home }, scores }) => {
	let gameBlock = document.createElement("div");
	gameBlock.className = "game-block";
	let visitorTeamId = visitors.id;
	let homeTeamId = home.id;

	gameBlock.innerHTML = `
		<div class="game-block__result text-center">
			<div class="game-block__score">
				${scores.visitors.points}
			</div>
			<div class="game-block__image">
				<a href="team.html?tname=${visitors.name}">
					<img src="${visitors.logo}">
				</a>
			</div>
			<div class="game-block__team text-center">
				<a href="team.html?tname=${visitors.name}">
					${visitors.name}
				</a>
			</div>
			<div class="game-block__at text-center"> AT </div>
			<div class="game-block__team text-center">
				<a href="team.html?tname=${home.name}">
					${home.name}
				</a>
			</div>
			<div class="game-block__image">
				<a href="team.html?tname=${home.name}">
					<img src="${home.logo}">
				</a>
			</div>
			<div class="game-block__score text-center">
				${scores.home.points}
			</div>
		</div>
	`;

	gameDiv.appendChild(gameBlock);
};

const getHeadlines = async () => {
	try {
		const res = await fetch("https://nba-news-today.p.rapidapi.com/news", newsOptions);
		if (res.status !== 200) throw new Error(`Headlines not found for ${month}/${day}/${year}`);
		const headline = await res.json();

		for (let i = 0; i < 10; i++) {
			let newStory = document.createElement("div");
			newStory.className = "headline";
			newStory.innerHTML = `
				<a href="${headline[i].url}" target="_blank">${headline[i].title}</a>
			`;

			headlines.appendChild(newStory);
		}
	} catch (err) {
		headlinesMsg.innerHTML = err.message;
	}
};

const clearForm = () => {
	playerSearch.value = "";
};

getStandings();
getScores();
getHeadlines();
