window.onload = inicio;


function inicio()
{
    document.formulario.boton.onclick = comprobar;
}

function comprobar(){
    let cadena = document.formulario.dato.value;
    document.formulario.mensaje.value = NIFCIF(cadena);
    let codigo = document.formulario.codigo.value;
    document.formulario.mensajeCodigo.value = separarCodigo(codigo);
    let codCuenta = document.formulario.iban.value;
    document.formulario.mensajeIban.value = calculoIBANEspanya(codCuenta);
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
        if (caraPrimPos.includes(laCadena.at(indice))) 
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
            if (laCadena.at(indice) >= "a" && laCadena.at(indice) <= "z"){
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
    let letraCif = ["a","b","c","d","e","f","g", "h", "j", "n", "p","q","r","s","u","v","w"];

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

function separarCodigo(codigo) 
{
    let valido = "";
    if (codigo.length == 18) {
        codigo1 = codigo.substr(0,4);
        codigo2 = codigo.substr(4,4);
        codigo3 = codigo.substr(8,10);
        valido = codigosControl(codigo1,codigo2,codigo3);
    }else
        valido = "El código introducido no es válido.";
    return valido;
}
function codigosControl(codBanco,codSucursal,codCuenta)
{
    let mensaje = "";
    let n1;
    let n2;
    let n3;
    if(codBanco.length != 4 || codSucursal.length != 4 || codCuenta.length != 10 ||
        isNaN(codBanco) ||  isNaN(codSucursal) || isNaN(codCuenta))
    {
        mensaje = "El código introducido no es válido.";
    }
    codBanco = (codBanco).toString().split("");
    n1 = (parseInt(codBanco[0]) * 4) + (parseInt(codBanco[1]) * 8) + (parseInt(codBanco[2]) * 5) + (parseInt(codBanco[3]) * 10);
    codSucursal = (codSucursal).toString().split('');
    n2 = (parseInt(codSucursal[0]) * 9) + (parseInt(codSucursal[1]) * 7) + (parseInt(codSucursal[2]) * 3) + (parseInt(codSucursal[3]) * 6);
    codCuenta = (codCuenta).toString().split('');
    n3 = parseInt(codCuenta[0]) + (parseInt(codCuenta[1]) * 2) + (parseInt(codCuenta[2]) * 4) + (parseInt(codCuenta[3]) * 8) + (parseInt(codCuenta[4]) * 5) + 
                (parseInt(codCuenta[5]) * 10) + (parseInt(codCuenta[6]) * 9) + (parseInt(codCuenta[7]) * 7) + (parseInt(codCuenta[8]) * 3) + (parseInt(codCuenta[9]) * 6);
    n1 = 11 - ((n1 + n2) % 11);
    n1 = n1 == 10 ? 0 : n1 == 11 ? 1 : n1;
    n3 = 11 - (n3 % 11);
    n3 = n3 == 10 ? 0 : n3 == 11 ? 1 : n3;

    return n1.toString()+n3.toString();
}
function calculoIBANEspanya(codCuenta) 
{
    let control;
    let codCuentaNumerico;
    let iban = "";
    if (codCuenta.length != 20 || isNaN(codCuenta)) {
        iban = "El código introducido no es válido.";
    }else
    {
        codCuentaNumerico = codCuenta.toString() + "142800";
        console.log (codCuenta)

        control = Math.abs(98 - (parseInt(codCuentaNumerico,10)%97));
        console.log ( control)

        control = (control < 10) ? ("0" + control.toString()) : control.toString() ; 
        console.log ( control)
        iban = "ES" + control + codCuenta;
    }    

    return iban; 
}