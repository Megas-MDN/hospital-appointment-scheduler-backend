const validateData = ({ data, schema, optional = {} }) => {
  for (const key in schema) {
    if (data[key] === undefined && !optional[key] && !optional.all)
      return { error: true, message: `Missing ${key} field`, status: 400 };

    if (data[key] !== undefined && typeof data[key] !== schema[key])
      return { error: true, message: `Invalid ${key} field`, status: 400 };
  }

  return { error: false };
};

module.exports = { validateData };
