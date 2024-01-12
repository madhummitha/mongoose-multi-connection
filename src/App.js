const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

// mongoose.connect(
//   "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.gx3bw.mongodb.net/multi-connect-poc?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

const dbConnections = {};
function getDatabaseConnection(tenantId) {
  if (dbConnections[tenantId]) {
    return dbConnections[tenantId];
  }

  const dbUri = `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.gx3bw.mongodb.net/multi-poc-${tenantId}?retryWrites=true&w=majority`;
  const dbConnection = mongoose.createConnection(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  dbConnections[tenantId] = dbConnection;
  console.log(dbConnections, "dbconn");
  return dbConnection;
}

app.use((req, res, next) => {
  const tenantId = req.headers["x-tenant-id"]; // Example: Identify tenant from a custom request header
  if (!tenantId) {
    return res.status(400).send("Tenant ID is required");
  }

  req.dbConnection = getDatabaseConnection(tenantId);
  next();
});

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
