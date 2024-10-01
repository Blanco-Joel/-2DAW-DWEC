window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function crearArrayTexto()
{
    let textoIntroducido = document.formulario.fecha.value;
    textoIntroducido = textoIntroducido.replaceAll("-","/");
    textoIntroducido = textoIntroducido.split("/");
    return textoIntroducido;
}
function comprobaciónTotal()
{
    let correcto = true;
    let arrayFecha = crearArrayTexto(); 
    let mes = 28;
    if (arrayFecha[2].length != 4) {
        correcto = false;
    }

    if (((parseInt(arrayFecha[2]) % 4 == 0) && (parseInt(arrayFecha[2]) % 100 != 0 )) || (parseInt(arrayFecha[2]) % 400 == 0))
        mes = 29;

    switch (parseInt(arrayFecha[1])) {
        case 1,3,5,7,8,10,12:
            if (parseInt(arrayFecha[0]) > 31) {
                correcto = false;
            }
            break;
        case 2:
 
            if (parseInt(arrayFecha[0]) > mes) {
                correcto = false;
            }
            break;   
        case 4,6,9,11:

            if (parseInt(arrayFecha[0]) > 30) {
                correcto = false;
            }
            break;
        default:    
 
            correcto = false;
            break;
    }

    return correcto;    
}
function comprobar()
{
    let fechaCorrecta = true;
    if (!comprobaciónTotal()) 
    {
        document.formulario.mensaje.value = "Fecha inválida";
    }
}
