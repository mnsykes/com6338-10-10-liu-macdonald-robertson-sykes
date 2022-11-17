const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
	}
};

const playerTableBody = document.querySelector(".player-table__body");

fetch("https://api-nba-v1.p.rapidapi.com/players?team=2&season=2022", options)
	.then((response) => response.json())
	.then((players) => {
		//console.log(players.response);
		players.response.map((player, key) => {
			let playerId = player.id;
			let playerName = `${player.firstname} ${player.lastname}`;
			if (player.leagues.standard.active) {
				let tableRow = document.createElement("tr");
				tableRow.innerHTML = `
                    <td>
                        <a href="player.html?id=${playerId}">${player.firstname} ${player.lastname}</a>
                    </td>
                    <td>
                        ${player.college}
                    </td>
                    <td>
                        ${player.height.feets}ft ${player.height.inches}in
                    </td>
                    `;
				playerTableBody.appendChild(tableRow);
			}
		});
	})
	.catch((err) => console.error(err));
