const TRANSACTIONS_SHEET_NAME = 'Up Transactions'
const CREDENTIALS_SHEET_NAME = 'Credentials'
const LOGS_SHEET_NAME = 'Logs'

const initialSetup = () => {
  setSheetName(TRANSACTIONS_SHEET_NAME)
  addHeaderRow()
  addSheet(CREDENTIALS_SHEET_NAME)
  addCredentialsField()
  addSheet(LOGS_SHEET_NAME)
}

const addSheet = name => {
  SpreadsheetApp.getActiveSpreadsheet().insertSheet(name)
}

const setSheetName = name => SpreadsheetApp.getActiveSheet().setName(name)

const addHeaderRow = () => {
  const sheet = getTransactionsSheet()
  const headerRow = buildHeaderRow()
  const [numRows, numColumns] = [1, headerRow.length]
  const headerRange = [headerRow]
  const range = sheet.getRange(1, 1, numRows, numColumns)
  range.setValues(headerRange)
}

const buildHeaderRow = () => ["Date", "Amount", "Description", "Status"]

const addCredentialsField = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CREDENTIALS_SHEET_NAME)
  sheet.getRange("A1").setValue("API Key")
}
