// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
const searchForm = document.querySelector(".search-form");
const teamSearch = document.querySelector(".team-search");
const eastTeamEl = document.querySelector(".eastTeamEl");
const westTeamEl = document.querySelector(".westTeamEl");
const teamName = params.get("tname");
const teamId = params.get("id");
const teamInfo = document.querySelector(".team-info");
const scrollTable = document.querySelector(".scroll-table");
const rosterTableBody = document.querySelector(".roster-table__body");
const headlines = document.querySelector(".headlines");
let flgSearch = false;

// pass teamId variable to url to fetch the team
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "nba-player-individual-stats.p.rapidapi.com"
	}
};

const newsOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "nba-news-today.p.rapidapi.com"
	}
};

if (teamName !== null || teamId !== null) flgSearch = true;

if (!flgSearch) {
	teamInfo.style.display = "none";
	scrollTable.style.display = "none";
	headlines.style.display = "none";
}

searchForm.onsubmit = async (e) => {
	e.preventDefault();
	flgSearch = true;
	let teamSearchName = teamSearch.value.trim();
	if (!teamSearchName) return;
	clearForm();
	location = `team.html?tname=${teamSearchName}`;
};

const getTeamNickname = (strName) => {
	let string = strName;
	let splitString = string.split(" ");
	let teamNickname = splitString[splitString.length - 1];

	return teamNickname;
};

const getAllTeams = async () => {
	try {
		const res = await fetch(`https://nba-player-individual-stats.p.rapidapi.com/teams`, options);
		if (res.status !== 200) throw new Error("Teams not found");
		const teams = await res.json();

		teams.sort((a, b) => a.id - b.id);
		teams.map((t) => renderAllTeams(t));
	} catch (err) {
		console.log(err.message);
	}
};

const getTeam = async (strTeamName) => {
	try {
		const res = await fetch(`https://nba-player-individual-stats.p.rapidapi.com/teams`, options);
		if (res.status !== 200) throw new Error("Team not found");
		const team = await res.json();
		team.map((t) => {
			if (strTeamName.toLowerCase() == t.name.toLowerCase()) {
				renderTeam(t);
				getRoster(t);
			}
		});
	} catch (err) {
		console.log(err.messge);
	}
};

const getRoster = async ({ name }) => {
	try {
		const res = await fetch(
			`https://nba-player-individual-stats.p.rapidapi.com/players/team?name=${name}`,
			options
		);
		if (res.status !== 200) throw new Error("Team roster not found");
		const roster = await res.json();
		roster.map((r) => renderRoster(r));
	} catch (err) {
		console.log(err.message);
	}
};

const renderTeam = ({ id, name, conference, record, teamLogoUrl }) => {
	teamInfo.innerHTML = `
		<img src="${teamLogoUrl}" alt="${name} logo">
		<h1 class="subheading">${name}</h1>
		<p class="body-text">Overall record: ${record}</p>
		<p class="body-text">${conference} Conference</p>
		
	`;
};

const renderAllTeams = ({ id, name, conference, record, teamLogoUrl }) => {
	let teamEl = document.createElement("div");
	teamEl.innerHTML = `
	<a href="team.html?tname=${name}">
		<img class="team-logo" src="${teamLogoUrl}" alt="${name}">
	</a>
	`;
	if (conference === "Eastern") {
		eastTeamEl.appendChild(teamEl);
	} else {
		westTeamEl.appendChild(teamEl);
	}
};

const renderRoster = ({
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
	weight
}) => {
	// let pos = position.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), "");
	let rosterRow = document.createElement("tr");

	rosterRow.innerHTML = `
		<td class="freeze-col"><a href="player.html?id=${id}">${firstName} ${lastName}</a></td>
		<td>${jerseyNumber}</td>
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
	rosterTableBody.appendChild(rosterRow);
};

const getNews = async (team) => {
	try {
		const res = await fetch(
			`https://nba-news-today.p.rapidapi.com/news/teams/${team}`,
			newsOptions
		);
		if (res.status !== 200) throw new Error("No headlines found");
		const headline = await res.json();
		for (let i = 0; i < 10; i++) {
			let newStory = document.createElement("div");
			newStory.innerHTML = `
				<a href="${headline[i].url}" target="_blank">${headline[i].title}</a>
			`;
			headlines.appendChild(newStory);
		}
	} catch (err) {
		console.log(err.message);
	}
};
const clearForm = () => {
	teamSearch.value = "";
};

if (flgSearch) getTeam(teamName);

getAllTeams();

getNews(getTeamNickname(teamName));
