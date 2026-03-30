
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const lado = 50;
const imagenes = ["images/1.png", "images/2.png", "images/3.png", "images/4.png"];
let tablero = [];
let ultimoCuadradoClick = { i: -1, j: -1 };
let clickCuadrado = 0;


for (let i = 0; i < 10; i++) {
    tablero[i] = [];
    for (let j = 0; j < 10; j++) {
        tablero[i][j] = Math.floor(Math.random() * imagenes.length);
    }
}

init = () => {
    limpiar();
    llenado();
}

llenado = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            agregarMarco(i, j);
        }
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            agregarImagen(i, j);
        }
    }
}

agregarImagen = (i, j) => {
    const imagen = new Image();
    imagen.src = imagenes[tablero[i][j]];
    imagen.onload = () => {
        ctx.drawImage(imagen, i * lado, j * lado, lado, lado);
    };
}

agregarMarco = (i, j) => {
    ctx.beginPath();
    ctx.moveTo(i * lado, j * lado);
    ctx.lineTo(lado + i * lado, j * lado);
    ctx.lineTo(lado + i * lado, lado + j * lado);
    ctx.lineTo(i * lado, lado + j * lado);
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();
}

limpiar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

limpiarCuadrado = (i, j) => {

    ctx.clearRect(i * lado, j * lado, lado, lado);
    agregarMarco(i, j);
}

pintarCuadrado = (i, j) => {
    ctx.beginPath();
    ctx.moveTo(i * lado, j * lado);
    ctx.lineTo(lado + i * lado, j * lado);
    ctx.lineTo(lado + i * lado, lado + j * lado);
    ctx.lineTo(i * lado, lado + j * lado);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.stroke();
}

init();



canvas.onmousedown = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const i = Math.floor(x / lado);
    const j = Math.floor(y / lado);

    if (clickCuadrado != 0 && (Math.abs(i - ultimoCuadradoClick.i) > 1 || Math.abs(j - ultimoCuadradoClick.j) > 1)) {
        clickCuadrado = 0;
        limpiarCuadrado(ultimoCuadradoClick.i, ultimoCuadradoClick.j);
        agregarImagen(ultimoCuadradoClick.i, ultimoCuadradoClick.j);
        return;
    }

    if (clickCuadrado == 0) {
        pintarCuadrado(i, j);
    }

    if (clickCuadrado === 1) {
        if (ultimoCuadradoClick.i !== -1 && ultimoCuadradoClick.j !== -1) {
            agregarMarco(i, j);
            agregarMarco(ultimoCuadradoClick.i, ultimoCuadradoClick.j);

            let aux = tablero[i][j];
            tablero[i][j] = tablero[ultimoCuadradoClick.i][ultimoCuadradoClick.j];
            tablero[ultimoCuadradoClick.i][ultimoCuadradoClick.j] = aux;

            limpiarCuadrado(i, j);
            limpiarCuadrado(ultimoCuadradoClick.i, ultimoCuadradoClick.j);
            agregarImagen(i, j);
            agregarImagen(ultimoCuadradoClick.i, ultimoCuadradoClick.j);
        }
    }

    clickCuadrado++;
    if (clickCuadrado === 2) {
        buscarEmparejamientos();
        clickCuadrado = 0;
    }

    ultimoCuadradoClick.i = i;
    ultimoCuadradoClick.j = j;
};


buscarEmparejamientos = () => {
    let a = -1;
    let b = 0;
    let n = -1;

    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 10; i++) {
            if (n == -1) {
                n = tablero[i][j];
                a = i;
                b = i;
            } else if (tablero[i][j] == n) {
                b = i;
            } else if (tablero[i][j] != n) {
                n = -1;
                b = i;
            }

            if (b - a >= 2) {
                desaparecerEmparejamientos(j, a, b);
            }
        }
    }
}

desaparecerEmparejamientos = (j, a, b) => {
    for (i = a; i <= b; i++) {
        tablero[i][j] = -1;
        limpiarCuadrado(i, j);
    }
}


