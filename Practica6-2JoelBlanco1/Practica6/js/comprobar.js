if (document.addEventListener)
    window.addEventListener("load",inicio)
else if (document.attachEvent)
    window.attachEvent("onload",inicio);

function inicio()
{
    let formulario = document.getElementById("formulario");  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let codPostal = document.getElementById("codPostal");
    if (document.addEventListener){
        formulario.addEventListener("submit", comprobar);
        codPostal.addEventListener("input", comCodPostal);
    }else if (document.attachEvent){
        formulario.attachEvent("onsubmit", comprobar);
        codPostal.attachEvent("oninput", comCodPostal);

    }
}

function comprobar(evento){
    
    let nombre                       = document.getElementById("nombre").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let codEmpresa                   = document.getElementById("codEmpresa").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let cifNif                       = document.getElementById("cifNif").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let direccion                    = document.getElementById("direccion").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let telefono                     = document.getElementById("telefono").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let localidad                    = document.getElementById("localidad").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let codBanco                     = document.getElementById("codBanco").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let codOficina                   = document.getElementById("codOficina").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let codControl                   = document.getElementById("codControl").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let numCuenta                    = document.getElementById("numCuenta").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let iban                         = document.getElementById("iban").value.toLowerCase().trim().split(' ').join('');  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let fecha                        = document.getElementById("fecha").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let numTrab                      = document.getElementById("numTrab").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let numFab                       = document.getElementById("numFab").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    let ibanAux = codBanco + codOficina + codControl + numCuenta; 
    
    let valido = true;
    valido = errores(valido,comNombre(nombre),"errorNombre");
    valido = errores(valido,comCodigoEmpresa(codEmpresa),"errorCodEmpresa");
    valido = errores(valido,comNIFCIF(cifNif),"errorCifNif");
    valido = errores(valido,comTipoPersona(),"errorTipoPersona");
    valido = errores(valido,comDireccion(direccion),"errorDireccion");
    valido = errores(valido,comLocalidad(localidad),"errorLocalidad");
    valido = errores(valido,comCodPostal(codPostal),"errorCodPostal");
    valido = errores(valido,comTelefono(telefono),"errorTelefono");
    valido = errores(valido,comCodBanco(codBanco),"errorCodBanco");
    valido = errores(valido,comCodOficina(codOficina),"errorCodOficina");
    valido = errores(valido,comCodControl(codBanco,codOficina,codControl,numCuenta),"errorCodControl");
    valido = errores(valido,comNumCuenta(numCuenta),"errorNumCuenta");
    valido = errores(valido,comIbanCorrecto(iban,ibanAux),"errorIban");
    valido = errores(valido,comFecha(fecha),"errorFecha");
    valido = errores(valido,comNumTrab(numTrab),"errorNumTrab");
    valido = errores(valido,comNumFab(numFab),"errorNumFab");
    valido = errores(valido,comComunidad(),"errorComunidad");
    valido = errores(valido,comSector(),"errorSector");
    valido = errores(valido,comTipoEmpresa(),"errorTipoEmpresa");

    
    if (!valido)
        evento.preventDefault();

    

}
function errores(valido,mensaje,error)
{
    if (mensaje != "" ) 
    {
        document.getElementById(error).style.display = 'inline';  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
        document.getElementById(error).style.width = (mensaje.length-7)+"ch";  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
        document.getElementById(error).value = mensaje;
        valido = false;  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    }else
        document.getElementById(error).style.display = 'none';  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    return valido;
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
    let mensaje= "";
    let valido= true;
    let tipoPersona = document.querySelectorAll("input[name=tipoPersona]");
    for (let i = 0; i < tipoPersona.length; i++) 
        if(tipoPersona[i].checked)
            valido = false; 
        
    if (valido) 
        mensaje+="Debe seleccionar el tipo de persona.\n";
        
    return mensaje;
}

function comDireccion(direccion)
{
    let mensaje = "";
    let regDire = new RegExp("^[a-záéíóúüñ]{1}[\\da-záéíóúüñºª\\-\\/\\.]*[a-záéíóúüñ\\d]{1}$","i");   
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
    let codPostal = document.getElementById("codPostal").value.toLowerCase().trim();  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 

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
        document.getElementById("provincia").value = provincias[parseInt(codPostal.substring(0,1))-1];  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
    else 
        document.getElementById("provincia").value = provincias[parseInt(codPostal.substring(0,2))-1];  //CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR CAMBIAR 
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
    let regNumFab = new RegExp("^(0*?[2-9]|[1-9]\\d{1,3})$");
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
    let opciones = document.getElementById("comunidades").selectedOptions;
        
    if (opciones < 2 )
        mensaje += "Debe seleccionar al menos dos comunidades.\n"; 

    return mensaje;
}
function comSector()
{
    let mensaje = "";
    let cont = 0;
    let sectores = document.querySelectorAll("input[name=secEcom]");
    for (let i = 0; i < sectores.length; i++) 
        if (sectores[i].checked) 
            cont += 1;
    
    if(cont != 1)
        mensaje+="Debe seleccionar un sector económico.\n";
    return mensaje;
}

function comTipoEmpresa() 
{
    let mensaje= "";
    let valido = true;
    let tipoEmpresa = document.querySelectorAll("input[name=tipoEmpresa]");
    for (let i = 0; i < tipoEmpresa.length; i++) 
        if(tipoEmpresa[i].checked)
            valido = false;
    if (valido)
        mensaje+="Debe seleccionar el tipo de Empresa.\n";
    return mensaje;
}

