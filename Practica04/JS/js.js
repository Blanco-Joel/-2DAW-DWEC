window.onload = inicio;

function inicio() 
{
    document.formulario.convertir.onclick = calcular;
}

function convertir(base) 
{
    let num = Number(document.formulario.decimal.value);
    let numStr = "";

    while (num >= 1) 
        {
        if (Math.floor((num % base)) > 9 && base == 16) 
        {

            numStr = String.fromCharCode(65 + (Math.floor((num % base)) - 10)) + numStr;
        } else 
        {
            numStr = Math.floor(num % base) + numStr;
        }
        num = Math.floor(num / base); 
    }
    return numStr;
}

function calcular()
 {
    document.formulario.binario.value = convertir(2);
    document.formulario.octal.value = convertir(8);
    document.formulario.hexadecimal.value = convertir(16);
}
