// Define the state of the game
let gameState = {
  rooms: {
    room1: { playerWord: 'Apple', otherWords: ['Banana', 'Cherry'], revealed: false },
    room2: { playerWord: 'Table', otherWords: ['Chair', 'Sofa'], revealed: false },
    room3: { playerWord: 'Piano', otherWords: ['Guitar', 'Violin'], revealed: false },
  },
  roomClicked: false
};

function setupGame() {
  // Add click listeners to each player's room
  for (let i = 1; i <= 3; i++) {
    let roomDiv = document.getElementById('room' + i);
    roomDiv.addEventListener('click', function() {
      revealWords(i);
    });
  }
}

function revealWords(roomNumber) {
  // Check if a room has already been clicked
  if (gameState.roomClicked) return;

  // Find the room and change its state to revealed
  let roomKey = 'room' + roomNumber;
  gameState.rooms[roomKey].revealed = true;

  // Update the game state to reflect that a room has been clicked
  gameState.roomClicked = true;

  // Change the content of the div to reveal the words
  let roomDiv = document.getElementById(roomKey);
  let room = gameState.rooms[roomKey];
  roomDiv.innerHTML = '<strong>Room ' + roomNumber + ' for Player</strong>';
  roomDiv.innerHTML += '<p>Your Word: ' + room.playerWord + '</p>';
  roomDiv.innerHTML += '<p>Other Words: ' + room.otherWords.join(', ') + '</p>';
}

// Initialize the game
setupGame();
