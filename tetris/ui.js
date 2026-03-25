const marco = (w = 210, h = 200) => {
  let div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = w + "px";
  div.style.height = h + "px";
  div.style.border = "1px solid black";
  return div;
};

const cuadrado = (w = 30, h = 30, l = 0, t = 0, color = "black") => {
  let div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = w + "px";
  div.style.height = h + "px";
  div.style.top = t + "px";
  div.style.left = l + "px";
  div.style.background = color;
  return div;
};
