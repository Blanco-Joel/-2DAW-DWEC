function esNif(cadena) 
{
    let valido = true;
    let codigoCorrecto = 1;
    let indice = 0 ,indice2 = 0,  resultado = 0;
    let laCadena = cadena.trim().toLowerCase();
    let caraControl  = ["t", "r", "w", "a",
                        "g", "m", "y", "f",
                        "p", "d", "x", "b",
                        "n", "j", "z", "s",
                        "q", "v", "h", "l",
                        "c", "k", "e"];

    
    if (laCadena.length != 9) /*COMPRUEBA SI TIENE LOS 9 CARACTERES DE UN NIF*/
        codigoCorrecto=0;
    else if ((laCadena.length > 8 || laCadena.length < 6) && laCadena >= "100000") /*COMPRUEBA SI TIENE LAS CARÁCTERISTICAS DE DNI*/
        codigoCorrecto = 3;
    else
    {
        switch (laCadena.at(indice)) /*INICIO PARA LAS LETRAS "Z" E "Y"  */
        {
            case "y":
                laCadena.replace("y","1");
            break;
            case "z":
                laCadena.replace("z","2");
            break;
            default:
                indice = indice2 +=1;
                break;
        }
        
        while (valido && indice < laCadena.length-1){ /*COMPROBACIÓN DE NÚMEROS*/
            if (laCadena.at(indice) < "0" || laCadena.at(indice) > "9")
                valido=false;
            indice+=1;
        }
        if (valido) {
            let numerosCadena = parseInt(laCadena.substring(indice2,laCadena.length-2));
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
    let letra = true;
    let letrasMas = "pqrsw";
    let codigoCorrecto = 1;
    let indice = 0 ,  resultado = 0;
    let laCadena = cadena.trim().toLowerCase();
    let caraControl =  ["j","a","b","c",
                        "d","e","f","g",
                        "h","i"];
    if (laCadena.length != 9) /*COMPRUEBA SI TIENE LOS 9 CARACTERES DE UN NIF*/
        codigoCorrecto=0;
    else
    {
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
            laCadena = parseInt(laCadena.substring(indice,indice))
        }   
} 


