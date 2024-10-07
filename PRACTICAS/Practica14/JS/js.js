window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function contarLetrasTotales()
{
    let textoIntroducido = document.formulario.codigo.value.length;
    let correcto = false;
    if (textoIntroducido >= 20 && textoIntroducido <= 26 )
        correcto = true;
    return correcto;
}

function inicioNum(textoIntroducido,inicio)
{
    if (isNaN(textoIntroducido[3]))
        inicio = 3;
    else if (isNaN(textoIntroducido[4]))
        inicio = 4;
    else if (isNaN(textoIntroducido[5]))
        inicio = 5;
    else if (isNaN(textoIntroducido[6]))
        inicio = 6;

    for (let i = 0; i < inicio; i++) 
        if (isNaN(textoIntroducido[i]))     
            inicio = -1;

    return inicio;
}

function caracterEsp(textoIntroducido,inicio) {
    let correcto = false;
    if (comprobacionCaracteresEsp(textoIntroducido[inicio])) 
        correcto = true;
    return correcto;
}

function cuatroASieteLetras(textoIntroducido,inicio) {
    let final = inicio;
    if (!comprobacionLetra(textoIntroducido[inicio+1]))
        final += 1;
    else if (!comprobacionLetra(textoIntroducido[inicio+2]))
        final += 2;
    else if (!comprobacionLetra(textoIntroducido[inicio+3]))
        final += 3;
    else if (!comprobacionLetra(textoIntroducido[inicio+4]))
        final += 4;
    else if (!comprobacionLetra(textoIntroducido[inicio+5]))
        final += 5;
    else if (!comprobacionLetra(textoIntroducido[inicio+6]))
        final += 6;
    else if (!comprobacionLetra(textoIntroducido[inicio+7]))
        final += 7;
    for (let i = inicio; i < final; i++) 
        if (!comprobacionLetra(textoIntroducido[i]))     
            final = inicio;
    return final;
}

function dosDigitos(textoIntroducido,inicio)
{
    let correcto = false;
    textoIntroducido = textoIntroducido.substring(inicio,inicio+2);
    for (let i = 0; i < 2 ; i++)
        if (isNaN(textoIntroducido[i])) 
            correcto = true;
    return correcto;
}
function tresLetras(textoIntroducido,inicio) {
    let correcto = false;
    textoIntroducido = textoIntroducido.split("");
    textoIntroducido = textoIntroducido.slice(inicio,inicio+3);
    textoIntroducido.forEach(letra => {
        if (!comprobacionLetra(letra))
            correcto = true;
    });
    return correcto;

}

function finalLetraNumCaract(textoIntroducido,inicio)
{
    let correcto = false;
    textoIntroducido = textoIntroducido.split("");  
    textoIntroducido = textoIntroducido.slice(inicio,inicio+5)
    textoIntroducido.forEach(letra => {
        if (comprobacionFinal(letra))
            correcto = true;
    });
    return correcto;
}

/************************************************************************************/

function comprobacionLetra(character) {
    return (character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122 );
}
function comprobacionCaracteresEsp(character) {
    return !(character.charCodeAt(0) == 64) &&
           !(character.charCodeAt(0) == 35) &&
           !(character.charCodeAt(0) == 36) &&
           !(character.charCodeAt(0) == 38);
}
function comprobacionFinal(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) >= 47 && character.charCodeAt(0) <= 57 ) &&
           !(character.charCodeAt(0) == 37) &&
           !(character.charCodeAt(0) == 33) &&
           !(character.charCodeAt(0) == 63);
    
}


function comprobar()
{
    let inicio = -1;
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    let textoIntroducido = document.formulario.codigo.value;
    if (!contarLetrasTotales(textoIntroducido))
    {
        mensajeTotal += "Longitud inadecuada.\n" ;
        mensajeCorrecto = false;  
    }
    if (!(inicioNum(textoIntroducido,inicio) != -1))
    {
        mensajeTotal += "El codigo tiene que empezar con [3-6] números .\n";
        mensajeCorrecto = false;  
    }
    inicio = inicioNum(textoIntroducido,inicio);
    if (!(["AN", "ES", "DL", "US"].includes(textoIntroducido.substring(inicio,inicio+2))))
    {
        mensajeTotal += "El código que sigue los primeros números ha de ser ['AN', 'ES', 'DL', 'US']. \n";
        mensajeCorrecto = false;  
    }
    if (caracterEsp(textoIntroducido,inicio+2))
    {
        mensajeTotal += "Carácter inadecuado después de la secuencia numérica.\n";
        mensajeCorrecto = false;  
    }
    if((cuatroASieteLetras(textoIntroducido,inicio+3) < (inicio+7)))
    {
        mensajeTotal +="Carácter inadecuado jsuto después del caracter especial.\n";
        mensajeCorrecto = false;  
    }

    inicio = cuatroASieteLetras(textoIntroducido,inicio+3);
    if (dosDigitos(textoIntroducido,inicio))
    {        
        mensajeTotal += "Carácteres inadecuados después del caracter especial.\n";
        mensajeCorrecto = false; 
    }

    if (tresLetras(textoIntroducido,inicio+2))
    {        
        mensajeTotal += "Carácteres inadecuados despues de los dos dígitos.\n";
        mensajeCorrecto = false; 
    }
    if (finalLetraNumCaract(textoIntroducido,inicio+5))
    {
        mensajeTotal += "Final del codigo inadecuado.\n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}
