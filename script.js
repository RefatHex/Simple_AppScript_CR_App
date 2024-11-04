function getMonthlySheet() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var sheetName = year + "-" + (month < 10 ? "0" + month : month);

  var doc = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty("key")
  );
  var sheet = doc.getSheetByName(sheetName);

  if (!sheet) {
    sheet = doc.insertSheet(sheetName);
  }

  return sheet;
}

function doPost(request) {
  var action = request.parameter.action;
  var values = request.parameter.values
    ? request.parameter.values.split(",")
    : null;
  var sheet = getMonthlySheet();

  if (!sheet) {
    return ContentService.createTextOutput("Sheet not found");
  }

  if (action === "add") {
    if (!values) {
      return ContentService.createTextOutput("No values provided for addition");
    }

    var lastRow = sheet.getLastRow();
    var newId = lastRow > 1 ? sheet.getRange(lastRow, 1).getValue() + 1 : 1;

    var rowData = [newId].concat(values);
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);

    return ContentService.createTextOutput(
      "Values added successfully with ID " + newId
    );
  } else if (action === "update") {
    var id = parseInt(request.parameter.id, 10);
    if (!id || !values) {
      return ContentService.createTextOutput(
        "Invalid ID or no values provided for update"
      );
    }

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
    var rowToUpdate = -1;

    for (var i = 0; i < data.length; i++) {
      if (data[i][0] == id) {
        rowToUpdate = i + 2;
        break;
      }
    }

    if (rowToUpdate === -1) {
      return ContentService.createTextOutput("ID not found");
    }

    var updatedRowData = [id].concat(values);
    sheet
      .getRange(rowToUpdate, 1, 1, updatedRowData.length)
      .setValues([updatedRowData]);

    return ContentService.createTextOutput(
      "Row with ID " + id + " updated successfully"
    );
  } else if (action === "delete") {
    var idToDelete = parseInt(request.parameter.id, 10);
    if (!idToDelete) {
      return ContentService.createTextOutput("Invalid ID for deletion");
    }

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
    var rowToDelete = -1;

    for (var j = 0; j < data.length; j++) {
      if (data[j][0] == idToDelete) {
        rowToDelete = j + 2;
        break;
      }
    }

    if (rowToDelete === -1) {
      return ContentService.createTextOutput("ID not found for deletion");
    }

    sheet.deleteRow(rowToDelete);
    return ContentService.createTextOutput(
      "Row with ID " + idToDelete + " deleted successfully"
    );
  }

  return ContentService.createTextOutput("Invalid action");
}

function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty("key", sheet.getId());

  var triggers = ScriptApp.getProjectTriggers();
  var triggerExists = false;

  triggers.forEach(function (trigger) {
    if (trigger.getHandlerFunction() === "getMonthlySheet") {
      triggerExists = true;
    }
  });

  triggers.forEach(function (trigger) {
    Logger.log(
      "Trigger: " +
        trigger.getHandlerFunction() +
        " at " +
        trigger.getEventType()
    );
  });

  if (!triggerExists) {
    ScriptApp.newTrigger("getMonthlySheet")
      .timeBased()
      .onMonthDay(1)
      .atHour(0)
      .create();
    Logger.log("New monthly trigger created for getMonthlySheet.");
  } else {
    Logger.log("Monthly trigger for getMonthlySheet already exists.");
  }
}
