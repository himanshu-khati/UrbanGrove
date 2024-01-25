const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// handling uncaught exception
process.on("uncaught exception", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down te server  due to uncaught exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

// connect database
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost: ${process.env.PORT}`);
});

// unhndled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
