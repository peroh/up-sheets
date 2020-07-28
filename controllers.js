// Responds to any POST requests
const doPost = e => {
  const { data } = JSON.parse(e.postData.contents)
  switch (data.attributes.eventType) {
    case 'TRANSACTION_CREATED':
      return handleTransaction(data)
    case 'PING':
      return handleLog(data)
    default:
      return handleDefault()
  }
}

const handleTransaction = data => {
  const { related: transactionUrl } = data.relationships.transaction.links
  const response = UrlFetchApp.fetch(transactionUrl, buildOptions())
  const transactionRow = buildTransaction(JSON.parse(response))
  addTransaction(transactionRow)
  return createJSONResponse(createMessage("Transaction created", transactionRow))
}

const handleLog = data => {
  const logRow = buildLog(data)
  addLog(logRow)
  return createJSONResponse(createMessage("Log created", logRow))
}

const handleDefault = () => {
  const message = 'An unknown request was encountered'
  addLog(['UNKNOWN', message])
  return createJSONResponse(createMessage("Unknown request", message))
}
