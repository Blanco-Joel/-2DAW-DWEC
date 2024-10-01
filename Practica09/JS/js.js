window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function letraInicio()
{
    let correcto = false;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    if (textoIntroducido[0].charCodeAt(0) >= 97 && textoIntroducido[0].charCodeAt(0) <= 122 ) 
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
    {    
            if(!(textoIntroducido[i].charCodeAt(0) >= 97 && textoIntroducido[i].charCodeAt(0) <= 122) && 
               !(textoIntroducido[i].charCodeAt(0) >= 45 && textoIntroducido[i].charCodeAt(0) <= 57 ) ||
                !(textoIntroducido[i].charCodeAt(0) != 47))
               {
                correcto = false;
               }
    }
    
    return correcto;
}
function letraFinal()
{
    let correcto = true;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    let index =     textoIntroducido.search("@")-1;
    if (!(textoIntroducido[index].charCodeAt(0) >= 97 && textoIntroducido[index].charCodeAt(0) <= 122) && 
        !(textoIntroducido[index].charCodeAt(0) >= 48 && textoIntroducido[index].charCodeAt(0) <= 57 ))
        correcto = false;
    return correcto;
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
        mensajeTotal += "Carácteres inadecuados antes del @ \n";
        mensajeCorrecto = false;  
    }
    if (!letraFinal())
    {
        mensajeTotal += "Carácter inadecuado justo antes del @ \n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}