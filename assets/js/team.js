// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
const searchForm = document.querySelector(".search-form");
const teamSearch = document.querySelector(".team-search");
let teamName = params.get("tname");
let teamId = params.get("id");
let teamInfo = document.querySelector(".team-info");
let rosterTableBody = document.querySelector(".roster-table__body");
const teamNews = document.querySelector(".team-news");
let teamContent = document.querySelector("#content");


// pass teamId variable to url to fetch the team
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};

searchForm.onsubmit = async (e) => {
	e.preventDefault();
	let teamName = teamSearch.value.trim();
	if (!teamName) return;
	clearForm();
	location = `player.html?lname=${teamName}`;
};

let query = "";
if (teamName) {
	query = `search=${teamName}`;
} else if (teamId) {
	query = `id=${teamId}`;
}

fetch(`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022&team=${query}`, options)
	.then((response) => response.json())
	.then((player) => {
		player.response.map((p) => {
			// console.log(p);
			let teamInfo = document.createElement("div");
			teamInfo.className = "team-info";
			teamInfo.innerHTML = `
				<img src="${t.team.logo}" style="height: 100px; width: 100px;">
				<h2>${t.team.name}</h2>
				<p>Overall record: ${t.win.total} - ${t.loss.total}</p>
				<p>${t.conference.name} rank: ${t.conference.rank}</p>
				<p>${t.division.name} rank: ${t.division.rank}</p>
			`;
			teamContent.appendChild(teamInfo);
		});
	})
	.catch((err) => console.error(err));


fetch(
	`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022&team=${teamId}`,
	options
)
	.then((response) => response.json())
	.then((team) => {
		// console.log(team.response);

		team.response.map((t) => {
			teamNickname = t.team.nickname;
			teamInfo.innerHTML = `
				<img src="${t.team.logo}" style="height: 100px; width: 100px;">
				<h2>${t.team.name}</h2>
				<p>Overall record: ${t.win.total} - ${t.loss.total}</p>
				<p>${t.conference.name} rank: ${t.conference.rank}</p>
				<p>${t.division.name} rank: ${t.division.rank}</p>
			`;
		});
	});

fetch(`https://api-nba-v1.p.rapidapi.com/players/?team=${teamId}&season=2022`, options)
	.then((response) => response.json())
	.then((roster) => {
		roster.response.map((r) => {
			let rosterTableRow = document.createElement("tr");
			let playerId = r.id;
			console.log(r);
			if (r.nba.start > 0) {
				rosterTableRow.innerHTML = `
					<td>${r.leagues.standard.jersey}</td>
					<td>
						<a href="player.html?id=${playerId}">${r.firstname} ${r.lastname}</a>
					</td>
					<td>${r.leagues.standard.pos}</td>
					<td>${r.height.feets}' ${r.height.inches}"</td>
					<td>${r.weight.pounds}lbs</td>
					<td>${r.birth.date}</td>
					<td>${r.nba.pro}</td>
					<td>${r.college}</td>
				`;
				rosterTableBody.appendChild(rosterTableRow);
			}
		});
	})
	.catch((err) => console.error(err));
