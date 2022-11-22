let nbaEl = document.querySelector("#nba");
let teamSelect = document.querySelector(".teamSelect");

let games = document.querySelector("#content");
let main = document.querySelector(".main__wrapper");
let LocalDate = new Date();
let Year = LocalDate.getFullYear();
let Month = LocalDate.getMonth() + 1;
let Day = LocalDate.getDate();

let standsE = document.querySelector("#standingsEast");
let standsW = document.querySelector("#standingsWest");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};

fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${Year}-${Month}-${Day}`, options)
	.then((response) => response.json())
	.then((game) => {
		console.log(`https://api-nba-v1.p.rapidapi.com/games?date=${Year}-${Month}-${Day}`);
		console.log(game.response);
		let data = game.response;
		for (let i = 0; i < data.length; i++) {
			games.innerHTML = `<div style="display: grid; grid-template-columns:25% 20% 40% 20%; grid-template-rows:50% 50%;">
		<h3>${Month}/${Day}</h3>
		<img src="${data[i].teams.visitors.logo}" style="height: 100px;">
		<h2>${data[i].teams.visitors.name} @ ${data[i].teams.home.name}</h2>
		<img src="${data[i].teams.home.logo}" style="height: 100px;">
		<h2>${data[i].scores.visitors.points}</h2>
		<h3>VS</h3>
		<h2>${data[i].scores.home.points}</h2>
		</div>`;
			games.id = "";
			newSection = document.createElement("section");
			newSection.setAttribute("id", "content");
			main.appendChild(newSection);
			games = newSection;
		}
	})
	.catch((err) => {
		console.log(err);
	});

fetch("https://api-nba-v1.p.rapidapi.com/teams", options)
	.then((response) => response.json())
	.then((team) => {
		console.log(team.response);
		team.response.map((b) => {
			if (b.nbaFranchise) {
				let option = document.createElement("option");
				option.value = b.id;
				option.textContent = b.name;
				teamSelect.appendChild(option);
			}
		});
	})
	.catch((err) => console.error(err));

nbaEl.onsubmit = (e) => {
	e.preventDefault();
	let teamId = teamSelect.value;
	location.href = `teams.html?id=${teamId}`;
};

fetch(`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${Year}&conference=east`, options)
.then((response) => response.json())
.then((standE) => {
	let data = standE.response;
	data.sort((a,b)=>a.conference.rank-b.conference.rank)
	console.log(data)
	standsE.innerHTML = `<h3 style="text-align: center;">East Conference</h3>
	<div style="display: grid; grid-template-columns: 50% 50%;">
	<h4>1. <img src=${data[0].team.logo} style="height: 50px"> ${data[0].win.total}W / ${data[0].loss.total}L</h4>
	<h4>6. <img src=${data[5].team.logo} style="height: 50px"> ${data[5].win.total}W / ${data[5].loss.total}L</h4>
	<h4>2. <img src=${data[1].team.logo} style="height: 50px"> ${data[1].win.total}W / ${data[1].loss.total}L</h4>
	<h4>7. <img src=${data[6].team.logo} style="height: 50px"> ${data[6].win.total}W / ${data[6].loss.total}L</h4>
	<h4>3. <img src=${data[2].team.logo} style="height: 50px"> ${data[2].win.total}W / ${data[2].loss.total}L</h4>
	<h4>8. <img src=${data[7].team.logo} style="height: 50px"> ${data[7].win.total}W / ${data[7].loss.total}L</h4>
	<h4>4. <img src=${data[3].team.logo} style="height: 50px"> ${data[3].win.total}W / ${data[3].loss.total}L</h4>
	<h4>9. <img src=${data[8].team.logo} style="height: 50px"> ${data[8].win.total}W / ${data[8].loss.total}L</h4>
	<h4>5. <img src=${data[4].team.logo} style="height: 50px"> ${data[4].win.total}W / ${data[4].loss.total}L</h4>
	<h4>10. <img src=${data[9].team.logo} style="height: 50px"> ${data[9].win.total}W / ${data[9].loss.total}L</h4>
	</div>`
})

fetch(`https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${Year}&conference=west`, options)
.then((response) => response.json())
.then((standW) => {
	let data = standW.response;
	data.sort((a,b)=>a.conference.rank-b.conference.rank)
	console.log(data)
	standsW.innerHTML = `<h3 style="text-align: center;">West Conference</h3>
	<div style="display: grid; grid-template-columns: 50% 50%;">
	<h4>1. <img src=${data[0].team.logo} style="height: 50px"> ${data[0].win.total}W / ${data[0].loss.total}L</h4>
	<h4>6. <img src=${data[5].team.logo} style="height: 50px"> ${data[5].win.total}W / ${data[5].loss.total}L</h4>
	<h4>2. <img src=${data[1].team.logo} style="height: 50px"> ${data[1].win.total}W / ${data[1].loss.total}L</h4>
	<h4>7. <img src=${data[6].team.logo} style="height: 50px"> ${data[6].win.total}W / ${data[6].loss.total}L</h4>
	<h4>3. <img src=${data[2].team.logo} style="height: 50px"> ${data[2].win.total}W / ${data[2].loss.total}L</h4>
	<h4>8. <img src=${data[7].team.logo} style="height: 50px"> ${data[7].win.total}W / ${data[7].loss.total}L</h4>
	<h4>4. <img src=${data[3].team.logo} style="height: 50px"> ${data[3].win.total}W / ${data[3].loss.total}L</h4>
	<h4>9. <img src=${data[8].team.logo} style="height: 50px"> ${data[8].win.total}W / ${data[8].loss.total}L</h4>
	<h4>5. <img src=${data[4].team.logo} style="height: 50px"> ${data[4].win.total}W / ${data[4].loss.total}L</h4>
	<h4>10. <img src=${data[9].team.logo} style="height: 50px"> ${data[9].win.total}W / ${data[9].loss.total}L</h4>
	</div>`
})