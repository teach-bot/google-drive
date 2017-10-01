let google = require('googleapis');
let authentication = require("./authentication");

function addSheet(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.create({
    auth: auth,
    resource: {
        properties:{
            title: "WhereDoesTheTimeGo"
        }
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return null;
    } else {
        console.log("Added",response.spreadsheetId);
      return response;
    }
  });
}


function formatSpreadSheet(auth) {
  var sheets = google.sheets('v4');
  var spreadsheets_id = "1Kd46uZ3v1WEnhzQbbgDCqGKt9nmPkM-QwZlM1qWb9sw";
  var timeValues = [['Hours','7','8','9','10','11','12','1','2','3','4','5','6','7','8','9','10','11','12','1','2','3','4','5','6']]
  var dayValues = [['Mon','Tue','Wew','Thu','Fri','Sat','Sun']]
  //For the Time Columns
  sheets.spreadsheets.values.update({
    auth: auth,
    spreadsheetId: spreadsheets_id,
    range: 'Sheet1!B3:B27',
    valueInputOption: 'USER_ENTERED',
    resource: 
        {range: 'Sheet1!B3:B27',
        majorDimension: 'COLUMNS',
        values: timeValues}
  }, function (err, spreadsheets) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Success Hours Column Created');
    }
  });

  //For the Days Row
  sheets.spreadsheets.values.update({
    auth: auth,
    spreadsheetId: spreadsheets_id,
    range: 'Sheet1!C3:I3',
    valueInputOption: 'USER_ENTERED',
    resource: 
        {range: 'Sheet1!C3:I3',
        majorDimension: 'ROWS',
        values: dayValues}
  }, function (err, spreadsheets) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Success: Days Row created');
    }
  });
}

function addTimeValuesToCell(auth,values){
  var sheets = google.sheets('v4');
  var spreadsheets_id = "1Kd46uZ3v1WEnhzQbbgDCqGKt9nmPkM-QwZlM1qWb9sw";
 
  sheets.spreadsheets.values.update({
    auth: auth,
    spreadsheetId: spreadsheets_id,
    range: 'Sheet1!C4:I27',
    valueInputOption: 'USER_ENTERED',
    resource: {range: 'Sheet1!C4:I27',
        majorDimension: 'COLUMNS',
        values: values}
  }, function (err, spreadsheets) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Success: ', spreadsheets.spreadsheetId);
    }
  });
}

function createFolder(auth) {
  var fileMetadata = {
    'name': 'Invoices',
    'mimeType': 'application/vnd.google-apps.folder'
  };
  var drive = google.drive({ version: 'v3', auth: auth });
  drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Folder Id: ', file.id);
    }
  });
}

authentication.authenticate().then((auth)=>{
  values =[
          ['TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6','TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6'],
          ['TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6','TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6'],
          ['TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6','TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6'],
          ['TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6','TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6'],
          ['TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6','TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6'],
          ['TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6','TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6'],
          ['TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6','TESTING7','TESTING8','TESTING9','TESTING10','TESTING11','TESTING12','TESTING1','TESTING2','TESTING3','TESTING4','TESTING5','TESTING6']
        ]
  // addSheet(auth);
  formatSpreadSheet(auth)
  addTimeValuesToCell(auth,values);

});
