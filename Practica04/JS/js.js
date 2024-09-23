window.onload = inicio;
function inicio() 
{
    document.formulario.convertir.onclick = calcular;
}
function convertir(base)
{
    let num= Number( document.formulario.decimal.value);
    let numStr = "";
    while (num >= 1)
    {
        numStr = (num%base) + numStr;
        console.log(numStr);
        num = num/ base; 
    }
    return numStr;
}
function calcular()
{
    document.formulario.binario.value = convertir(2);
    document.formulario.octal.value = convertir(8);
    document.formulario.hexadecimal.value = convertir(16);
}