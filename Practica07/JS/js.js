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
        if (comprobacionTodo(letra))
            correcto = true;
        console.log(letra +correcto);

    });

    return correcto;
}
function comprobacionTodo(character) {
    return !(character.charCodeAt(0) >= 97 && character.charCodeAt(0) <= 122) && 
           !(character.charCodeAt(0) == 32) &&
           !(character.charCodeAt(0) == 45) &&
           !(character.charCodeAt(0) == 170) &&
           !(character.charCodeAt(0) == 186);
    
}
function comprobar()
{
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

    if (caracteres())
    {

        mensajeTotal += "Carácteres inadecuados.\n";
        mensajeCorrecto = false;  
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}
