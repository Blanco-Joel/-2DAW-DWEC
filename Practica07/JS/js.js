window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}


function contarLetrasTotales()
{
    let texto = document.formulario.nombre.value.length;
    let correcto = false;
    if (texto >= 3 && texto <=27 )
        correcto = true;
    return correcto;
}
function inicioFinal()
{
    let correcto = false;
    let textoIntroducido = document.formulario.nombre.value;
    textoIntroducido = textoIntroducido.toLowerCase().split("");
    if (textoIntroducido[0].charCodeAt(0) >= 97 && textoIntroducido[0].charCodeAt(0) <= 165 && textoIntroducido[textoIntroducido.length-1].charCodeAt(0) >= 97 && textoIntroducido[textoIntroducido.length-1].charCodeAt(0) <= 165   ) 
        correcto = true;
    return correcto;
}
function caracteres()
{
    let correcto = false;
    let textoIntroducido = document.formulario.nombre.value;
    textoIntroducido = textoIntroducido.toLowerCase().split("");
    textoIntroducido.forEach(letra => {
        if (letra.charCodeAt(0) >= 97 && letra.charCodeAt(0) <= 122 && letra.charCodeAt(0) != 170 && letra.charCodeAt(0) != 186 && letra.charCodeAt(0) != 45 && letra.charCodeAt(0) != 32 )
            correcto = true;
 
    });
    return correcto;
}
function comprobar()
{
    console.log(" ".charCodeAt(0));
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    if (!contarLetrasTotales())
    {
        mensajeTotal += "Longitud inadecuada.\n" ;
        mensajeCorrecto = false;  
    }
    if (!inicioFinal())
    {
        mensajeTotal += "El nombre tiene que empezar y terminar con una letra.\n";
        mensajeCorrecto = false;  
    }

    if (!caracteres())
    {

        mensajeTotal += "Carácteres inadecuados.\n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}
