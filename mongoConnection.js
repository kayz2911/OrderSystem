const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set('strictQuery', true);
dotenv.config();

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
mongoose.connection.on("disconnected", (err) => {
  console.log("MongoDB disconnected");
});

async function connect(database = "") {
  const MONGO_URL = `mongodb://localhost:27017/${database}`;
  await mongoose.connect(MONGO_URL);
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect,
};
