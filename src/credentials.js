const credentialsSheet = () => SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CREDENTIALS_SHEET_NAME)

const getAPIKey = () => credentialsSheet().getRange("B1").getValue()
