function drawBezierCurve(control_points) {
    var step = 0.01;
    var n = control_points.length-1;
    var points = []

    for (i = 0; i <= n; i++) {
        point = control_points[i]

        ctx.beginPath();
        ctx.moveTo(point.x - 5, point.y);
        ctx.lineTo(point.x + 5, point.y);
        ctx.moveTo(point.x, point.y - 5);
        ctx.lineTo(point.x, point.y + 5);
        ctx.strokeStyle = "#ED4D41";
        ctx.lineWidth = "2";
        ctx.stroke();
    }

    for (t = 0; t < 1.01; t += step) {
        var point = {x: 0, y: 0};

        for (i = 0; i <= n; i++) {
            var B = bernstein(t, n, i);
            point.x += B * control_points[i].x;
            point.y += B * control_points[i].y;
        }

        points.push(point);
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (i = 0; i < points.length - 1; i++) {
        ctx.lineTo(points[i+1].x, points[i+1].y);
        ctx.moveTo(points[i+1].x, points[i+1].y);
    }
    ctx.strokeStyle = "#69C2EA";
    ctx.lineWidth = "2";
    ctx.stroke();

}

function bernstein(t, n, i) {
    return coeficienteBinomial(n, i) * Math.pow(t, i) * Math.pow(1-t, n-i);
}

function coeficienteBinomial(n, i) {
    numerator = factorial(n);
    denominator = factorial(n-i)*factorial(i);
    return numerator/denominator;
}

function factorial(n) {
    if (n == 0) return 1;
    return n * factorial(n-1);
}

function findControlPoints(cs, points) {
    var n = cs.length-1;
    points.sort(function(a, b) {
        return a.x-b.x;
    });

    var x0 = points[0].x
    var x_const = points[points.length-1].x - points[0].x;

    var step = 1.0/n;

    var coeficients = [];
    var results_x = [];
    var results_y = [];
    for (t = 0, j = 0; t < 1 + step/2; t += step, j++) {
        var x = t*x_const + x0;
        var y = 0;
        for (i = 0; i <= n; i++) {
            y += cs[i]*Math.pow(x, n-i);
        }

        results_x.push(x);
        results_y.push(y);
        
        coeficients.push([]);
        for (i = 0; i <= n; i++) {
            coeficients[j].push(bernstein(t, n, i));
        }
    }

    console.log("x", coeficients, results_x);
    console.log("y", coeficients, results_y);

    var x = math.lusolve(coeficients, results_x);
    var y = math.lusolve(coeficients, results_y);

    var p= []
    for (i = 0; i < x.length; i++) {
        p.push({x: x[i][0], y: y[i][0]});
    }

    console.log("control points", p);

    return p;
}
