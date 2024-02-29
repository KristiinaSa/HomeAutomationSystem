const server = require("./app.js");

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
