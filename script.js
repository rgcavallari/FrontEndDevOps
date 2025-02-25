const proxyUrl = "https://api.allorigins.win/raw?url="; 
const letterboxdUrl = "https://letterboxd.com/kewinho1/rss/";

async function fetchLetterboxdFilms() {
    try {
        const response = await fetch(proxyUrl + encodeURIComponent(letterboxdUrl));
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const items = xmlDoc.querySelectorAll("item");
        let films = [];

        items.forEach(item => {
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const description = item.querySelector("description").textContent;

            // Extraindo a imagem da descrição (Letterboxd insere a capa do filme ali)
            const imgMatch = description.match(/<img src="(.*?)"/);
            const imageUrl = imgMatch ? imgMatch[1] : "https://via.placeholder.com/100x150"; // Imagem padrão caso não encontre

            // Extraindo a nota (se disponível)
            const ratingMatch = description.match(/Rated ([\d.]+)★/);
            const rating = ratingMatch ? ratingMatch[1] : "Sem nota";

            films.push({ title, link, rating, imageUrl });
        });

        displayFilms(films);
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

function displayFilms(films) {
    const filmList = document.getElementById("film-list");
    filmList.innerHTML = "";

    films.forEach(film => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="film-card">
                <img src="${film.imageUrl}" alt="${film.title}" class="film-poster">
                <div>
                    <a href="${film.link}" target="_blank">${film.title}</a> 
                </div>
            </div>
        `;
        filmList.appendChild(li);
    });
}

fetchLetterboxdFilms();


async function fetchGameData() {
    const gameName = document.getElementById('game-select').value;
    
    if (!gameName) return;
  
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&page_size=1&search=${gameName}`);
    const data = await response.json();
    
    if (data.results.length > 0) {
      const game = data.results[0];
      document.getElementById('game-name').textContent = game.name;
      document.getElementById('game-banner').src = game.background_image;
    }
  }