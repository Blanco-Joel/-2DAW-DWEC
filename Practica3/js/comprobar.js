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
    let codBanco                     = document.formulario.codBanco.value.toLowerCase().trim();
    let codOficina                   = document.formulario.codOficina.value.toLowerCase().trim();
    let codControl                   = document.formulario.codControl.value.toLowerCase().trim();
    let numCuenta                    = document.formulario.numCuenta.value.toLowerCase().trim();
    let iban                         = document.formulario.iban.value.toLowerCase().trim().split(' ').join('');
    let fecha                        = document.formulario.fecha.value.toLowerCase().trim();
    let numTrab                      = document.formulario.numTrab.value.toLowerCase().trim();
    let numFab                       = document.formulario.numTrab.value.toLowerCase().trim();
    
    let ibanAux = codBanco + codOficina + codControl + numCuenta; 
    

    errores(comNombre(nombre),"errorNombre");
    errores(comCodigoEmpresa(codEmpresa),"errorCodEmpresa");
    errores(comNIFCIF(cifNif),"errorCifNif");
    errores(comTipoPersona(),"errorTipoPersona");
    errores(comDireccion(direccion),"errorDireccion");
    errores(comLocalidad(localidad),"errorLocalidad");
    errores(comCodPostal(codPostal),"errorCodPostal");
    errores(comTelefono(telefono),"errorTelefono");
    errores(comCodBanco(codBanco),"errorCodBanco");
    errores(comCodOficina(codOficina),"errorCodOficina");
    errores(comCodControl(codBanco,codOficina,codControl,numCuenta),"errorCodControl");
    errores(comNumCuenta(numCuenta),"errorNumCuenta");
    errores(comIbanCorrecto(iban,ibanAux),"errorIban");
    errores(comFecha(fecha),"errorFecha");
    errores(comNumTrab(numTrab),"errorNumTrab");
    errores(comNumFab(numFab),"errorNumFab");
    errores(comComunidad(),"errorComunidad");
    errores(comSector(),"errorSector");
    errores(comTipoEmpresa(),"errorTipoEmpresa");

}
function errores(mensaje,error)
{
    if (mensaje != "" ) {
        document.formulario[error].style.display = 'inline';
        document.formulario[error].style.width = (mensaje.length-7)+"ch";
        document.formulario[error].value = mensaje;
    }else
    {
        document.formulario[error].style.display = 'none';
    }
}
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
    let regCodEmpresa = new RegExp("^[0-9a-z]{5,10}$","i");
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
    let regDire = new RegExp("^[a-záéíóúüñ]{1}[a-záéíóúüñ\\º\\ª\\-\\/\\.0-9]{1,}[a-záéíóúüñ0-9]{1}$","i")
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
    let regTel = new RegExp("^[9876]{1}\\d{8}$")
    if (!regTel.test(telefono))
        mensaje = "El dato del número de telefono no es correcto.\n";
    return mensaje;
}

function comCodPostal()
{
    let mensaje = "";
    let codPostal = document.formulario.codPostal.value.toLowerCase().trim();

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
function comCodBanco(codBanco)
{
    let mensaje= "";
    let regCuatro = new RegExp("^\\d{4}$");
    if (!regCuatro.test(codBanco)) 
        mensaje = "El dato del código de banco no es correcto.\n"; 
    
    return mensaje;
}
function comCodOficina(codOficina)
{
    let mensaje= "";
    let regCuatro = new RegExp("^\\d{4}$");
    if (!regCuatro.test(codOficina)) 
        mensaje = "El dato del código de oficina no es correcto.\n"; 
    
    return mensaje;
}
function comNumCuenta(numCuenta)
{
    let mensaje= "";
    let regDiez = new RegExp("^\\d{10}$");
    if (!regDiez.test(numCuenta)) 
        mensaje = "El dato del código de cuenta no es correcto.\n"; 
    
    return mensaje;
}
function comCodControl(codBanco,codOficina,codControl,numCuenta)
{
    let mensaje= "";
    let regDos = new RegExp("^\\d{2}$");
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
    let regFecha= new RegExp("^((((((0?[1-9])|([12]\\d)|(3[01]))[\\-\\/](0?[13578]|1[02]))|(((0?[1-9])|([12]\\d)|30)[\\-\\/](0?[469]|11))|(((0?[1-9])|(1\\d)|(2[0-8]))[\\-\\/]0?2))[\\-\\/]\\d{4})|(29[\\-\\/]0?2[\\-\\/]((0[48]|[2468][048]|[13579][26])00|(\\d{2}((0[48])|[2468][048]|[13579][26])))))$");

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
    let regNumFab = new RegExp("^0*([2-9]{1}|[1-9]\\d{,3})$");
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

