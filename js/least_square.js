
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
            a[i][j] = chain(points, i+j,true);
        }
    }

    var b = new Array(degree);
    for (var i = 0; i < degree; i++) {
        b[i] = new Array(1);
    }
    for (i = 0; i < degree; i++) {
        b[i][0] = chain(points, i, false);
    }

    var result = math.lusolve(a,b);
    for (i = 0; i < result.length; i++) {
        result[i] = result[i][0];
    }

    return result.reverse();
}

//Calculo de a na função, através da regra da cadeia
function chain(points, degree, aorb) {
    var result = 0;
    for (i = 0; i < points.length; i++) {
        if(aorb == true){
            result += Math.pow(points[i].x,degree);
        } else {
            result += Math.pow(points[i].x,degree)*points[i].y;
        }
    }
    return result;
}

//Pega a função conseguida no calculo acima e cria a curva no gráfico referente a ela
function drawFunctionGraph() {
    var x = [];
    for (i = 0; i < canvas.width; i += 1) {
        x.push(i);
    }

    // Definindo uma "nova" linha
    ctx.beginPath();

    for (i = 0; i < x.length-1; i++) {

        var y = [];
        y[0] = 0, y[1] = 0; 

        for(j = 0; j < 2; j ++) {
            for (k = 0; k < cs.length; k++) {
                y[j] += cs[k]*Math.pow(x[i + j], cs.length - k - 1); // p/ y[0] j == 0 && y[1] j == 1
            }
        }

        ctx.moveTo(x[i], y[0])
        ctx.lineTo(x[i+1], y[1])
    }

    // Definindo a espessura e cor da linha
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#000000";
    
    // Plotando o Gráfico 
    ctx.stroke();
}
