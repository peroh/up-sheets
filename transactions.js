// Respond to any POST requests
const doPost = e => {
  const { data } = JSON.parse(e.postData.contents)
  const { related: transactionUrl } = data.relationships.transaction.links
  const response = UrlFetchApp.fetch(transactionUrl, buildOptions())
  const transactionRow = buildTransaction(JSON.parse(response))
  addTransaction(transactionRow)
  return createJSONResponse(createMessage(transactionRow))
}

const getTransactionsSheet = () => SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Up Transactions")

const buildTransaction = ({ data }) => {
  const { status, description, amount, createdAt } = data.attributes
  return [
    createdAt,
    amount.value,
    description,
    status
  ]
}

const addTransaction = row => {
  const sheet = getTransactionsSheet()
  const [numRows, numColumns] = [1, row.length]
  const rowRange = [row]
  const [rowNum, colNum] = [sheet.getLastRow() + 1, 1]
  const range = sheet.getRange(rowNum, colNum, numRows, numColumns)
  range.setValues(rowRange)
}
