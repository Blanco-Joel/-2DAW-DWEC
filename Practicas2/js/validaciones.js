window.onload = inicio;


function inicio()
{
    document.formulario.boton.onclick = comprobar;
}

function comprobar(){
    let cadena = document.formulario.dato.value;
    document.formulario.mensaje.value = NIFCIF(cadena);
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
        console.log((!caraPrimPos.includes(laCadena.at(indice))));
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
    let numerosCadena = 0, sumaTotal = 0, numAux = 0;
    let indice = 0 ,  resultado = 0;
    let laCadena = cadena.trim().toLowerCase();
    let caraControl =  ["j","a","b","c",
                        "d","e","f","g",
                        "h","i"];
    if (laCadena.length != 9) /*COMPRUEBA SI TIENE LOS 9 CARACTERES DE UN NIF*/
        codigoCorrecto=0;
    else
    {
        if (laCadena.at(indice) > "z" || laCadena.at(indice) < "a") 
            valido = false

        indice+=1;
        while (valido && indice < laCadena.length-1){ /*COMPROBACIÓN DE NÚMEROS*/
            if (laCadena.at(indice) < "0" || laCadena.at(indice) > "9")
                valido=false;
            indice+=1;
        }
        if (valido) {
            
            numerosCadena = (laCadena.substr(1,7));
            for (let i = 0; i < 7; i++) {
                numAux = 0;
                if (i%2 != 0) 
                    sumaTotal += parseInt(numerosCadena[i]);
                else{                
                    numAux = parseInt(numerosCadena[i])*2;

                    if (numAux > 9 )
                        numAux = numAux+1-10;
                    sumaTotal += numAux;
                }
            }
            
            sumaTotal%= 10;
            sumaTotal= 10-sumaTotal;
            /*COMPROBACIÓN PRIMERA LETRA*/
            if (letrasMas.includes(laCadena.at(0)) ){
                if (!(caraControl[sumaTotal] == laCadena.at(indice))) 
                    codigoCorrecto = 2;       
            }else{
                if (!(sumaTotal == laCadena.at(indice))) 
                    codigoCorrecto = 2;
            }
        }else{
            codigoCorrecto=2;
        }
    } 
    return codigoCorrecto;

}

function NIFCIF(cadena) 
{
    let laCadena = cadena.trim().toLowerCase();
    let codigo;
    let letraNif = ["x", "z", "y", "l", "k", "m"];
    let letraCif = ["a", "h", "j", "u", "v", "p", "q", "r", "s", "w"];

    if (laCadena.length > 9) /*COMPRUEBA SI TIENE LOS 9 CARACTERES*/
        codigo="0";
    else
    {
        if (letraCif.includes(laCadena.at(0)))
            codigo = "C" + esCif(cadena).toString();
        if (letraNif.includes(laCadena.at(0)))
            codigo = "N" + esNif(cadena).toString();
        if (laCadena.at(0) >= 0 && laCadena.at(0) <= 9)
            codigo = "N" + esNif(cadena).toString();
    }
    return codigo;
}