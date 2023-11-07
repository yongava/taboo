// Define the state of the game
let gameState = {
  rooms: {
    room1: { playerWord: 'โต๊ะ', otherWords: ['ตู้', 'เตียง'], revealed: false },
    room2: { playerWord: 'ตู้', otherWords: ['โต๊ะ', 'เตียง'], revealed: false },
    room3: { playerWord: 'เตียง', otherWords: ['ตู้', 'โต๊ะ'], revealed: false },
  },
  roomClicked: false
};

function setupGame() {
  // Add click listeners to each player's room
  for (let i = 1; i <= 4; i++) { // Include Room 4 for watcher
    let roomDiv = document.getElementById('room' + i);
    roomDiv.addEventListener('click', function() {
      if (!gameState.roomClicked) {
        if (i === 4) {
          revealAllWordsForWatcher();
        } else {
          revealOtherWordsForPlayer(i);
        }
        gameState.roomClicked = true; // Prevent any further clicks
      }
    });
  }
}

function revealOtherWordsForPlayer(roomNumber) {
  // Find the room and reveal other players' words
  let roomDiv = document.getElementById('room' + roomNumber);
  let room = gameState.rooms['room' + roomNumber];
  let otherWords = Object.values(gameState.rooms)
    .filter((_, index) => index !== roomNumber - 1)
    .map(room => room.playerWord);

  roomDiv.innerHTML = '<strong>Room ' + roomNumber + ' for Player</strong>';
  roomDiv.innerHTML += '<p>See Other Words: ' + otherWords.join(', ') + '</p>';
}

function revealAllWordsForWatcher() {
  // Watcher room reveals all words
  let watcherDiv = document.getElementById('room4');
  watcherDiv.innerHTML = '<strong>Room 4 for Watcher</strong>';
  Object.keys(gameState.rooms).forEach(roomKey => {
    let room = gameState.rooms[roomKey];
    watcherDiv.innerHTML += `<p>Room ${roomKey.charAt(roomKey.length - 1)} Word: ${room.playerWord}</p>`;
  });
}

// Initialize the game
setupGame();