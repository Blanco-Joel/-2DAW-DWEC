
function esNif(cadena) 
{
    let valido = true;
    let codigoCorrecto = 1;
    let indice = 0 ,indice2 = 0,  resultado = 0;
    let laCadena = cadena.trim().toLowerCase();
    let regNif = /^([0-9]{1}|[xyzlkm]{1})\d{7}[a-z]{1}$/i;
    let regDni = /^[1-9]{1}\d{5,7}$/;
    let caraPrimPos = ["x", "z", "y", "l", "k", "m"];
    let caraControl  = ["t", "r", "w", "a",
                        "g", "m", "y", "f",
                        "p", "d", "x", "b",
                        "n", "j", "z", "s",
                        "q", "v", "h", "l",
                        "c", "k", "e"];

    
    if (regDni.test(laCadena)) /*COMPRUEBA SI TIENE LAS CARÁCTERISTICAS DE DNI*/
        codigoCorrecto=3;
    else if (!regNif.test(laCadena)) /*COMPRUEBA SI TIENE LOS 9 CARACTERES DE UN NIF*/
        codigoCorrecto = 0;
    else
    {
        laCadena = (laCadena.at(indice) == "y") ? laCadena.replace("y", "1") :
                   (laCadena.at(indice) == "z") ? laCadena.replace("2", "z") : 
                   laCadena;
        indice = (!isNaN(laCadena.at(indice))) ? indice : indice+1;

        let numerosCadena = parseInt(laCadena.substring(indice,laCadena.length-1));
        resultado = numerosCadena%23;
        
        if (laCadena.at(laCadena.length-1) != caraControl[resultado]) /*COMPROBACIÓN DE CARÁCTER DE CONTROL*/
            codigoCorrecto = 2;
        else
            codigoCorrecto = 1;
    }
    return codigoCorrecto ; 
}


function esCif(cadena)
{
    let codigoCorrecto = 1;
    let numerosCadena = 0, sumaTotal = 0, numAux = 0;
    let regCif = new RegExp("^([abcdefghjuv]{1}\\d{8}|[pqrsw]{1}\\d{7}[a-z]{1})$","i");
    let regLetra = /^[a-z]{1}$/i;
    let laCadena = cadena.trim().toLowerCase();
    let caraControl =  ["j", "a", "b", "c", "d",
                        "e", "f", "g", "h", "i"];
    if (!regCif.test(laCadena)) /*COMPRUEBA SI TIENE LOS 9 CARACTERES DE UN NIF*/
        codigoCorrecto=0;
    else
    {
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
        if (regLetra.test(laCadena.at[0])){
            if (!(caraControl[sumaTotal] == laCadena.at(0))) 
                codigoCorrecto = 2;       
        }else{
            if (!(sumaTotal == laCadena.at(0))) 
                codigoCorrecto = 2;
        }

    } 
    return codigoCorrecto;

}

function NIFCIF(cadena) 
{
    let laCadena = cadena.trim().toLowerCase();
    let codigo;
    let letraNif = ["x", "z", "y", "l", "k", "m"]; 
    let letraCif = ["a", "b", "c", "d", "e", "f",
                    "g", "h", "j", "n", "p", "q",
                    "r", "s", "u", "v", "w"];
    if (laCadena.length > 9 || laCadena.length === 0) /*COMPRUEBA SI TIENE LOS 9 CARACTERES*/
        codigo="0\n";
    else
    {
        if (letraCif.includes(laCadena.at(0)))
            codigo = "C" + esCif(cadena).toString() + "\n";
        if (letraNif.includes(laCadena.at(0)))
            codigo = "N"; + esNif(cadena).toString() + "\n";
        if (laCadena.at(0) >= 0 && laCadena.at(0) <= 9)
            codigo = "N"; + esNif(cadena).toString() + "\n";
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
    let regCuatro = new RegExp("\\d{4}");
    let regDiez = new RegExp("\\d{10}");
    if(!regCuatro.test(codBanco) || !regCuatro.test(codSucursal) || !regDiez.test(codCuenta))
    {
        mensaje = "El código de control introducido no es válido.";
    }else{
        codBanco = (codBanco).toString().split("");
        n1 = (parseInt(codBanco[0]) * 4) +
             (parseInt(codBanco[1]) * 8) + 
             (parseInt(codBanco[2]) * 5) + 
             (parseInt(codBanco[3]) * 10);
        codSucursal = (codSucursal).toString().split('');
        n2 = (parseInt(codSucursal[0]) * 9) + 
             (parseInt(codSucursal[1]) * 7) + 
             (parseInt(codSucursal[2]) * 3) + 
             (parseInt(codSucursal[3]) * 6);
        codCuenta = (codCuenta).toString().split('');
        n3 = (parseInt(codCuenta[0]) * 1) +    
             (parseInt(codCuenta[1]) * 2) +    
             (parseInt(codCuenta[2]) * 4) +   
             (parseInt(codCuenta[3]) * 8) +    
             (parseInt(codCuenta[4]) * 5) +    
             (parseInt(codCuenta[5]) * 10) +   
             (parseInt(codCuenta[6]) * 9) +   
             (parseInt(codCuenta[7]) * 7) +   
             (parseInt(codCuenta[8]) * 3) +   
             (parseInt(codCuenta[9]) * 6);   
                    
        n1 = 11 - ((n1 + n2) % 11);
        n1 = n1 == 10 ? 1 : n1 == 11 ? 0 : n1;
        n3 = 11 - (n3 % 11);
        n3 = n3 == 10 ? 1 : n3 == 11 ? 0 : n3;
        mensaje = n1.toString()+n3.toString();
    }
    return mensaje;
}
function calculoIBANEspanya(codCuenta) 
{
    let control;
    let codCuentaNumerico;
    let iban = "";
    let regCodCuenta = /^\d {20}$/
    if (!regCodCuenta.test(codCuenta)) {
        iban = "El código introducido no es válido.\n";
    }else
    {
        codCuentaNumerico = codCuenta.toString() + "142800";
        control = 98n - (BigInt(codCuentaNumerico ) % 97n);
        control = (control < 10) ? ("0" + control.toString()) : control.toString() ; 
        iban = "ES" + control + codCuenta;
    }    

    return iban; 
}
function comprobarIban (iban)
{
    let valido = true;
    let letrasNumeros = ["10", "11", "12", "13",
                         "14", "15", "16", "17",
                         "18", "19", "20", "21",
                         "22", "23", "24", "25",
                         "26", "27", "28", "29",
                         "30", "31", "32", "33",
                         "34", "35"];
    let regIban  = new RegExp("[a-z]{2}\\d{2}[\\da-záéíóúü]{11,30}","i");
    let caracter;
    let ibanComprobacion = iban.substring(4,iban.length);;
    if (!regIban.test(iban))
        valido = false
    else
    {
        for (let i = 0; i < 2; i++) {
            caracter = letrasNumeros[iban[i].toLowerCase().charCodeAt(0) - 97];
            ibanComprobacion +=caracter;
        }
        ibanComprobacion += iban.substring(2,4); 
        if (BigInt(ibanComprobacion)%97n != 1) 
            valido = false;
    }
    return valido; 
}