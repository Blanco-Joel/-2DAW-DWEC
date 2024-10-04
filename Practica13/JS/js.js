window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}


/************************************************************************************/

function comprobacionLetra(character) {
    return (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122 );
}

function comprobacionTodo(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) &&    
           !(character.charCodeAt(0) == 32);
    
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
