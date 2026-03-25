import { COLORS, MARCO_HEIGHT, BLOCK_SIZE } from './constants.js';
import { cuadrado } from './ui.js';

export const getFigura1 = (w = 80, h = 80) => {
  const color = COLORS[Math.floor(Math.random() * 8)];

  let div = document.createElement("div");
  div.id = "figura";
  div.style.top = 0 + "px";
  div.style.left = 190 + "px";
  div.style.width = w + "px";
  div.style.height = h + "px";
  div.style.position = "absolute";

  let arr = [
    [
      [30, 0],
      [30, 30],
      [0, 30],
      [60, 30],
    ],
    [
      [0, 0],
      [30, 0],
      [0, 30],
      [30, 30],
    ],
    [
      [0, 0],
      [0, 30],
      [0, 60],
      [0, 90],
    ],
    [
      [0, 0],
      [0, 30],
      [30, 30],
      [30, 60],
    ],
    [
      [0, 0],
      [0, 30],
      [30, 30],
      [60, 30],
    ]
  ];

  arr[Math.floor(Math.random() * 5)].forEach((x) => {
    div.appendChild(cuadrado(BLOCK_SIZE, BLOCK_SIZE, x[0], x[1], color));
  });

  return div;
};

export const validar = (mov = 30, movTop = 30) => {
  let stop = false;
  let figura = document.getElementById("figura");
  if (!figura) return true;

  document.querySelectorAll(".nuevo").forEach((x) => {
    const topX = parseInt(x.style.top);
    const leftX = parseInt(x.style.left);
    figura.childNodes.forEach((y) => {
      const topY = parseInt(y.style.top) + movTop;
      const leftY = parseInt(y.style.left) + mov;
      if (topY == topX && leftY == leftX) {
        stop = true;
      }
    });
  });

  figura.childNodes.forEach((x) => {
    if (parseInt(x.style.top) + movTop > MARCO_HEIGHT - BLOCK_SIZE) {
      stop = true;
    }
  });

  return stop;
};

export const parar = () => {
  let figura = document.getElementById("figura");
  if (!figura) return;
  figura.id = "";

  figura.childNodes.forEach((x) => {
    x.classList.add("nuevo");
    x.style.background = 'yellow';
  });
  
  let nuevo = getFigura1();
  document.body.appendChild(nuevo);
  
  let arrFilas = [];

  document.querySelectorAll('.nuevo').forEach(x => {
    let left = parseInt(x.style.left);
    let top = parseInt(x.style.top);
 
    arrFilas[top] = arrFilas[top] || [];
    if ((arrFilas[top]).indexOf(left) == -1) {
      arrFilas[top].push(left);
    }
  });

  for (let ind in arrFilas) {
    let cont = 0;
    arrFilas[ind].forEach(x => cont++);
    if (cont > 12) {
      document.querySelectorAll('.nuevo').forEach(x => {
        if (parseInt(x.style.top) == ind) {
          x.remove();
        }
      });
      document.querySelectorAll('.nuevo').forEach((x) => {
        if (parseInt(x.style.top) < ind) {
          x.style.top = parseInt(x.style.top) + BLOCK_SIZE + "px";
        }
      });
    }
  }
};
