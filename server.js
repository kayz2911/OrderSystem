const http = require("http");
const app = require("./app");
const mongoService = require("./mongoConnection");

const server = http.createServer(app);

mongoService.connect("Order");

const PORT = 8800;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
