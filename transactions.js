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

const addTransaction = row => addRow(getSheet(TRANSACTIONS_SHEET_NAME), row)

