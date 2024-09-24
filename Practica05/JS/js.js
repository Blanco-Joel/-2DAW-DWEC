window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}
function arrayTexto()
{
    let textoIntroducido = document.formulario.cadena.value;
    textoIntroducido = textoIntroducido.toLowerCase().split("");
    return textoIntroducido;
}
function contar(letra)
{
    let texto = arrayTexto();
    let contador = 0;
    for (let i = 0; i < texto.length; i++) {
        if (letra == texto[i]) 
            contador += 1;
    }
    return contador;
}
function contarVocalesTotales(letras)
{
    let texto = arrayTexto();
    let contador = 0;
    for (let i = 0; i < texto.length; i++) {
        for (let j = 0; j < letras.length; j++) {
            if (letras[j] == texto[i]) 
                contador += 1;
        }
    }
    return contador;
}
function contarConsonantes(letras)
{
    let texto = arrayTexto();
    let contador = 0;
    let esta = "false";
    for (let i = 0; i < texto.length; i++) {
        esta = "true";
        for (let j = 0; j < letras.length; j++) {
            if (letras[j] == texto[i] || texto[i] == " " ) 
                esta = false;
        }
        if (esta) 
            contador += 1;
    }
    return contador;
}

function comprobar()
{
    document.formulario.A.value = contar("a"); 
    document.formulario.E.value = contar("e"); 
    document.formulario.I.value = contar("i"); 
    document.formulario.O.value = contar("o"); 
    document.formulario.U.value = contar("u"); 
    let arrayVocales = ["a","e","i","o","u"];
    document.formulario.vocalesTotales.value = contarVocalesTotales(arrayVocales); 
    document.formulario.consonantesTotales.value = contarConsonantes(arrayVocales); 
}
