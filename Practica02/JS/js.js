window.onload = inicio;
function inicio()
{
    var numPrimos = "";
    var contador = 0;
    var i = 1 ;
    let resto = 0;
    while (contador < 100) 
    {
        resto = 0;
        for (let j = 1; j <= i; j++) 
        {
            if (i%j == 0) 
            {
                resto += 1;               
            }
        }
        if (resto <= 2 ) 
        {   
            numPrimos += (i + "|");
            contador += 1;
        }   
        i += 1;
    }
    document.formulario.texto.value = numPrimos; 
}