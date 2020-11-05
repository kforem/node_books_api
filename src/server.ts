import { connection } from "./connection";
import { appFactory } from "./app";

(async () => {
  const app = appFactory(await connection);

  app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
})();
