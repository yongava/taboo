// Define the state of the game with configurable names
let gameState = {
  roomNames: {
    room1: "Ton",
    room2: "Royle",
    room3: "Win"
  },
  rooms: {
    room1: { playerWord: 'Apple', otherWords: ['Banana', 'Cherry'], revealed: false },
    room2: { playerWord: 'Banana', otherWords: ['Apple', 'Cherry'], revealed: false },
    room3: { playerWord: 'Cherry', otherWords: ['Apple', 'Banana'], revealed: false },
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

// Call this function at the end of setupGame to set the names
function setRoomNames() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('name' + i).textContent = gameState.roomNames['room' + i] + "'s";
  }
}

// Call this at the end of the setupGame function
setupGame();
setRoomNames();