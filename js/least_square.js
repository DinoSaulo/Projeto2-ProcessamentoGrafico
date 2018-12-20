
//Caluclo de a e b na função, fazendo a regra da cadeia
function sum_pol_a(points, degree) {
    var res = 0;
    for (i = 0; i < points.length; i++) {
        res += Math.pow(points[i].x,degree);
    }
    return res;
}

function sum_pol_b(points, degree) {
    var res = 0;
    for (i = 0; i < points.length; i++) {
        res += Math.pow(points[i].x,degree)*points[i].y;
    }
    return res;
}
// Função de resolução do método dos quadrados minimos
function solve_LSM(points, degree) {
    var a = new Array(degree);
    for (var i = 0; i < degree; i++) {
        a[i] = new Array(degree);
    }
    for (i = 0; i < degree; i++) {
        for (j = 0; j < degree; j++) {
            a[i][j] = sum_pol_a(points, i+j);
        }
    }

    var b = new Array(degree);
    for (var i = 0; i < degree; i++) {
        b[i] = new Array(1);
    }
    for (i = 0; i < degree; i++) {
        b[i][0] = sum_pol_b(points, i);
    }

    var res = math.lusolve(a,b);
    for (i = 0; i < res.length; i++) {
        res[i] = res[i][0];
    }

    return res.reverse();
}
//Pega a função conseguida no calculo acima e cria a curva no gráfico referente a ela
function drawFunctionGraph() {
    var xs = [];
    for (x = 0; x < canvas.width; x += 1) {
        xs.push(x);
    }


    ctx.beginPath();
    for (i = 0; i < xs.length-1; i++) {
        var y0 = 0;
        for (j = 0; j < cs.length; j++) {
            y0 += cs[j]*Math.pow(xs[i], cs.length - j - 1);
        }

        var y1 = 0;
        for (j = 0; j < cs.length; j++) {
            y1 += cs[j]*Math.pow(xs[i+1], cs.length - j - 1);
        }

        ctx.moveTo(xs[i], y0)
        ctx.lineTo(xs[i+1], y1)
    }

    // Cor da linha out
    ctx.strokeStyle = "#000000";
    // comprimnto da linha
    ctx.lineWidth = "2";
    ctx.stroke();
}
