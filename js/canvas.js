//Variáveis do canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var point = {
    x: 0,
    y: 0,
    radius: 3
};
var move = -1;
var points = [];
var degree = 2;
var cs = [];

//Função para arrasta a box do grau da curva
dragElement(document.getElementById("grau"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // procura pela caixa do header para poder arrastar a partir daquele ponto
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // Caso não ache, arrasta de qualquer lugar de dentro da div
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // pega o ponto do mouse no inicio
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // chama a função onde quer que o mouse vá
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calcula a nova posição do mouse
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // seta o elemento na nova posição
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // para de mexer quando o botão é solto
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Função para adaptar o tamanho do canvas
function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}

// Função para tentar adaptar, ao máximo, a posição dos pontos no tamanho responsivo do canvas
function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}

function isInCircle(click) {
    var v;
    for (i = 0; i < points.length; i++) {
        v = {
            x: points[i].x - click.x,
            y: points[i].y - click.y
        };

        if (Math.sqrt(v.x * v.x + v.y * v.y) <= point.radius) {
            return i;
        }
    }
    return -1;
}

// Funções onde se setam os pontos, baseado em onde o mouse se encontra
function draw_point() {
    var gradient = ctx.createLinearGradient(0, 1000, 2000, 0);
gradient.addColorStop("0", "pink");
gradient.addColorStop("0.5" ,"white");
gradient.addColorStop("1.0", "red");

// Fill with gradient
ctx.strokeStyle = gradient;
ctx.lineWidth = 5;
//ctx.strokeRect(20, 20, 150, 100)
    ctx.beginPath();
   // ctx.strokeStyle = '#9D4B95';
    //ctx.lineWidth = '4';
    ctx.fillStyle = '#9D4B95';
    ctx.arc(point.x, point.y, point.radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

function draw_points() {
    for (i = 0; i < points.length; i++) {
        point.x = points[i].x;
        point.y = points[i].y;
        draw_point();
    }
}

// Desenho do Canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    cs = solve_MMQ(points, degree);

    drawFunctionGraph();
    draw_points();
    drawBezierCurve(findControlPoints(cs, points));
}



resizeToFit();

//Funções para se pegar as posições do mouse para se setar e arrastar os pontos
canvas.addEventListener('mousedown', function(e) {
    move = isInCircle({
        x: e.offsetX,
        y: e.offsetY
    });

    if (move < 0) {
        point.x = e.offsetX;
        point.y = e.offsetY;
        points.push({x: point.x, y: point.y});
        draw_points();
    }
});

canvas.addEventListener('mousemove', function(e) {
    if (move >= 0) {
        points[move] = {
            x: e.offsetX,
            y: e. offsetY
        }

        draw();
    }
});

canvas.addEventListener('mouseup', function(e) {
    move = -1;

    draw();
});

// Adapta a curva da função de acordo com o grau setado
var degreeSelector = document.getElementById("degreeSelector")
degreeSelector.addEventListener("change", function() {
    degree = parseInt(degreeSelector.value)+1;

    draw();
});
