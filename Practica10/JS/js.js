window.onload = inicio;

function inicio()
{
    document.formulario.boton.onclick = comprobar;
}

function comprobar()
{
    let cadena = document.formulario.url.value;
    if(cadena.substring(0,7) == "http://" || cadena.substring(0,8) == "https://" || cadena.substring(0,4) == "www.")
        comrpobarUrl(cadena);
    else
        mensaje();
}

function comrpobarUrl(cadena)
{
    let limite;
    let limite2 = cadena.lastIndexOf(".");
    let seguir = true;
    let finalCadena = cadena.substring(limite2+1,cadena.length);
    if(cadena.includes("http://"))
        limite = 6;
    else if (cadena.includes("https://"))
        limite = 7;
    else 
        limite = 4;

    if(!comp_letra(cadena.charAt(limite+1)) && !comp_digito(cadena.charAt(limite+1)))
    {
        console.log("1");
        mensaje();
        seguir = false;
    }


    for (let i = limite+2; i < limite2-2 ; i++)
    {
        if(!comp_letra(cadena.charAt(i)) && !comp_digito(cadena.charAt(i)) && !comp_especiales(cadena.charAt(i)))
        {
            console.log("2");
            mensaje();
            seguir = false;
        }
    }

    if(!comp_letra(cadena.charAt(limite2-1)) && !comp_digito(cadena.charAt(limite2-1)))
    {
        console.log("3");
        mensaje();
        seguir = false;
    }

    if(finalCadena.length < 2 || finalCadena > 4)
    {
        console.log("4");
        mensaje();
        seguir = false;
    }

    for (let i = limite2+1; i < cadena.length ; i++)
    {
        
        if(!comp_letra(cadena.charAt(i)))
        {
            console.log("5");
            mensaje();
            seguir = false;
        }
    }

    if(seguir)
        document.formulario.mensaje.value = "URL Correcta";
}

function comp_letra(cadena){
    let seguir=false;
    for (let i = 65; i <= 90; i++)
    {
        if(cadena == String.fromCharCode(i))
            seguir = true;
    }
    for (let i = 97; i <= 122; i++)
    {
        if(cadena == String.fromCharCode(i))
            seguir = true;
    }
    return seguir;
}

function comp_digito(cadena){
    let seguir=false;
    for (let i = 0; i <= 9; i++)
    {
        if(cadena == (i).toString)
            seguir = true;
    }
    return seguir;
}

function comp_especiales(cadena){
    let seguir=false;
    if(cadena == String.fromCharCode(45))
        seguir = true;
    return seguir;
}

function mensaje()
{
    document.formulario.mensaje.value = "URL Incorrecta";
}function comprobar()
{
    let mensajeTotal = "";
    let mensajeCorrecto = true;
    let cadena = document.formulario.url.value;
    if(cadena.substring(0,7) == "http://" || cadena.substring(0,8) == "https://" || cadena.substring(0,4) == "www.")
        comrpobarUrl(cadena);
    else
    {
        mensajeCorrecto = false;
        mensajeTotal = "La url no tiene un inicio adecuado. "
    }
    if (!mensajeCorrecto) 
    {
        document.formulario.mensaje.value = mensajeTotal;
    }
}