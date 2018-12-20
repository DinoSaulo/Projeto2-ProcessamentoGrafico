//Operação de fatorial -> n!
function CalculoFatorial (n) { if (n == 0) { return 1; } else { return n * CalculoFatorial (n - 1); }}

//Combinação simples -> n!/(n-i)!i!
function CombinacaoSimplesNi (n, i) {
    nFat = CalculoFatorial (n);
    niFat = CalculoFatorial (n-i) * CalculoFatorial (i);
    return nFat/niFat;
}

//Polinômio de Bernstein -> Comb.Simples (n,i) * (1 - t)^n-i * t^î 
function CalculoPolinomioBernstein (t, n, i) { return CombinacaoSimplesNi (n, i) * Math.pow (1 - t, n - i) * Math.pow (t, i); }

//Traça a linha entre os pontos na tela
function setLineInTheScreen (VectorPoints) {
    ctx.beginPath ();
    ctx.moveTo (VectorPoints [0].x, VectorPoints [0].y);

    for (i = 1; i < VectorPoints.length; i++) {
        ctx.lineTo (VectorPoints [i].x, VectorPoints [i].y);
        ctx.moveTo (VectorPoints [i].x, VectorPoints [i].y);
    }

    ctx.strokeStyle = "#007FFF";                //Cor da linha
    ctx.lineWidth = "2";                        //Espessura da linha
    ctx.stroke ();
}

//Algoritmo de DeCasteljau
function DeCasteljau (p, t, n, VectorControlPoints) {
    for (i = 0; i <= n; i++) {
        var Bernstein = CalculoPolinomioBernstein (t, n, i);
        p.x += Bernstein * VectorControlPoints [i].x;
        p.y += Bernstein * VectorControlPoints [i].y;
    }

    return p;
}

//Define a curva na tela
function settingBezierCurve (VectorControlPoints) {
    var passoLength = 0.005;                    //Tamanho do passo
    var n = VectorControlPoints.length - 1;     //Grau da curva
    var VectorPoints = [];                      //Vetor de pontos para formar a linha na tela

    //Cria uma cruz ( 'X' ) no local do ponto
    for (i = 0; i <= n; i++) {
        point = VectorControlPoints [i];
        distance = 5;

        ctx.beginPath ();

        //Movimentação//
        ctx.moveTo (point.x - distance, point.y - distance);
        ctx.lineTo (point.x + distance, point.y + distance);
        ctx.moveTo (point.x + distance, point.y - distance);
        ctx.lineTo (point.x - distance, point.y + distance);
        
        //Cor e espessura da linha//
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = "2";
        
        ctx.stroke ();
    }

    //Executando DeCasteljau
    for (t = 0; t <= 1; t += passoLength) {
        var point = {x: 0, y: 0};
        
        point = DeCasteljau (point, t, n, VectorControlPoints);

        VectorPoints.push (point);
    }

    setLineInTheScreen (VectorPoints);
}

function discoveringControlPoints (cs, VectorPoints) {
    var n = cs.length - 1;
    
    VectorPoints.sort (function (a, b) { return a.x - b.x; });                                  //Ordena os pontos (Ordem crescente)

    var x0 = VectorPoints [0].x;                                                                //Primeiro ponto
    var distanceBetweenXiXf = VectorPoints [VectorPoints.length - 1].x - VectorPoints [0].x;    //Distancia em 'X' entre ponto inicial e final

    var passoLength = 1.0/n;                                                                    //Tamanho do passo

    var coeficientsBernstein = [];
    var VectorX_Coordinate = [];
    var VectorY_Coordinate = [];

    for (t = 0, j = 0; t <= 1; t += passoLength, j++) {
        var xCoordinate = t * distanceBetweenXiXf + x0;
        var yCoordinate = 0;
        coeficientsBernstein.push ([]);

        for (i = 0; i <= n; i++) {
            yCoordinate += cs [i] * Math.pow (xCoordinate, n - i);

            coeficientsBernstein [j].push (CalculoPolinomioBernstein (t, n, i));
        }

        VectorX_Coordinate.push (xCoordinate);
        VectorY_Coordinate.push (yCoordinate);
    }

    var VectorX_Weighted = math.lusolve (coeficientsBernstein, VectorX_Coordinate);  //Solução do sistema: "coeficientsBernstein * v = VectorX_Coordinate"
    var VectorY_Weighted = math.lusolve (coeficientsBernstein, VectorY_Coordinate);  //Solução do sistema: "coeficientsBernstein * v = VectorY_Coordinate"

    var VectorControlPoints = [];

    for (i = 0; i < VectorX_Weighted.length; i++) {
        VectorControlPoints.push ({x: VectorX_Weighted [i][0], y: VectorY_Weighted [i][0]});
    }

    return VectorControlPoints;
}