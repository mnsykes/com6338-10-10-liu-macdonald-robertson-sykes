// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
const teamId = params.get("id");
const teamInfo = document.querySelector(".team-info");
const rosterTableBody = document.querySelector(".roster-table__body");
const teamNews = document.querySelector(".team-news");
const searchForm = document.querySelector(".search-form");
const teamSearch = document.querySelector(".team-search");

// pass teamId variable to url to fetch the team
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "nba-player-individual-stats.p.rapidapi.com"
	}
};
const getTeam = async () => {
	try {
		const res = await fetch(`https://nba-player-individual-stats.p.rapidapi.com/teams`, options);
		if (res.status !== 200) throw new Error("Team not found");
		const team = await res.json();
	} catch (err) {
		console.log(err.messge);
	}
};
fetch(`https://nba-player-individual-stats.p.rapidapi.com/teams`, options)
	.then((response) => response.json())
	.then((team) => {
		console.log(team);
		team.map((t) => renderTeam(t));

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

const renderTeam = async ({ id, name, conference, record, teamLogoUrl }) => {
	teamInfo.innerHTML = `
		<img src="${teamLogoUrl}" style="height: 100px; width: 100px;">
		<h2>${name}</h2>
		<p>Overall record: ${record}</p>
		<p>${conference} Conference</p>
		
	`;
};

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
