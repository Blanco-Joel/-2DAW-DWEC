if (document.addEventListener)
    window.addEventListener("load",inicio)
else if (document.attachEvent)
    window.attachEvent("onload",inicio);

function inicio()
{
    let nombre                       = document.getElementById("nombre");
    let codEmpresa                   = document.getElementById("codEmpresa");
    let cifNif                       = document.getElementById("cifNif");
    let direccion                    = document.getElementById("direccion");
    let telefono                     = document.getElementById("telefono");
    let localidad                    = document.getElementById("localidad");
    let codPostal                    = document.getElementById("codPostal");
    let codBanco                     = document.getElementById("codBanco");
    let codOficina                   = document.getElementById("codOficina");
    let codControl                   = document.getElementById("codControl");
    let numCuenta                    = document.getElementById("numCuenta");
    let iban                         = document.getElementById("iban");
    let fecha                        = document.getElementById("fecha");
    let numTrab                      = document.getElementById("numTrab");
    let numFab                       = document.getElementById("numFab");
    
    if (document.addEventListener){
        nombre.addEventListener("focus", colores);
        nombre.addEventListener("blur", noColores);
        codEmpresa.addEventListener("focus", colores);
        codEmpresa.addEventListener("blur", noColores);        
        cifNif.addEventListener("focus", colores);
        cifNif.addEventListener("blur", noColores);        
        direccion.addEventListener("focus", colores);
        direccion.addEventListener("blur", noColores);        
        telefono.addEventListener("focus", colores);
        telefono.addEventListener("blur", noColores);        
        localidad.addEventListener("focus", colores);
        localidad.addEventListener("blur", noColores);   
        codPostal.addEventListener("focus", colores);
        codPostal.addEventListener("blur", noColores);        
        codBanco.addEventListener("focus", colores);
        codBanco.addEventListener("blur", noColores);        
        codOficina.addEventListener("focus", colores);
        codOficina.addEventListener("blur", noColores);        
        codControl.addEventListener("focus", colores);
        codControl.addEventListener("blur", noColores);
        numCuenta.addEventListener("focus", colores);
        numCuenta.addEventListener("blur", noColores);
        iban.addEventListener("focus", colores);
        iban.addEventListener("blur", noColores);
        fecha.addEventListener("focus", colores);
        fecha.addEventListener("blur", noColores);
        numTrab.addEventListener("focus", colores);
        numTrab.addEventListener("blur", noColores);
        numFab.addEventListener("focus", colores);
        numFab.addEventListener("blur", noColores);


        telefono.addEventListener("keypress", eventoDigit);
        codPostal.addEventListener("keypress", eventoDigit);
        codBanco.addEventListener("keypress", eventoDigit);
        codOficina.addEventListener("keypress", eventoDigit);
        codControl.addEventListener("keypress", eventoDigit);
        numCuenta.addEventListener("keypress", eventoDigit);
        numTrab.addEventListener("keypress", eventoDigit);
        numFab.addEventListener("keypress", eventoDigit);


        localidad.addEventListener("keypress", eventoLetrasEsp);

    }else if (document.attachEvent){
        nombre.attachEvent("onfocus", colores);
        nombre.attachEvent("onblur", noColores);
        codEmpresa.attachEvent("onfocus", colores);
        codEmpresa.attachEvent("onblur", noColores);
        cifNif.attachEvent("onfocus", colores);
        cifNif.attachEvent("onblur", noColores);
        direccion.attachEvent("onfocus", colores);
        direccion.attachEvent("onblur", noColores);
        telefono.attachEvent("onfocus", colores);
        telefono.attachEvent("onblur", noColores);
        localidad.attachEvent("onfocus", colores);
        localidad.attachEvent("onblur", noColores);
        codPostal.attachEvent("onfocus", colores);
        codPostal.attachEvent("onblur", noColores);
        codBanco.attachEvent("onfocus", colores);
        codBanco.attachEvent("onblur", noColores);
        codOficina.attachEvent("onfocus", colores);
        codOficina.attachEvent("onblur", noColores);
        codControl.attachEvent("onfocus", colores);
        codControl.attachEvent("onblur", noColores);
        numCuenta.attachEvent("onfocus", colores);
        numCuenta.attachEvent("onblur", noColores);
        iban.attachEvent("onfocus", colores);
        iban.attachEvent("onblur", noColores);
        fecha.attachEvent("onfocus", colores);
        fecha.attachEvent("onblur", noColores);
        numTrab.attachEvent("onfocus", colores);
        numTrab.attachEvent("onblur", noColores);
        numFab.attachEvent("onfocus", colores);
        numFab.attachEvent("onblur", noColores);

        telefono.attachEvent("onkeypress", eventoDigit);
        codPostal.attachEvent("onkeypress", eventoDigit);
        codBanco.attachEvent("onkeypress", eventoDigit);
        codOficina.attachEvent("onkeypress", eventoDigit);
        codControl.attachEvent("onkeypress", eventoDigit);
        numCuenta.attachEvent("onkeypress", eventoDigit);
        numTrab.attachEvent("onkeypress", eventoDigit);
        numFab.attachEvent("onkeypress", eventoDigit);

        localidad.attachEvent("onkeypress", eventoLetrasEsp);

    }
}


function colores(event)
{
    let evento = event || window.event;
    let campo  = evento.target;
    campo.style.color = "white";
    campo.style.backgroundColor = "green";
    
}

function noColores(event)
{
    let evento = event || window.event;
    let campo  = evento.target;
    campo.style.color = "black";
    campo.style.backgroundColor = "white";
    
}
function eventoDigit(event)
{
    let enviar = true;
    let evento = event || window.event;
    let caracter = String.fromCharCode(evento.keyCode);
    if (caracter < "0" || caracter > "9")
        evento.preventDefault();
}

function eventoLetrasEsp(event)
{
    let enviar = true;
    let evento = event || window.event;
    let caracter = String.fromCharCode(evento.keyCode);
    if (caracter < "a" || caracter > "z")
        if (caracter != " ") 
            evento.preventDefault();

}