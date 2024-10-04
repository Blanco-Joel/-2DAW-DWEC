window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function contarLetrasTotales()
{
    let texto = document.formulario.codigo.value.length;
    let correcto = false;
    if (texto >= 20 && texto <= 26 )
        correcto = true;
    return correcto;
}

function inicioNum(textoIntroducido)
{
    let correcto = false;
    let inicio = 6;
    textoIntroducido = textoIntroducido.split("");
    if (isNaN(textoIntroducido[3]))
        inicio = 3;
    else if (isNaN(textoIntroducido[4]))
        inicio = 4;
    else if (isNaN(textoIntroducido[5]))
        inicio = 5;
    else if (!isNaN(textoIntroducido[6]))
        correcto = true;
    for (let i = 0; i < inicio; i++) 
        if (isNaN(textoIntroducido[i]))     
            correcto = true;

    return correcto;
}

function caracteres(textoIntroducido)
{
    let correcto = false;
    textoIntroducido = textoIntroducido.split("");
    textoIntroducido = textoIntroducido.slice(0,-1);
    textoIntroducido.forEach(letra => {
        if (comprobacionTodo(letra))
            correcto = true;
    });


    return correcto;
}
function finalLetraNum(textoIntroducido)
{
    let correcto = false;

    if (comprobacionLetraNum(textoIntroducido[textoIntroducido.length-1]))
        correcto = true;

    return correcto;
}

/************************************************************************************/

function comprobacionLetra(character) {
    return (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122 );
}

function comprobacionTodo(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) >= 47 && character.charCodeAt(0) <= 57 ) &&
           !(character.charCodeAt(0) == 45) &&
           !(character.charCodeAt(0) == 170) &&
           !(character.charCodeAt(0) == 186);
    
}
function comprobacionLetraNum(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57 );
}
function comprobar()
{
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    let textoIntroducido = document.formulario.codigo.value.toLowerCase();
    if (!contarLetrasTotales(textoIntroducido))
    {
        mensajeTotal += "Longitud inadecuada.\n" ;
        mensajeCorrecto = false;  
    }
    if (inicioNum(textoIntroducido))
    {
        mensajeTotal += "El codigo tiene que empezar con [3-6] números .\n";
        mensajeCorrecto = false;  
    }

    if (caracteres(textoIntroducido))
    {

        mensajeTotal += "Carácteres inadecuados.\n";
        mensajeCorrecto = false;  
    }
    if (finalLetraNum(textoIntroducido))
    {
        mensajeTotal += "Final de la codigo inadecuado.\n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}
