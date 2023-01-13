const errorMap = {
  NOT_FOUND: 404,
  'any.required': 400,
  'string.min': 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
