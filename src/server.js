(async () => {
  const { connection } = require("./connection");
  const { appFactory } = require("./app");
  const app = appFactory(await connection);

  app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
})();
