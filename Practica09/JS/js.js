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
    let limite = textoIntroducido.search("@")-2;
    textoIntroducido = textoIntroducido.split("");
    console.log(textoIntroducido);
    for (let i = 1; i < limite; i++)
    {    
        
    }
    
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
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}