window.onload = inicio;
function inicio()
{
    var numPrimos = "";
    for (let i = 1; i <= 100; i++) {
        let resto = 0;
        for (let j = 1; j < i; j++) 
            if (i%j == 0) 
                resto += 1;               
        if (resto <= 2 ) 
            numPrimos += (i + "|");
    }
    document.formulario.texto.value = numPrimos; 

}