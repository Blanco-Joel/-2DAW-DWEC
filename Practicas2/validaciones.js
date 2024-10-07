function esNif(cadena) 
{
    let codigoCorrecto = 1;
    let indice = 0;
    let laCadena = cadena.trim().toLowerCase();
    if (laCadena.length != 9)
        codigoCorrecto=0;
    else 
    {
        let indice=0;
        let otros="ñáéíóúü";
        while (valido && indice < 3){
            if (laCadena.at(indice) < "a" || laCadena.at(indice) > "z")
                if (! otros.includes(laCadena.at(indice)))
                    valido=false;
            indice+=1;
        }
    }

}