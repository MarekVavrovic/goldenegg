document.addEventListener("DOMContentLoaded", function () {
  var startGameButton = document.getElementById("startGame");
  startGameButton.addEventListener("click", function () {
    window.location.href = "game.html";
  });
});

function swapTiles(cell1, cell2) {
  var temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className =
    document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;

  checkWin();
}

function checkWin() {
  var win = true;
  for (var row = 1; row <= 3; row++) {
    for (var column = 1; column <= 3; column++) {
      var cell = document.getElementById("cell" + row + column);
      var expectedClass = "tile" + ((row - 1) * 3 + column);
      if (cell.className !== expectedClass) {
        win = false;
        break;
      }
    }
    if (!win) break;
  }

  if (win) {
    showModal();
  }
}

function showModal() {
  var modal = document.getElementById("winModal");
  modal.style.display = "block";

  var span = document.getElementsByClassName("close-button")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal when user clicks anywhere outside of the modal content
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

//Start a new game
function shuffle() {
  //Use nested loops to access each cell of the 3x3 grid
  for (var row = 1; row <= 3; row++) {
    //For each row of the 3x3 grid
    for (var column = 1; column <= 3; column++) {
      //For each column in this row

      var row2 = Math.floor(Math.random() * 3 + 1);
      var column2 = Math.floor(Math.random() * 3 + 1);

      swapTiles("cell" + row + column, "cell" + row2 + column2);
    }
  }
}

function clickTile(row, column) {
  var cell = document.getElementById("cell" + row + column);
  var tile = cell.className;
  if (tile != "tile9") {
    //Checking if white tile on the right
    if (column < 3) {
      if (
        document.getElementById("cell" + row + (column + 1)).className ==
        "tile9"
      ) {
        swapTiles("cell" + row + column, "cell" + row + (column + 1));
        return;
      }
    }
    //Checking if white tile on the left
    if (column > 1) {
      if (
        document.getElementById("cell" + row + (column - 1)).className ==
        "tile9"
      ) {
        swapTiles("cell" + row + column, "cell" + row + (column - 1));
        return;
      }
    }
    //Checking if white tile is above
    if (row > 1) {
      if (
        document.getElementById("cell" + (row - 1) + column).className ==
        "tile9"
      ) {
        swapTiles("cell" + row + column, "cell" + (row - 1) + column);
        return;
      }
    }
    //Checking if white tile is below
    if (row < 3) {
      if (
        document.getElementById("cell" + (row + 1) + column).className ==
        "tile9"
      ) {
        swapTiles("cell" + row + column, "cell" + (row + 1) + column);
        return;
      }
    }
  }
}
