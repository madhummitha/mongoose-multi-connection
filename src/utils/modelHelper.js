const todoSchema = require("../models/todo");

exports.getModelForTenant = (connection, modelName) => {
  let schema;
  switch (modelName) {
    case "Todo":
      schema = todoSchema;
      break;
    default:
      throw new Error("Invalid model name: " + modelName);
  }
  return connection.model(modelName, schema);
};
