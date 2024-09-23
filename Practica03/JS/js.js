window.onload = inicio;
function inicio() 
{
    document.formulario.calcular.onclick = calcular;
}
function calcular()
{
    var numPrimos = "";
    for (let i = Number(document.formulario.minNum.value); i <= Number(document.formulario.maxNum.value); i++) {
        let resto = 0;
        for (let j = 1; j < i; j++) 
            if (i%j == 0) 
                resto += 1;               
        if (resto <= 2 ) 
            numPrimos += (i + "|");
    }
    document.formulario.texto.value = numPrimos; 

}

