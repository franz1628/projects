import { MARCO_WIDTH, MARCO_HEIGHT } from './constants.js';
import { marco } from './ui.js';
import { getFigura1, validar, parar } from './game.js';

document.body.appendChild(marco(MARCO_WIDTH, MARCO_HEIGHT));
document.body.appendChild(getFigura1());

setInterval(() => {
  let stop = validar(0, 30);

  if (!stop) {
    let figura = document.getElementById("figura");
    if (figura) {
      figura.childNodes.forEach((x) => {
        x.style.top = parseInt(x.style.top) + 30 + "px";
      });
    }
  } else {
    parar();
  }
}, 300);

document.body.onkeydown = (e) => {
  const key = e.key;

  if (key == "ArrowLeft" && !validar(-30, 0)) {
    let figura = document.getElementById("figura");
    if (figura) {
      figura.childNodes.forEach((x) => {
        x.style.left = parseInt(x.style.left) - 30 + "px";
      });
    }
  }

  if (key == "ArrowRight" && !validar(30, 0)) {
    let figura = document.getElementById("figura");
    if (figura) {
      figura.childNodes.forEach((x) => {
        x.style.left = parseInt(x.style.left) + 30 + "px";
      });
    }
  }

  if (key == "ArrowDown" && !validar(0, 30)) {
    let figura = document.getElementById("figura");
    if (figura) {
      figura.childNodes.forEach((x) => {
        x.style.top = parseInt(x.style.top) + 30 + "px";
      });
    }
  }

  if (key == "ArrowUp" && !validar(0, 0)) {
    let figura = document.getElementById("figura");
    if (figura && figura.childNodes.length > 0) {
      let leftini = parseInt(figura.childNodes[0].style.left);
      let topini = parseInt(figura.childNodes[0].style.top);

      figura.childNodes.forEach((x) => {
        x.style.left = parseInt(x.style.left) - leftini + "px";
        x.style.top = parseInt(x.style.top) - topini + "px";
      });

      figura.childNodes.forEach((x) => {
        let left = parseInt(x.style.left);
        x.style.left = -1 * parseInt(x.style.top) + "px";
        x.style.top = left + "px";
      });

      figura.childNodes.forEach((x) => {
        x.style.left = parseInt(x.style.left) + leftini + "px";
        x.style.top = parseInt(x.style.top) + topini + "px";
      });
    }
  }
};
