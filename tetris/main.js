const game = new Game(COLUMNS, ROWS);
const renderer = new Renderer(document.body, COLUMNS, ROWS, BLOCK_SIZE);

renderer.init();

function update(time = 0) {
  game.drop();
  renderer.draw(game.grid, game.piece, game.score);
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function loop(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    update();
    dropCounter = 0;
  }

  renderer.draw(game.grid, game.piece, game.score);
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    game.move(-1);
  } else if (event.key === "ArrowRight") {
    game.move(1);
  } else if (event.key === "ArrowDown") {
    game.drop();
    dropCounter = 0;
  } else if (event.key === "ArrowUp") {
    game.rotate();
  }
  renderer.draw(game.grid, game.piece, game.score);
});

loop();
