window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function contarLetrasTotales()
{
    let texto = document.formulario.localidad.value.length;
    let correcto = false;
    if (texto >= 7 && texto <= 35 )
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
    textoIntroducido = textoIntroducido.substring(1,textoIntroducido.length-2);
    textoIntroducido = textoIntroducido.toLowerCase().split("");
    textoIntroducido.forEach(letra => {
        if (comprobacionTodo(letra))
            correcto = true;
    });

    return correcto;
}
function finalLetra(textoIntroducido)
{
    let correcto = false;
    textoIntroducido = textoIntroducido.slice(-2);
    textoIntroducido = textoIntroducido.split("");
    textoIntroducido.forEach(letra => {
        if (!comprobacionLetra(letra))
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
           !(character.charCodeAt(0) == 32);
    
}
function comprobar()
{
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    let textoIntroducido = document.formulario.localidad.value.toLowerCase();
    if (!contarLetrasTotales(textoIntroducido))
    {
        mensajeTotal += "Longitud inadecuada.\n" ;
        mensajeCorrecto = false;  
    }
    if (inicioLetra(textoIntroducido))
    {
        mensajeTotal += "El localidad tiene que empezar con una letra.\n";
        mensajeCorrecto = false;  
    }

    if (caracteres(textoIntroducido))
    {

        mensajeTotal += "Carácteres inadecuados.\n";
        mensajeCorrecto = false;  
    }
    if (finalLetra(textoIntroducido))
    {
        mensajeTotal += "Final de la localidad inadecuado.\n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}
