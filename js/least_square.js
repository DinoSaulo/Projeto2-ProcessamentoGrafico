
// Função de resolução do método dos quadrados mínimos
// "melhor ajuste para um conjunto de dados tentando minimizar a soma dos quadrados das 
// diferenças entre o valor estimado e os dados observados"
function solve_LSM(points, degree) {
    var a = new Array(degree);
    for (var i = 0; i < degree; i++) {
        a[i] = new Array(degree);
    }
    for (i = 0; i < degree; i++) {
        for (j = 0; j < degree; j++) {
            a[i][j] = chain_a(points, i+j,true);
        }
    }

    var b = new Array(degree);
    for (var i = 0; i < degree; i++) {
        b[i] = new Array(1);
    }
    for (i = 0; i < degree; i++) {
        b[i][0] = chain_a(points, i, false);
    }

    var res = math.lusolve(a,b);
    for (i = 0; i < res.length; i++) {
        res[i] = res[i][0];
    }

    return res.reverse();
}

//Caluclo de a na função, através da regra da cadeia
function chain_a(points, degree, aorb) {
    var res = 0;
    for (i = 0; i < points.length; i++) {
        if(aorb == true){
            res += Math.pow(points[i].x,degree);
        } else {
            res += Math.pow(points[i].x,degree)*points[i].y;
        }
        
    }
    return res;
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
