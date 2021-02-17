
var matriz, m = [];
var long = 0;

function saveFile(e, l) {

  //var dApp = DriveApp;
  var folderI = DriveApp.getFoldersByName("Carpeta de pruebas drive");
  var folder = folderI.next();
  
  

  var fecha = new Date();
  var tiempo = Utilities.formatDate(fecha, SpreadsheetApp.getActive().getSpreadsheetTimeZone(), 'ddMMyyyyHHmm');
  var registro = "Registro" + tiempo;
  Logger.log(registro);
  var arrayUrl = [];


Logger.log("Esto es i "+ l);
  try {

   
  // var dApp = DriveApp;
     var folderI = DriveApp.getFoldersByName("Registros Nutresa");
     var folder = folderI.next();
    
   
   

     //Se crea carpeta anidada 
    //var folderInsert = folder.createFolder(registro);
    
    
   
    var blob = Utilities.newBlob(e.bytes, e.mimeType, e.filename);
    //  DriveApp.createFile(blob);




    var file = folder.createFile(blob);

    // Utilities.sleep(9000)//pausa en milisegundos
    var urlFile = file.getUrl();
    Logger.log("Esta es la url " + urlFile);
    arrayUrl.push(urlFile);
    // Logger.log("Este es el array de las url "+arrayUrl);


    enviarInfo(arrayUrl, l);

    //  Utilities.sleep(3000)//pausa en milisegundos

    return true;

  } catch (error) {

    return error.toString();
  }
}





function enviarInfo(url, l) {

  Logger.log("Esta es la url al iniociar el metodo  " + url);

  //var url = "ww.ww.ddddddwggggw";
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName(IActualizada);
  var lastR = sheet.getLastRow();
  var posicion = parseInt(lastR) + 1;

  var columna = 3;
  //var url1 = url;
  Logger.log("Esta es la longitud " + long);
  //Logger.log("Esta es la url "+url);



  sheet.getRange(posicion, columna).setValue(url[long]);
  Logger.log("Esta es la url dentro del for " + url[long] + "en la pocision " + long);
  long = long + 1;

}

function prueba() {
  var tiempo = new Date();
  Logger.log("Ingresa a prueba 1" + tiempo);
  //Utilities.sleep(1000);// pausa en milisegundos
  Utilities.sleep(60 * 1000);
  prueba2();
}





function cargarUrl(){

 var folders = DriveApp.getFoldersByName("Carpeta de pruebas drive");
 // var folder = folderI.next();
  
// Log the name of every folder in the user's Drive.
//var folders = DriveApp.getFolders();
while (folders.hasNext()) {
  var folder = folders.next();
  Logger.log(folder.getName());
}



}



