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
    let textoIntroducido = document.formulario.nombre.value;
    textoIntroducido = textoIntroducido.toLowerCase().split("");
    if (textoIntroducido[0] ) {
        
    }
    return textoIntroducido;
}
function comprobar()
{
    let mensaje = ""
    let mensajeCorrecto = true
    if (!contarLetrasTotales)
    {
        mensaje += "Longitud inadecuada.\n"  
        mensajeCorrecto = false;  
    }
    if (!inicioFinal)
    {
        mensaje += "El nombre tiene que empezar y terminar con una letra.\n"  
        mensajeCorrecto = false;  
    }
}
