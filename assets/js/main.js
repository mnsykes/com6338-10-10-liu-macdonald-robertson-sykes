let nbaEl = document.querySelector("#nba");
let teamSelect = document.querySelector(".teamSelect");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};

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
