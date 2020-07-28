const buildLog = data => {
  const { eventType } = data.attributes
  return [eventType, data]
}

const addLog = row => addRow(getSheet(LOGS_SHEET_NAME), row)
