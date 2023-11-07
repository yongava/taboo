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
      revealWords(i);
    });
  }
}

function revealWords(roomNumber) {
  // Check if any room has already been clicked
  if (gameState.roomClicked) return;

  // If it's the watcher's room (Room 4), reveal all rooms
  if (roomNumber === 4) {
    for (let i = 1; i <= 3; i++) {
      revealPlayerWords(i);
    }
  } else {
    // Otherwise, reveal only the clicked room's word
    revealPlayerWords(roomNumber);
  }

  // Update the game state to reflect that a room has been clicked
  gameState.roomClicked = true;
}

function revealPlayerWords(roomNumber) {
  // Find the room and change its state to revealed
  let roomKey = 'room' + roomNumber;
  gameState.rooms[roomKey].revealed = true;

  // Change the content of the div to reveal the words
  let roomDiv = document.getElementById(roomKey);
  let room = gameState.rooms[roomKey];
  if (roomNumber !== 4) {
    roomDiv.innerHTML = '<strong>Room ' + roomNumber + ' for Player</strong>';
    roomDiv.innerHTML += '<p>Your Word: ' + room.playerWord + '</p>';
    roomDiv.innerHTML += '<p>Other Words: ' + room.otherWords.join(', ') + '</p>';
  } else {
    // For watcher room, reveal all player words
    roomDiv.innerHTML = '<strong>Room 4 for Watcher</strong>';
    Object.keys(gameState.rooms).forEach(roomKey => {
      let playerRoom = gameState.rooms[roomKey];
      roomDiv.innerHTML += `<p>Room ${roomKey.charAt(roomKey.length - 1)} Word: ` +
                           `${playerRoom.playerWord}</p>`;
    });
  }
}

// Initialize the game
setupGame();
