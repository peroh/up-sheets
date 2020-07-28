const getSheet = name => SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)

const addRow = (sheet, row) => {
  const [numRows, numColumns] = [1, row.length]
  const rowRange = [row]
  const [rowNum, colNum] = [sheet.getLastRow() + 1, 1]
  const range = sheet.getRange(rowNum, colNum, numRows, numColumns)
  range.setValues(rowRange)
}
