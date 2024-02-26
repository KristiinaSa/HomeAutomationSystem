import server from "./app.js";

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
