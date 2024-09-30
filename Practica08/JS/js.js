window.onload = inicio;
function inicio() 
{
    document.formulario.comprobar.onclick = comprobar;
}

function crearArrayTexto()
{
    let textoIntroducido = document.formulario.fecha.value;
    textoIntroducido = textoIntroducido.replace("-","/");
    textoIntroducido = textoIntroducido.replace("-","/");
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

    if (((arrayFecha[2] % 4 == 0) && (arrayFecha[2] % 100 != 0 )) || (arrayFecha[2] % 400 == 0))
        mes = 29;

    switch (arrayFecha[1]) {
        case 1,3,5,7,8,10,12:
            console.log(correcto);

            if (arrayFecha[0] < 31) {
                correcto = false;
                console.log(correcto);
            }

            break;
        case 2: 
            if (arrayFecha[0] > mes) {
                correcto = false;
            }
            break;   
        case 4,6,9,11:
            if (arrayFecha[0] > 30) {
                correcto = false;
            }
        default:       
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
