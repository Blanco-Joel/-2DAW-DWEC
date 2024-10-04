window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function contarLetrasTotales()
{
    let texto = document.formulario.direccion.value.length;
    let correcto = false;
    if (texto >= 8 && texto <= 42 )
        correcto = true;
    return correcto;
}

function inicioLetra(textoIntroducido)
{
    let correcto = false;
    if (!comprobacionLetra(textoIntroducido[0]))
        correcto = true;
    
    return correcto;
}

function caracteres(textoIntroducido)
{
    let correcto = false;
    if (comprobacionTodo(textoIntroducido[textoIntroducido.length-1]))
        correcto = true;

    return correcto;
}
function finalLetraNum(textoIntroducido)
{
    let correcto = false;
    textoIntroducido = textoIntroducido.split("");
    textoIntroducido.forEach(letra => {
        if (!comprobacionLetraNum(letra))
            correcto = true;
    });

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
    let textoIntroducido = document.formulario.direccion.value.toLowerCase();
    if (!contarLetrasTotales(textoIntroducido))
    {
        mensajeTotal += "Longitud inadecuada.\n" ;
        mensajeCorrecto = false;  
    }
    if (inicioLetra(textoIntroducido))
    {
        mensajeTotal += "El direccion tiene que empezar con una letra.\n";
        mensajeCorrecto = false;  
    }

    if (caracteres(textoIntroducido))
    {

        mensajeTotal += "Carácteres inadecuados.\n";
        mensajeCorrecto = false;  
    }
    if (finalLetraNum(textoIntroducido))
    {
        mensajeTotal += "Final de la direccion inadecuado.\n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}
