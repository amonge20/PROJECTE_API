// JavaScript para consumir la API de Instant Gaming
const gameList = document.getElementById('gameList');

fetch('https://instant-gaming-api.p.rapidapi.com/api/v1/instantGaming', {
  headers: {
    'X-RapidAPI-Key': 'ebf6ef4972mshd45adee9190a720p117553jsn6544d26b5618',
    'X-RapidAPI-Host': 'instant-gaming-api.p.rapidapi.com'
  },
  params: {
    name: 'stardew valley',
    platform: 'pc'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(game => {
      const li = document.createElement('li');
      const h2 = document.createElement('h2');
      const p = document.createElement('p');
      h2.textContent = game.title;
      p.textContent = game.platform;
      li.appendChild(h2);
      li.appendChild(p);
      gameList.appendChild(li);
    });
  })
  .catch(error => {
    console.error(error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error al obtener los datos';
    gameList.appendChild(errorMessage);
  });