window.onload = inicio;


function inicio()
{
    document.formulario.boton.onclick = comprobar;
}

function comprobar(){
    let cadena = document.formulario.nif.value;
    document.formulario.mensaje.value = esCif(cadena);
    //esCif(cadena);
}
/********************************************************************************/

function esNif(cadena) 
{
    let valido = true;
    let codigoCorrecto = 1;
    let indice = 0 ,indice2 = 0,  resultado = 0;
    let laCadena = cadena.trim().toLowerCase();
    let caraPrimPos = ["x","z","y","l","k","m"];
    let caraControl  = ["t", "r", "w", "a",
                        "g", "m", "y", "f",
                        "p", "d", "x", "b",
                        "n", "j", "z", "s",
                        "q", "v", "h", "l",
                        "c", "k", "e"];

    
    if ((laCadena.length <= 8 && laCadena.length >= 6) && laCadena >= "100000") /*COMPRUEBA SI TIENE LAS CARÁCTERISTICAS DE DNI*/
        codigoCorrecto=3;
    else if (laCadena.length != 9) /*COMPRUEBA SI TIENE LOS 9 CARACTERES DE UN NIF*/
        codigoCorrecto = 0;
    else
    {
        if (!caraPrimPos.includes(laCadena.at(indice))) {
            valido = false;
        }else
        {
            switch (laCadena.at(indice)) /*INICIO PARA LAS LETRAS "Z" E "Y"  */
            {
                case "y":
                    laCadena =laCadena.replace("y","1");
                break;
                case "z":
                    laCadena = laCadena.replace("2","z");
                break;
                default:
                    indice = indice2 +=1;
                    break;
            }
        } 
        while (valido && indice < laCadena.length-1){ /*COMPROBACIÓN DE NÚMEROS*/

            if (laCadena.at(indice) < "0" || laCadena.at(indice) > "9")
                valido=false;
            indice+=1;
        }
        if (valido) {

            let numerosCadena = parseInt(laCadena.substring(indice2,laCadena.length-1));
            resultado = numerosCadena%23;
            if (laCadena.at(indice) != caraControl[resultado]) /*COMPROBACIÓN DE CARÁCTER DE CONTROL*/
                codigoCorrecto = 2;
            else
                codigoCorrecto = 1;
        }
        else
            codigoCorrecto = 2;
    }
    return codigoCorrecto ; 
}


function esCif(cadena)
{
    let letra = true, valido = true ;
    let letrasMas = "pqrsw";
    let codigoCorrecto = 1;
    let numerosCadena = 0, sumaTotal = 0, numAux = 0, numAux2 = 0;
    let indice = 0 ,  resultado = 0;
    let laCadena = cadena.trim().toLowerCase();
    let caraControl =  ["j","a","b","c",
                        "d","e","f","g",
                        "h","i"];
    if (laCadena.length != 9) /*COMPRUEBA SI TIENE LOS 9 CARACTERES DE UN NIF*/
        codigoCorrecto=2;
    else
    {
        if (laCadena.at(indice) > "z" || laCadena.at(indice) < "a") 
            valido = false

        /*COMPROBACIÓN PRIMERA LETRA*/
        if (!letrasMas.includes(laCadena.at(indice)) )
            letra=false;
        indice+=1;
        while (valido && indice < laCadena.length-1){ /*COMPROBACIÓN DE NÚMEROS*/
            if (laCadena.at(indice) < "0" || laCadena.at(indice) > "9")
                valido=false;
            indice+=1;
        }
        if (valido) {
            numerosCadena = parseInt(laCadena.substr(indice,7));
            for (let i = 0; i < 7; i++) {
                numAux = 0;
                numAux2 = 0;
                if (i != 2) 
                    sumaTotal += numerosCadena[i];
                else{                
                    numAux = numerosCadena[i]*2;
                    numAux2 = numAux.split("");
                    sumaTotal += numAux2[0] + numAux2[1];
                }
            }
            sumaTotal%= 10;
            sumaTotal= 10-sumaTotal;
        }else
        {
            codigoCorrecto=2;

        }
    } 
    return codigoCorrecto;

}