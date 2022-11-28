// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
const searchForm = document.querySelector(".search-form");
const teamSearch = document.querySelector(".team-search");
let teamName = params.get("tname");
const teamId = params.get("id");
const teamInfo = document.querySelector(".team-info");
const rosterTableBody = document.querySelector(".roster-table__body");
const headlines = document.querySelector(".headlines");
let string = teamName;
let splitString = string.split(" ");
let teamNickname = splitString[splitString.length - 1];

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

searchForm.onsubmit = async (e) => {
	e.preventDefault();
	flgSearch = true;
	let teamName = teamSearch.value.trim();
	if (!teamName) return;
	clearForm();
	location = `team.html?tname=${teamName}`;
};

const getTeam = async (query) => {
	console.log(query);
	try {
		const res = await fetch(`https://nba-player-individual-stats.p.rapidapi.com/teams`, options);
		if (res.status !== 200) throw new Error("Team not found");
		const team = await res.json();
		team.map((t) => {
			if (query == t.id || query == t.name) {
				console.log(t);
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
		<p>Overall record: ${record}</p>
		<p>${conference} Conference</p>
		
	`;
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
	team,
	weight
}) => {
	let rosterRow = document.createElement("tr");
	rosterRow.innerHTML = `
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

getTeam(teamName);
getNews(teamNickname);

// fetch(`https://api-nba-v1.p.rapidapi.com/players/?team=${teamId}&season=2022`, options)
// 	.then((response) => response.json())
// 	.then((roster) => {
// 		roster.response.map((r) => {
// 			let rosterTableRow = document.createElement("tr");
// 			let playerId = r.id;
// 			console.log(r);
// 			if (r.nba.start > 0) {
// 				rosterTableRow.innerHTML = `
// 					<td>${r.leagues.standard.jersey}</td>
// 					<td>
// 						<a href="player.html?id=${playerId}">${r.firstname} ${r.lastname}</a>
// 					</td>
// 					<td>${r.leagues.standard.pos}</td>
// 					<td>${r.height.feets}' ${r.height.inches}"</td>
// 					<td>${r.weight.pounds}lbs</td>
// 					<td>${r.birth.date}</td>
// 					<td>${r.nba.pro}</td>
// 					<td>${r.college}</td>
// 				`;
// 				rosterTableBody.appendChild(rosterTableRow);
// 			}
// 		});
// 	})
// 	.catch((err) => console.error(err));
