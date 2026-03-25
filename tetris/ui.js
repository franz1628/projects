class Renderer {
  constructor(container, columns, rows, blockSize) {
    this.container = container;
    this.columns = columns;
    this.rows = rows;
    this.blockSize = blockSize;
    this.boardElement = null;
    this.cells = [];
  }

  init() {
    this.boardElement = document.createElement("div");
    this.boardElement.style.position = "relative";
    this.boardElement.style.width = (this.columns * this.blockSize) + "px";
    this.boardElement.style.height = (this.rows * this.blockSize) + "px";
    this.boardElement.style.border = "2px solid #333";
    this.boardElement.style.backgroundColor = "#111";
    this.boardElement.style.overflow = "hidden";
    this.container.appendChild(this.boardElement);

    // Initial cells creation (pool of cells)
    for (let r = 0; r < this.rows; r++) {
      this.cells[r] = [];
      for (let c = 0; c < this.columns; c++) {
        const cell = document.createElement("div");
        cell.style.position = "absolute";
        cell.style.width = (this.blockSize - 1) + "px";
        cell.style.height = (this.blockSize - 1) + "px";
        cell.style.left = (c * this.blockSize) + "px";
        cell.style.top = (r * this.blockSize) + "px";
        cell.style.border = "1px solid rgba(255, 255, 255, 0.05)";
        cell.style.backgroundColor = "transparent";
        this.boardElement.appendChild(cell);
        this.cells[r][c] = cell;
      }
    }
  }

  draw(grid, piece) {
    // Draw solid blocks from the grid
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const colorIndex = grid[r][c];
        this.cells[r][c].style.backgroundColor = COLORS[colorIndex];
        this.cells[r][c].style.border = colorIndex === 0 ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.5)";
      }
    }

    // Draw the active piece
    if (piece) {
      piece.shape.forEach((row, r) => {
        row.forEach((value, c) => {
          if (value !== 0) {
            const gridR = piece.pos.y + r;
            const gridC = piece.pos.x + c;
            if (gridR >= 0 && gridR < this.rows && gridC >= 0 && gridC < this.columns) {
              this.cells[gridR][gridC].style.backgroundColor = COLORS[value];
              this.cells[gridR][gridC].style.border = "1px solid rgba(0, 0, 0, 0.5)";
            }
          }
        });
      });
    }
  }
}
