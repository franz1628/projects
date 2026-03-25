const COLORS = [
  "transparent", // 0: Background
  "#FF0D72",     // 1: T
  "#0DC2FF",     // 2: I
  "#0DFF72",     // 3: S
  "#F538FF",     // 4: Z
  "#FF8E0D",     // 5: L
  "#FFE138",     // 6: O
  "#3877FF",     // 7: J
];

const BLOCK_SIZE = 30;
const COLUMNS = 10;
const ROWS = 20;

const MARCO_WIDTH = COLUMNS * BLOCK_SIZE;
const MARCO_HEIGHT = ROWS * BLOCK_SIZE;

const SHAPES = [
  null,
  [ // T
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [ // I
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 0, 0],
  ],
  [ // S
    [0, 3, 3],
    [3, 3, 0],
    [0, 0, 0],
  ],
  [ // Z
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0],
  ],
  [ // L
    [0, 5, 0],
    [0, 5, 0],
    [0, 5, 5],
  ],
  [ // O
    [6, 6],
    [6, 6],
  ],
  [ // J
    [0, 7, 0],
    [0, 7, 0],
    [7, 7, 0],
  ],
];

const UI_STYLES = {
  BOARD_BORDER: "2px solid #333",
  BOARD_BG: "#111",
  EMPTY_CELL_BORDER: "1px solid rgba(255, 255, 255, 0.05)",
  FILLED_CELL_BORDER: "1px solid rgba(0, 0, 0, 0.5)",
  CELL_BG_TRANSPARENT: "transparent",
};
