// get value of id from query string and store in variable
const params = new URLSearchParams(window.location.search);
let teamId = params.get("id");
let teamP = document.querySelector(".team-info");

// pass teamId variable to url to fetch the team
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};

fetch(`https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=2022`, options)
	.then((response) => response.json())
	.then((response) => {
		console.log(response.response);
		response.response.map((r) => {
			let player = document.createElement("div");
			player.innerHTML = `
                <p><b>Name:</b> ${r.firstname} ${r.lastname}</p>
                <p><b>Height:</b> ${r.height.feets}ft ${r.height.inches}in</p>
                <p><b>Weight:</b> ${r.weight.pounds}lbs</p>
                <p><b>Position:</b> ${r.leagues.standard.pos}</p>
                <p><b>Number:</b> ${r.leagues.standard.jersey}</p>
                <p><b>College:</b> ${r.college}</p>
            `;
			teamP.appendChild(player);
		});
	})
	.catch((err) => console.error(err));
