// Add your JavaScript here
let rooms = {
  room1: { playerWord: 'Apple', otherWords: ['Banana', 'Cherry'] },
  room2: { playerWord: 'Table', otherWords: ['Chair', 'Sofa'] },
  room3: { playerWord: 'Piano', otherWords: ['Guitar', 'Violin'] },
};

function setupGame() {
  for (let i = 1; i <= 3; i++) {
    let room = rooms['room' + i];
    let roomDiv = document.getElementById('room' + i);
    roomDiv.innerHTML = '<strong>Room ' + i + ' for Player</strong>';
    roomDiv.innerHTML += '<p>Other Words: ' + room.otherWords.join(', ') + '</p>';
  }

  let watcherDiv = document.getElementById('room4');
  watcherDiv.innerHTML = '<strong>Room 4 for Watcher</strong>';
  Object.values(rooms).forEach(room => {
    watcherDiv.innerHTML += '<p>' + room.playerWord + '</p>';
  });
}

setupGame();
