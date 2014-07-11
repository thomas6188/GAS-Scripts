function emailMeetingDoc() 
{
  var myFolder;
  
  //Find the relevent folder
  var folderName="Meetings"; // change the name here
  var folders = DriveApp.getFolders();    
  
  while (folders.hasNext()) 
  {
   var folder = folders.next();
   if(folderName == folder.getName()) 
   {         
      myFolder=folder;
   }
  }
  
  
  //Get all GDrive document files
  var AllFiles = myFolder.getFilesByType('application/vnd.google-apps.document'); //Specifies the type of document e.g docs, pdfs and etc.
  
  //Get starred docs with last modified date as today
  while(AllFiles.hasNext())
  {
    var doc=AllFiles.next();
    var lastUpdatedDate=Utilities.formatDate(doc.getLastUpdated(),"GMT+0530", "dd-MM-yyyy");
    var scriptRunDate= Utilities.formatDate(new Date(), "GMT+0530", "dd-MM-yyyy");
    if(doc.isStarred() && (lastUpdatedDate==scriptRunDate))
      {
        var fileName= doc.getName();
        var url= doc.getUrl();
        MailApp.sendEmail(Mail ID, fileName, url,{attachments:[doc]}); //Email these docs 
      }
        
  }
  
}
