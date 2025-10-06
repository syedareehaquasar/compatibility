// REPLACE THIS WITH THE NAME OF THE SHEET TAB WHERE YOU WANT DATA TO GO
const SHEET_NAME = "Sheet1"; // Assuming your sheet tab is named 'Sheet1'

/**
 * Handle POST request from the web form.
 * This function receives the data and logs it to the Google Sheet.
 */
function doPost(e) {
  // Get the active spreadsheet and the target sheet tab
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Get data from the POST request
  const data = e.parameter;
  
  // Extract data fields
  const timestamp = new Date();
  const nameA = data.nameA;
  const nameB = data.nameB;
  const result = data.result;
  
  // Append a new row with the data
  sheet.appendRow([
    timestamp,
    nameA,
    nameB,
    result
  ]);

  // Set headers in the sheet if it's the first time running
  if (sheet.getLastRow() === 1) {
    sheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Name A", "Name B", "Compatibility Result"]]);
  }

  // Return a success response (required for the frontend to know it worked)
  return ContentService.createTextOutput(JSON.stringify({result: "success", row: sheet.getLastRow()}))
      .setMimeType(ContentService.MimeType.JSON);
}
