$(window).on("load",inicio);


function inicio()
{
    
    $("#annadir_def").on("click",annadirDef);
    $("#quitar_def").on("click",quitarDef);
    $("#annadir_localidad").on("click",annadirLoc);
    $("#annadir_coche").on("click",annadirCoc); 
    $("#quitar_coche").on("click",quitarCoc);
    $("#comunidad").on("change",comunidades);
    $("#cambiar_colores").on("click",colores);
    $("#texto").children("p").on("mouseenter",textura);
    $("#texto").children("p").on("mouseleave",noTextura);
}
function annadirDef()
{
    let palabra  = $("#palabra").val().trim(); 
    let concepto = $("#concepto").val().trim();
	if (palabra.length > 0 && concepto.length > 0 ) 
    {
		let lista= $("#def");
		let todos=lista.find("dt");
		let inexistente=true;
		let indice=0;
		while (inexistente && indice < todos.length)
        {
            if (todos.eq(indice).text() == palabra )
            {
                let conceptoInexistente=true;
                let indice2=0;
                let todasDefiniciones = todos.eq(indice).nextAll("dd");
                while (conceptoInexistente && indice2 < todasDefiniciones.length)
                {
                    if (todasDefiniciones.eq(indice2).text() == concepto )
                        conceptoInexistente=false;
                    indice2 += 1;
                }
                if (conceptoInexistente) 
                    todos.eq(indice).after(`<dd>${concepto}</dd>`);
                inexistente=false;
                
            }
			indice+=1;
		}
		if (inexistente)
            lista.append(`<dt>${palabra}</dt><dd>${concepto}</dd>`);
		
	}
}
function quitarDef()
{
    let palabra  = $("#palabra").val().trim(); 
    let concepto = $("#concepto").val().trim();
	if (palabra.length > 0 && concepto.length > 0 ) 
    {
		let lista= $("#def");
		let todos=lista.find("dt");
		let indice=todos.length;
		while (indice >= 0)
        {
            if (todos.eq(indice).text() == palabra )
            {
                let todasDefiniciones = todos.eq(indice).nextUntil("dt");
                let indice2=todasDefiniciones.length;
                while (indice2 >= 0)
                {
                    todasDefiniciones.eq(indice2-1).remove();
                    indice2 -= 1;
                }
                todos.eq(indice).remove();
            }
			indice -= 1;
		}

		
	}
}

function annadirLoc()
{
	let localidad=$("#localidad").val().trim();
	if (localidad.length > 0) {
		let lista=$("#localidades");
		let todos=lista.find("li");
		let inexistente=true;
		let indice=0;
		while (inexistente && indice < todos.length){
            if (todos.eq(indice).text() == localidad)
				inexistente=false
            else if (localidad.toUpperCase() < todos.eq(indice).text().toUpperCase()){
                inexistente=false;
                todos.eq(indice).before(`<li>${localidad}</li>`);
			}
			indice+=1;
		}
		if (inexistente){
			lista.append(`<li>${localidad}</li>`);
		}
	}
}

function annadirCoc() 
{
    let marca = $("#marca").val().trim();
    let modelo = $("#modelo").val().trim();
    let precio = $("#precio").val().trim();
    
    if (marca.length > 0 && modelo.length > 0 && precio.length > 0) {
        let tabla = $("#coches");
        let padre = tabla.find("tbody");
        let todos = padre.find("tr");
        let indice = 0;
        let inexistente = true;
        
        while (inexistente && indice < todos.length) {
            let celdas = todos.eq(indice).children("td");
            
            if (celdas.eq(0).text().toUpperCase() == marca.toUpperCase() &&
                celdas.eq(1).text().toUpperCase() == modelo.toUpperCase())
            
                inexistente = false;
            else if ((celdas.eq(0).text().toUpperCase() < marca.toUpperCase()) || 
                     (celdas.eq(0).text().toUpperCase() == marca.toUpperCase() && 
                      celdas.eq(1).text().toUpperCase() < modelo.toUpperCase()))
            {
                todos.eq(indice).before(`<tr><td>${marca}</td><td>${modelo}</td><td>${precio}</td></tr>`);
                inexistente = false;
            }
            
            indice += 1;
        }
        
        if (inexistente) {
            padre.append(`<tr><td>${marca}</td><td>${modelo}</td><td>${precio}</td></tr>`);
        }
    }
}
function quitarCoc()
{
    let marca = $("#marca").val().trim();
    let modelo = $("#modelo").val().trim();
	if (marca.length > 0 && modelo.length > 0) 
    {
        let tabla = $("#coches");
        let padre = tabla.find("tbody");
        let todos = padre.find("tr");
        let indice = todos.length;
		while (indice >= 0)
        {
            let celdas = todos.eq(indice).children("td");
            if (celdas.eq(0).text().toUpperCase() == marca.toUpperCase() &&
                celdas.eq(1).text().toUpperCase() == modelo.toUpperCase())
            {
                let indice2 = celdas.length;
                while (indice2 >= 0)
                {
                    celdas.eq(indice2-1).remove();
                    indice2 -= 1;
                }
                
                todos.eq(indice).remove();
            }
			indice -= 1;
		}

		
	}
}

function comunidades() 
{
    let comunidadesYProvincias = [
        ["Andalucia", ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"]],
        ["Aragon", ["Huesca", "Teruel", "Zaragoza"]],
        ["Asturias", ["Asturias"]],
        ["Baleares", ["Islas Baleares"]],
        ["Canarias", ["Las Palmas", "Santa Cruz de Tenerife"]],
        ["Cantabria", ["Cantabria"]],
        ["Castilla_la_mancha", ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"]],
        ["Castilla_y_leon", ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"]],
        ["Catalunya", ["Barcelona", "Girona", "Lleida", "Tarragona"]],
        ["Comunidad_valenciana", ["Alicante", "Castellón", "Valencia"]],
        ["Extremadura", ["Badajoz", "Cáceres"]],
        ["Galicia", ["A Coruña", "Lugo", "Ourense", "Pontevedra"]],
        ["Madrid", ["Madrid"]],
        ["Murcia", ["Murcia"]],
        ["Navarra", ["Navarra"]],
        ["La_rioja", ["La Rioja"]],
        ["Pais_vasco", ["Álava", "Guipúzcoa", "Vizcaya"]],
        ["Ceuta", ["Ceuta"]],
        ["Melilla", ["Melilla"]]
    ]
    let = comunidadesDesc = [
        ["Andalucia", ["Con un rico legado árabe, Andalucía es famosa por la Alhambra, la Mezquita de Córdoba, sus playas y su vibrante flamenco."]],
        ["Aragon", ["Aragón destaca por sus paisajes pirenaicos, la arquitectura mudéjar en Teruel y la Basílica del Pilar en Zaragoza."]],
        ["Asturias", ["Conocida como el 'Paraíso Natural', Asturias ofrece verdes montañas, playas espectaculares y una gastronomía basada en sidra y fabada."]],
        ["Baleares", ["Famosas por sus playas paradisíacas y vida nocturna, las Baleares, especialmente Mallorca e Ibiza, son un destino turístico internacional."]],
        ["Canarias", ["Con clima subtropical, paisajes volcánicos y playas, Canarias es conocida por el Teide y el Carnaval de Santa Cruz."]],
        ["Cantabria", ["Cantabria ofrece montañas, playas y cuevas prehistóricas, como Altamira, en un entorno de gran belleza natural."]],
        ["Castilla_y_leon", ["Extensa región con ciudades históricas, arte románico y catedrales; Castilla y León incluye Salamanca, Burgos y Valladolid."]],
        ["Castilla_la_mancha", ["Famosa por sus molinos de viento, esta región inspira el Quijote y ofrece monumentos históricos en Toledo y Cuenca."]],
        ["Catalunya", ["Cataluña es culturalmente vibrante, con la arquitectura de Gaudí en Barcelona, playas en la Costa Brava y los Pirineos."]],
        ["Comunidad_valenciana", ["Reconocida por sus playas mediterráneas, la Ciudad de las Artes y las Fallas, es una región dinámica y soleada."]],
        ["Extremadura", ["Con ciudades históricas como Mérida y Cáceres, Extremadura ofrece una rica herencia romana y paisajes naturales vírgenes."]],
        ["Galicia", ["Galicia es famosa por el Camino de Santiago, sus rías, gastronomía de mariscos y su verde entorno montañoso."]],
        ["Madrid", ["Madrid, la capital, combina historia, cultura y modernidad, con museos, el Palacio Real y el parque del Retiro."]],
        ["Murcia", ["Murcia es soleada y agrícola, conocida por sus huertas, la catedral de su capital y playas mediterráneas."]],
        ["Navarra", ["Navarra, conocida por los Sanfermines en Pamplona, ofrece paisajes naturales y un importante patrimonio medieval."]],
        ["La_rioja", ["Famosa por sus vinos, La Rioja es una pequeña región con paisajes de viñedos y bodegas de renombre mundial."]],
        ["Pais_vasco", ["El País Vasco destaca por su gastronomía, el Museo Guggenheim en Bilbao y los paisajes verdes de montaña y mar."]],
        ["Ceuta", ["Ceuta, en el norte de África, es una ciudad multicultural con historia cristiana, árabe y romana."]],
        ["Melilla", ["Melilla, en la costa africana, destaca por su arquitectura modernista y su vibrante mezcla cultural."]]
    ]

    let todasProvincias = $("#provincias");
    let eleccion = $("#comunidad").val();
    let encontrado = true; 
    let indice = 0;

    while (encontrado && indice < comunidadesYProvincias.length) {
        if (comunidadesYProvincias[indice][0] == eleccion) 
            encontrado = false;
        indice += 1;
    }
    for (let i = todasProvincias.length-1; i >= 0 ; i--) 
        todasProvincias.eq(i).text("");
    
    indice -= 1;
    comunidadesYProvincias[indice][1].forEach(provincia => {
        todasProvincias.append(`<option>${provincia}</option>`);
    });
    let cajaCont = $("#comentario");
    cajaCont.text(comunidadesDesc[indice][1][0]);
}

function numRandom()
{
    return Math.trunc(Math.random() * (255 - 0))
}

function colores()
{
    let color1 = "rgb(" + numRandom() + "," + numRandom() + "," + numRandom()+")";
    let color2 = "rgb(" + numRandom() + "," + numRandom() + "," + numRandom()+")";
    let tabla = $("#tabla_comunidades");
    let padre = tabla.find("tbody");
    let todos = padre.find("tr");
    let pares = todos.even();
    let impares = todos.odd();
    for (let i = 0; i < pares.length; i++) {
        pares.eq(i).find("td").eq(0).attr("style","background-color: "+ color1+";");
        pares.eq(i).find("td").eq(1).attr("style","background-color: "+ color1+";");
    }
    for (let i = 0; i < impares.length; i++) {
        impares.eq(i).find("td").eq(0).attr("style","background-color: "+ color2+";");
        impares.eq(i).find("td").eq(1).attr("style","background-color: "+ color2+";");
    }
}
function textura()
{
    let parrafo = $("#texto>p").index($("#texto > p:hover"));
    $("#texto>p").eq(parrafo).addClass("textura");
}
function noTextura()
{
    $("#texto").find("p.textura").removeClass("textura");
}


