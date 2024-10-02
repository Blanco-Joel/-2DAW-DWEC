window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function letraInicio()
{
    let correcto = false;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    if (comprobacionLetra(textoIntroducido[0])) 
        correcto = true;
    return correcto;
}

function caracteres()
{        
    let correcto = true;

    let textoIntroducido = document.formulario.email.value.toLowerCase();
    let limite = textoIntroducido.search("@")-1;
    textoIntroducido = textoIntroducido.split("");

    for (let i = 1; i <= limite; i++)
        if(comprobacionTodo(textoIntroducido[i]))
            correcto = false;
        return correcto;
}

function letraFinal()
{
    let correcto = true;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    if (comprobacionLetraNum(textoIntroducido[textoIntroducido.search("@")-1]))
        correcto = false;
    return correcto;
}

function letraDespuesArr()
{
    let correcto = false;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    if (comprobacionLetra(textoIntroducido[ textoIntroducido.search("@")+1])) 
        correcto = true;
    return correcto;
}

function caracteresDespesArr()
{
    let correcto = true;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    textoIntroducido = textoIntroducido.split("");

    for (let i = (textoIntroducido.indexOf("@")+2); i <= textoIntroducido.lastIndexOf(".")-1; i++)
        if(comprobacionLetraNumGuion(textoIntroducido[i]))
            correcto = false;
    return correcto;
}

function letraAntesPunto()
{
    let correcto = true;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    if (comprobacionLetraNum(textoIntroducido[textoIntroducido.lastIndexOf(".")-1]))
        correcto = false;
    return correcto;
}

function letraDespuesPunto()
{
    let correcto = true;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
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

function comprobacionLetraNumGuion(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57 ) &&
           !(character.charCodeAt(0) == 45);
    
}
function comprobacionTodo(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) >= 45 && character.charCodeAt(0) <= 57 ) ||
           !(character.charCodeAt(0) != 47);
    
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
    if (!letraInicio())
    {
        mensajeTotal += "El email tiene que empezar con una letra.\n";
        mensajeCorrecto = false;  
    }

    if (!caracteres())
    {
        mensajeTotal += "Carácteres inadecuados antes del @. \n";
        mensajeCorrecto = false;  
    }
    if (!letraFinal())
    {
        mensajeTotal += "Carácter inadecuado justo antes del @. \n";
        mensajeCorrecto = false;  
    }
    if (!letraDespuesArr())
    {
        mensajeTotal += "Carácter inadecuado justo después del @. \n";
        mensajeCorrecto = false;  
    }
    if (!caracteresDespesArr())
    {
        mensajeTotal += "Carácteres inadecuados después del @. \n";
        mensajeCorrecto = false;  
    }
    if (!letraAntesPunto())
    {
        mensajeTotal += "Carácter inadecuado justo antes del '.' . \n";
        mensajeCorrecto = false;  
    }
    if (!letraDespuesPunto())
    {
        mensajeTotal += "Cantidad de caracteres inadecuada después del '.' . \n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}