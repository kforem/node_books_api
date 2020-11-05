(async () => {
  const { connection } = require("./connection");
  const app = require("./app")(await connection);

  app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
})();
