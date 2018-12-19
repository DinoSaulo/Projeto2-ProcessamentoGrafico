function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}

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

function draw_point() {
    ctx.beginPath();
    ctx.strokeStyle = '#9D4B95';
    ctx.lineWidth = '4';
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    cs = solve_MMQ(points, degree);

    drawFunctionGraph();
    draw_points();
    drawBezierCurve(findControlPoints(cs, points));
}

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

resizeToFit();

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

var degreeSelector = document.getElementById("degreeSelector")
degreeSelector.addEventListener("change", function() {
    degree = parseInt(degreeSelector.value)+1;

    draw();
});
