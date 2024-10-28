function doPost(request) {
  var values = request.parameter.add.split(",");
  var sheetname = "Sheet1";

  var doc = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty("key")
  );
  var sheet = doc.getSheetByName(sheetname);

  if (!sheet) {
    return ContentService.createTextOutput("Sheet not found");
  }

  var lastRow = sheet.getLastRow() + 1;

  sheet.getRange(lastRow, 1, 1, values.length).setValues([values]);

  return ContentService.createTextOutput(
    "Values added successfully to row " + lastRow
  );
}

function doGet(request) {
  var query = request.parameter.q;
  var parameter = 2;
  var sheetname = "Sheet1";

  var doc = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty("key")
  );
  var sheet = doc.getSheetByName(sheetname);

  if (!sheet) {
    return ContentService.createTextOutput("Sheet not found");
  }

  var data = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == query) {
      var value = sheet.getRange(i + 1, parameter).getValue();
      return ContentService.createTextOutput("Confirmed Value: " + value);
    }
  }

  return ContentService.createTextOutput("Query not found");
}

function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty("key", sheet.getId());
}
