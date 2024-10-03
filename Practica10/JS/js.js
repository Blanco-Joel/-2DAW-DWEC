window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function comrpobarUrl(textoIntroducido,mensajeTotal)
{
    let inicio;
    if(textoIntroducido.includes("http://"))
        inicio = 6;
    else if (textoIntroducido.includes("https://"))
        inicio = 7;
    else 
        inicio = 4;
    
    if (!letraInicio(inicio,textoIntroducido))
    {
        mensajeTotal += "Carácteres inadecuados justo después del inicio de la URL.\n";
        mensajeCorrecto = false;  
    }
    if (!caracteresDespuesInicio(inicio,textoIntroducido))
    {
        mensajeTotal += "Carácteres inadecuados después del inicio de la URL. \n";
        mensajeCorrecto = false;  
    }
    if (!letraAntesPunto(textoIntroducido))
    {
        mensajeTotal += "Carácter inadecuado justo antes del '.' . \n";
        mensajeCorrecto = false;  
    }
    if (!letraDespuesPunto(textoIntroducido))
    {
        mensajeTotal += "Cantidad de caracteres inadecuada después del '.' . \n";
        mensajeCorrecto = false;  
    }

    return mensajeTotal;
}
function letraInicio(inicio,textoIntroducido)
{
    let correcto = false;
    if (comprobacionLetra(textoIntroducido[inicio])) 
        correcto = true;
    return correcto;
}

function caracteresDespuesInicio(inicio,textoIntroducido)
{
    let correcto = true;
    textoIntroducido = textoIntroducido.split("");

    for (let i = inicio; i < textoIntroducido.lastIndexOf(".")-1; i++)
        if(comprobacionLetraNumGuion(textoIntroducido[i]))
            correcto = false;
    return correcto;
}

function letraAntesPunto(textoIntroducido)
{
    let correcto = true;
    if (comprobacionLetraNum(textoIntroducido[textoIntroducido.lastIndexOf(".")-1]))
        correcto = false;
    return correcto;
}

function letraDespuesPunto(textoIntroducido)
{
    let correcto = true;
    if( !(2 <= (textoIntroducido.length-textoIntroducido.lastIndexOf(".")-1) &&
          4 >= (textoIntroducido.length-textoIntroducido.lastIndexOf(".")-1)))
          correcto = false;
    else
    {
        textoIntroducido = textoIntroducido.split("");
        for (let i = textoIntroducido.lastIndexOf(".")+1; i < textoIntroducido.length; i++) 
            if (!comprobacionLetra(textoIntroducido[i])) 
                correcto = false;
            
        
    }
    return correcto;
}

/*******************************************************************************************************/

function comprobacionLetraNumGuion(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57 ) &&
           !(character.charCodeAt(0) == 45);
    
}

function comprobacionLetraNum(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57 );
}

function comprobacionLetra(character) {
    return (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122 );
}


function comprobar()
{
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    let textoIntroducido = document.formulario.url.value;
    if((textoIntroducido.substring(0,7) == "http://") || 
        (textoIntroducido.substring(0,8) == "https://")||
        (textoIntroducido.substring(0,4) == "www."))

        mensajeTotal = comrpobarUrl(textoIntroducido,mensajeTotal);
    else
    {
        mensajeCorrecto = false;
        mensajeTotal += "La url no tiene un inicio adecuado. \n" ;
    }

    if (!mensajeCorrecto || mensajeTotal.length > 0) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}