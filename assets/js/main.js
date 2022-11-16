let nbaEl = document.querySelector("#nba");
let teamSelect = document.querySelector(".teamSelect");
let games = document.querySelector("#content")
let main = document.querySelector(".main__wrapper")
let LocalDate = new Date()
let Year = LocalDate.getFullYear()
let Month = LocalDate.getMonth() + 1
let Day = LocalDate.getDate()

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
	console.log(`https://api-nba-v1.p.rapidapi.com/games?date=${Year}-${Month}-${Day}`)
	console.log(game.response);
	let data = game.response;
	for (let i = 0; i < data.length; i++) {
		games.innerHTML = 
		`<div style="display: grid; grid-template-columns:25% 20% 40% 20%; grid-template-rows:50% 50%;">
		<h3>${Month}/${Day}</h3>
		<img src="${data[i].teams.visitors.logo}" style="height: 100px;">
		<h2>${data[i].teams.visitors.name} @ ${data[i].teams.home.name}</h2>
		<img src="${data[i].teams.home.logo}" style="height: 100px;">
		<h2>${data[i].scores.visitors.points}</h2>
		<h3>VS</h3>
		<h2>${data[i].scores.home.points}</h2>
		</div>`
		games.id = ""
		newSection = document.createElement('section')
		newSection.setAttribute("id", "content")
		main.appendChild(newSection)
		games = newSection
	}
})
.catch(err => {
	console.log(err);
});

