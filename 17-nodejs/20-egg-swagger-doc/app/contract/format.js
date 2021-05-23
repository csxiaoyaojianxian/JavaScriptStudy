const JsonBody = {
  code: { type: 'number', required: true, example: 0 },
  message: { type: 'string', required: true, example: 'success' },
  data: { type: 'Enum', required: true, example: [] },
}

module.exports = {
  indexJsonBody: {
    ...JsonBody,
    data: { type: 'string', example: 'test' },
  },
};
