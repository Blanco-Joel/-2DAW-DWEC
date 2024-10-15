window.onload = inicio;

function inicio()
{
    document.formulario.boton.onclick = comprobar;
}

function comprobar(){
    let nombre                       = document.formulario.nombre.value.toLowerCase().trim();
    let codEmpresa                   = document.formulario.codEmpresa.value.toLowerCase().trim();
    let cifNif                       = document.formulario.cifNif.value.toLowerCase().trim();
    let direccion                    = document.formulario.direccion.value.toLowerCase().trim();
    let telefono                     = document.formulario.telefono.value.toLowerCase().trim();
    let localidad                    = document.formulario.localidad.value.toLowerCase().trim();
    let codPostal                    = document.formulario.codPostal.value.toLowerCase().trim();
    let codBanco                     = document.formulario.codBanco.value.toLowerCase().trim();
    let codOficina                   = document.formulario.codOficina.value.toLowerCase().trim();
    let codControl                   = document.formulario.codControl.value.toLowerCase().trim();
    let numCuenta                    = document.formulario.numCuenta.value.toLowerCase().trim();
    let iban                         = document.formulario.iban.value.toLowerCase().trim().split(' ').join('');
    let fecha                        = document.formulario.fecha.value.toLowerCase().trim();
    let numTrab                      = document.formulario.numTrab.value.toLowerCase().trim();
    let numFab                       = document.formulario.numTrab.value.toLowerCase().trim();
    
    let ibanAux = codBanco + codOficina + codControl + numCuenta; 

    let mensajeValido = "";
    mensajeValido += comNombre(nombre);
    mensajeValido += comCodigoEmpresa(codEmpresa);
    mensajeValido += comNIFCIF(cifNif);
    mensajeValido += comTipoPersona();
    mensajeValido += comDireccion(direccion);
    mensajeValido += comLocalidad(localidad);
    mensajeValido += comCodPostal(codPostal);
    mensajeValido += comTelefono(telefono);
    mensajeValido += comCodControl(codBanco,codOficina,codControl,numCuenta);
    mensajeValido += comIbanCorrecto(iban,ibanAux);
    mensajeValido += comFecha(fecha);
    mensajeValido += comNumTrab(numTrab);
    mensajeValido += comNumFab(numFab);
    mensajeValido += comComunidad();
    mensajeValido += comSector();
    mensajeValido += comTipoEmpresa();
    if (mensajeValido.length > 0) {
        window.alert(mensajeValido);

    }
}
/********************************************************************************/

function esNif(cadena) 
{
    let valido = true;
    let codigoCorrecto = 1;
    let indice = 0 ,indice2 = 0,  resultado = 0;
    let laCadena = cadena.trim().toLowerCase();
    let caraPrimPos = ["x", "z", "y", "l", "k", "m"];
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
                    laCadena =laCadena.replace("y", "1");
                break;
                case "z":
                    laCadena = laCadena.replace("2", "z");
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
    let caraControl =  ["j", "a", "b", "c", "d",
                        "e", "f", "g", "h", "i"];
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
    if(codBanco.length != 4 || codSucursal.length != 4 || codCuenta.length != 10 ||
       isNaN(codBanco) ||  isNaN(codSucursal) || isNaN(codCuenta))
    {
        mensaje = "El código de control introducido no es válido.";
    }else{
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
        mensaje = n1.toString()+n3.toString();
    }
    return mensaje;
}
function calculoIBANEspanya(codCuenta) 
{
    let control;
    let codCuentaNumerico;
    let iban = "";
    if (codCuenta.length != 20 || isNaN(codCuenta)) {
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
    let caracter;
    let ibanComprobacion = iban.substring(4,iban.length);;
    if (iban.length >= 34 || isNaN(iban.at(0)) ||  isNaN(iban.at(1)))
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
    return true; 
}
/*******COMPROBACIONES PARAMETROS DE FORMULARIO**********************************************************************************************************/

function comNombre(nombre)
{
    let indice = 0;
    let valido = true;
    let mensaje = "";
    if (nombre.length == 0)
        valido = false;
    else{
        valido = comprobarLetraCar(nombre.at(indice),"")
        indice += 1;

        while (valido &&  indice < nombre.length-1)
        {

            valido = comprobarLetDigCar(nombre.at(indice),"ºª-.");
            indice += 1;

        }
        valido = comprobarLetDigCar(nombre.at(nombre.length-1),".");
    }

    if (!valido)
        mensaje = "El dato de Razón Social/Apellidos y Nombre no es correcto.\n";
    return mensaje;
}

function comCodigoEmpresa(codEmpresa)
{
    let indice = 0;
    let valido = true;
    let mensaje = "";
    
    while (valido &&  indice < nombre.length)
    {
        valido = comprobarLetDigCar(nombre.at(indice),"a");
        indice += 1;
    }

    if (!valido || codEmpresa.length > 10 || codEmpresa.length < 5)
        mensaje = "El dato de Código de la empresa no es correcto.\n";
    return mensaje;
}

function comNIFCIF(cifNif)
{
    let mensaje = "";
    if (cifNif.length == 0) 
        mensaje = "El dato del NIF / CIF no es correcto.\n"; 
    else{
        switch (NIFCIF(cifNif)) {
            case "0":
                mensaje = "El dato del NIF / CIF no es correcto.\n"; 
                break;
            case "C2":
                mensaje = "Se ha introducido un cif erróneo. El carácter de control no es correcto.\n"; 
                break;
            case "N2":
                mensaje = "Se ha introducido un NIF erróneo. El carácter de control no es correcto.\n"; 
                break;
            case "N3":
                mensaje = "Se ha introducido un DNI antigüo, se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000.\n";
                break;
            }
    }
    return mensaje;
}

function comTipoPersona() 
{
    let valido=false;
    let mensaje= "";
    for(let i=0;i <document.formulario.tipoPersona.length;i++)
        valido = valido ||document.formulario.tipoPersona[i].checked;
    if(!valido)
        mensaje+="Debe seleccionar el tipo de persona.\n";
    return mensaje;
}

function comDireccion(direccion)
{
    let indice = 0;
    let valido = true;
    let mensaje = "";
    if (direccion.length == 0)
        valido = false;
    else{
        valido = comprobarLetraCar(direccion.at(indice),"a")
        indice += 1;

        while (valido &&  indice < direccion.length-1)
        {
            valido = comprobarLetDigCar(direccion.at(indice),"ºª-/.");
            indice += 1;
        }
        valido = comprobarLetDigCar(direccion.at(direccion.length-1),"a");
    }
    if (!valido)
        mensaje = "El dato de la dirección no es correcta.\n";
    return mensaje;
}

function comLocalidad(localidad)
{
    let indice = 0;
    let valido = true;
    let mensaje = "";
    if (localidad.length == 0)
        valido = false;
    else{
        valido = comprobarLetraCar(localidad.at(indice),"")
        indice += 1;
        while (valido &&  indice < localidad.length)
        {
            valido = comprobarLetDigCar(localidad.at(indice)," ");
            indice += 1;
        }
    }
    if (!valido)
        mensaje = "El dato de la localidad no es correcto.\n";
    return mensaje;
}

function comTelefono(telefono) 
{
    let valido = true;
    let mensaje= "";
    let indice = 0;
    telefono = telefono.toString();
    while (valido &&  indice < telefono.length)
    {
        valido = comprobarDig(telefono.at(indice));
        indice += 1;
    }    
    if (telefono.length != 9) 
        valido = false;
    if (telefono.at(0) != "9" && telefono.at(0) != "6" && telefono.at(0) != "7" ) 
        valido = false;

    if (!valido)
        mensaje = "El dato del número de telefono no es correcto.\n";
    return mensaje;
}

function comCodPostal(codPostal)
{
    let indice = 0;
    let valido = true; 
    let mensaje = "";
    if (codPostal.length == 0)
        valido = false;
    else{
        while (valido && indice < codPostal.length) 
        {
            valido = comprobarDig(codPostal.at(indice));
            indice += 1;
        }
        if (parseInt(codPostal) < 1000 ||parseInt(codPostal) > 52999)
            valido = false;
        if (valido) 
            codPostalProvincia(codPostal);
    }
    if (!valido)
        mensaje = "El dato del codigo postal no es correcto.\n";
    return mensaje;
}

function codPostalProvincia(codPostal)
{
    let provincias = ["Álava",          "Albacete",               "Alicante",           "Almeria",
                      "Ávila",          "Badajoz",                "Islas Baleares",     "Barcelona",
                      "Burgos",         "Cáceres",                "Cádiz",              "Castellón",
                      "Ciudad Real",    "Córdoba",                "A Coruña",           "Cuenca",
                      "Girona",         "Granada",                "Guadalajara",        "Gipuzkoa",
                      "Huelva",         "Huesca",                 "Jaén",               "León",
                      "Lleida",         "La Rioja",               "Lugo",               "Madrid",
                      "Málaga",         "Murcia",                 "Navarra",            "Ourense",
                      "Asturias",       "Palencia",               "Las Palmas",         "Pontevedra",
                      "Salamanca",      "Santa Cruz de Tenerife", "Cantabria",          "Segovia",
                      "Sevilla",        "Soria",                  "Tarragona",          "Teruel",
                      "Toledo",         "Valencia",               "Valladolid",         "Bizkaia",
                      "Zamora",         "Zaragoza",               "Ceuta",              "Melilla"];
    if (codPostal.length == 4) 
        document.formulario.provincia.value = provincias[parseInt(codPostal.substring(0,1))-1];
    
    else 
        document.formulario.provincia.value = provincias[parseInt(codPostal.substring(0,2))-1];
}

function comCodControl(codBanco,codOficina,codControl,numCuenta)
{
    let mensaje= "";
    if (codigosControl(codBanco,codOficina,numCuenta) != codControl) 
        mensaje = "El dato del código de control no es correcto.\n"; 
    
    return mensaje;
}

function comIbanCorrecto(iban,ibanAux)
{
    let mensaje = "";
    if (calculoIBANEspanya(ibanAux).toLowerCase() != iban) 
        mensaje = "El dato del iban no es correcto.\n"; 
    
    return mensaje;
}

function comFecha(fecha)
{
    let valido = true;
    let mensaje= "";
    let arrayFecha = fecha.replaceAll("-","/");
        arrayFecha = arrayFecha.split("/");
    let mes = 28;
    arrayFecha[0] = parseInt(arrayFecha[0]);
    arrayFecha[1] = parseInt(arrayFecha[1]);
    arrayFecha[2] = parseInt(arrayFecha[2]);

    if (fecha.length == 0) 
        valido = false;
    else{
        if (arrayFecha[2] < 100)
            
            if (arrayFecha[2] < 24) {
                arrayFecha[2] += 2000;
            } else {
                arrayFecha[2] += 1900;
            }
        if ((((arrayFecha[2]) % 4 == 0) && ((arrayFecha[2]) % 100 != 0 )) || ((arrayFecha[2]) % 400 == 0))
            mes = 29;

        switch ((arrayFecha[1])) {
            case 1,3,5,7,8,10,12:
                if ((arrayFecha[0]) > 31) {
                    valido = false;
                }
                break;
            case 2:
                if ((arrayFecha[0]) > mes) {
                    valido = false;
                }
                break;   
            case 4,6,9,11:

                if ((arrayFecha[0]) > 30) {
                    valido = false;
                }
                break;
            default:    
    
            valido = false;
                break;
        }
    }
    if (!valido)
        mensaje = "El dato de la fecha no es correcto.\n";
    return mensaje;
}
function comNumTrab(numTrab)
{
    let valido = true;
    let mensaje = "";
    let indice = 0;

    if (numTrab.length == 0) 
        valido = false;
    else
    {
        while (valido && indice < numTrab.length) 
        {
            valido = comprobarDig(numTrab.at(indice));
            indice += 1;
        }
        if (parseInt(numTrab) < 0 ) 
            valido = false;
    }
        if (!valido)
        mensaje = "El dato del número de trabajadores no es correcto.\n";
    return mensaje;
}
function comNumFab(numFab)
{
    let valido = true;
    let mensaje = "";
    let indice = 0;
    if (numFab.length == 0) 
        valido = false;
    else
    {
        while (valido && indice < numFab.length) 
        {
            valido = comprobarDig(numFab.at(indice));
            indice += 1;

        }
        if (parseInt(numFab) < 0 ) 
            valido = false;
    }
    if (!valido)
        mensaje = "El dato del número de Fabricas no es correcto.\n";
    return mensaje;
}

function comFax(fax) 
{
    let valido = true;
    let mensaje= "";

    fax = fax.toString();
    if (fax.length != 9 || isNaN(parseInt(fax))) 
        valido = false;
    if (fax.at(0) != "9") 
        valido = false;
    if (!valido)
        mensaje = "El dato del número de fax no es correcto.\n";
    return mensaje;

}

function comComunidad()
{
    let mensaje = "";
    let cont = 0;
    let opciones = formulario.comunidades.options; 
    
    for (let i = 0; i < opciones.length; i++) 
        if (opciones[i].selected) 
            cont += 1;
        
    if (cont < 2 )
        mensaje += "Debe seleccionar al menos dos comunidades.\n"; 

    return mensaje;
}
function comSector()
{
    let cont = 0;
    let mensaje = "";
    if (document.formulario.Alimentacion.checked) cont += 1;
    if (document.formulario.Informatica.checked) cont += 1;
    if (document.formulario.Comercio.checked) cont += 1;
    if (document.formulario.Construccion.checked) cont += 1;
    if (document.formulario.Hosteleria.checked) cont += 1;
    if (document.formulario.Automocion.checked) cont += 1;
    if (document.formulario.Calzado.checked) cont += 1;
    if (document.formulario.Turismo.checked) cont += 1;
    if (document.formulario.Agricultura.checked) cont += 1;
    if (document.formulario.Ganaderia.checked) cont += 1;
    if (document.formulario.Otros.checked) cont += 1;

    if(cont <1)
        mensaje+="Debe seleccionar al menos un sector económico.\n";
    return mensaje;
}

function comTipoEmpresa() 
{
    let valido=false;
    let mensaje= "";
    for(let i=0;i <document.formulario.tipoEmpresa.length;i++)
        valido = valido ||document.formulario.tipoEmpresa[i].checked;
    if(!valido)
        mensaje+="Debe seleccionar el tipo de Empresa.\n";
    return mensaje;
}

/*******COMPROBACIONES EXHAUSTIVAS**********************************************************************************************************************/

function comprobarLetraCar(caracter,otros) 
{
    let valido = true;

    if (caracter < "a" || caracter > "z") 
        if (!otros.includes(caracter))
            valido=false; 
    return valido;     
}

function comprobarDig(caracter) 
{
    let valido = true;
    if (caracter < "0" || caracter > "9" ) 
        valido=false; 
    return valido;     
}
function digitoNat(numero)
{
    let valido = true;
    if (parseInt(numero) < 0)
        valido = false;
    return valido;
}
function comprobarLetDigCar(caracter,otros) 
{
    let valido = true;
    if (caracter < "a" || caracter > "z")
        if (! otros.includes(caracter))
            if ( caracter < "0" || caracter > "9" ) 
                valido=false; 
    return valido;     
}