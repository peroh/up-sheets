const createJSONResponse = message => {
  const responseMessage = createMessage(message)
  const response = ContentService.createTextOutput(responseMessage)
  response.setMimeType(ContentService.MimeType.JSON)
  return response
}

const buildOptions = () => ({
  'method' : 'get',
  'contentType': 'application/json',
  'headers': {
    "Authorization": `Bearer ${getAPIKey()}`
  }
})

const createMessage = row => ({
  message: "Row created",
  data: row
})