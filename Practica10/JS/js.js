window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function letraInicio()
{


}

function comrpobarUrl(cadena)
{
    let limite;
    let limite2 = cadena.lastIndexOf(".");
    let seguir = true;
    let finalCadena = cadena.substring(limite2+1,cadena.length);
    if(cadena.includes("http://"))
        limite = 6;
    else if (cadena.includes("https://"))
        limite = 7;
    else 
        limite = 4;

}
function caracteres()
{
    let correcto = true;
    let textoIntroducido = document.formulario.email.value.toLowerCase();
    let limite = textoIntroducido.search("@")-2;
    textoIntroducido = textoIntroducido.split("");
    for (let i = 1; i < limite; i++)
    {
            if(!(textoIntroducido[i].charCodeAt(0) >= 97 && textoIntroducido[i].charCodeAt(0) <= 122) || !(textoIntroducido[i].charCodeAt(0) >= 48 && textoIntroducido[i].charCodeAt(0) >= 57 ) || !(textoIntroducido[i].charCodeAt(0) != 45) || !(textoIntroducido[i].charCodeAt(0) != 46))
                correcto = false;

        console.log(textoIntroducido[i].charCodeAt(0));
        console.log(correcto);
    }
    
    return correcto;
}
function comprobar()
{
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    let cadena = document.formulario.url.value;
    if(cadena.substring(0,7) == "http://" || cadena.substring(0,8) == "https://" || cadena.substring(0,4) == "www.")
        comrpobarUrl(cadena);
    else
    {
        mensajeCorrecto = false;
        mensajeTotal = "La url no tiene un inicio adecuado. "
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}