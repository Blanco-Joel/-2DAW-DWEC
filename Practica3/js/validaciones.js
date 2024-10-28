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

    eliminarInput();

    crearInput(comNombre(nombre));
    crearInput(comCodigoEmpresa(codEmpresa));
    crearInput(comNIFCIF(cifNif));
    crearInput(comTipoPersona());
    crearInput(comDireccion(direccion));
    crearInput(comLocalidad(localidad));
    crearInput(comCodPostal(codPostal));
    crearInput(comTelefono(telefono));
    crearInput(comCodControl(codBanco,codOficina,codControl,numCuenta));
    crearInput(comIbanCorrecto(iban,ibanAux));
    crearInput(comFecha(fecha));
    crearInput(comNumTrab(numTrab));
    crearInput(comNumFab(numFab));
    crearInput(comComunidad());
    crearInput(comSector());
    crearInput(comTipoEmpresa());

}
/********************************************************************************/
function eliminarInput()
{
    let listaInput = document.querySelectorAll(".error");

    for (let i = 0; i < listaInput.length; i++) 
    {
        listaInput[i].style.display = "none";
    }
}
function crearInput(param)
{
    const error = document.createElement("input");

    const att = document.createAttribute("class");
    att.value = "error";
    error.setAttributeNode(att);

    error.style.display = "inline";
    error.style.backgroundColor = "orange";
    error.style.color = "white";

    error.value= param +" no valido";
    error.readOnly = true;
    const element = document.getElementById(param);
    element.appendChild(error);
}
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
/*******COMPROBACIONES PARAMETROS DE FORMULARIO**********************************************************************************************************/

function comNombre(nombre)
{
    let mensaje = "";
    let regNombre = /^[a-z]{1}[0-9a-záéíóúüñ\ª\º\-\.]{1,}[a-záéíóúüñ0-9\.]{1}$/i;
    if (!regNombre.test(nombre))
        mensaje = "El dato de Razón Social/Apellidos y Nombre no es correcto.\n";
    return mensaje;
}

function comCodigoEmpresa(codEmpresa)
{
    let mensaje = "";
    let regCodEmpresa = new RegExp("[0-9a-z]{5,10}","i");
    if (!regCodEmpresa.test(codEmpresa))
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
    let mensaje = "";
    let regDire = new RegExp("[a-záéíóúüñ]{1}[a-záéíóúüñ\\º\\ª\\-\\/\\.0-9]{1,}[a-záéíóúüñ0-9]{1}",i)
    if (!regDire.test(direccion))
        mensaje = "El dato de la dirección no es correcta.\n";
    return mensaje;
}

function comLocalidad(localidad)
{
    let mensaje = "";
    let regLoc = /^[a-záéíóúüñ]{1}[a-záéíóúüñ\ ]{1,}[a-záéíóúüñ]{1}$/; 
    if (!regLoc.test(localidad))
        mensaje = "El dato de la localidad no es correcto.\n";
    return mensaje;
}

function comTelefono(telefono) 
{
    let mensaje = "";
    let regTel = new RegExp("[9876]{1}\\d{8}")
    if (!regTel.test(telefono))
        mensaje = "El dato del número de telefono no es correcto.\n";
    return mensaje;
}

function comCodPostal(codPostal)
{
    let mensaje = "";
    let regCod = /^((0?[1-9])|([1-4]\d)|(5[0-2]))\d{3}$/; 
    if (!regCod.test(codPostal))
        mensaje = "El dato del codigo postal no es correcto.\n";
    else
        codPostalProvincia(codPostal);
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
    let regDos = new RegExp("\\d{2}");
    if (!regDos.test(codControl) || codigosControl(codBanco,codOficina,numCuenta) != codControl) 
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
    let mensaje= "";
    let regFecha= new RegExp("((((((0?[1-9])|([12]\d)|(3[01]))[\-\/]((0?[13578])|(1[02])))|(((0?[1-9])|([12]\d))|(30))[\-\/]((0?[469])|(11))|(((0?[1-9])|([1\d)|(2[0-8]))[\-\/](0?2)))[\-\/]\d{4})|(29[\-\/]0?2[\-\/]((((0[48])|([2468][480])|([13579][26]))00)|(\d{2}((0[48])|([2468][480])|([13579][26]))))))");

    if (!regFecha.test(fecha)) 
        mensaje = "El dato de la fecha no es correcto.\n";
    return mensaje;
}
function comNumTrab(numTrab)
{
    let mensaje = "";
    let regNumTrab = /^0*(4[5-9]|[5-9]\d{1,5}|[1-9]\d{2,5})$/;
    if (!regNumTrab.test(numTrab)) 
        mensaje = "El dato del número de trabajadores no es correcto.\n";
    return mensaje;
}
function comNumFab(numFab)
{
    let mensaje = "";
    let regNumFab = new RegExp("0*([2-9]{1}|[1-9]\d{1,3})");
    if (!regNumFab.test(numFab)) 
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