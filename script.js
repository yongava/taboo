// Define the state of the game with configurable names
let gameState = {
  roomNames: {
    room1: "กอล์ฟ",
    room2: "เกด",
    room3: "อร"
  },
  rooms: {
    room1: { playerWord: 'แอพฯ', otherWords: ['หุ้น', 'ซื้อ'], revealed: false },
    room2: { playerWord: 'หุ้น', otherWords: ['แอพฯ', 'ซื้อ'], revealed: false },
    room3: { playerWord: 'ซื้อ', otherWords: ['แอพฯ', 'หุ้น'], revealed: false },
  },
  roomClicked: false
};

function setupGame() {
  // Add click listeners to each player's room
  for (let i = 1; i <= 4; i++) {
    let roomDiv = document.getElementById('room' + i);
    roomDiv.addEventListener('click', function() {
      if (!gameState.roomClicked) {
        if (i === 4) {
          revealAllWordsForWatcher();
        } else {
          revealOtherWordsForPlayer(i);
        }
        gameState.roomClicked = true;
      }
    });
  }
}

function revealOtherWordsForPlayer(roomNumber) {
  // Hide other rooms and center the selected room
  for (let i = 1; i <= 4; i++) {
    let roomDiv = document.getElementById('room' + i);
    if (i !== roomNumber) {
      roomDiv.style.display = 'none';
    } else {
      roomDiv.style.width = '100%';
      roomDiv.style.textAlign = 'center';
      let room = gameState.rooms['room' + roomNumber];
      let otherRooms = Object.entries(gameState.rooms)
        .filter(([key, _]) => key !== 'room' + roomNumber)
        .map(([key, room]) => {
          let playerName = gameState.roomNames[key];
          return `${playerName}'s word: ${room.playerWord}`;
        });

      roomDiv.innerHTML = '<strong> You are in ' + gameState.roomNames['room' + roomNumber] + "'s Room</strong>";
      roomDiv.innerHTML += '<br><p>' + otherRooms.join(', ') + '</p>';
    }
  }
}

function revealAllWordsForWatcher() {
  // Hide player rooms and only show the watcher's room
  for (let i = 1; i <= 3; i++) {
    let roomDiv = document.getElementById('room' + i);
    roomDiv.style.display = 'none';
  }

  let watcherDiv = document.getElementById('room4');
  watcherDiv.style.width = '100%';
  watcherDiv.style.textAlign = 'center';
  watcherDiv.innerHTML = '<strong>Room 4 for Watcher</strong>';
  Object.keys(gameState.rooms).forEach(roomKey => {
    let playerName = gameState.roomNames[roomKey];
    let room = gameState.rooms[roomKey];
    watcherDiv.innerHTML += `<p>${playerName}'s Word: ${room.playerWord}</p>`;
  });
}

function setRoomNames() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('name' + i).textContent = gameState.roomNames['room' + i] + "'s";
  }
}

// Initialize the game and set the room names
setupGame();
setRoomNames();
