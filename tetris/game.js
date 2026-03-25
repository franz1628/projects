class Piece {
  constructor(shape, pos = { x: 3, y: 0 }) {
    this.shape = shape;
    this.pos = pos;
  }

  rotate() {
    for (let y = 0; y < this.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [this.shape[x][y], this.shape[y][x]] = [this.shape[y][x], this.shape[x][y]];
      }
    }
    this.shape.forEach((row) => row.reverse());
  }
}

class Game {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.grid = this.createGrid(columns, rows);
    this.piece = null;
    this.score = 0;
    this.init();
  }

  init() {
    this.spawnPiece();
  }

  createGrid(w, h) {
    const grid = [];
    while (h--) {
      grid.push(new Array(w).fill(0));
    }
    return grid;
  }

  spawnPiece() {
    const type = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
    this.piece = new Piece(JSON.parse(JSON.stringify(SHAPES[type])), { x: 3, y: 0 });
    
    // Check game over
    if (this.collide()) {
      this.grid.forEach(row => row.fill(0)); // Reset game
      this.score = 0; // Reset score
    }
  }

  collide(piece = this.piece) {
    const [m, o] = [piece.shape, piece.pos];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 && (this.grid[y + o.y] && this.grid[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  merge() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.grid[y + this.piece.pos.y][x + this.piece.pos.x] = value;
        }
      });
    });
  }

  rotate() {
    const pos = this.piece.pos.x;
    let offset = 1;
    this.piece.rotate();
    while (this.collide()) {
      this.piece.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.piece.shape[0].length) {
        this.piece.rotate(); // rotate back
        this.piece.pos.x = pos;
        return;
      }
    }
  }

  drop() {
    this.piece.pos.y++;
    if (this.collide()) {
      this.piece.pos.y--;
      this.merge();
      this.spawnPiece();
      this.clearRows();
    }
  }

  move(dir) {
    this.piece.pos.x += dir;
    if (this.collide()) {
      this.piece.pos.x -= dir;
    }
  }

  clearRows() {
    outer: for (let y = this.grid.length - 1; y > 0; --y) {
      for (let x = 0; x < this.grid[y].length; ++x) {
        if (this.grid[y][x] === 0) {
          continue outer;
        }
      }
      const row = this.grid.splice(y, 1)[0].fill(0);
      this.grid.unshift(row);
      this.score += 100;
      ++y;
    }
  }
}
