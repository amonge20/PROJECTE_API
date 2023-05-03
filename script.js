const gamesContainer = document.querySelector('#games-container');

fetch('http://localhost:3000/games')
  .then(response => response.json())
  .then(games => {
    const gameCards = games.map(game => {
      return `
        <div class="game-card">
          <h2>${game.title}</h2>
          <p>${game.description}</p>
          <p><strong>Género:</strong> ${game.genre}</p>
        </div>
      `;
    });
    const gamesHTML = gameCards.join('');
    gamesContainer.innerHTML = gamesHTML;
  })
  .catch(error => {
    console.error('Error:', error);
  });