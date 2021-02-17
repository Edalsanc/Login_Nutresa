/*
function uploadFiles(form) {

 Logger.log(JSON.stringify(form));
 
  
  try {
  
     var dApp = DriveApp;
     var folderI = dApp.getFoldersByName("Carpeta de pruebas drive");
     var folder = folderI.next();
    
   
    
    //se obtiene carpeta con el nombre que recibe del id
   // var folder, folders = DriveApp.getFoldersByName(nombreFolder);
  
    
    //Se valida si existe la carpeta y se crea en el drive
    
   // if (folders.hasNext()) {
     // folder = folders.next();
    //} else {
     // folder = DriveApp.createFolder(idFolder);
    //}
    
    
    //Se crea carpeta anidada con el nombre del inputHtml 
    
    var folderInsert = folder.createFolder(form.nombreC);
    
    //Se obtiene el vlor del archivo
   
        var blob1 = form.dato1; 
        var blob2 = form.dato2; 
        var blob3 = form.dato3; 
        
         Logger.log(typeof (blob1));
        //var fileName = blob1.getName();
        
        var data= "Este es el contenido";
        var fileName = "Esto es una imagen";
        
       var blob55 = Utilities.newBlob(blob1,MimeType.JPEG, fileName);//Create a blob with random characters

   
   
    var file = folderInsert.createFile(blob1); 
    var file = folderInsert.createFile(blob55);
    var data1 = file.getUrl();
    enviarInfo(data1);
    
    //var file = folderInsert.createFile(blob2); 
    //var file = folderInsert.createFile(blob3); 
   // var file = folderInsert.createFile(finalBolb,); 
   // file.setDescription("Uploaded by " + form.myName);
        
    return "El archivo ha subido correctamente " + file.getUrl();
    
  } catch (error) {
    
    return error.toString();
  }
  
  
  
  return "ingeso bien";
 
}



function enviarInfo(data1){


//var data1 = "ww.ww.ddddddwggggw";
 var ss = SpreadsheetApp.openById(ssId);
 var sheet = ss.getSheetByName(IActualizada);
 var lastR = sheet.getLastRow();
 var posicion = parseInt(lastR)+1;

   sheet.getRange(posicion, 3).setValue(data1)
 
 
 
 

}
*/
function correr(){
var n = contador(29);
Logger.log(n);
}

function contador(num){


var suma = 0;
suma = suma + num;
Logger.log(suma)
return suma;
}