const mongoose = require("mongoose");

const connectDatabase = async () => {
  const data = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
  console.log(
    `MongoDB connected to server: ${data.connection.host} at ${data.connection.port}`
  );
};

module.exports = connectDatabase;
