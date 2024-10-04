window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function caracteres(textoIntroducido)
{
    let correcto = false;
    textoIntroducido = textoIntroducido.split("");
    textoIntroducido.forEach(letra => {
        if (comprobacionTodo(letra))
            correcto = true;
    });
    return correcto;
}

function ComprobarPalindromo(textoIntroducido) 
{
    let correcto = false;
    let vueltaCadena = [];
    textoIntroducido = textoIntroducido.replaceAll(" ","");
    textoIntroducido = textoIntroducido.split("");
    textoIntroducido.forEach(letra => {
        vueltaCadena.unshift(letra);
    });
    for (let i = 0; i < textoIntroducido.length; i++) 
        if (vueltaCadena[i] != textoIntroducido[i]) 
            correcto = true;
        
    
    return correcto;
}

/************************************************************************************/

function comprobacionTodo(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) &&    
           !(character.charCodeAt(0) == 32);
    
}

function comprobar()
{
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    let textoIntroducido = document.formulario.palindromo.value.toLowerCase();

    if (caracteres(textoIntroducido))
    {
        mensajeTotal += "Carácteres inadecuados.\n";
        mensajeCorrecto = false;  
    }
    if (ComprobarPalindromo(textoIntroducido))
    {
        mensajeTotal += "No es palíndromo.\n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}
