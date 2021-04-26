// *****************************************************************************************
function dataHandling_loadArray() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    .getRange(sheetRange + dataHandling_getLastRow(sheetRange)).getValues();
}
// *****************************************************************************************
function dataHandling_updateSheet(dataArray) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    .getRange(sheetRange + dataHandling_getLastRow(sheetRange)).setValues(dataArray);
  return true;
}
// *****************************************************************************************
function dataHandling_getLastRow(rangeA1String) {

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  let range = sheet.getRange(rangeA1String).getValues();

  let lastRowIndex;

  for (let i = range.length - 1; i >= 0; i--) {
    lastRowIndex = i;
    let row = range[i];
    let isBlank = row.every(function (c) { return c == ""; });
    if (!isBlank) {
      break;
    }
  }

  let lastRow = lastRowIndex + 1;

  return lastRow+1;
}
// *****************************************************************************************