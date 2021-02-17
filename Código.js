//Variables globales
var rutaWeb = ScriptApp.getService().getUrl();
var ssId = "1-vk2Pf3KOQk_QqgimHDXWn72dihGgXNaJYkCjeambAk";
var auditores = "Generales auditor";
var IActualizada = "Información actualizada";


//Esta funcion inicia la llamada de la pagina y recibe peticiones de tipo GET
function doGet(e) {

	var page = e.parameter.p || 'index';
	PutValues("", "", "", "");

	var html = HtmlService.createTemplateFromFile(page);
	html.mensaje = "";

	return html.evaluate()
		.setSandboxMode(HtmlService.SandboxMode.IFRAME)
		.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
		.setTitle('SEDIC')
		.setFaviconUrl('https://drive.google.com/uc?id=11VmVU-VhcrAi-_GjaxM048OZoL-2WpeM#.ico');

}
//Close función doGet


//Esta funcion recibe peticiones y parametros de tipo POST
function doPost(e) {

	Logger.log(JSON.stringify(e));

	var user = e.parameter.username || " ";
	var password = e.parameter.password || " ";

	Logger.log(typeof(user));
	Logger.log(typeof(password));

	var datos = checkLogin(user, password);
	Logger.log("estado return " + datos.sw);


	if (datos.sw) {

		//Enviamos los datos a la memoria cache
		PutValues(datos.correo, datos.nombre, datos.contrasena, datos.imagen);
		ShowValues();

		var page = e.parameter.btnLogin || 'Registro';

		var html = HtmlService.createTemplateFromFile(page);
		html.mensaje = "";
		return html.evaluate()
			.setSandboxMode(HtmlService.SandboxMode.IFRAME)
			.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
			.setTitle('SEDIC')
			.setFaviconUrl('https://drive.google.com/uc?id=11VmVU-VhcrAi-_GjaxM048OZoL-2WpeM#.ico');


	} else if (e.parameter.btnLogin != "") {
		
        var cacheVal = ShowValues();
		var datos = checkLogin(cacheVal.email, cacheVal.pass);
		Logger.log("El valor dentro del if es " + datos.sw);

		if (datos.sw && e.parameter.btnLogin == "index") {
			PutValues("", "", "", "");
			var page = 'index';

			var html = HtmlService.createTemplateFromFile(page);
			html.mensaje = "";
			return html.evaluate()
				.setSandboxMode(HtmlService.SandboxMode.IFRAME)
				.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
				.setTitle('SEDIC')
				.setFaviconUrl('https://drive.google.com/uc?id=11VmVU-VhcrAi-_GjaxM048OZoL-2WpeM#.ico');

		} else if (datos.sw) {
        
			var page = e.parameter.btnLogin || 'Registro';

			var html = HtmlService.createTemplateFromFile(page);
			html.mensaje = "";
			return html.evaluate()
				.setSandboxMode(HtmlService.SandboxMode.IFRAME)
				.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
				.setTitle('SEDIC')
				.setFaviconUrl('https://drive.google.com/uc?id=11VmVU-VhcrAi-_GjaxM048OZoL-2WpeM#.ico');

		} else {

			var page = 'index';
			PutValues("", "", "", "");


			var html = HtmlService.createTemplateFromFile(page);
			html.mensaje = "";
			return html.evaluate()
				.setSandboxMode(HtmlService.SandboxMode.IFRAME)
				.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
				.setTitle('SEDIC')
				.setFaviconUrl('https://drive.google.com/uc?id=11VmVU-VhcrAi-_GjaxM048OZoL-2WpeM#.ico');


		}

	} else if (datos.sw == false && user == " " || password == " ") {

		var page = 'index';
		PutValues("", "", "", "");


		var html = HtmlService.createTemplateFromFile(page);
		html.mensaje = "";
		return html.evaluate()
			.setSandboxMode(HtmlService.SandboxMode.IFRAME)
			.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
			.setTitle('SEDIC')
			.setFaviconUrl('https://drive.google.com/uc?id=11VmVU-VhcrAi-_GjaxM048OZoL-2WpeM#.ico');


	} else {

		var page = 'index';
		PutValues("", "", "", "");

		var html = HtmlService.createTemplateFromFile(page);
		html.mensaje = "Usuario o contraseña incorrectos";
		return html.evaluate()
			.setSandboxMode(HtmlService.SandboxMode.IFRAME)
			.addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
			.setTitle('SEDIC')
			.setFaviconUrl('https://drive.google.com/uc?id=11VmVU-VhcrAi-_GjaxM048OZoL-2WpeM#.ico');

	}
}
//Close función POST



//Esta función referncia las los archivos declarados como html
function include(filename) {

	return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
//Close include


//Esta funcion valida si el usuario y la contraseña ingresados en el input son iguales a los de la base de datos
function checkLogin(user, password) {

	var spreadsheet = SpreadsheetApp.openById(ssId);
	var sheeta = spreadsheet.getSheetByName(auditores);
	var LastR = sheeta.getLastRow();
	var datos = sheeta.getDataRange().getValues();
	var longitud = sheeta.getRange("A2:A" + LastR).getValues();
	//var user = "Edwin";
	//var password = "Medellin123";
	var sw = false;

	for (var i = 0; i <= longitud.length; i++) {


		let correo = datos[i][0];
		let nombre = datos[i][1];
		let contrasena = datos[i][2];
		let imagen = datos[i][3];

		var obj = {
			correo: correo,
			nombre: nombre,
			sw: sw,
			contrasena: contrasena,
			imagen: imagen
		};



		if (correo != "" && user != "" && password != "" && contrasena != "") {
			//if (usuario.toUpperCase() == user.toUpperCase() && password == contrasena) {
			if (correo == user && password == contrasena) {

				sw = true;
				break;
			}
		} else {

			obj.sw = false;
		}
	} //Close for

	if (sw == true) {


		obj.sw = sw;

		return obj;

	} else {

		obj.sw = sw;
		return obj;
	}
}
//Close checkLogin



//Esta función envia los datos obtenidos por parametros y los guarda en la memoria cahce
function PutValues(email, name, password, image) {

	var cache = CacheService.getUserCache();
	// var cache = CacheService.getScriptCache();
	//Se guardan los datos en cache durante 20 minutos
	cache.put("EMAIL", email, 1200);
	cache.put("NAME", name, 1200);
	cache.put("PASS", password, 1200);
	cache.put("IMG", image, 1200);
}
//Close putValues



//Esta función obtiene los datos guardados en la memoria cahce
function ShowValues() {
	var cache = CacheService.getUserCache();
	//var cache = CacheService.getScriptCache();


	var email = cache.get("EMAIL");
	var name = cache.get("NAME");
	var pass = cache.get("PASS");
	var image = cache.get("IMG");

	Logger.log(email + " : " + name + " : " + pass + " : " + image);
	var objVal = {
		email: email,
		name: name,
		pass: pass,
		image: image
	};
	return objVal;
}
//Close ShowValues




//Esta función envia los datos obtenidos en memoria cache y los envia al front
function allValues() {
	var datosUser = ShowValues();
	return datosUser;

}