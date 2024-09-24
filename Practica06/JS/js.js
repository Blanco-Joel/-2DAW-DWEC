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
function contarLetrasTotales()
{
    let texto = document.formulario.cadena.value.toLowerCase();
    let subCadena = document.formulario.subCadena.value.toLowerCase();
    let contador = 0;
    let i = 0; 
    while (i < texto.length) {
        if (texto.includes(subCadena,i)) 
        {
            contador += 1;
            i = texto.indexOf(subCadena,i) +1;
        }else
        {
            i += 1;
        }
    }
    return contador;
}

function comprobar()
{
    if (document.formulario.subCadena.value.length == 1 ) {
        document.formulario.mensaje.value = contar(document.formulario.subCadena.value); 
    }
    else{
        document.formulario.mensaje.value = contarLetrasTotales(); 
    }
}
