// variables for player table
const playerTableBody = document.querySelector(".player-table__body");

// variables for search form
const searchForm = document.querySelector(".search-form");

// variables for pagination
const pageNumbers = document.querySelector(".page-numbers");
const playerSearch = document.querySelector(".player-search");
let currentPage = 1;
let rows = 50;

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c204799958msh8bd639d820cabb0p1137f0jsn255151fddc1c",
		"X-RapidAPI-Host": "nba-player-individual-stats.p.rapidapi.com"
	}
};

searchForm.onsubmit = async (e) => {
	e.preventDefault();
	let playerName = playerSearch.value.trim();
	if (!playerName) return;
	clearForm();
	location = `player.html?lname=${playerName}`;
};

const getPlayers = async () => {
	try {
		const res = await fetch("https://nba-player-individual-stats.p.rapidapi.com/players", options);
		if (res.status !== 200) throw new Error("Player page not found");
		const player = await res.json();
		let paginatedPlayers = [];

		player.map((p) => {
			if (p.team !== null) {
				paginatedPlayers.push(p);
			}
		});

		renderPlayers(paginatedPlayers, playerTableBody, rows, currentPage);
		pagination(paginatedPlayers, pageNumbers, rows, currentPage);
	} catch (err) {
		console.log(err.message);
	}
};

const pagination = (playerList, wrapper, rowsPerPage, page) => {
	wrapper.innerHTML = "";

	let pageCount = Math.ceil(playerList.length / rowsPerPage);

	for (let i = 1; i < pageCount + 1; i++) {
		let btn = paginationButton(i, playerList);
		wrapper.appendChild(btn);
	}
};

const paginationButton = (page, playerList) => {
	let button = document.createElement("button");
	button.innerHTML = page;

	if (currentPage == page) button.classList.add("active");

	button.onclick = () => {
		currentPage = page;
		renderPlayers(playerList, playerTableBody, rows, currentPage);

		let currentBtn = document.querySelector(".page-numbers button.active");
		currentBtn.classList.remove("active");

		button.classList.add("active");
	};

	return button;
};

const renderPlayers = (playerList, wrapper, rowsPerPage, page) => {
	wrapper.innerHTML = "";
	page--;

	let start = rowsPerPage * page;
	let end = start + rowsPerPage;

	playerList.sort((a, b) => a.id - b.id);

	let paginated = playerList.slice(start, end);

	paginated.map((p) => {
		let playerRow = document.createElement("tr");

		playerRow.innerHTML = `
			<td class="freeze-col">
				<a href="player.html?id=${p.id}">${p.firstName} ${p.lastName}</a>
			</td>
			<td>${p.jerseyNumber}</td>
			<td>${p.team}</td>
			<td>${p.position}</td>
			<td>${p.height}</td>
			<td>${p.weight}</td>
			<td>${p.dateOfBirth}</td>
			<td>${p.age}</td>
			<td>${p.careerPoints}</td>
			<td>${p.careerRebounds}</td>
			<td>${p.carrerAssists}</td>
			<td>${p.careerBlocks}</td>
			<td>${p.careerTurnovers}</td>
			<td>${p.careerPercentageFieldGoal}</td>
			<td>${p.careerPercentageFreethrow}</td>
			<td>${p.careerPercentageThree}</td>

		`;
		wrapper.appendChild(playerRow);
	});
};

const clearForm = () => {
	playerSearch.value = "";
};

getPlayers();
