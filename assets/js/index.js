let nbaEl = document.querySelector("#nba");
const searchForm = document.querySelector(".search-form");
const playerSearch = document.querySelector(".player-search");
let main = document.querySelector(".main__wrapper");
let LocalDate = new Date();
let Year = LocalDate.getFullYear();
let Month = LocalDate.getMonth() + 1;
let Day = LocalDate.getDate();

let standsE = document.querySelector(".standE-table__body");
let standsW = document.querySelector(".standW-table__body");
let scoresTableBody = document.querySelector(".scores-table__body");
let scoresTableFooter = document.querySelector(".scores-table__footer");
let gameDiv = document.querySelector(".game-div");
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
			`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${Year}`,
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
		const res = await fetch(`https://api-nba-v1.p.rapidapi.com/games?date=2022-11-22`, options);
		// date=${Year}-${Month}-${Day}
		if (res.status !== 200) throw new Error("Error");
		const data = await res.json();

		data.response.map((score) => {
			renderScores(score);
		});
	} catch (err) {
		console.log(err);
	}
};

const renderStandings = async ({
	streak,
	conference,
	win,
	loss,
	team: { id, name, logo, winStreak }
}) => {
	let standsRow = document.createElement("tr");
	let winLoss = "";
	if (winStreak) {
		winLoss = "W";
	} else {
		winLoss = "L";
	}
	standsRow.innerHTML = `
                <td>${conference.rank}.</td>
                <td>
                    <a href="team.html?id=${id}">
                        <img src=${logo} style="height: 20px; width: 20px;">
                    </a>
                </td>
                <td><a href="team.html?id=${id}&nickname=">${name}</a></td>
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
						<a href="team.html?id=${visitorTeamId}">
							<img src="${visitors.logo}">
						</a>
					</div>
					<div class="game-block__team text-center">
						<a href="team.html?id=${visitorTeamId}">
							${visitors.name}
						</a>
					</div>
                    <div class="text-center"> AT </div>
					<div class="game-block__team text-center">
						<a href="team.html?id=${homeTeamId}">
							${home.name}
						</a>
					</div>
					<div class="game-block__image">
						<a href="team.html?id=${homeTeamId}">
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

fetch("https://nba-news-today.p.rapidapi.com/news", newsOptions)
	.then((response) => response.json())
	.then((headline) => {
		for (let i = 0; i < 10; i++) {
			let newStory = document.createElement("div");
			console.log(headline[i].title);
			newStory.innerHTML = `
				<a href="${headline[i].url}" target="_blank">${headline[i].title}</a>
			`;
			headlines.appendChild(newStory);
		}
	})
	.catch((err) => console.error(err));

const clearForm = () => {
	playerSearch.value = "";
};

getStandings();
getScores();
